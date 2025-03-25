
import { useState, useEffect } from "react";
import AuthForm from "@/components/auth/AuthForm";
import Header from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { signInUser, createEmployerAccount } from "@/services/auth";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserRole } from "@/types/auth";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEmployerSetup, setShowEmployerSetup] = useState(false);
  const [employerEmail, setEmployerEmail] = useState("employer@example.com");
  const [employerPassword, setEmployerPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [setupError, setSetupError] = useState("");
  const [setupSuccess, setSetupSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect them to their appropriate dashboard
    if (user) {
      const dashboardPath = `/${user.role}/dashboard`;
      navigate(dashboardPath, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await signInUser(email, password);
      
      if (error) {
        throw error;
      }

      if (data?.user) {
        // Ensure the user has a valid role
        const validRoles: UserRole[] = ['admin', 'educator', 'employer', 'participant'];
        if (!validRoles.includes(data.user.role)) {
          throw new Error('Invalid user role');
        }

        toast({
          title: "Success",
          description: "You have successfully logged in.",
        });
        
        // Get the intended destination from location state or use role-based dashboard
        const state = location.state as { from?: Location };
        const destination = state?.from?.pathname || `/${data.user.role}/dashboard`;
        
        // Use replace: true to prevent back button from returning to login
        navigate(destination, { replace: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployerSetup = async () => {
    setSetupError("");
    
    if (employerPassword !== confirmPassword) {
      setSetupError("Passwords do not match");
      return;
    }
    
    if (employerPassword.length < 6) {
      setSetupError("Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await createEmployerAccount(employerEmail, employerPassword);
      
      if (result.error) {
        throw result.error;
      }
      
      if (result.message) {
        // This is just an informational message
        setSetupSuccess(true);
        toast({
          title: "Account Status",
          description: result.message,
        });
      } else {
        setSetupSuccess(true);
        toast({
          title: "Account Setup Complete",
          description: "You can now log in with your credentials",
        });
      }
    } catch (error) {
      console.error("Employer setup error:", error);
      if (error instanceof Error) {
        setSetupError(error.message);
      } else {
        setSetupError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // If we're already loading the auth state, don't show the form yet
  if (user) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-start justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-24">
        <div className="w-full max-w-md mx-auto space-y-6">
          {showEmployerSetup ? (
            <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-xl">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center">Set Up Employer Account</h2>
                <p className="text-sm text-center text-muted-foreground">
                  Create a password for the demo employer account
                </p>
                
                {setupError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{setupError}</AlertDescription>
                  </Alert>
                )}
                
                {setupSuccess && (
                  <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                      Account setup complete. You can now log in.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input 
                    type="email" 
                    value={employerEmail} 
                    onChange={(e) => setEmployerEmail(e.target.value)}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input 
                    type="password" 
                    value={employerPassword} 
                    onChange={(e) => setEmployerPassword(e.target.value)}
                    placeholder="Enter a password"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm Password</label>
                  <Input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={handleEmployerSetup}
                    disabled={isLoading || setupSuccess}
                    className="w-full"
                  >
                    {isLoading ? "Setting Up..." : "Set Up Account"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEmployerSetup(false)}
                    className="w-full"
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <>
              <AuthForm 
                onBack={() => navigate("/")}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                gradient="bg-gradient-to-br from-primary/5 to-secondary/5"
              />
              
              <div className="flex justify-center">
                <Button
                  variant="link"
                  onClick={() => setShowEmployerSetup(true)}
                  className="text-sm"
                >
                  Set up demo employer account
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
