//src/App.tsx

"use client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initializeCapacitorPlugins } from "./capacitor-plugins";
import { AppProvider } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import LensResults from "./pages/LensResults";
import LensSearch from "./pages/LensSearch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Initialize Capacitor plugins when the app starts
  useEffect(() => {
    initializeCapacitorPlugins();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lens" element={<LensSearch />} />
              <Route path="/lens/results" element={<LensResults />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
