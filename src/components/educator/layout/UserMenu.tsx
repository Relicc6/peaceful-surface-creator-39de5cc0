
import { ChevronDown, User, LogOut, Settings, Calendar, MessageSquare, Activity, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserMenuProps {
  onLogout: () => void;
  isMobile?: boolean;
}

export const UserMenu = ({ onLogout, isMobile = false }: UserMenuProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 hover:bg-transparent text-foreground hover:text-foreground"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#1A1F2C] text-white">
              {getInitials(user?.name || "U")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm hidden md:inline-block">
            {user?.name}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg">
        <Link to="/participant/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            View Profile
          </DropdownMenuItem>
        </Link>
        {isMobile && (
          <>
            <Link to="/educator/notifications">
              <DropdownMenuItem className="cursor-pointer">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
            </Link>
            <Link to="/educator/calendar">
              <DropdownMenuItem className="cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </DropdownMenuItem>
            </Link>
            <Link to="/educator/messages">
              <DropdownMenuItem className="cursor-pointer">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </DropdownMenuItem>
            </Link>
            <Link to="/educator/tasks">
              <DropdownMenuItem className="cursor-pointer">
                <Activity className="mr-2 h-4 w-4" />
                Tasks & Activities
              </DropdownMenuItem>
            </Link>
          </>
        )}
        <Link to="/educator/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-500 cursor-pointer"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
