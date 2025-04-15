import { createContext, ReactNode, useContext, useState } from "react";

type AppContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
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
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
