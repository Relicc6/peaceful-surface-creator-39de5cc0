
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle, CheckCircle, XCircle, Eye } from "lucide-react";
import { Application, ApplicationStatus } from "@/types/application";
import { TradeType, SkillLevel } from "@/types/project";
import { Card } from "@/components/ui/card";

interface ApplicationListProps {
  projectId: string;
  status: ApplicationStatus | "all";
}

export const ApplicationList = ({ projectId, status }: ApplicationListProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - replace with actual data fetching
  const applications: Application[] = [
    {
      id: "1",
      projectId: "1",
      applicantId: "a1",
      applicantName: "John Doe",
      tradeSkills: ["Electrical" as TradeType],
      skillLevel: "Intermediate" as SkillLevel,
      applicationDate: new Date("2024-02-20"),
      status: "new" as ApplicationStatus,
    },
    {
      id: "2",
      projectId: "1",
      applicantId: "a2",
      applicantName: "Jane Smith",
      tradeSkills: ["Electrical" as TradeType, "HVAC" as TradeType],
      skillLevel: "Advanced" as SkillLevel,
      applicationDate: new Date("2024-02-21"),
      status: "reviewed" as ApplicationStatus,
    },
  ].filter(
    (app) =>
      (projectId === "all" || app.projectId === projectId) &&
      (status === "all" || app.status === status)
  );

  const handleViewProfile = (applicantId: string) => {
    console.log("Navigating to profile:", `/employer/applications/${applicantId}`);
    navigate(`/employer/applications/${applicantId}`);
  };

  const handleMessage = (applicantId: string) => {
    console.log("Navigating to messages:", `/employer/messages`);
    navigate(`/employer/messages`, { 
      state: { applicantId: applicantId }
    });
  };

  const handleUpdateStatus = (applicationId: string, newStatus: ApplicationStatus) => {
    toast({
      title: "Application Updated",
      description: `Application status changed to ${newStatus}`,
    });
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "reviewed":
        return "bg-yellow-500";
      case "shortlisted":
        return "bg-purple-500";
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
    }
  };

  // Mobile card view
  const MobileApplicationCard = ({ application }: { application: Application }) => (
    <Card className="p-4 mb-4">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{application.applicantName}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {application.tradeSkills.join(", ")}
            </p>
          </div>
          <Badge
            variant="secondary"
            className={`${getStatusColor(application.status)} text-white`}
          >
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </Badge>
        </div>
        
        <div className="text-sm text-gray-600">
          Applied: {application.applicationDate.toLocaleDateString()}
        </div>
        
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewProfile(application.applicantId)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleMessage(application.applicantId)}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUpdateStatus(application.id, "accepted")}
            disabled={
              application.status === "accepted" ||
              application.status === "rejected"
            }
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUpdateStatus(application.id, "rejected")}
            disabled={
              application.status === "accepted" ||
              application.status === "rejected"
            }
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  // Show mobile cards on small screens
  if (typeof window !== 'undefined' && window.innerWidth < 640) {
    return (
      <div className="space-y-4">
        {applications.map((application) => (
          <MobileApplicationCard key={application.id} application={application} />
        ))}
        {applications.length === 0 && (
          <p className="text-center text-gray-500 py-4">No applications found</p>
        )}
      </div>
    );
  }

  // Desktop table view
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Trade Skills</TableHead>
            <TableHead>Application Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">
                {application.applicantName}
              </TableCell>
              <TableCell>{application.tradeSkills.join(", ")}</TableCell>
              <TableCell>
                {application.applicationDate.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(application.status)} text-white`}
                >
                  {application.status.charAt(0).toUpperCase() +
                    application.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewProfile(application.applicantId)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMessage(application.applicantId)}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdateStatus(application.id, "accepted")}
                    disabled={
                      application.status === "accepted" ||
                      application.status === "rejected"
                    }
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdateStatus(application.id, "rejected")}
                    disabled={
                      application.status === "accepted" ||
                      application.status === "rejected"
                    }
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
