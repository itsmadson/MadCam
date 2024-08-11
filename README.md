
# MadCam

MadCam is a web-based security camera application that streams video from a webcam connected to your laptop or desktop. The application is built using Flask for the backend and React for the frontend. It displays the video feed in real-time, along with the current date and time in the Persian calendar.


## Prerequisites

Before you start, ensure you have the following installed:

- [Python 3.x](https://www.python.org/downloads/)
- A webcam connected to your computer.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/MadCam.git
cd MadCam
```

### 2. Install Python Dependencies

```bash
pip install flask opencv-python flask-cors
```

### 3. Build the React Frontend

Navigate to the root of the project where `package.json` is located and run:

```bash
npm install
npm run build
```

This will create a production-ready build of the React frontend, placing the output in the `build/` directory inside the `public/` folder.

## Running the Application

### 1. Configure Your Webcam

In the `webcam.py` file, you'll find the following lines:

```python
camera_name = "Microsoft® LifeCam HD-3000"
camera_index_or_path = find_camera_by_name(camera_name)
```

If you're using a different webcam, you'll need to replace `"Microsoft® LifeCam HD-3000"` with the name of your webcam. To find the correct name, you can check your system’s device manager or webcam software.

### 2. Start the Flask Backend

In the root directory (where `webcam.py` is located), run:

```bash
python webcam.py
```

This will start the Flask server on `http://localhost:8080` by default, serving both the backend and the frontend.

### 3. Accessing the App Locally

Open your web browser and go to:

```
http://localhost:8080
```

### 4. Accessing the App Remotely

To access your webcam stream remotely:

1. **Port Forwarding**: Set up port forwarding on your router to forward external requests on port `8080` to your local machine’s IP address (`192.168.1.x:8080`).

2. **Public IP Access**: Access the app using your public IP address and the forwarded port. Example:
   ```
   http://<your-public-ip>:8080
   ```
## Troubleshooting

### Common Issues

- **Blank Screen**: Ensure the Flask server is running and the camera is configured correctly.
- **Camera Not Detected**: Verify that your webcam is connected and working correctly. Update the `camera_name` in `webcam.py` if necessary.
- **Port Forwarding Not Working**: Check your router’s settings and firewall rules.

### Logs

- **Flask Logs**: Check the terminal where `webcam.py` is running for any errors.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---
