/* eslint-disable react-refresh/only-export-components */
//src/context/AppContext.tsx

"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

interface AppContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  searchQuery: "",
  setSearchQuery: () => {},
  isListening: false,
  setIsListening: () => {},
  selectedImage: null,
  setSelectedImage: () => {}
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const value = {
    searchQuery,
    setSearchQuery,
    isListening,
    setIsListening,
    selectedImage,
    setSelectedImage
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};

export default AppContext;
