//src/pages/LensSearch.tsx

import CameraCapture from "@/components/CameraCapture";
import Header from "@/components/Header";
import { useEffect } from "react";

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
