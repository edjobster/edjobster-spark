import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ResourcesTools from "./pages/ResourcesTools";
import DocumentsVault from "./pages/DocumentsVault";
import ToolsSettings from "./pages/ToolsSettings";
import CompanySetup from "./pages/CompanySetup";
import OfferLetterGenerator from "./pages/tools/OfferLetterGenerator";
import AppointmentLetterGenerator from "./pages/tools/AppointmentLetterGenerator";
import ConfirmationLetterGenerator from "./pages/tools/ConfirmationLetterGenerator";
import IncrementLetterGenerator from "./pages/tools/IncrementLetterGenerator";
import ExperienceLetterGenerator from "./pages/tools/ExperienceLetterGenerator";
import RelievingLetterGenerator from "./pages/tools/RelievingLetterGenerator";
import LeavePolicyGenerator from "./pages/tools/LeavePolicyGenerator";
import WFHPolicyGenerator from "./pages/tools/WFHPolicyGenerator";
import FreelancerContractGenerator from "./pages/tools/FreelancerContractGenerator";
import NDABuilder from "./pages/tools/NDABuilder";
import OnboardingPlanGenerator from "./pages/tools/OnboardingPlanGenerator";
import EVPBuilder from "./pages/tools/EVPBuilder";
import BrandingPostBuilder from "./pages/tools/BrandingPostBuilder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<ResourcesTools />} />
            <Route path="/vault" element={<DocumentsVault />} />
            <Route path="/settings" element={<ToolsSettings />} />
            <Route path="/company" element={<CompanySetup />} />
            <Route path="/tools/offer-letter" element={<OfferLetterGenerator />} />
            <Route path="/tools/appointment-letter" element={<AppointmentLetterGenerator />} />
            <Route path="/tools/confirmation-letter" element={<ConfirmationLetterGenerator />} />
            <Route path="/tools/increment-letter" element={<IncrementLetterGenerator />} />
            <Route path="/tools/experience-letter" element={<ExperienceLetterGenerator />} />
            <Route path="/tools/relieving-letter" element={<RelievingLetterGenerator />} />
            <Route path="/tools/leave-policy" element={<LeavePolicyGenerator />} />
            <Route path="/tools/wfh-policy" element={<WFHPolicyGenerator />} />
            <Route path="/tools/freelancer-contract" element={<FreelancerContractGenerator />} />
            <Route path="/tools/nda" element={<NDABuilder />} />
            <Route path="/tools/onboarding-plan" element={<OnboardingPlanGenerator />} />
            <Route path="/tools/evp-builder" element={<EVPBuilder />} />
            <Route path="/tools/branding-post" element={<BrandingPostBuilder />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
