
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { ExperienceCard } from '@/components/participant/experiences/ExperienceCard';
import { StatusFilter } from '@/components/participant/experiences/StatusFilter';
import { useParticipantExperiences } from '@/hooks/useParticipantExperiences';
import { calculateProgress } from '@/utils/experienceUtils';
import { useIsMobile } from '@/hooks/use-mobile';

const ParticipantExperiences = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const { data: experiences, isLoading } = useParticipantExperiences(statusFilter);
  const isMobile = useIsMobile();

  const filteredExperiences = React.useMemo(() => {
    if (!experiences) return [];
    switch (statusFilter) {
      case 'in_progress':
        return experiences.filter(exp => exp.status === 'in_progress');
      case 'completed':
        return experiences.filter(exp => exp.status === 'completed');
      case 'draft':
        return experiences.filter(exp => exp.status === 'draft');
      default:
        return experiences;
    }
  }, [experiences, statusFilter]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-[100vw] mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6">
          {/* Header Section */}
          <div className="space-y-4 sm:space-y-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <div className="flex-shrink-0 max-w-full">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">My Experiences</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Manage and track your learning experiences
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="w-full sm:w-[180px]">
                  <StatusFilter 
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  />
                </div>
                <Button 
                  onClick={() => navigate('/participant/create-experience')} 
                  className="w-full sm:w-auto bg-primary"
                  size={isMobile ? "sm" : "default"}
                >
                  <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="whitespace-nowrap text-sm sm:text-base">Create</span>
                </Button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="w-full overflow-x-auto no-scrollbar">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full inline-flex justify-start bg-gray-50 p-1 min-w-max">
                  <TabsTrigger 
                    value="all" 
                    className="flex-1 sm:flex-initial text-xs sm:text-sm py-1.5 px-2 sm:px-4"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="active" 
                    className="flex-1 sm:flex-initial text-xs sm:text-sm py-1.5 px-2 sm:px-4"
                  >
                    Active
                  </TabsTrigger>
                  <TabsTrigger 
                    value="completed" 
                    className="flex-1 sm:flex-initial text-xs sm:text-sm py-1.5 px-2 sm:px-4"
                  >
                    Completed
                  </TabsTrigger>
                  <TabsTrigger 
                    value="drafts" 
                    className="flex-1 sm:flex-initial text-xs sm:text-sm py-1.5 px-2 sm:px-4"
                  >
                    Drafts
                  </TabsTrigger>
                </TabsList>

                {/* Content Area */}
                <div className="mt-4 sm:mt-6">
                  {isLoading ? (
                    <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {[1, 2, 3].map((n) => (
                        <Card key={n} className="p-3 sm:p-4 h-[280px] animate-pulse">
                          <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
                          <div className="w-full h-24 bg-gray-100 rounded"></div>
                        </Card>
                      ))}
                    </div>
                  ) : !filteredExperiences.length ? (
                    <Card className="p-4 sm:p-6 text-center">
                      <h3 className="text-lg font-semibold mb-2">No experiences found</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {statusFilter === 'all' 
                          ? 'Start by creating your first experience' 
                          : 'Try adjusting your filters to find more experiences'}
                      </p>
                      <Button 
                        onClick={() => navigate('/participant/create-experience')} 
                        variant="outline"
                        size={isMobile ? "sm" : "default"}
                        className="w-full sm:w-auto"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Experience
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredExperiences.map((experience) => (
                        <ExperienceCard
                          key={experience.id}
                          experience={{
                            ...experience,
                            progress: calculateProgress(experience.milestones || [])
                          }}
                          onViewDetails={() => navigate(`/participant/experiences/${experience.id}`)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantExperiences;
