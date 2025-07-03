import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import CoreUserRegistration from "./pages/CoreUserRegistration";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminBilling from "./pages/AdminBilling";
import AdminAuditLogs from "./pages/AdminAuditLogs";
import CoreDashboard from "./pages/CoreDashboard";
import CoreClients from "./pages/CoreClients";
import CoreReports from "./pages/CoreReports";
import CoreProfile from "./pages/CoreProfile";
import ClientDashboard from "./pages/ClientDashboard";
import ClientReport from "./pages/ClientReport";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Index />} />
          <Route path="/register" element={<CoreUserRegistration />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<AdminUserManagement />} />
          <Route path="/admin-billing" element={<AdminBilling />} />
          <Route path="/admin-logs" element={<AdminAuditLogs />} />
          <Route path="/core-dashboard" element={<CoreDashboard />} />
          <Route path="/core-clients" element={<CoreClients />} />
          <Route path="/core-reports" element={<CoreReports />} />
          <Route path="/core-profile" element={<CoreProfile />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/client-report/:id" element={<ClientReport />} />
          <Route path="/subscription" element={<Subscription />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;