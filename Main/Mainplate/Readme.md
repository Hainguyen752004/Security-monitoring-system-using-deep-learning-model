# Introduction
## Core Components:
- YOLOv8 (You Only Look Once v8): A state-of-the-art object detection model used to locate license plates in video streams or images with high speed and precision.
- 
- PP-OCRv3 (PaddlePaddle OCR version 3): An advanced lightweight OCR engine designed for high-accuracy text extraction, particularly well-suited for recognizing alphanumeric 
characters on license plates.
## Key Features
- High Accuracy: Combines YOLOv8’s detection strength with PP-OCRv3’s text recognition capabilities.

- Real-time Performance: Efficient processing pipeline ensures low latency in live environments.

- Scalability: Suitable for smart parking systems, toll booths, traffic surveillance, and access control.
# Run the script with the following command:  
python main.py --input path_to_video
# To run on a web streamlit:
python camplate.py
# System Workflow
![image](https://github.com/user-attachments/assets/ba3b29bb-e875-4b64-a748-59459ebb6786)
## Image/Video Acquisition:
A camera captures images or video streams from the real-world environment.

## Vehicle Detection and Tracking:
The first YOLOv8 model detects vehicles and tracks them in real-time.

## License Plate Localization:
A second YOLOv8 model is applied to the vehicle regions to accurately detect the license plate within each frame.

## License Plate Cropping and OCR:
The detected license plate region is cropped and passed to the OCR engine (PP-OCRv3) to convert the image into readable text.

## Output and Management:
The recognized license plate number is either displayed on the screen or stored in a database for purposes such as vehicle management, tracking, or controlling automated systems.
# images lolcal
![image](https://github.com/user-attachments/assets/21bfa7c3-8cda-46bf-b967-087df91d4e56)
