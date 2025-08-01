
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import NewIndex from "./pages/NewIndex";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DoctorSignup from "./pages/DoctorSignup";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import EmergencyServices from "./pages/EmergencyServices";
import AdminPanel from "./pages/AdminPanel";
import MyHealthRecords from "./pages/MyHealthRecords";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Subscription from "./pages/Subscription";
import PaymentDashboard from "./pages/PaymentDashboard";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import HospitalDashboard from "./pages/HospitalDashboard";
import Community from "./pages/Community";
import Explore from "./pages/Explore";
import DoctorProfile from "./pages/DoctorProfile";
import StreamViewer from "./pages/StreamViewer";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NewIndex />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/doctor-signup" element={<DoctorSignup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route 
              path="/patient-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hospital-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['hospital']}>
                  <HospitalDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-panel" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route path="/emergency-services" element={<EmergencyServices />} />
            <Route path="/my-health-records" element={<MyHealthRecords />} />
            <Route path="/team" element={<Team />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/payment-dashboard" element={<PaymentDashboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/streams" element={<Explore />} />
            <Route path="/stream/:id" element={<StreamViewer />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
