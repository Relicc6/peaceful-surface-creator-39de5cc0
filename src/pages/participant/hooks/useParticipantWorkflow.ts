
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ParticipantWorkflowStatus, ParticipantIntegrations } from "@/types/participant";
import { useToast } from "@/hooks/use-toast";

export const useParticipantWorkflow = (participantId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: workflowStatus, isLoading: isLoadingWorkflow } = useQuery({
    queryKey: ["participant-workflow", participantId],
    queryFn: async () => {
      const { data: workflowData, error } = await supabase
        .from("participant_workflow_status")
        .select("*")
        .eq("participant_id", participantId)
        .maybeSingle();

      if (error) throw error;
      if (!workflowData) throw new Error("No workflow status found");
      
      // Using double type assertion to safely convert the unknown data type
      return workflowData as unknown as ParticipantWorkflowStatus;
    },
  });

  const { data: integrations, isLoading: isLoadingIntegrations } = useQuery({
    queryKey: ["participant-integrations", participantId],
    queryFn: async () => {
      const { data: integrationsData, error } = await supabase
        .from("participant_integrations")
        .select("*")
        .eq("participant_id", participantId)
        .maybeSingle();

      if (error) throw error;
      if (!integrationsData) throw new Error("No integrations found");
      
      // Using double type assertion to safely convert the unknown data type
      return integrationsData as unknown as ParticipantIntegrations;
    },
  });

  const updateWorkflowStatus = useMutation({
    mutationFn: async (newStatus: Partial<ParticipantWorkflowStatus>) => {
      const updates = {
        ...newStatus,
        last_status_change: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as unknown as Partial<ParticipantWorkflowStatus>;

      const { error } = await supabase
        .from("participant_workflow_status")
        .update(updates)
        .eq("participant_id", participantId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant-workflow"] });
      toast({
        title: "Success",
        description: "Workflow status updated successfully",
      });
    },
    onError: (error) => {
      console.error("Error updating workflow status:", error);
      toast({
        title: "Error",
        description: "Failed to update workflow status",
        variant: "destructive",
      });
    },
  });

  const connectGoogleCalendar = useMutation({
    mutationFn: async (token: any) => {
      const updates = {
        google_calendar_connected: true,
        google_oauth_token: token,
        updated_at: new Date().toISOString(),
      } as unknown as Partial<ParticipantIntegrations>;

      const { error } = await supabase
        .from("participant_integrations")
        .update(updates)
        .eq("participant_id", participantId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant-integrations"] });
      toast({
        title: "Success",
        description: "Google Calendar connected successfully",
      });
    },
    onError: (error) => {
      console.error("Error connecting Google Calendar:", error);
      toast({
        title: "Error",
        description: "Failed to connect Google Calendar",
        variant: "destructive",
      });
    },
  });

  return {
    workflowStatus,
    integrations,
    isLoading: isLoadingWorkflow || isLoadingIntegrations,
    updateWorkflowStatus,
    connectGoogleCalendar,
  };
};
