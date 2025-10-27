import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(
    null
  );
  const detectionActiveRef = useRef(false);
  const gestureSequenceRef = useRef<number[]>([]);
  const lastGestureRef = useRef<number | null>(null);
  const gestureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [gestureSequence, setGestureSequence] = useState<number[]>([]);

  async function getStartCameraHandler() {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (!videoRef.current) return;

      videoRef.current.srcObject = userStream;
      setStream(userStream);
      await videoRef.current.play();
      await new Promise<void>((resolve) => {
        const checkReady = () => {
          if (videoRef.current?.readyState && videoRef.current?.readyState >= 2)
            resolve();
          else requestAnimationFrame(checkReady);
        };
        checkReady();
      });

      await initHandLandmarker();
    } catch (err) {
      toast.error("Error accessing webcam. Please check the permission.");
      console.error("Error accessing webcam:", err);
    }
  }

  const getStopCameraHandler = () => {
    if (!stream) return;

    stream.getTracks().forEach((track) => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setStream(null);
    detectionActiveRef.current = false;
    gestureSequenceRef.current = [];
    lastGestureRef.current = null;
    setCountdown(null);
    if (gestureTimeoutRef.current) clearTimeout(gestureTimeoutRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);
  };

  const getTakePictureHandler = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      setPhotoUrl(url);
      setPhotoBlob(blob);
      getStopCameraHandler();
      onChange?.(blob);
      setIsModalOpen(false);
    }, "image/png");
  };

  async function initHandLandmarker() {
    if (handLandmarker) {
      detectionActiveRef.current = true;
      startGestureDetection(handLandmarker);
      return;
    }

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    const landmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task",
      },
      runningMode: "VIDEO",
      numHands: 1,
    });

    setHandLandmarker(landmarker);
    detectionActiveRef.current = true;
    startGestureDetection(landmarker);
  }

  function startGestureDetection(landmarker: HandLandmarker) {
    if (!videoRef.current) return;

    const detect = async () => {
      if (!detectionActiveRef.current || !videoRef.current) return;

      const results: HandLandmarkerResult = await landmarker.detectForVideo(
        videoRef.current,
        Date.now()
      );

      if (results.landmarks?.length) {
        const count = countFingers(results.landmarks[0]);
        handleGesture(count);
      }

      requestAnimationFrame(detect);
    };

    detect();
  }

  function handleGesture(count: number) {
    const sequence = gestureSequenceRef.current;
    const lastGesture = lastGestureRef.current;

    if (gestureTimeoutRef.current) clearTimeout(gestureTimeoutRef.current);
    gestureTimeoutRef.current = setTimeout(() => {
      sequence.length = 0;
      lastGestureRef.current = null;
      setGestureSequence([]);
    }, 2500);

    if (count === lastGesture) return;

    const expectedNext = sequence.length + 1;
    if (count === expectedNext) {
      sequence.push(count);
      setGestureSequence((prev) => [...prev, count]);
      lastGestureRef.current = count;

      if (sequence.length === 3) startCountdown();
    }
  }

  function startCountdown() {
    setCountdown(3);
    detectionActiveRef.current = false;
    let timeLeft = 3;
    countdownIntervalRef.current = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft > 0) setCountdown(timeLeft);
      else {
        clearInterval(countdownIntervalRef.current!);
        setCountdown(null);
        getTakePictureHandler();
      }
    }, 1000);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function countFingers(landmarks: any[]) {
    const tips = [4, 8, 12, 16, 20];
    const pips = [3, 6, 10, 14, 18];
    let count = 0;

    for (let i = 1; i < tips.length; i++) {
      if (landmarks[tips[i]].y < landmarks[pips[i]].y) count++;
    }
    return count;
  }

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
      detectionActiveRef.current = false;
      if (gestureTimeoutRef.current) clearTimeout(gestureTimeoutRef.current);
      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current);
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
    countdown,
    gestureSequence,
    getStartCameraHandler,
    getStopCameraHandler,
    getTakePictureHandler,
  };
};

export default useProtectedPhotoProfileInputManager;
