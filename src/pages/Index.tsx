
import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";
import PortalSelection from "@/components/auth/PortalSelection";
import { UserRole } from "@/types/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/auth/AuthForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { getRoleBasedRedirect } = useAuthRedirect();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePortalSelect = (portalId: string, role: UserRole) => {
    const paths = {
      employer: "/employer-landing",
      educator: "/educator-landing",
      participant: "/participant-landing"
    };
    
    if (paths[portalId]) {
      navigate(paths[portalId]);
    }
  };

  const handleAuthSubmit = async (email: string, password: string) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const user = await login(email, password);
      if (user) {
        const redirectPath = getRoleBasedRedirect(user.role);
        navigate(redirectPath, { replace: true });
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Please check your email and password and try again."
        });
      }
    } catch (error) {
      console.error("Auth failed:", error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "An error occurred during login. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    console.log("Back button clicked on index page");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1c1f2e]">
      <header className="flex-none h-16 bg-transparent flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src="/lovable-uploads/823dbdae-ac03-4c0c-81c9-64e6b55e20c3.png"
              alt="Skill Works Logo"
              className="h-8"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/career-pathways" replace className="text-white hover:text-gray-200">
            Career Pathways
          </Link>
          <Link to="/login" className="inline-flex items-center gap-2 text-white hover:text-gray-200">
            <LogIn className="h-4 w-4" />
            Login
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 px-4 py-12">
          <div className="flex flex-col justify-center text-white space-y-6">
            <h1 className="text-6xl font-bold leading-tight">
              Real-World Experience. Real Opportunities. Real Impact.
            </h1>
            <p className="text-xl text-gray-300">
              Connect with top companies, gain hands-on experience, and build your career—all in one platform.
            </p>
            <PortalSelection onPortalSelect={handlePortalSelect} />
          </div>
          
          <div className="flex flex-col justify-center space-y-4">
            <AuthForm
              icon={User}
              title="Sign In"
              gradient="bg-white"
              isLoading={isSubmitting}
              onSubmit={handleAuthSubmit}
              onBack={handleBack}
            />
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login Page
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
