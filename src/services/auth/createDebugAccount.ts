
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/types/auth";

export const createDebugAccount = async (
  email: string,
  password: string,
  role: UserRole,
  name: string = ""
) => {
  try {
    console.log(`Creating debug account with email: ${email}, role: ${role}`);
    
    // 1. Create auth account
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
        },
      },
    });
    
    if (error) {
      console.error("Debug account creation error:", error);
      throw error;
    }
    
    console.log("Auth account created:", data);
    
    // 2. Manually create profile if needed
    if (data.user?.id) {
      const { data: existingProfile } = await supabase
        .from('users')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle();
        
      if (!existingProfile) {
        console.log("Creating profile manually");
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: email,
            role: role,
            full_name: name || email.split('@')[0],
          });
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
          throw profileError;
        }
      }

      // Create role-specific profile
      if (role === 'employer') {
        const { error: employerProfileError } = await supabase
          .from('employer_profiles')
          .insert({
            id: data.user.id,
            user_id: data.user.id,
            company_name: `${name || email.split('@')[0]}'s Company`,
            industry: 'Technology',
            status: 'approved',
            region: 'North America',
          });
          
        if (employerProfileError) {
          console.error("Error creating employer profile:", employerProfileError);
        }
      } else if (role === 'educator') {
        const { error: educatorProfileError } = await supabase
          .from('educator_profiles')
          .insert({
            id: data.user.id,
            user_id: data.user.id,
            school_name: `${name || email.split('@')[0]}'s School`,
            position_title: 'Teacher',
            status: 'approved',
            region: 'North America',
          });
          
        if (educatorProfileError) {
          console.error("Error creating educator profile:", educatorProfileError);
        }
      } else if (role === 'participant') {
        const { error: participantProfileError } = await supabase
          .from('participant_profiles')
          .insert({
            id: data.user.id,
            user_id: data.user.id,
            status: 'active',
            region: 'North America',
          });
          
        if (participantProfileError) {
          console.error("Error creating participant profile:", participantProfileError);
        }
      }
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error in createDebugAccount:", error);
    throw error;
  }
};
