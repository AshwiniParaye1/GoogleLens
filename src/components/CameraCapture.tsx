//src/components/CameraCapture.tsx

"use client";

import { useAppContext } from "@/context/AppContext";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { ArrowLeft, MoreHorizontal, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { BsTranslate } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineBackpack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CameraCapture = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const { setSearchQuery, setSelectedImage } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Set camera as active when component mounts
    setIsCameraActive(true);
  }, []);

  const takePhoto = async () => {
    try {
      // Use Capacitor Camera API to take a photo
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        promptLabelHeader: "Take a photo",
        promptLabelCancel: "Cancel",
        promptLabelPhoto: "Camera"
      });

      // If we got an image, set it and navigate to results
      if (image.dataUrl) {
        setSelectedImage(image.dataUrl);
        navigate("/lens/results");
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const openGallery = async () => {
    try {
      // Use Capacitor Camera API to select from gallery
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        promptLabelHeader: "Select a photo",
        promptLabelCancel: "Cancel",
        promptLabelPhoto: "Gallery"
      });

      // If we got an image, set it and navigate to results
      if (image.dataUrl) {
        setSelectedImage(image.dataUrl);
        navigate("/lens/results");
      }
    } catch (error) {
      console.error("Error selecting photo:", error);
    }
  };

  return (
    <div className="relative h-screen bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-transparent">
        <button
          onClick={() => navigate("/")}
          className="text-white hover:opacity-80"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl text-white font-normal">Google Lens</h1>
        <div className="flex gap-4">
          <button className="text-white hover:opacity-80">
            <RotateCcw size={22} />
          </button>
          <button className="text-white hover:opacity-80">
            <MoreHorizontal size={24} />
          </button>
        </div>
      </div>

      {/* Camera View - We don't need to show a video feed with Capacitor */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-white text-center">
          {isCameraActive && (
            <div className="text-lg">Tap the search button to take a photo</div>
          )}
        </div>

        {/* Camera Frame Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Main frame area */}
          <div className="w-full h-full flex items-center justify-center">
            {/* Curved brackets for the spacebar area */}
            <div className="absolute bottom-[30%] w-[70%] flex justify-between">
              {/* Left bracket */}
              <div className="w-[50px] h-[100px] border-l-2 border-b-2 border-white/40 rounded-bl-[40px]"></div>
              {/* Right bracket */}
              <div className="w-[50px] h-[100px] border-r-2 border-b-2 border-white/40 rounded-br-[40px]"></div>
            </div>

            {/* Curved brackets for the keyboard area */}
            <div className="absolute top-[30%] w-[40%] flex justify-between">
              {/* Left bracket */}
              <div className="w-[20px] h-[100px] border-l-2 border-t-2 border-white/40 rounded-tl-[30px]"></div>
              {/* Right bracket */}
              <div className="w-[20px] h-[100px] border-r-2 border-t-2 border-white/40 rounded-tr-[30px]"></div>
            </div>
          </div>
        </div>

        {/* Library Button */}
        <button
          onClick={openGallery}
          className="absolute left-6 bottom-32 w-16 h-16 rounded-lg bg-transparent flex items-center justify-center"
        >
          <div className="w-12 h-12 border-2 border-white rounded-md flex items-center justify-center overflow-hidden">
            <div className="w-10 h-10 bg-gray-800 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-600"></div>
                ))}
              </div>
            </div>
          </div>
        </button>

        {/* Center Search Button */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2">
          <button
            onClick={takePhoto}
            className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-white/80"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center">
              <IoSearchOutline size={28} className="text-gray-700" />
            </div>
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 px-4">
          <button className="flex items-center gap-2 text-white/90 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <BsTranslate size={18} />
            <span className="text-sm font-normal">Translate</span>
          </button>
          <button className="flex items-center gap-2 text-white/90 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <IoSearchOutline size={18} />
            <span className="text-sm font-normal">Search</span>
          </button>
          <button className="flex items-center gap-2 text-white/90 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <MdOutlineBackpack size={18} />
            <span className="text-sm font-normal">Homework</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
