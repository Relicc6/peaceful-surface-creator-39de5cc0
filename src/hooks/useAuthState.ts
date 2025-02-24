
import React, { useState, useEffect, useCallback, useRef } from "react";
import { User } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserProfile } from "@/services/auth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { getRoleBasedRedirect } = useAuthRedirect();
  const navigationRef = useRef<string | null>(null);
  const profileRequestInProgress = useRef(false);
  const lastProfileFetch = useRef<number>(0);
  const FETCH_COOLDOWN = 2000; // 2 seconds cooldown between profile fetches

  const isPublicRoute = useCallback((path: string) => {
    if (path.includes('/registration')) {
      return true;
    }
    
    const publicPaths = [
      '/login',
      '/employer-landing',
      '/educator-landing',
      '/participant-landing',
      '/'
    ];
    return publicPaths.includes(path) || publicPaths.some(prefix => path.startsWith(prefix + '?'));
  }, []);

  const isCorrectRoleRoute = useCallback((path: string, userRole: string) => {
    const rolePaths = {
      admin: '/admin',
      participant: '/participant',
      employer: '/employer',
      educator: '/educator'
    };

    return path.startsWith(rolePaths[userRole as keyof typeof rolePaths]);
  }, []);

  const handleSession = useCallback(async (session: any | null) => {
    try {
      if (!session?.user) {
        setUser(null);
        setIsLoading(false);
        if (!isPublicRoute(location.pathname) && navigationRef.current !== 'login') {
          navigationRef.current = 'login';
          navigate('/login', { replace: true });
        }
        return;
      }

      // Check if we should skip profile fetch due to cooldown
      const now = Date.now();
      if (now - lastProfileFetch.current < FETCH_COOLDOWN) {
        return;
      }

      // Prevent multiple simultaneous profile requests
      if (profileRequestInProgress.current) {
        return;
      }

      profileRequestInProgress.current = true;
      lastProfileFetch.current = now;

      const profile = await getUserProfile(session);
      profileRequestInProgress.current = false;
      
      if (!profile) {
        setUser(null);
        setIsLoading(false);
        if (!isPublicRoute(location.pathname) && navigationRef.current !== 'login') {
          navigationRef.current = 'login';
          navigate('/login', { replace: true });
        }
        return;
      }

      setUser(profile);
      
      // Only redirect if we haven't already redirected to this path
      const targetPath = getRoleBasedRedirect(profile.role);
      if (navigationRef.current !== targetPath && (
          location.pathname === '/login' || 
          location.pathname === '/' || 
          (!isPublicRoute(location.pathname) && !isCorrectRoleRoute(location.pathname, profile.role))
      )) {
        console.log('Redirecting to:', targetPath);
        navigationRef.current = targetPath;
        navigate(targetPath, { replace: true });
      }
    } catch (error) {
      console.error("Profile error:", error);
      profileRequestInProgress.current = false;
      toast({
        title: "Error",
        description: "Failed to load user profile",
        variant: "destructive",
      });
      setUser(null);
      if (!isPublicRoute(location.pathname) && navigationRef.current !== 'login') {
        navigationRef.current = 'login';
        navigate('/login', { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate, location.pathname, isPublicRoute, isCorrectRoleRoute, getRoleBasedRedirect, toast]);

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted && session) {
          await handleSession(session);
        } else {
          setIsLoading(false);
        }

        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;

          if (event === 'SIGNED_OUT') {
            setUser(null);
            setIsLoading(false);
            navigationRef.current = 'login';
            if (!isPublicRoute(location.pathname)) {
              navigate('/login', { replace: true });
            }
            return;
          }

          if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
            await handleSession(session);
          }
        }).data.subscription;

      } catch (error) {
        console.error("Error in setupAuth:", error);
        if (mounted) {
          toast({
            title: "Authentication Error",
            description: "There was a problem with the authentication service",
            variant: "destructive",
          });
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    setupAuth();

    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [handleSession]);

  return { user, setUser, isLoading, setIsLoading };
};

