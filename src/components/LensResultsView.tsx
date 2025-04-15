// src/components/LensResultsView.tsx

"use client";

import { useAppContext } from "@/context/AppContext";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Home,
  X
} from "lucide-react";
import { useState } from "react";
import { TbSquareNumber1 } from "react-icons/tb";
import { Link } from "react-router-dom";

const LensResultsView = () => {
  const { selectedImage } = useAppContext();
  const [activeTab, setActiveTab] = useState("all");
  const [showFeedback, setShowFeedback] = useState(true);

  if (!selectedImage) {
    return (
      <div className="p-8 text-center text-white">
        <p>No image selected. Please go back and select an image.</p>
        <Link to="/lens" className="text-red-500 underline mt-4 block">
          Go to Lens
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "all", label: "All" },
    { id: "products", label: "Products" },
    { id: "visual", label: "Visual matches" },
    { id: "about", label: "About this image" }
  ];

  const handleDismissFeedback = () => {
    setShowFeedback(false);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Top search bar */}
      <div className="flex items-center px-4 py-3 bg-[#202124] border-b border-gray-800">
        <div className="flex items-center flex-1 bg-[#303134] rounded-full px-3 py-2">
          <div className="flex items-center gap-2 flex-1 border-r border-gray-600 mr-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/google.png" alt="Google" className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-md overflow-hidden">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-400 text-sm">Add to search</span>
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white">
            A
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-3 px-[0.5px] mr-4 text-sm font-medium ${
              activeTab === tab.id
                ? "text-white border-b-2 border-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Limited results notice */}
      <div className="flex items-center gap-2 px-4 py-3 text-gray-400 text-sm">
        <AlertCircle size={16} />
        <span>Results for people are limited</span>
      </div>

      {/* Results grid */}
      <div className="flex-1 overflow-auto px-4 pb-16">
        <div className="grid grid-cols-2 gap-3">
          {/* Left column - Amazon result */}
          <div className="row-span-2">
            <div className="bg-[#202124] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Purple top"
                className="w-full h-64 object-cover"
              />
              <div className="p-2">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
                    <span className="text-white text-[8px]">a</span>
                  </div>
                  <span className="text-gray-400 text-xs">Amazon.com</span>
                </div>
                <h3 className="text-sm font-medium">
                  Amazon.com: GuliriFei Women's Two Piece...
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-google-blue text-xs">
                    See exact matches
                  </span>
                  <div className="w-5 h-5 ml-1 rounded-sm overflow-hidden">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ChevronRight size={14} className="text-google-blue" />
                </div>
              </div>
            </div>
          </div>

          {/* Right column - top result */}
          <div>
            <div className="bg-[#202124] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551163943-3f7aefc7a33f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Blue top"
                className="w-full h-40 object-cover"
              />
              <div className="p-2">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-white text-[8px]">M</span>
                  </div>
                  <span className="text-gray-400 text-xs">Myntra</span>
                </div>
                <h3 className="text-xs font-medium">
                  Buy Trendyol Striped Cotton Top - Tops for...
                </h3>
              </div>
            </div>
          </div>

          {/* Right column - bottom result */}
          <div>
            <div className="bg-[#202124] rounded-xl overflow-hidden">
              <div className="absolute top-1 left-1 bg-black/70 rounded-full px-2 py-0.5 flex items-center">
                <span className="text-white text-xs font-medium">₹659*</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1551048632-24e444b48a3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Purple top"
                className="w-full h-40 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-40"></div>
      </div>

      {/* Feedback bar */}
      {showFeedback && (
        <div className="fixed bottom-16 left-0 right-0 flex justify-center">
          <div className="bg-[#303134] rounded-full px-4 py-2 flex items-center gap-4">
            <span className="text-gray-400 text-sm">
              Are these results useful?
            </span>
            <button className="text-white text-sm">Yes</button>
            <button className="text-white text-sm">No</button>
            <button onClick={handleDismissFeedback}>
              <X size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-[#202124] border-t border-gray-800 px-6 py-3">
        <Link to="/" className="text-gray-400">
          <ArrowLeft size={20} />
        </Link>
        <button>
          <ArrowRight size={20} className="text-gray-400" />
        </button>
        <Link to="/" className="text-gray-400">
          <Home size={20} />
        </Link>
        <Link to="/" className="text-gray-400">
          <TbSquareNumber1 size={20} />
        </Link>
      </div>
    </div>
  );
};

export default LensResultsView;
