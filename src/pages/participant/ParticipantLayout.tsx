
import { Link, Outlet } from "react-router-dom";
import { 
  LogOut, 
  User, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  Settings,
  Bell,
  Search,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ParticipantLayout = () => {
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Participant Portal</h2>
          <p className="text-sm text-gray-400">Welcome, {user?.name}</p>
        </div>
        
        <nav className="space-y-2">
          <Link to="/participant">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/participant/learning">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
              <BookOpen className="mr-2 h-4 w-4" />
              Learning
            </Button>
          </Link>
          <Link to="/participant/messages">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
          </Link>
          <Link to="/participant/calendar">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </Link>
          <Link to="/participant/settings">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-96">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {getInitials(user?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm hidden md:inline-block">
                    {user?.name}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Notifications</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500" onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParticipantLayout;
