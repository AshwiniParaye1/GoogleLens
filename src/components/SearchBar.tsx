import { useAppContext } from "@/context/AppContext";
import { Mic, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  variant?: "home" | "results";
  initialValue?: string;
}

// Add SpeechRecognition type definition
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

const SearchBar = ({ variant = "home", initialValue = "" }: SearchBarProps) => {
  const { searchQuery, setSearchQuery, isListening, setIsListening } =
    useAppContext();
  const [localQuery, setLocalQuery] = useState(initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialValue) {
      setLocalQuery(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;

    if (isListening && "webkitSpeechRecognition" in window) {
      // @ts-expect-error - SpeechRecognition API is not fully typed in TypeScript
      recognition = new window.webkitSpeechRecognition() as SpeechRecognition;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setLocalQuery(transcript);
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening, setIsListening, setSearchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    // Simulate search on enter
    console.log("Searching for:", localQuery);
  };

  const handleMicClick = () => {
    setIsListening(true);
  };

  const handleCameraClick = () => {
    navigate("/lens");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto px-4">
      <div className="search-bar-rounded flex items-center bg-[#303134] text-white py-3 px-5 rounded-full w-full gap-3 h-16">
        <Search className="text-white" size={20} />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search"
          className="bg-transparent outline-none flex-1 text-white"
        />
        {isListening && (
          <div className="w-3 h-3 rounded-full bg-google-red animate-pulse-light mr-1"></div>
        )}
        <button type="button" onClick={handleMicClick} className="p-1">
          <Mic
            className={`${isListening ? "text-google-red" : "text-white"}`}
            size={20}
          />
        </button>
        <button type="button" onClick={handleCameraClick} className="p-1">
          <TbCameraPlus className="text-white" size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
