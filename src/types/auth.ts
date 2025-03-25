
export type UserRole = "participant" | "educator" | "employer" | "admin";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatar_url?: string | null;
  bio?: string | null;
  phone?: string | null;
  preferred_contact?: string | null;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}
