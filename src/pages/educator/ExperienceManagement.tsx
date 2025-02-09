
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Briefcase, InboxIcon, Users2, MessageSquare, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { EducatorExperience } from "@/types/educator";
import { LearnersTab } from "./components/learners/LearnersTab";
import { MatchesTab } from "./components/matches/MatchesTab";
import { RequestsTab } from "./components/requests/RequestsTab";
import { MembersTab } from "./components/members/MembersTab";
import { UpdatesTab } from "./components/updates/UpdatesTab";
import { SettingsTab } from "./components/settings/SettingsTab";

const ExperienceManagement = () => {
  const { experienceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: experience, isLoading } = useQuery({
    queryKey: ["experience", experienceId],
    queryFn: async () => {
      if (!experienceId) throw new Error("No experience ID provided");

      const { data, error } = await supabase
        .from("educator_experiences")
        .select("*")
        .eq("id", experienceId)
        .single();

      if (error) {
        console.error("Error fetching experience:", error);
        toast({
          title: "Error",
          description: "Failed to load experience details",
          variant: "destructive",
        });
        throw error;
      }

      const transformedData = {
        ...data,
        screening_questions: Array.isArray(data.screening_questions)
          ? data.screening_questions.map((q: any) => ({
              question: q.question || '',
              required: Boolean(q.required),
            }))
          : [],
        skill_level: (data.skill_level as 'beginner' | 'intermediate' | 'advanced') || 'beginner',
        status: (data.status as 'incomplete' | 'draft' | 'pending_approval' | 'published') || 'draft',
        subcategories: Array.isArray(data.subcategories) ? data.subcategories : [],
        skill_tags: Array.isArray(data.skill_tags) ? data.skill_tags : [],
        company_types: Array.isArray(data.company_types) ? data.company_types : [],
        required_certifications: Array.isArray(data.required_certifications) ? data.required_certifications : [],
        preferred_industries: Array.isArray(data.preferred_industries) ? data.preferred_industries : [],
      } as EducatorExperience;

      return transformedData;
    },
    enabled: !!experienceId,
  });

  if (isLoading) {
    return <div className="p-8">Loading experience details...</div>;
  }

  if (!experience) {
    return <div className="p-8">Experience not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/educator/experiences")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{experience.title}</h1>
            <p className="text-sm text-muted-foreground">
              Manage learners, matches, and progress
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="learners" className="space-y-6">
        <TabsList>
          <TabsTrigger value="learners" className="space-x-2">
            <Users className="h-4 w-4" />
            <span>Learners</span>
          </TabsTrigger>
          <TabsTrigger value="matches" className="space-x-2">
            <Briefcase className="h-4 w-4" />
            <span>Matches</span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="space-x-2">
            <InboxIcon className="h-4 w-4" />
            <span>Requests</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="space-x-2">
            <Users2 className="h-4 w-4" />
            <span>Members</span>
          </TabsTrigger>
          <TabsTrigger value="updates" className="space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Updates</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learners">
          <LearnersTab experienceId={experienceId || ''} />
        </TabsContent>
        <TabsContent value="matches">
          <MatchesTab />
        </TabsContent>
        <TabsContent value="requests">
          <RequestsTab />
        </TabsContent>
        <TabsContent value="members">
          <MembersTab />
        </TabsContent>
        <TabsContent value="updates">
          <UpdatesTab />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExperienceManagement;
