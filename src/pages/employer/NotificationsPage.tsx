import { useCallback, useState } from "react";
import { Bell, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationsSettings } from "../admin/components/settings/NotificationsSettings";

const priorityColors = {
  critical: "bg-red-500",
  important: "bg-yellow-500",
  general: "bg-blue-500",
};

const categoryIcons = {
  project_request: AlertCircle,
  project_match: CheckCircle2,
  submission_update: Clock,
  review_reminder: Clock,
  message_alert: Bell,
  milestone_alert: Bell,
  system: Bell,
};

export default function NotificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedPriority, setSelectedPriority] = useState<string | undefined>();
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("notifications");

  const { notifications, isLoading, markAsRead } = useNotifications({
    category: selectedCategory,
    priority: selectedPriority,
    is_read: showUnreadOnly ? false : undefined,
  });

  const handleMarkAsRead = useCallback((notificationId: string) => {
    markAsRead.mutate([notificationId]);
  }, [markAsRead]);

  const handleMarkAllAsRead = useCallback(() => {
    if (!notifications) return;
    const unreadIds = notifications
      .filter(n => !n.is_read)
      .map(n => n.id);
    if (unreadIds.length > 0) {
      markAsRead.mutate(unreadIds);
    }
  }, [notifications, markAsRead]);

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-6 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5" />
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-full h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          >
            {showUnreadOnly ? 'Show All' : 'Show Unread Only'}
          </Button>
          <Button onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="notifications" className="mt-6">
          <div className="space-y-4">
            {notifications?.length === 0 ? (
              <Card className="p-6 text-center text-muted-foreground">
                No notifications yet
              </Card>
            ) : (
              notifications?.map((notification) => {
                const Icon = categoryIcons[notification.category];
                return (
                  <Card
                    key={notification.id}
                    className={`p-4 hover:bg-accent/50 transition-colors ${
                      !notification.is_read ? 'border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.content}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">
                            {notification.category.replace('_', ' ')}
                          </Badge>
                          <Badge 
                            className={priorityColors[notification.priority]}
                          >
                            {notification.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(notification.created_at), 'PPp')}
                          </span>
                        </div>
                      </div>
                      {!notification.is_read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <NotificationsSettings
            settings={[]}
            isLoading={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
