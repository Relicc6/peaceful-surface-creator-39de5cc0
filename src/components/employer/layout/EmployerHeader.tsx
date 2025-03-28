
import { Bell, ChevronDown, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface EmployerHeaderProps {
  pageTitle: string;
}

export const EmployerHeader = ({ pageTitle }: EmployerHeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="h-16 border-b flex items-center px-6 bg-card justify-between">
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/f55205da-68be-4106-a1f8-a42fa33f103f.png" 
          alt="Skill Works Logo" 
          className="h-8"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative hidden md:inline-flex"
                onClick={() => navigate('/employer/messages')}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Messages</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative hidden md:inline-flex"
                onClick={() => navigate('/employer/notifications')}
              >
                <Bell className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 text-foreground hover:text-foreground focus:text-foreground"
              style={{ backgroundColor: 'transparent' }}
            >
              <Avatar className="h-8 w-8 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(user?.name || "")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm hidden md:inline-block font-medium">
                {user?.name}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-56 bg-white border shadow-lg" 
            align="end"
          >
            {/* Mobile-only navigation items */}
            <div className="md:hidden">
              <DropdownMenuItem 
                className="text-foreground hover:bg-gray-100 focus:bg-gray-100 focus:text-foreground cursor-pointer"
                onClick={() => navigate('/employer/messages')}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-foreground hover:bg-gray-100 focus:bg-gray-100 focus:text-foreground cursor-pointer"
                onClick={() => navigate('/employer/notifications')}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
            
            <DropdownMenuItem 
              className="text-foreground hover:bg-gray-100 focus:bg-gray-100 focus:text-foreground cursor-pointer"
              onClick={() => navigate('/employer/settings')}
            >
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-foreground hover:bg-gray-100 focus:bg-gray-100 focus:text-foreground cursor-pointer"
              onClick={() => navigate('/employer/settings')}
            >
              Company Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive hover:bg-gray-100 focus:bg-gray-100 focus:text-destructive cursor-pointer"
              onClick={logout}
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
