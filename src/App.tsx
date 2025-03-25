
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";
import DebugAccount from "./pages/DebugAccount";
import Login from "./pages/Login";

// Placeholder components for routes that haven't been implemented yet
const PlaceholderPage = ({ name }: { name: string }) => (
  <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">This page is under construction</h1>
      <p className="text-lg mb-6">The <span className="font-semibold">{name}</span> page is coming soon!</p>
    </div>
  </div>
);

// Placeholder components for missing pages
const CareerPathways = () => <PlaceholderPage name="Career Pathways" />;
const EmployerRegistration = () => <PlaceholderPage name="Employer Registration" />;
const EducatorRegistration = () => <PlaceholderPage name="Educator Registration" />;
const ParticipantRegistration = () => <PlaceholderPage name="Participant Registration" />;
const LandingPage = () => <PlaceholderPage name="Landing Page" />;
const Index = () => <PlaceholderPage name="Index" />;
const EducatorLanding = () => <PlaceholderPage name="Educator Landing" />;
const EmployerLanding = () => <PlaceholderPage name="Employer Landing" />;
const ParticipantLanding = () => <PlaceholderPage name="Participant Landing" />;
const Unauthorized = () => <PlaceholderPage name="Unauthorized" />;

// Educator pages
const EducatorLayout = () => <PlaceholderPage name="Educator Layout" />;
const EducatorDashboard = () => <PlaceholderPage name="Educator Dashboard" />;
const ExperienceManagement = () => <PlaceholderPage name="Experience Management" />;
const CollaborationManagement = () => <PlaceholderPage name="Collaboration Management" />;
const PortalSearch = () => <PlaceholderPage name="Portal Search" />;
const ProjectSearch = () => <PlaceholderPage name="Project Search" />;
const EducatorProjectDetails = () => <PlaceholderPage name="Educator Project Details" />;
const StudentManagement = () => <PlaceholderPage name="Student Management" />;
const MatchRequests = () => <PlaceholderPage name="Match Requests" />;
const TasksActivities = () => <PlaceholderPage name="Tasks & Activities" />;
const EducatorMessages = () => <PlaceholderPage name="Educator Messages" />;
const EducatorCalendar = () => <PlaceholderPage name="Educator Calendar" />;
const EducatorSettings = () => <PlaceholderPage name="Educator Settings" />;
const CreateExperience = () => <PlaceholderPage name="Create Experience" />;
const NotificationsPage = () => <PlaceholderPage name="Notifications" />;

// Participant pages
const ParticipantLayout = () => <PlaceholderPage name="Participant Layout" />;
const ParticipantDashboard = () => <PlaceholderPage name="Participant Dashboard" />;
const ParticipantExperiences = () => <PlaceholderPage name="Participant Experiences" />;
const CreateParticipantExperience = () => <PlaceholderPage name="Create Participant Experience" />;
const MyMentors = () => <PlaceholderPage name="My Mentors" />;
const Messages = () => <PlaceholderPage name="Messages" />;
const Profile = () => <PlaceholderPage name="Profile" />;
const ParticipantSettings = () => <PlaceholderPage name="Participant Settings" />;

// Employer pages
const EmployerLayout = () => <PlaceholderPage name="Employer Layout" />;
const EmployerDashboard = () => <PlaceholderPage name="Employer Dashboard" />;
const EmployerProjectManagement = () => <PlaceholderPage name="Employer Project Management" />;
const ApplicationsManagement = () => <PlaceholderPage name="Applications Management" />;
const MessagesPage = () => <PlaceholderPage name="Messages Page" />;
const ResourceCenter = () => <PlaceholderPage name="Resource Center" />;
const ProfileSettings = () => <PlaceholderPage name="Profile Settings" />;
const CreateProject = () => <PlaceholderPage name="Create Project" />;
const ProjectDetails = () => <PlaceholderPage name="Project Details" />;

// Admin pages
const AdminLayout = () => <PlaceholderPage name="Admin Layout" />;
const AdminDashboard = () => <PlaceholderPage name="Admin Dashboard" />;
const UserManagement = () => <PlaceholderPage name="User Management" />;
const ExperienceOversight = () => <PlaceholderPage name="Experience Oversight" />;
const AdminProjectManagement = () => <PlaceholderPage name="Admin Project Management" />;
const AdminMessages = () => <PlaceholderPage name="Admin Messages" />;
const Reports = () => <PlaceholderPage name="Reports" />;
const AdminSettings = () => <PlaceholderPage name="Admin Settings" />;
const AdminNotifications = () => <PlaceholderPage name="Admin Notifications" />;
const AdminProfile = () => <PlaceholderPage name="Admin Profile" />;
const NotFound = () => <PlaceholderPage name="Not Found" />;

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
