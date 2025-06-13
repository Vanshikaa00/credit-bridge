import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import NoResults from "./pages/NoResults";
import {  UploadProvider } from "./context/UploadContext";

const queryClient = new QueryClient();

const handleBack=()=>{
  window.history.back()
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <UploadProvider>
 <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/results" element={<Results />} />
             <Route path="/no-results" element={<NoResults onBack={handleBack}/>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UploadProvider>
       
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
