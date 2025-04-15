//src/pages/LensResults.tsx

import BottomNav from "@/components/BottomNav";
import LensResultsView from "@/components/LensResultsView";
import { useEffect } from "react";

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
