//src/components/SearchBar.tsx

"use client";

import type React from "react";

import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Mic, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import VoiceSearch from "./VoiceSearch";

interface SearchBarProps {
  variant?: "home" | "results";
  initialValue?: string;
}

const SearchBar = ({ variant = "home", initialValue = "" }: SearchBarProps) => {
  const { searchQuery, setSearchQuery, isListening } = useAppContext();
  const [localQuery, setLocalQuery] = useState(initialValue);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Update local query when searchQuery changes (from voice input)
  useEffect(() => {
    if (searchQuery) {
      setLocalQuery(searchQuery);
    }
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchQuery(localQuery);
      toast({
        description: `Searching for: ${localQuery}`,
        duration: 2000
      });
    }
  };

  const handleMicClick = () => {
    setShowVoiceSearch(true);
  };

  const handleCameraClick = () => {
    navigate("/lens");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto px-4">
        <div className="search-bar-container relative">
          <div className="search-bar-rounded flex items-center bg-google-card text-white py-3 px-5 rounded-full w-full gap-3 h-16 hover:shadow-lg hover:bg-google-card-hover transition-all duration-200">
            <Search className="text-gray-400" size={20} aria-hidden="true" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search"
              className="bg-transparent outline-none flex-1 text-white placeholder-gray-400"
              aria-label="Search query"
            />
            <div className="flex items-center gap-4 pl-4">
              <button
                type="button"
                onClick={handleMicClick}
                className={cn(
                  "p-1 hover:bg-google-card-hover rounded-full transition-colors",
                  isListening && "bg-red-500"
                )}
                aria-label="Voice search"
                aria-pressed={isListening}
              >
                <Mic
                  className={cn(
                    "transition-colors",
                    isListening
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  )}
                  size={20}
                />
              </button>
              <button
                type="button"
                onClick={handleCameraClick}
                className="p-1 hover:bg-google-card-hover rounded-full transition-colors"
                aria-label="Camera search"
              >
                <TbCameraPlus
                  className="text-gray-400 hover:text-white transition-colors"
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </form>

      <VoiceSearch
        isOpen={showVoiceSearch}
        onClose={() => setShowVoiceSearch(false)}
      />
    </>
  );
};

export default SearchBar;
