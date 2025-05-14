import os
import cv2
from ultralytics import YOLO
from paddleocr import PaddleOCR
from paddleocr import PaddleOCR, draw_ocr
import json
import torch
from collections import defaultdict

def process_video_realtime(video_path, plate_model_path, vehicle_model_path, output_video_path, output_json_path):
    # Đảm bảo chương trình chạy ổn định trên các nền tảng khác nhau
    os.environ['KMP_DUPLICATE_LIB_OK'] = 'true'
    # Kiểm tra và sử dụng GPU nếu có
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f"Sử dụng thiết bị: {device}")
    # Kiểm tra thư mục đầu ra và tạo nếu không tồn tại
    output_dir = os.path.dirname(output_video_path)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)  # Tạo thư mục nếu chưa tồn tại

    # Kiểm tra file input tồn tại
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Không tìm thấy file video: {video_path}")
    # Khởi tạo models
    plate_model = YOLO(plate_model_path)
    vehicle_model = YOLO(vehicle_model_path)
    ocr = PaddleOCR(use_angle_cls=False, lang="en", rec_algorithm="CRNN", show_log=False, use_gpu=(device == 'cuda'))
    # Đọc video
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError(f"Không thể mở video: {video_path}")

    # Lấy thông số video
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    # Khởi tạo video writer để lưu video đầu ra
    out = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'X264'), fps, (frame_width, frame_height))
    
    # Dictionary lưu thông tin tracking
    objects = defaultdict(lambda: {'count': 0, 'tracks': {}})
    frame_count = 0

    print(f"Bắt đầu xử lý video: {os.path.basename(video_path)}")
    print(f"Độ phân giải: {frame_width}x{frame_height}")
    print(f"FPS: {fps}")

    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break

        # Phát hiện phương tiện
        vehicle_results = vehicle_model.track(frame, persist=True)
        # Phát hiện biển số xe
        plate_results = plate_model.track(frame, persist=True)

        # Xử lý kết quả vehicle detection
        if vehicle_results[0].boxes.id is not None:
            boxes = vehicle_results[0].boxes.xyxy.cpu().numpy()
            track_ids = vehicle_results[0].boxes.id.cpu().numpy().astype(int)
            classes = vehicle_results[0].boxes.cls.cpu().numpy().astype(int)
            confidences = vehicle_results[0].boxes.conf.cpu().numpy()

            for box, track_id, cls, confidence in zip(boxes, track_ids, classes, confidences):
                if confidence < 0.7:  # Ngưỡng cho vehicle detection
                    continue

                class_name = vehicle_model.names[cls]
                if class_name not in ['car', 'truck', 'bus', 'motorcycle']:
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
                        'Plate Number': ""  # Thêm trường biển số
                    }
                else:
                    objects[class_name]['tracks'][track_id].update({
                        'Time_of_disappearance': frame_count / fps,
                        'bounding_box': box.tolist(),
                        'Confidence': float(confidence),
                    })

                # Vẽ vehicle detection
                x1, y1, x2, y2 = map(int, box)
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                label = class_name.capitalize()  # Chỉ hiển thị tên phương tiện
                cv2.putText(frame, f"{label} {confidence:.2f}", (x1, y1 - 10), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        # Xử lý kết quả plate detection và nhận diện biển số với OCR
        if plate_results[0].boxes.id is not None:
            plate_boxes = plate_results[0].boxes.xyxy.cpu().numpy()

            for box in plate_boxes:
                x1, y1, x2, y2 = map(int, box)
                plate_img = frame[y1:y2, x1:x2]  # Cắt vùng chứa biển số xe

                # OCR để nhận diện ký tự từ biển số xe
                ocr_result = ocr.ocr(plate_img, cls=False)
                plate_text = ""
                if ocr_result and len(ocr_result[0]) > 0:
                    for res in ocr_result[0]:
                        plate_text += res[1][0] + " "
                    plate_text = plate_text.strip()

                if plate_text:
                    # Tìm phương tiện phù hợp và cập nhật biển số vào tracking thông qua track_id
                    for class_name, data in objects.items():
                        for track_id, info in data['tracks'].items():
                            box_vehicle = info['bounding_box']
                            if x1 >= box_vehicle[0] and y1 >= box_vehicle[1] and x2 <= box_vehicle[2] and y2 <= box_vehicle[3]:
                                info['Plate Number'] = plate_text

                    # Vẽ biển số và kết quả OCR lên frame
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
                    text = f"H2T-Thay Quan | Plate: {plate_text}"
                    cv2.putText(frame, text, (int(x1), int(y1 - 10)), 
                                cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

        # Hiển thị video trong thời gian thực
        cv2.imshow("H2T-Team Anh Quan  ", frame)
        # Ghi video output
        out.write(frame)

        # Thoát khi nhấn 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Giải phóng tài nguyên
    cap.release()
    out.release()
    cv2.destroyAllWindows()

    print(f"\nĐã lưu video đã xử lý tại: {output_video_path}")

    # Lưu kết quả vào JSON
    json_results = []
    for class_name, data in objects.items():
        for track_id, info in data['tracks'].items():
            # Kiểm tra xem 'bounding_box' có tồn tại trong dữ liệu không
            bounding_box = info.get('bounding_box', [0, 0, 0, 0])  # Nếu không có, sử dụng giá trị mặc định

            time_appeared = f"{int(info['Time_of_appearance'] // 60):02d}:{int(info['Time_of_appearance'] % 60):02d}"
            time_disappeared = f"{int(info['Time_of_disappearance'] // 60):02d}:{int(info['Time_of_disappearance'] % 60):02d}"

            json_results.append({
                "Object ID": info.get('Object ID', f"Plate {track_id}",),
                "Class": class_name,
                "Time appeared": time_appeared,
                "Time disappeared": time_disappeared,
                "Bounding box": bounding_box,  
                "Plate Number": info.get('Plate Number', ""),  
            })

    # Lưu kết quả JSON
    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(json_results, f, ensure_ascii=False, indent=4)

    print(f"Đã lưu kết quả tracking tại: {output_json_path}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Xử lý video với vehicle và license plate detection")
    parser.add_argument('--input', type=str, required=True, help="Đường dẫn đến file video input")
    parser.add_argument('--output_dir', type=str, default='./output', help="Thư mục lưu kết quả")
    parser.add_argument('--plate_model', type=str, default='models/custom11_plate.pt', help="Đường dẫn đến model biển số xe")
    parser.add_argument('--vehicle_model', type=str, default='models/yolov8n.pt', help="Đường dẫn đến model phát hiện phương tiện")
    args = parser.parse_args()
    
    # Tạo tên file output dựa trên tên file input
    base_name = os.path.splitext(os.path.basename(args.input))[0]
    output_video = os.path.join(args.output_dir, f"{base_name}_Out_plate.mp4")
    output_json = os.path.join(args.output_dir, f"{base_name}_Out_plate.json")
    
    # Xử lý video
    process_video_realtime(
        video_path=args.input,
        plate_model_path=args.plate_model,
        vehicle_model_path=args.vehicle_model,
        output_video_path=output_video,
        output_json_path=output_json
    )