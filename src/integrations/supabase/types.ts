export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      educator_profiles: {
        Row: {
          id: string
          position_title: string | null
          region: string | null
          school_board: string | null
          school_name: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          id: string
          position_title?: string | null
          region?: string | null
          school_board?: string | null
          school_name?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          position_title?: string | null
          region?: string | null
          school_board?: string | null
          school_name?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "educator_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_profiles: {
        Row: {
          company_name: string | null
          contact_position: string | null
          id: string
          industry: string | null
          region: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          company_name?: string | null
          contact_position?: string | null
          id: string
          industry?: string | null
          region?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          company_name?: string | null
          contact_position?: string | null
          id?: string
          industry?: string | null
          region?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          end_date: string | null
          id: string
          organization: string | null
          participant_id: string | null
          start_date: string | null
          title: string | null
        }
        Insert: {
          end_date?: string | null
          id: string
          organization?: string | null
          participant_id?: string | null
          start_date?: string | null
          title?: string | null
        }
        Update: {
          end_date?: string | null
          id?: string
          organization?: string | null
          participant_id?: string | null
          start_date?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiences_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string | null
          id: string
          receiver_id: string | null
          sender_id: string | null
          timestamp: string | null
        }
        Insert: {
          content?: string | null
          id: string
          receiver_id?: string | null
          sender_id?: string | null
          timestamp?: string | null
        }
        Update: {
          content?: string | null
          id?: string
          receiver_id?: string | null
          sender_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          id: string
          message: string | null
          status: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id: string
          message?: string | null
          status?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          message?: string | null
          status?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_profiles: {
        Row: {
          age: number | null
          availability: string | null
          gender: string | null
          id: string
          region: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          age?: number | null
          availability?: string | null
          gender?: string | null
          id: string
          region?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          age?: number | null
          availability?: string | null
          gender?: string | null
          id?: string
          region?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_projects: {
        Row: {
          id: string
          participant_id: string | null
          project_id: string | null
        }
        Insert: {
          id: string
          participant_id?: string | null
          project_id?: string | null
        }
        Update: {
          id?: string
          participant_id?: string | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_projects_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          description: string | null
          employer_id: string | null
          id: string
          status: string | null
          title: string | null
        }
        Insert: {
          description?: string | null
          employer_id?: string | null
          id: string
          status?: string | null
          title?: string | null
        }
        Update: {
          description?: string | null
          employer_id?: string | null
          id?: string
          status?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          description: string | null
          id: string
          project_id: string | null
          status: string | null
          title: string | null
        }
        Insert: {
          description?: string | null
          id: string
          project_id?: string | null
          status?: string | null
          title?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          project_id?: string | null
          status?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email: string | null
          full_name: string | null
          id: string
          role: string | null
        }
        Insert: {
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
        }
        Update: {
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
