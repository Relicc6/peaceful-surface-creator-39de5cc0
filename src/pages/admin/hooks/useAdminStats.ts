
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/auth";

export interface DashboardStats {
  educators: number;
  employers: number;
  participants: number;
  pendingApprovals: number;
  activeExperiences: number;
  matchedProjects: number;
}

export const useAdminStats = (user: User | null) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');

      const fetchCount = async (
        table: "profiles" | "educator_experiences" | "experience_matches",
        condition = {}
      ): Promise<number> => {
        try {
          const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true })
            .match(condition);
            
          if (error) {
            console.error(`Error fetching ${table} count:`, error);
            throw error;
          }
          
          return count || 0;
        } catch (error) {
          console.error(`Failed to fetch count for ${table}:`, error);
          throw error;
        }
      };

      try {
        const stats: DashboardStats = {
          educators: await fetchCount('profiles', { role: 'educator' }),
          employers: await fetchCount('profiles', { role: 'employer' }),
          participants: await fetchCount('profiles', { role: 'participant' }),
          pendingApprovals: await fetchCount('profiles', { status: 'pending' }),
          activeExperiences: await fetchCount('educator_experiences', { status: 'published' }),
          matchedProjects: await fetchCount('experience_matches', { status: 'matched' })
        };

        return stats;
      } catch (error) {
        console.error('Error in useAdminStats:', error);
        throw error;
      }
    },
    enabled: !!user?.id,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      onSettled: (_, error) => {
        if (error) {
          console.error('Error loading stats:', error);
          toast({
            title: "Error",
            description: "Failed to load dashboard statistics",
            variant: "destructive",
          });
        }
      }
    }
  });
};

