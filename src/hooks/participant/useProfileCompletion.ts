
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/supabase";

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];
type ParticipantProfile = Tables['participant_profiles']['Row'];

type CombinedProfile = {
  full_name: string;
} & Omit<Profile, 'name'> & {
  skill_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  availability: string;
  date_of_birth: string | null;
  educational_background: string | null;
  preferred_learning_areas: string[];
};

export const useProfileCompletion = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["participant-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      try {
        // First, get the base profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast({
            title: "Error",
            description: "Failed to fetch profile data",
            variant: "destructive",
          });
          return null;
        }

        if (!profile) {
          return null;
        }

        // Then get participant profile
        const { data: details, error: detailsError } = await supabase
          .from('participant_profiles')
          .select()
          .eq('id', user.id)
          .maybeSingle();

        if (detailsError) {
          console.error("Error fetching participant profile:", detailsError);
          // Only show error if it's not a "does not exist" error
          if (detailsError.code !== 'PGRST116') {
            toast({
              title: "Error",
              description: "Failed to fetch participant profile",
              variant: "destructive",
            });
          }
        }

        // Create combined profile with defaults if details are missing
        const combinedProfile: CombinedProfile = {
          ...profile,
          full_name: profile.name,
          skill_level: 'beginner',
          availability: 'flexible',
          date_of_birth: null,
          educational_background: null,
          preferred_learning_areas: [],
          ...details
        };

        return combinedProfile;
      } catch (error) {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache is kept for 30 minutes
    refetchOnWindowFocus: false, // Prevent refetching when window regains focus
    refetchOnMount: false, // Prevent refetching on component mount if data exists
    refetchOnReconnect: false, // Prevent refetching when reconnecting
  });

  const calculateCompletionPercentage = (profile: CombinedProfile | null) => {
    if (!profile) return 0;

    const requiredFields = [
      'full_name',
      'email',
      'phone',
      'skill_level',
      'availability',
      'date_of_birth',
      'preferred_learning_areas',
      'educational_background'
    ];

    const completedFields = requiredFields.filter(field => {
      const value = profile[field as keyof CombinedProfile];
      return value !== null && value !== undefined && 
             (Array.isArray(value) ? value.length > 0 : value !== '');
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  return {
    profile: profileData,
    isLoading,
    completionPercentage: profileData ? calculateCompletionPercentage(profileData) : 0,
  };
};
