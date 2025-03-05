
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Project {
  id: string;
  title: string;
  status: "active" | "draft" | "completed";
  trade_type: string;
  description: string;
  start_date?: string;
  end_date?: string;
  location_type?: string;
  site_address?: string;
  positions?: number;
  skill_level?: string;
  applications_count?: number;
}

export function useProjects(status: "active" | "draft" | "completed") {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        // Get the current user's ID
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }
        
        if (!userData.user) {
          throw new Error("No authenticated user found");
        }
        
        // Get the employer ID for the current user
        const { data: employerData, error: employerError } = await supabase
          .from('employers')
          .select('id')
          .eq('user_id', userData.user.id)
          .single();
        
        if (employerError) {
          throw employerError;
        }
        
        // Fetch projects based on employer ID and status
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select(`
            id,
            title,
            status,
            trade_type,
            description,
            start_date,
            end_date,
            location_type,
            site_address,
            positions,
            skill_level
          `)
          .eq('employer_id', employerData.id);
        
        if (projectsError) {
          throw projectsError;
        }

        // Get the application counts for each project
        const projectIds = projectsData.map(project => project.id);
        
        // If there are no projects, just return an empty array
        if (projectIds.length === 0) {
          setProjects([]);
          return;
        }
        
        // Fix: Get application counts with proper GROUP BY
        const { data: applicationCountsData, error: applicationCountsError } = await supabase
          .from('applications')
          .select('project_id, count(*)', { count: 'exact' })
          .in('project_id', projectIds)
          .or('status.eq.pending,status.eq.approved')
          .groupBy('project_id');
        
        if (applicationCountsError) {
          console.error('Error fetching application counts:', applicationCountsError);
        }
        
        // Create a map of project_id to application count
        const applicationCountsMap: Record<string, number> = {};
        
        if (applicationCountsData) {
          applicationCountsData.forEach((row: any) => {
            if (row.project_id) {
              applicationCountsMap[row.project_id] = parseInt(row.count) || 0;
            }
          });
        }
        
        // Filter projects based on status and map database status to our expected status type
        const filteredProjects = projectsData
          .filter(project => {
            if (status === 'draft') {
              return project.status === 'draft';
            } else if (status === 'active') {
              return project.status === 'pending' || project.status === 'approved';
            } else if (status === 'completed') {
              return project.status === 'completed';
            }
            return false;
          })
          .map(project => {
            // Map database status to our Project interface status
            let mappedStatus: "active" | "draft" | "completed";
            if (project.status === 'draft') {
              mappedStatus = 'draft';
            } else if (project.status === 'pending' || project.status === 'approved') {
              mappedStatus = 'active';
            } else if (project.status === 'completed') {
              mappedStatus = 'completed';
            } else {
              // Fallback for any other statuses
              mappedStatus = 'draft';
            }
            
            return {
              ...project,
              status: mappedStatus,
              applications_count: applicationCountsMap[project.id] || 0
            } as Project;
          });
        
        setProjects(filteredProjects);
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        toast.error("Failed to load projects. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [status]);

  return { projects, isLoading, error };
}
