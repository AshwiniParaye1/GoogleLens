//src/pages/LensResults.tsx

"use client";

import LensResultsView from "@/components/LensResultsView";
import { useEffect } from "react";

const LensResults = () => {
  useEffect(() => {
    document.title = "Google Lens Results";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <LensResultsView />
    </div>
  );
};

export default LensResults;
