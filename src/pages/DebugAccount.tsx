
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserRole } from "@/types/auth";
import { createDebugAccount } from "@/services/auth/createDebugAccount";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const DebugAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("participant");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      await createDebugAccount(email, password, role, name);
      
      setSuccess(`Account created: ${email} (${role})`);
      toast({
        title: "Account Created",
        description: `Successfully created ${role} account with email: ${email}`,
      });
      
      // Reset form
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      console.error("Debug account creation error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Button 
        variant="outline" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      
      <Card>
        <CardHeader className="bg-primary text-white">
          <CardTitle>Debug Account Creation</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Create test accounts for debugging purposes
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Display Name"
              />
            </div>
            
            <div className="space-y-2">
              <Label>User Role</Label>
              <RadioGroup
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="participant" id="participant" />
                  <Label htmlFor="participant">Participant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="educator" id="educator" />
                  <Label htmlFor="educator">Educator</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employer" id="employer" />
                  <Label htmlFor="employer">Employer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Account"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-4 p-4 border rounded-md bg-yellow-50 text-yellow-800">
        <h3 className="font-medium">Debug Notes:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Creates both auth account and profile records</li>
          <li>Bypasses normal registration flow for testing</li>
          <li>Role-specific profiles are created automatically</li>
          <li>This page should be disabled in production</li>
        </ul>
      </div>
    </div>
  );
};

export default DebugAccount;
