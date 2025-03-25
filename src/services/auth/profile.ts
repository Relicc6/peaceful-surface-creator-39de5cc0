
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/auth";
import { Session } from "@supabase/supabase-js";

export const getUserProfile = async (session: Session): Promise<User | null> => {
  if (!session?.user) {
    console.log("No session user found in getUserProfile");
    return null;
  }
  
  try {
    console.log("Fetching profile for ID:", session.user.id);
    
    const { data: userProfile, error: profileError } = await supabase
      .from('users')  // Changed from 'profiles' to 'users'
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      return null;
    }

    if (!userProfile) {
      console.log("No profile found for user");
      return null;
    }

    console.log("Profile data retrieved:", userProfile);
    
    // Map the user table fields to the User type
    const user: User = {
      id: userProfile.id,
      email: userProfile.email,
      role: userProfile.role,
      name: userProfile.full_name // Map full_name from users table to name in User type
    };
    
    return user;
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  try {
    // Map User type fields to users table fields if needed
    const userUpdates = {
      ...updates,
      full_name: updates.name // Map name from User type to full_name in users table
    };
    
    // Remove name property since we're using full_name
    delete userUpdates.name;

    const { error } = await supabase
      .from('users')  // Changed from 'profiles' to 'users'
      .update(userUpdates)
      .eq('id', userId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    throw error;
  }
};
