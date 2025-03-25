
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/types/auth";

export const signUpUser = async (email: string, password: string, role: UserRole) => {
  console.log("Signing up user with role:", role);
  try {
    const normalizedEmail = email.toLowerCase();
    
    // Create new account
    console.log("Creating new account");
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          role,
        },
      },
    });
    
    if (error) {
      console.error("Signup error:", error);
      throw error;
    }
    
    // Give some time for the trigger to create the user profile
    if (data.user?.id) {
      console.log("Account created, waiting for user creation");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verify user exists
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle();
        
      if (!user) {
        console.log("Creating user record manually");
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: normalizedEmail,
            role: role,
            full_name: normalizedEmail.split('@')[0], // Set a default name based on email
          });
          
        if (userError) {
          console.error("Error creating user:", userError);
          throw userError;
        }
      }
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error in signUpUser:", error);
    throw error;
  }
};
