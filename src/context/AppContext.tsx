
import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedImage,
        setSelectedImage,
        isListening,
        setIsListening
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
