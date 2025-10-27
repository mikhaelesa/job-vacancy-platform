import { useEffect, useRef, useState } from "react";

interface IUseProtectedPhotoProfileInputManagerProps {
  onChange?: (blob: Blob) => void;
}

const useProtectedPhotoProfileInputManager = ({
  onChange,
}: IUseProtectedPhotoProfileInputManagerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);

  // 🔹 Start camera
  async function getStartCameraHandler() {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
        setStream(userStream);
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  }

  // 🔹 Stop camera
  const getStopCameraHandler = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
    }
  };

  const getTakePictureHandler = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setPhotoUrl(url);
          setPhotoBlob(blob);
          getStopCameraHandler();
          onChange?.(blob);
          setIsModalOpen(false);
        }
      }, "image/png");
    }
  };

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  return {
    videoRef,
    canvasRef,
    isModalOpen,
    setIsModalOpen,
    stream,
    setStream,
    photoUrl,
    setPhotoUrl,
    photoBlob,
    setPhotoBlob,
    getStartCameraHandler,
    getStopCameraHandler,
    getTakePictureHandler,
  };
};

export default useProtectedPhotoProfileInputManager;
