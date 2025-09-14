import cv2
import numpy as np

class Camera:
    def __init__(self, camera_id=0):
        self.camera_id = camera_id
        self.cap = None
        self.is_open = False

    def open_camera(self):
        self.cap = cv2.VideoCapture(self.camera_id)
        if self.cap.isOpened():
            self.is_open = True
            print(f"Camera {self.camera_id} opened successfully")
        else:
            print(f"Failed to open camera {self.camera_id}")

    def read_frame(self):
        if self.is_open:
            ret, frame = self.cap.read()
            if ret:
                return frame
            else:
                print("Failed to read frame")
                return None
        else:
            print("Camera is not open")
            return None

    def close_camera(self):
        if self.cap:
            self.cap.release()
            self.is_open = False
            print(f"Camera {self.camera_id} closed")

    def get_camera_info(self):
        if self.is_open:
            width = int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            fps = self.cap.get(cv2.CAP_PROP_FPS)
            return {
                'width': width,
                'height': height,
                'fps': fps
            }
        return None

class LaborSystem:
    def __init__(self):
        self.cameras = []
        self.active_cameras = []

    def add_camera(self, camera_id=0):
        camera = Camera(camera_id)
        self.cameras.append(camera)
        print(f"Camera {camera_id} added to the system")

    def open_all_cameras(self):
        for camera in self.cameras:
            camera.open_camera()
            if camera.is_open:
                self.active_cameras.append(camera)

    def close_all_cameras(self):
        for camera in self.active_cameras:
            camera.close_camera()
        self.active_cameras = []

    def capture_frames(self):
        frames = []
        for camera in self.active_cameras:
            frame = camera.read_frame()
            if frame is not None:
                frames.append(frame)
        return frames

    def display_cameras(self):
        while True:
            frames = self.capture_frames()
            if frames:
                # Display frames from active cameras
                for i, frame in enumerate(frames):
                    cv2.imshow(f'Camera {i}', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cv2.destroyAllWindows()

# Example usage
if __name__ == "__main__":
    labor_system = LaborSystem()

    # Add multiple cameras
    labor_system.add_camera(0)  # Default camera
    labor_system.add_camera(1)  # Second camera if available

    # Open all cameras
    labor_system.open_all_cameras()

    # Display camera feeds
    labor_system.display_cameras()

    # Close all cameras
    labor_system.close_all_cameras()
