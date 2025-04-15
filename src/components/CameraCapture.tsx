
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Upload, Camera, Crop } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const { setSelectedImage } = useAppContext();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    if (isCameraActive) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraActive]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageDataURL = canvas.toDataURL("image/png");
        setCapturedImage(imageDataURL);
        setIsCameraActive(false);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    setIsCropping(!isCropping);
    // Here we would implement actual cropping functionality
  };

  const handleSearch = () => {
    if (capturedImage) {
      setSelectedImage(capturedImage);
      navigate("/lens/results");
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="flex justify-between items-center p-4">
        <button onClick={() => navigate("/")} className="text-white">
          <X size={24} />
        </button>
        <div className="flex gap-4">
          <button onClick={triggerFileUpload} className="text-white">
            <Upload size={24} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          {capturedImage && (
            <button onClick={handleCrop} className="text-white">
              <Crop size={24} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-black/50 relative">
        {isCameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="max-h-full max-w-full"
          />
        ) : capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            className={`max-h-full max-w-full ${isCropping ? 'border-2 border-dashed border-white' : ''}`}
          />
        ) : (
          <div className="text-white text-center p-8">
            <p>Tap the camera button to take a photo or upload an image</p>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="p-4 flex justify-center">
        {!capturedImage ? (
          <button
            onClick={() => setIsCameraActive(true)}
            className="bg-google-blue text-white p-4 rounded-full"
          >
            <Camera size={28} />
          </button>
        ) : (
          <button
            onClick={handleSearch}
            className="bg-google-blue text-white py-2 px-8 rounded-full font-medium"
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
