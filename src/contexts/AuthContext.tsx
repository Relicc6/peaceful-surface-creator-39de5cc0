
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User, UserRole } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthError, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize authentication state
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await setUserFromSession(session);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (session) {
        await setUserFromSession(session);
      } else {
        setUser(null);
        if (event === 'SIGNED_OUT') {
          navigate('/');
        }
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const setUserFromSession = async (session: Session) => {
    if (!session?.user) return;
    
    // Get the user's profile from the profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profile) {
      const userData: User = {
        id: session.user.id,
        email: profile.email,
        role: profile.role as UserRole,
        name: profile.name || "User",
      };
      setUser(userData);
    }
  };

  const signup = async (email: string, password: string, portal: string) => {
    setIsLoading(true);
    try {
      // For demo accounts, try to sign in first
      if (email.endsWith('@example.com')) {
        try {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password: 'demo123'
          });
          if (!signInError) return;
        } catch (error) {
          // If sign in fails, continue with signup
          console.log("Demo account doesn't exist, creating...");
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password: email.endsWith('@example.com') ? 'demo123' : password,
        options: {
          data: {
            portal: portal,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Error",
        description: authError.message || "An error occurred during signup",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo accounts, try to create the account if it doesn't exist
      if (email.endsWith('@example.com')) {
        try {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password: 'demo123'
          });
          
          if (signInError) {
            // If login fails, try to create the account
            const { error: signUpError } = await supabase.auth.signUp({
              email,
              password: 'demo123',
              options: {
                data: {
                  portal: email.split('@')[0].replace('_', ''),
                },
              },
            });
            
            if (signUpError) throw signUpError;
            
            // Try logging in again after creating the account
            const { error: finalLoginError } = await supabase.auth.signInWithPassword({
              email,
              password: 'demo123'
            });
            
            if (finalLoginError) throw finalLoginError;
          }
        } catch (error) {
          throw error;
        }
      } else {
        // Regular login for non-demo accounts
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Error",
        description: authError.message || "An error occurred during login",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
