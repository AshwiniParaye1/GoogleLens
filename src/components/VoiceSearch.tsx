//src/components/VoiceSearch.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useAppContext } from "@/context/AppContext";
import { ArrowLeft, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { MdOutlineMusicNote } from "react-icons/md";
import { Sheet, SheetContent } from "./ui/sheet";

// Interface for Web Speech API
interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionResultItem;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[];
  resultIndex: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface VoiceSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceSearch = ({ isOpen, onClose }: VoiceSearchProps) => {
  const { setSearchQuery, isListening, setIsListening } = useAppContext();
  const [dots, setDots] = useState<string[]>([]);
  const [transcription, setTranscription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;

    if (isListening && isOpen) {
      if ("webkitSpeechRecognition" in window) {
        // Create speech recognition instance
        recognition = new (
          window as any
        ).webkitSpeechRecognition() as SpeechRecognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const resultIndex = event.resultIndex;
          const transcript = event.results[resultIndex][0].transcript;
          setTranscription(transcript); // Update transcription in real-time

          // Check if the result is final
          if (event.results[resultIndex].isFinal) {
            setSearchQuery(transcript);
            setIsListening(false);
            onClose();
          }
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error", event);
          setError(`Speech recognition error: ${event.error}`);
          setIsListening(false);
        };

        recognition.onend = () => {
          // Only set listening to false if we're not manually stopping
          if (isListening) {
            setIsListening(false);
          }
        };

        try {
          recognition.start();
        } catch (err) {
          console.error("Failed to start speech recognition:", err);
          setError("Failed to start speech recognition");
          setIsListening(false);
        }
      } else {
        setError("Speech recognition not supported in this browser");
        setIsListening(false);
      }
    }

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          console.error("Error stopping recognition:", e);
        }
      }
    };
  }, [isListening, isOpen, setIsListening, setSearchQuery, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setTranscription(""); // Reset transcription when opening
      setError(null);

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

  const handleClose = () => {
    setIsListening(false);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        side="top"
        className="h-screen bg-[#202124] text-white border-none p-0"
      >
        <div className="h-full flex flex-col">
          {/* Top bar */}
          <div className="flex justify-between p-4">
            <button
              onClick={handleClose}
              className="text-white"
              aria-label="Close voice search"
            >
              <ArrowLeft size={24} />
            </button>
            <Globe size={24} aria-hidden="true" />
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col justify-between items-center px-4 py-16">
            {error ? (
              <div className="text-red-500 text-center">
                <p>{error}</p>
                <button
                  onClick={handleClose}
                  className="mt-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl text-gray-400 font-light">
                  {transcription ? "Listening..." : "Speak now"}
                </h2>

                {/* Show transcription if available */}
                {transcription && (
                  <div className="mt-6 text-center max-w-md">
                    <p className="text-xl text-white">{transcription}</p>
                  </div>
                )}

                <div className="flex gap-3" aria-hidden="true">
                  {dots.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <button
                  className="bg-[#1c1d1f] border border-gray-500 text-gray-400 px-6 py-3 rounded-full text-md flex items-center gap-2"
                  aria-label="Search a song"
                >
                  <MdOutlineMusicNote size={20} />
                  <span>Search a song</span>
                </button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VoiceSearch;
