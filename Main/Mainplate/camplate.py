import os
import cv2
from ultralytics import YOLO
from paddleocr import PaddleOCR
import json
import torch
from collections import defaultdict
import time

def process_camera_realtime(plate_model_path, vehicle_model_path, face_model_path, output_video_path, output_json_path, camera_id=0):
    os.environ['KMP_DUPLICATE_LIB_OK'] = 'true'
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f"Sử dụng thiết bị: {device}")

    output_dir = os.path.dirname(output_video_path)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Khởi tạo models
    plate_model = YOLO(plate_model_path).to(device)
    vehicle_model = YOLO(vehicle_model_path).to(device)
    face_model = YOLO(face_model_path).to(device)  # Thêm model phát hiện khuôn mặt
    ocr = PaddleOCR(use_angle_cls=False, lang="en", rec_algorithm="CRNN", show_log=False, use_gpu=(device == 'cuda'))

    # Mở camera
    cap = cv2.VideoCapture(camera_id)
    if not cap.isOpened():
        raise ValueError(f"Không thể mở camera ID {camera_id}")

    # Lấy thông số video
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS)) or 30  # fallback mặc định 30fps nếu không đọc được

    # Khởi tạo video writer
    out = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'X264'), fps, (frame_width, frame_height))

    objects = defaultdict(lambda: {'count': 0, 'tracks': {}})  # Lưu thông tin phương tiện
    faces = defaultdict(lambda: {'count': 0, 'tracks': {}})   # Lưu thông tin khuôn mặt
    frame_count = 0

    print(f"Bắt đầu nhận diện từ camera ID {camera_id}")
    print(f"Độ phân giải: {frame_width}x{frame_height}")
    print(f"FPS: {fps}")
    start_time = time.time()

    while True:
        success, frame = cap.read()
        if not success:
            print("Không đọc được frame từ camera. Thoát...")
            break

        frame_count += 1

        # Phát hiện phương tiện
        vehicle_results = vehicle_model.track(frame, persist=True, device=device)
        # Phát hiện biển số
        plate_results = plate_model.track(frame, persist=True, device=device)
        # Phát hiện khuôn mặt
        face_results = face_model.track(frame, persist=True, device=device)

        # Xử lý phương tiện
        if vehicle_results[0].boxes.id is not None:
            boxes = vehicle_results[0].boxes.xyxy.cpu().numpy()
            track_ids = vehicle_results[0].boxes.id.cpu().numpy().astype(int)
            classes = vehicle_results[0].boxes.cls.cpu().numpy().astype(int)
            confidences = vehicle_results[0].boxes.conf.cpu().numpy()

            for box, track_id, cls, confidence in zip(boxes, track_ids, classes, confidences):
                if confidence < 0.7:
                    continue

                class_name = vehicle_model.names[cls]
                if class_name not in ['car', 'truck', 'bus', 'motorcycle','Person']:
                    continue

                if track_id not in objects[class_name]['tracks']:
                    objects[class_name]['count'] += 1
                    count = objects[class_name]['count']
                    objects[class_name]['tracks'][track_id] = {
                        'Object ID': f"{class_name.capitalize()} {count}",
                        'Class': class_name,
                        'Time_of_appearance': frame_count / fps,
                        'Time_of_disappearance': frame_count / fps,
                        'bounding_box': box.tolist(),
                        'Confidence': float(confidence),
                        'Plate Number': ""
                    }
                else:
                    objects[class_name]['tracks'][track_id].update({
                        'Time_of_disappearance': frame_count / fps,
                        'bounding_box': box.tolist(),
                        'Confidence': float(confidence),
                    })

                x1, y1, x2, y2 = map(int, box)
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                label = class_name.capitalize()
                cv2.putText(frame, f"{label} {confidence:.2f}", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        # Xử lý biển số và OCR
        if plate_results[0].boxes.id is not None:
            plate_boxes = plate_results[0].boxes.xyxy.cpu().numpy()

            for box in plate_boxes:
                x1, y1, x2, y2 = map(int, box)
                plate_img = frame[y1:y2, x1:x2]

                ocr_result = ocr.ocr(plate_img, cls=False)
                plate_text = ""
                if ocr_result and len(ocr_result[0]) > 0:
                    for res in ocr_result[0]:
                        plate_text += res[1][0] + " "
                    plate_text = plate_text.strip()

                if plate_text:
                    for class_name, data in objects.items():
                        for track_id, info in data['tracks'].items():
                            box_vehicle = info['bounding_box']
                            if x1 >= box_vehicle[0] and y1 >= box_vehicle[1] and x2 <= box_vehicle[2] and y2 <= box_vehicle[3]:
                                info['Plate Number'] = plate_text

                    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
                    cv2.putText(frame, f"Plate: {plate_text}", (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

        # Xử lý khuôn mặt
        if face_results[0].boxes.id is not None:
            boxes = face_results[0].boxes.xyxy.cpu().numpy()
            track_ids = face_results[0].boxes.id.cpu().numpy().astype(int)
            classes = face_results[0].boxes.cls.cpu().numpy().astype(int)
            confidences = face_results[0].boxes.conf.cpu().numpy()

            for box, track_id, cls, confidence in zip(boxes, track_ids, classes, confidences):
                if confidence < 0.75:
                    continue

                class_name = face_model.names[cls]
                if track_id not in faces[class_name]['tracks']:
                    faces[class_name]['count'] += 1
                    count = faces[class_name]['count']
                    faces[class_name]['tracks'][track_id] = {
                        'Object ID': f"Face {count}",
                        'Class': class_name,
                        'Time_of_appearance': frame_count / fps,
                        'Time_of_disappearance': frame_count / fps,
                        'bounding_box': box.tolist(),
                        'Confidence': float(confidence),
                    }
                else:
                    faces[class_name]['tracks'][track_id].update({
                        'Time_of_disappearance': frame_count / fps,
                        'bounding_box': box.tolist(),
                        'Confidence': float(confidence),
                    })

                x1, y1, x2, y2 = map(int, box)
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)
                label = f"Face {confidence:.2f}"
                cv2.putText(frame, label, (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

        # Hiển thị
        cv2.imshow('AnhHaimientay', frame)

        # Ghi ra file
        out.write(frame)

        if cv2.waitKey(1) & 0xFF == ord('Q'):
            print("Nhấn Q -> Thoát")
            break

    # Giải phóng
    cap.release()
    out.release()
    cv2.destroyAllWindows()
    end_time = time.time()

    total_time = end_time - start_time
    print(f"\nThời gian xử lý: {total_time:.2f} giây")
    print(f"Đã lưu video ra: {output_video_path}")

    # Lưu JSON
    json_results = []
    # Lưu thông tin phương tiện
    for class_name, data in objects.items():
        for track_id, info in data['tracks'].items():
            bounding_box = info.get('bounding_box', [0, 0, 0, 0])
            time_appeared = f"{int(info['Time_of_appearance'] // 60):02d}:{int(info['Time_of_appearance'] % 60):02d}"
            time_disappeared = f"{int(info['Time_of_disappearance'] // 60):02d}:{int(info['Time_of_disappearance'] % 60):02d}"

            json_results.append({
                "Object ID": info.get('Object ID', f"Vehicle {track_id}"),
                "Class": class_name,
                "Time appeared": time_appeared,
                "Time disappeared": time_disappeared,
                "Bounding box": bounding_box,
                "Plate Number": info.get('Plate Number', ""),
            })

    # Lưu thông tin khuôn mặt
    for class_name, data in faces.items():
        for track_id, info in data['tracks'].items():
            bounding_box = info.get('bounding_box', [0, 0, 0, 0])
            time_appeared = f"{int(info['Time_of_appearance'] // 60):02d}:{int(info['Time_of_appearance'] % 60):02d}"
            time_disappeared = f"{int(info['Time_of_disappearance'] // 60):02d}:{int(info['Time_of_disappearance'] % 60):02d}"

            json_results.append({
                "Object ID": info.get('Object ID', f"Face {track_id}"),
                "Class": class_name,
                "Time appeared": time_appeared,
                "Time disappeared": time_disappeared,
                "Bounding box": bounding_box,
            })

    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(json_results, f, ensure_ascii=False, indent=4)

    print(f"Đã lưu kết quả JSON tại: {output_json_path}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Nhận diện real-time từ camera")
    parser.add_argument('--output_dir', type=str, default='./output', help="Thư mục lưu kết quả")
    parser.add_argument('--plate_model', type=str, default='models/custom11_plate.pt', help="Đường dẫn model biển số")
    parser.add_argument('--vehicle_model', type=str, default='models/yolov8n.pt', help="Đường dẫn model phương tiện")
    parser.add_argument('--face_model', type=str, default='models/yolov8n-face.pt', help="Đường dẫn model khuôn mặt")
    parser.add_argument('--camera_id', type=int, default=0, help="ID camera (mặc định 0)")
    args = parser.parse_args()

    output_video = os.path.join(args.output_dir, "camera_output.mp4")
    output_json = os.path.join(args.output_dir, "camera_output.json")

    process_camera_realtime(
        plate_model_path=args.plate_model,
        vehicle_model_path=args.vehicle_model,
        face_model_path=args.face_model,
        output_video_path=output_video,
        output_json_path=output_json,
        camera_id=args.camera_id
    )
    