import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";
import DebugAccount from "./pages/DebugAccount";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          {/* Public routes outside AuthProvider */}
          <Route path="/career-pathways" element={<CareerPathways />} />
          <Route path="/employer/registration" element={<EmployerRegistration />} />
          <Route path="/educator/registration" element={<EducatorRegistration />} />
          <Route path="/participant/registration" element={<ParticipantRegistration />} />
          <Route path="/debug/account" element={<DebugAccount />} />
          
          {/* Routes that need auth context */}
          <Route
            path="/*"
            element={
              <AuthProvider>
                <ScrollToTop />
                <Toaster />
                <Sonner />
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/index" element={<Navigate to="/" replace />} />
                  <Route path="/home" element={<Index />} />
                  <Route path="/educator-landing" element={<EducatorLanding />} />
                  <Route path="/employer-landing" element={<EmployerLanding />} />
                  <Route path="/participant-landing" element={<ParticipantLanding />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />

                  {/* Protected routes */}
                  <Route
                    path="/educator"
                    element={
                      <ProtectedRoute allowedRoles={["educator"]}>
                        <EducatorLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="/educator/dashboard" replace />} />
                    <Route path="dashboard" element={<EducatorDashboard />} />
                    <Route path="experiences" element={<ExperienceManagement />} />
                    <Route path="collaborations" element={<CollaborationManagement />} />
                    <Route path="portals" element={<PortalSearch />} />
                    <Route path="projects" element={<ProjectSearch />} />
                    <Route path="projects/:projectId" element={<EducatorProjectDetails />} />
                    <Route path="students" element={<StudentManagement />} />
                    <Route path="matches" element={<MatchRequests />} />
                    <Route path="tasks" element={<TasksActivities />} />
                    <Route path="messages" element={<EducatorMessages />} />
                    <Route path="calendar" element={<EducatorCalendar />} />
                    <Route path="settings" element={<EducatorSettings />} />
                    <Route path="create-experience" element={<CreateExperience />} />
                    <Route path="notifications" element={<NotificationsPage />} />
                  </Route>

                  <Route
                    path="/participant"
                    element={
                      <ProtectedRoute allowedRoles={["participant"]}>
                        <ParticipantLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="/participant/dashboard" replace />} />
                    <Route path="dashboard" element={<ParticipantDashboard />} />
                    <Route path="experiences" element={<ParticipantExperiences />} />
                    <Route path="create-experience" element={<CreateParticipantExperience />} />
                    <Route path="mentors" element={<MyMentors />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<ParticipantSettings />} />
                    <Route path="tasks" element={<TasksActivities />} />
                    <Route path="notifications" element={<NotificationsPage />} />
                  </Route>

                  <Route
                    path="/employer"
                    element={
                      <ProtectedRoute allowedRoles={["employer"]}>
                        <EmployerLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="/employer/dashboard" replace />} />
                    <Route path="dashboard" element={<EmployerDashboard />} />
                    <Route path="projects" element={<EmployerProjectManagement />} />
                    <Route path="applications" element={<ApplicationsManagement />} />
                    <Route path="messages" element={<MessagesPage />} />
                    <Route path="resources" element={<ResourceCenter />} />
                    <Route path="settings" element={<ProfileSettings />} />
                    <Route path="create-project" element={<CreateProject />} />
                    <Route path="projects/edit/:projectId" element={<CreateProject />} />
                    <Route path="projects/:projectId" element={<ProjectDetails />} />
                    <Route path="notifications" element={<NotificationsPage />} />
                  </Route>

                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="experiences" element={<ExperienceOversight />} />
                    <Route path="projects" element={<AdminProjectManagement />} />
                    <Route path="messages" element={<AdminMessages />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="notifications" element={<AdminNotifications />} />
                    <Route path="profile" element={<AdminProfile />} />
                  </Route>

                  {/* Catch all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            }
          />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
