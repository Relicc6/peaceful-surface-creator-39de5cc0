
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import EducatorLanding from "./pages/EducatorLanding";
import EmployerLanding from "./pages/EmployerLanding";
import ParticipantLanding from "./pages/ParticipantLanding";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import EducatorRegistration from "./pages/educator/EducatorRegistration";

// Admin routes
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ExperienceOversight from "./pages/admin/ExperienceOversight";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminSupport from "./pages/admin/AdminSupport";

// Employer routes
import EmployerLayout from "./pages/employer/EmployerLayout";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import ProjectManagement from "./pages/employer/ProjectManagement";
import ApplicationsManagement from "./pages/employer/ApplicationsManagement";
import MessagesPage from "./pages/employer/MessagesPage";
import ResourceCenter from "./pages/employer/ResourceCenter";
import ProfileSettings from "./pages/employer/ProfileSettings";
import CreateProject from "./pages/employer/CreateProject";
import ProjectDetails from "./pages/employer/ProjectDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/educator-landing" element={<EducatorLanding />} />
          <Route path="/employer-landing" element={<EmployerLanding />} />
          <Route path="/participant-landing" element={<ParticipantLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="experiences" element={<ExperienceOversight />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="support" element={<AdminSupport />} />
          </Route>

          {/* Protected educator registration route */}
          <Route path="/educator/registration" element={<EducatorRegistration />} />
          
          {/* Protected employer routes */}
          <Route
            path="/employer"
            element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <EmployerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployerDashboard />} />
            <Route path="dashboard" element={<EmployerDashboard />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="applications" element={<ApplicationsManagement />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="resources" element={<ResourceCenter />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="create-project" element={<CreateProject />} />
            <Route path="projects/:projectId" element={<ProjectDetails />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

