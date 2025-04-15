import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { Mic, Search } from "lucide-react";
import { useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import VoiceSearch from "./VoiceSearch";

interface SearchBarProps {
  variant?: "home" | "results";
  initialValue?: string;
}

const SearchBar = ({ variant = "home", initialValue = "" }: SearchBarProps) => {
  const { searchQuery, setSearchQuery } = useAppContext();
  const [localQuery, setLocalQuery] = useState(initialValue);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    toast({
      description: `Searching for: ${localQuery}`,
      duration: 2000
    });
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
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search"
              className="bg-transparent outline-none flex-1 text-white placeholder-gray-400"
            />
            <div className="flex items-center gap-4 pl-4">
              <button
                type="button"
                onClick={handleMicClick}
                className="p-1 hover:bg-google-card-hover rounded-full transition-colors"
              >
                <Mic
                  className="text-gray-400 hover:text-white transition-colors"
                  size={20}
                />
              </button>
              <button
                type="button"
                onClick={handleCameraClick}
                className="p-1 hover:bg-google-card-hover rounded-full transition-colors"
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
