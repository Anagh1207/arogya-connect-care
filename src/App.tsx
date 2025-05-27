
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import EmergencyServices from "./pages/EmergencyServices";
import AdminPanel from "./pages/AdminPanel";
import MyHealthRecords from "./pages/MyHealthRecords";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import Subscription from "./pages/Subscription";
import Chatbot from "./components/Chatbot";
import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={
            <div className="min-h-screen">
              <Header />
              <Login />
              <Footer />
            </div>
          } />
          <Route path="/signup" element={
            <div className="min-h-screen">
              <Header />
              <Signup />
              <Footer />
            </div>
          } />
          <Route path="/patient-dashboard" element={
            <div className="min-h-screen">
              <Header />
              <PatientDashboard />
              <Footer />
            </div>
          } />
          <Route path="/doctor-dashboard" element={
            <div className="min-h-screen">
              <Header />
              <DoctorDashboard />
              <Footer />
            </div>
          } />
          <Route path="/emergency-services" element={<EmergencyServices />} />
          <Route path="/admin-panel" element={
            <div className="min-h-screen">
              <Header />
              <AdminPanel />
              <Footer />
            </div>
          } />
          <Route path="/my-health-records" element={<MyHealthRecords />} />
          <Route path="/team" element={
            <div className="min-h-screen">
              <Header />
              <Team />
              <Footer />
            </div>
          } />
          <Route path="/subscription" element={
            <div className="min-h-screen">
              <Header />
              <Subscription />
              <Footer />
            </div>
          } />
          <Route path="*" element={
            <div className="min-h-screen">
              <Header />
              <NotFound />
              <Footer />
            </div>
          } />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
