import os
import cv2
from ultralytics import YOLO
import json
import torch
from collections import defaultdict

def process_video_realtime(video_path, face_model_path, output_video_path, output_json_path):
    os.environ['KMP_DUPLICATE_LIB_OK'] = 'true'
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f"Sử dụng thiết bị: {device}")

    output_dir = os.path.dirname(output_video_path)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Không tìm thấy file video: {video_path}")

    # Load model nhận diện khuôn mặt
    face_model = YOLO(face_model_path)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError(f"Không thể mở video: {video_path}")

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    out = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'X264'), fps, (frame_width, frame_height))

    objects = defaultdict(lambda: {'count': 0, 'tracks': {}})
    frame_count = 0

    print(f"Bắt đầu xử lý video: {os.path.basename(video_path)}")
    print(f"Độ phân giải: {frame_width}x{frame_height}")
    print(f"FPS: {fps}")

    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break

        # Phát hiện khuôn mặt
        face_results = face_model.track(frame, persist=True)

        if face_results[0].boxes.id is not None:
            boxes = face_results[0].boxes.xyxy.cpu().numpy()
            track_ids = face_results[0].boxes.id.cpu().numpy().astype(int)
            classes = face_results[0].boxes.cls.cpu().numpy().astype(int)
            confidences = face_results[0].boxes.conf.cpu().numpy()

            for box, track_id, cls, confidence in zip(boxes, track_ids, classes, confidences):
                if confidence < 0.6:  # Ngưỡng nhận diện khuôn mặt
                    continue

                class_name = face_model.names[cls]
                if class_name != 'face':  # Tên class phải là face
                    continue

                if track_id not in objects[class_name]['tracks']:
                    objects[class_name]['count'] += 1
                    count = objects[class_name]['count']
                    objects[class_name]['tracks'][track_id] = {
                        'Object ID': f"Face {count}",
                        'Class': class_name,
                        'Time_of_appearance': frame_count / fps,
                        'Time_of_disappearance': frame_count / fps,
                        'bounding_box': box.tolist(),
                        'Confidence': float(confidence),
                    }
                else:
                    objects[class_name]['tracks'][track_id].update({
                        'Time_of_disappearance': frame_count / fps,
                        'bounding_box': box.tolist(),
                        'Confidence': float(confidence),
                    })

                # Vẽ bounding box
                x1, y1, x2, y2 = map(int, box)
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 255), 2)
                cv2.putText(frame, f"Face {confidence:.2f}", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 255), 2)

        cv2.imshow("Face Detection Realtime", frame)
        out.write(frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        frame_count += 1

    cap.release()
    out.release()
    cv2.destroyAllWindows()

    print(f"\nĐã lưu video tại: {output_video_path}")

    # Xuất JSON kết quả
    json_results = []
    for class_name, data in objects.items():
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
                "Confidence": info.get('Confidence', 0.0),
            })

    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(json_results, f, ensure_ascii=False, indent=4)

    print(f"Đã lưu kết quả tracking tại: {output_json_path}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Nhận diện và tracking khuôn mặt từ video")
    parser.add_argument('--input', type=str, required=True, help="Đường dẫn video đầu vào")
    parser.add_argument('--output_dir', type=str, default='./output', help="Thư mục lưu kết quả")
    parser.add_argument('--face_model', type=str, default='models/yolov8n-face.pt', help="Model nhận diện khuôn mặt")
    args = parser.parse_args()

    base_name = os.path.splitext(os.path.basename(args.input))[0]
    output_video = os.path.join(args.output_dir, f"{base_name}_Out_face.mp4")
    output_json = os.path.join(args.output_dir, f"{base_name}_Out_face.json")

    process_video_realtime(
        video_path=args.input,
        face_model_path=args.face_model,
        output_video_path=output_video,
        output_json_path=output_json
    )
