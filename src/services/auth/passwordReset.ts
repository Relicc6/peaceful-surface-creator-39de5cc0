
import { supabase } from "@/integrations/supabase/client";

export const resetUserPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error in resetUserPassword:", error);
    throw error;
  }
};

export const forceResetPassword = async (userId: string, password: string) => {
  try {
    // This function is for admin use only - it directly sets a password for a user
    // You would typically use this only in a secure context
    console.log("Forcing password reset for user:", userId);
    
    const { error } = await supabase.auth.admin.updateUserById(
      userId,
      { password: password }
    );
    
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error in forceResetPassword:", error);
    throw error;
  }
};

export const createEmployerAccount = async (email: string, password: string) => {
  try {
    // First check if the user exists in the users table already
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single();

    if (existingUser) {
      // User exists in our users table, but may not have auth account
      // Try to sign up the user with the auth system
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'employer',
          },
        },
      });
      
      if (error) {
        // If error is about user already existing, try to sign in
        if (error.message.includes('already registered')) {
          return { message: "User already exists. Please try signing in instead." };
        }
        throw error;
      }
      
      return { data, error: null };
    } else {
      // This should not happen - the user should exist in the users table
      // But we'll handle it anyway
      return { error: new Error("User does not exist in the database") };
    }
  } catch (error) {
    console.error("Error in createEmployerAccount:", error);
    throw error;
  }
};
