/* eslint-disable react-refresh/only-export-components */
//src/context/AppContext.tsx

"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type AppContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isListening,
        setIsListening,
        selectedImage,
        setSelectedImage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
