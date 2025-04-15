
import { useEffect } from "react";
import LensResultsView from "@/components/LensResultsView";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const LensResults = () => {
  useEffect(() => {
    document.title = "Google Lens Results";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-google-dark">
      <LensResultsView />
      <BottomNav />
    </div>
  );
};

export default LensResults;
