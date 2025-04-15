
import { useEffect } from "react";
import CameraCapture from "@/components/CameraCapture";
import Header from "@/components/Header";

const LensSearch = () => {
  useEffect(() => {
    document.title = "Google Lens";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-google-dark">
      <Header variant="lens" />
      <CameraCapture />
    </div>
  );
};

export default LensSearch;
