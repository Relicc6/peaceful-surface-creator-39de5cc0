
import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationType } from "@/types/educator";
import NotificationTypesSidebar from "@/components/participant/notifications/NotificationTypesSidebar";
import { NotificationList } from "@/components/educator/notifications/NotificationList";
import NotificationFilters from "@/components/participant/notifications/NotificationFilters";
import { filterNotificationsByTime } from "@/components/educator/notifications/utils/notificationUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NotificationsPage = () => {
  const [selectedType, setSelectedType] = useState<NotificationType | 'all'>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const { notifications, isLoading, markAsRead } = useNotifications(
    selectedType !== 'all' ? { type: selectedType } : undefined
  );

  const handleMarkAsRead = async (notificationIds: string[]) => {
    await markAsRead.mutateAsync(notificationIds);
  };

  const filteredNotifications = filterNotificationsByTime(notifications, timeFilter);

  const SidebarContent = () => (
    <NotificationTypesSidebar
      selectedType={selectedType}
      onTypeSelect={(type) => {
        setSelectedType(type);
        if (isMobile) {
          setIsSidebarOpen(false);
        }
      }}
    />
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
        <div className="w-full md:w-auto">
          <NotificationFilters
            selectedType={selectedType}
            timeFilter={timeFilter}
            onTypeChange={(value) => setSelectedType(value as NotificationType | 'all')}
            onTimeFilterChange={(value) => setTimeFilter(value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          {isMobile ? (
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="mb-4 w-full md:w-auto">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <div className="pt-2">
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <SidebarContent />
          )}
        </div>

        <div className="md:col-span-8">
          <NotificationList
            notifications={filteredNotifications}
            isLoading={isLoading}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
