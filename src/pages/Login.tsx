
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import AuthForm from "@/components/auth/AuthForm";
import { portals } from "@/components/auth/PortalSelection";
import { AuthError } from "@supabase/supabase-js";

const roleBasedRedirect = (role: UserRole): string => {
  switch (role) {
    case "admin":
      return "/admin";
    case "employer":
      return "/employer";
    case "educator":
      return "/educator";
    case "participant":
      return "/dashboard";
    default:
      return "/dashboard";
  }
};

const Login = () => {
  const [searchParams] = useSearchParams();
  const portalParam = searchParams.get("portal");
  const navigate = useNavigate();
  const auth = useAuth();
  const { login, signup, user } = auth || {};
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;

    // For admin users, always respect their portal choice if provided
    if (user.role === "admin") {
      if (portalParam) {
        // Admin accessing a specific portal - allow it
        navigate(roleBasedRedirect(portalParam as UserRole));
      } else {
        // No portal specified - go to admin dashboard
        navigate("/admin");
      }
      return;
    }

    // For non-admin users
    if (!portalParam) {
      navigate("/"); // Redirect to portal selection if no portal specified
      return;
    }

    // Ensure non-admin users can only access their assigned portal
    if (user.role !== portalParam) {
      navigate(roleBasedRedirect(user.role));
    } else {
      navigate(roleBasedRedirect(user.role));
    }
  }, [user, navigate, portalParam]);

  useEffect(() => {
    if (!portalParam) {
      navigate("/");
    }
  }, [portalParam, navigate]);

  const handleAuthSubmit = async (email: string, password: string, isSignUp: boolean) => {
    if (!portalParam || !login || !signup) return;

    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await signup(email, password, portalParam);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.error("Auth failed:", error);
      if (error instanceof AuthError) {
        throw new Error(error.message);
      }
      throw new Error("An error occurred during authentication");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!portalParam) {
    return null;
  }

  const currentPortal = portals.find(p => p.id === portalParam)!;

  return (
    <div className={`min-h-screen flex items-center justify-center ${currentPortal.gradient} px-4`}>
      <AuthForm
        icon={currentPortal.icon}
        title={currentPortal.title}
        gradient={currentPortal.gradient}
        isLoading={isSubmitting}
        onBack={() => navigate("/")}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
};

export default Login;
