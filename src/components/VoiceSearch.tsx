//src/components/VoiceSearch.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppContext } from "@/context/AppContext";
import { ArrowLeft, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { MdOutlineMusicNote } from "react-icons/md";
import { Sheet, SheetContent } from "./ui/sheet";

// Add interface for SpeechRecognition Web API
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
  start: () => void;
  stop: () => void;
}

interface VoiceSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceSearch = ({ isOpen, onClose }: VoiceSearchProps) => {
  const { setSearchQuery, isListening, setIsListening } = useAppContext();
  const [dots, setDots] = useState<string[]>([]);

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;

    if (isListening && "webkitSpeechRecognition" in window) {
      recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        onClose();
      };

      recognition.onerror = () => {
        setIsListening(false);
        onClose();
      };

      recognition.start();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening, setIsListening, setSearchQuery, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);

      // Animate the Google dots
      const colors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"];
      let currentIndex = 0;

      const interval = setInterval(() => {
        setDots((prev) => {
          if (prev.length >= 4) {
            currentIndex = (currentIndex + 1) % 4;
            return colors;
          }
          return [...prev, colors[prev.length]];
        });
      }, 200);

      return () => {
        clearInterval(interval);
        setDots([]);
      };
    }
  }, [isOpen, setIsListening]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="top"
        className="h-screen bg-[#202124] text-white border-none p-0"
      >
        <div className="h-full flex flex-col">
          {/* Top bar */}
          <div className="flex justify-between p-4">
            <button onClick={onClose} className="text-white">
              <ArrowLeft size={24} />
            </button>
            <Globe size={24} />
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col justify-between items-center px-4 py-16">
            <h2 className="text-2xl text-gray-400 font-light">Speak now</h2>

            <div className="flex gap-3">
              {dots.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <button className="bg-[#1c1d1f] border border-gray-500 text-gray-400 px-6 py-3 rounded-full text-md flex items-center gap-2">
              <MdOutlineMusicNote size={20} />
              <span>Search a song</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VoiceSearch;
