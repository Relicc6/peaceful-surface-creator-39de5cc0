import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";
import { signInUser, signOutUser } from "@/services/auth";
import { User, UserRole } from "@/types/auth";
import { useNavigate } from "react-router-dom";

export const useAuthOperations = (setIsLoading: (loading: boolean) => void) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      console.log("Attempting login with email:", email);
      setIsLoading(true);
      
      if (!email || !password) {
        toast({
          title: "Login Failed",
          description: "Please enter both email and password",
          variant: "destructive",
        });
        return null;
      }

      const { data, error } = await signInUser(email, password);
      if (error) {
        console.error("Login error details:", error);
        
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Confirmed",
            description: "Please check your email for a confirmation link.",
            variant: "destructive",
          });
        } else if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please check your credentials.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login Error",
            description: error.message || "An error occurred during login",
            variant: "destructive",
          });
        }
        return null;
      }

      if (!data?.user) {
        toast({
          title: "Login Failed",
          description: "No user profile found. Please contact support.",
          variant: "destructive",
        });
        return null;
      }

      console.log("Login successful", data.user);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      return data.user;
    } catch (error) {
      console.error("Login error:", error);
      const authError = error as AuthError;
      toast({
        title: "Error",
        description: authError.message || "An error occurred during login",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("Starting logout process...");
      setIsLoading(true);
      
      const { error } = await signOutUser();
      
      if (error) {
        console.error("Logout error:", error);
        toast({
          title: "Error",
          description: "Failed to log out. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Force navigation to home page after successful logout
      navigate('/', { replace: true });
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during logout.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { login, logout };
};
