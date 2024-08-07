from flask import Flask, Response, send_from_directory
import cv2
import threading
import time

app = Flask(__name__, static_folder='build', static_url_path='')

camera = cv2.VideoCapture(2)  # Change the index if you have multiple cameras
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  # Adjust resolution as needed
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
camera.set(cv2.CAP_PROP_FPS, 15)  # Adjust FPS as needed

# Global variables for frame sharing
current_frame = None
frame_lock = threading.Lock()

def capture_frames():
    global current_frame
    while True:
        success, frame = camera.read()
        if not success:
            time.sleep(0.1)
            continue
        with frame_lock:
            current_frame = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 80])[1].tobytes()

def generate_frames():
    while True:
        with frame_lock:
            if current_frame is None:
                time.sleep(0.1)
                continue
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + current_frame + b'\r\n')
        time.sleep(1/15)  # Adjust to match your desired FPS

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    threading.Thread(target=capture_frames, daemon=True).start()
    app.run(host='0.0.0.0', port=8080, threaded=True)