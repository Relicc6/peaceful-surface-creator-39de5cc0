
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "@/types/auth";

export const getUserProfile = async (session: any): Promise<User | null> => {
  if (!session?.user?.id) return null;
  
  try {
    // Get profile from profiles table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
    
    if (!profile) {
      console.warn("No profile found for user:", session.user.id);
      return null;
    }
    
    // Return combined user data
    return {
      id: session.user.id,
      email: profile.email,
      name: profile.name,
      role: profile.role as UserRole,
      avatar_url: profile.avatar_url,
      bio: profile.bio,
      phone: profile.phone,
      preferred_contact: profile.preferred_contact,
    };
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    return null;
  }
};
