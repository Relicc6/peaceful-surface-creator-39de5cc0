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
      admin_audit_logs: {
        Row: {
          action_type: string
          admin_id: string
          changes: Json | null
          created_at: string
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string
        }
        Insert: {
          action_type: string
          admin_id: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type: string
        }
        Update: {
          action_type?: string
          admin_id?: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string
        }
        Relationships: []
      }
      admin_experience_reviews: {
        Row: {
          admin_id: string
          created_at: string
          experience_id: string
          feedback: string | null
          id: string
          status: Database["public"]["Enums"]["experience_approval_status"]
        }
        Insert: {
          admin_id: string
          created_at?: string
          experience_id: string
          feedback?: string | null
          id?: string
          status: Database["public"]["Enums"]["experience_approval_status"]
        }
        Update: {
          admin_id?: string
          created_at?: string
          experience_id?: string
          feedback?: string | null
          id?: string
          status?: Database["public"]["Enums"]["experience_approval_status"]
        }
        Relationships: [
          {
            foreignKeyName: "admin_experience_reviews_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_experience_reviews_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "admin_experience_reviews_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_permissions: {
        Row: {
          can_create: boolean | null
          can_delete: boolean | null
          can_read: boolean | null
          can_update: boolean | null
          created_at: string
          id: string
          permission_type: string
          resource_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_read?: boolean | null
          can_update?: boolean | null
          created_at?: string
          id?: string
          permission_type: string
          resource_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_read?: boolean | null
          can_update?: boolean | null
          created_at?: string
          id?: string
          permission_type?: string
          resource_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      admin_role_permissions: {
        Row: {
          admin_id: string
          created_at: string
          id: string
          permission_level: Database["public"]["Enums"]["admin_permission_level"]
          resource_type: Database["public"]["Enums"]["admin_resource_type"]
          updated_at: string
        }
        Insert: {
          admin_id: string
          created_at?: string
          id?: string
          permission_level: Database["public"]["Enums"]["admin_permission_level"]
          resource_type: Database["public"]["Enums"]["admin_resource_type"]
          updated_at?: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          id?: string
          permission_level?: Database["public"]["Enums"]["admin_permission_level"]
          resource_type?: Database["public"]["Enums"]["admin_resource_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_role_permissions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          applicant_id: string
          cover_letter: string | null
          created_at: string
          id: string
          project_id: string
          status: string
          updated_at: string
        }
        Insert: {
          applicant_id: string
          cover_letter?: string | null
          created_at?: string
          id?: string
          project_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          applicant_id?: string
          cover_letter?: string | null
          created_at?: string
          id?: string
          project_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          admin_id: string | null
          created_at: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_id?: string | null
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_id?: string | null
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      collaboration_messages: {
        Row: {
          collaboration_id: string
          content: string
          created_at: string
          id: string
          read_at: string | null
          sender_id: string
        }
        Insert: {
          collaboration_id: string
          content: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id: string
        }
        Update: {
          collaboration_id?: string
          content?: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collaboration_messages_collaboration_id_fkey"
            columns: ["collaboration_id"]
            isOneToOne: false
            referencedRelation: "educator_employer_collaborations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collaboration_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      educator_employer_collaborations: {
        Row: {
          created_at: string
          educator_id: string
          employer_id: string
          id: string
          message: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          educator_id: string
          employer_id: string
          id?: string
          message?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          educator_id?: string
          employer_id?: string
          id?: string
          message?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "educator_employer_collaborations_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educator_employer_collaborations_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      educator_events: {
        Row: {
          created_at: string
          description: string
          educator_id: string
          event_date: string
          id: string
          location: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          educator_id: string
          event_date: string
          id?: string
          location?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          educator_id?: string
          event_date?: string
          id?: string
          location?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "educator_events_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      educator_experiences: {
        Row: {
          admin_feedback: string | null
          admin_notes: string | null
          approval_status:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
          class_size: number | null
          company_preferences: Json | null
          company_types: string[] | null
          compensation_type: string | null
          created_at: string
          description: string
          duration_weeks: number
          educator_id: string
          employer_approved: boolean | null
          employer_id: string | null
          end_date: string | null
          example_projects: Json[] | null
          expected_outcomes: string[] | null
          id: string
          is_published: boolean
          is_template: boolean | null
          last_saved_at: string | null
          learner_count: number | null
          learner_requirements: string[] | null
          marketplace_visibility: string
          meta_objectives: string[] | null
          meta_outcomes: string[] | null
          meta_prerequisites: string[] | null
          milestones: string[] | null
          preferred_company_size: string | null
          preferred_industries: string[] | null
          published_at: string | null
          required_certifications: string[] | null
          reviewed_at: string | null
          reviewed_by: string | null
          screening_questions: Json[] | null
          skill_level: string
          skill_tags: string[] | null
          start_date: string
          status: Database["public"]["Enums"]["experience_status"] | null
          subcategories: string[] | null
          team_size: number | null
          template_id: string | null
          timeline_end_date: string | null
          timeline_start_date: string | null
          title: string
          trade_category: string
          unique_code: string | null
          updated_at: string
          visibility: string
          workflow_status: string
        }
        Insert: {
          admin_feedback?: string | null
          admin_notes?: string | null
          approval_status?:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
          class_size?: number | null
          company_preferences?: Json | null
          company_types?: string[] | null
          compensation_type?: string | null
          created_at?: string
          description: string
          duration_weeks?: number
          educator_id: string
          employer_approved?: boolean | null
          employer_id?: string | null
          end_date?: string | null
          example_projects?: Json[] | null
          expected_outcomes?: string[] | null
          id?: string
          is_published?: boolean
          is_template?: boolean | null
          last_saved_at?: string | null
          learner_count?: number | null
          learner_requirements?: string[] | null
          marketplace_visibility?: string
          meta_objectives?: string[] | null
          meta_outcomes?: string[] | null
          meta_prerequisites?: string[] | null
          milestones?: string[] | null
          preferred_company_size?: string | null
          preferred_industries?: string[] | null
          published_at?: string | null
          required_certifications?: string[] | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          screening_questions?: Json[] | null
          skill_level?: string
          skill_tags?: string[] | null
          start_date: string
          status?: Database["public"]["Enums"]["experience_status"] | null
          subcategories?: string[] | null
          team_size?: number | null
          template_id?: string | null
          timeline_end_date?: string | null
          timeline_start_date?: string | null
          title: string
          trade_category?: string
          unique_code?: string | null
          updated_at?: string
          visibility?: string
          workflow_status?: string
        }
        Update: {
          admin_feedback?: string | null
          admin_notes?: string | null
          approval_status?:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
          class_size?: number | null
          company_preferences?: Json | null
          company_types?: string[] | null
          compensation_type?: string | null
          created_at?: string
          description?: string
          duration_weeks?: number
          educator_id?: string
          employer_approved?: boolean | null
          employer_id?: string | null
          end_date?: string | null
          example_projects?: Json[] | null
          expected_outcomes?: string[] | null
          id?: string
          is_published?: boolean
          is_template?: boolean | null
          last_saved_at?: string | null
          learner_count?: number | null
          learner_requirements?: string[] | null
          marketplace_visibility?: string
          meta_objectives?: string[] | null
          meta_outcomes?: string[] | null
          meta_prerequisites?: string[] | null
          milestones?: string[] | null
          preferred_company_size?: string | null
          preferred_industries?: string[] | null
          published_at?: string | null
          required_certifications?: string[] | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          screening_questions?: Json[] | null
          skill_level?: string
          skill_tags?: string[] | null
          start_date?: string
          status?: Database["public"]["Enums"]["experience_status"] | null
          subcategories?: string[] | null
          team_size?: number | null
          template_id?: string | null
          timeline_end_date?: string | null
          timeline_start_date?: string | null
          title?: string
          trade_category?: string
          unique_code?: string | null
          updated_at?: string
          visibility?: string
          workflow_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "educator_experiences_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educator_experiences_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educator_experiences_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educator_experiences_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "educator_experiences_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      educator_profiles: {
        Row: {
          areas_of_interest: string[] | null
          completed_onboarding: boolean | null
          created_at: string
          full_name: string
          id: string
          institution_name: string
          job_title: string | null
          location: string | null
          phone_number: string | null
          phone_verified_at: string | null
          preferred_contact: string
          sms_verified: boolean | null
          specialization: string
          updated_at: string
          verification_date: string | null
          verified: boolean | null
          years_experience: number
        }
        Insert: {
          areas_of_interest?: string[] | null
          completed_onboarding?: boolean | null
          created_at?: string
          full_name: string
          id: string
          institution_name: string
          job_title?: string | null
          location?: string | null
          phone_number?: string | null
          phone_verified_at?: string | null
          preferred_contact: string
          sms_verified?: boolean | null
          specialization: string
          updated_at?: string
          verification_date?: string | null
          verified?: boolean | null
          years_experience: number
        }
        Update: {
          areas_of_interest?: string[] | null
          completed_onboarding?: boolean | null
          created_at?: string
          full_name?: string
          id?: string
          institution_name?: string
          job_title?: string | null
          location?: string | null
          phone_number?: string | null
          phone_verified_at?: string | null
          preferred_contact?: string
          sms_verified?: boolean | null
          specialization?: string
          updated_at?: string
          verification_date?: string | null
          verified?: boolean | null
          years_experience?: number
        }
        Relationships: []
      }
      educator_tasks: {
        Row: {
          created_at: string
          description: string
          due_date: string | null
          educator_id: string
          id: string
          priority: string
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          due_date?: string | null
          educator_id: string
          id?: string
          priority?: string
          status?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          due_date?: string | null
          educator_id?: string
          id?: string
          priority?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "educator_tasks_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          educator_id: string
          employer_id: string
          id: string
          rating: number
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          educator_id: string
          employer_id: string
          id?: string
          rating: number
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          educator_id?: string
          employer_id?: string
          id?: string
          rating?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_reviews_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_reviews_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      employers: {
        Row: {
          company_name: string
          company_size: string
          created_at: string
          description: string | null
          id: string
          industry: string
          location: string
          logo_url: string | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone: string
          rating: number | null
          rating_count: number | null
          registration_status: string
          updated_at: string
          user_id: string
          verified: boolean | null
          website: string | null
        }
        Insert: {
          company_name: string
          company_size: string
          created_at?: string
          description?: string | null
          id?: string
          industry: string
          location: string
          logo_url?: string | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone: string
          rating?: number | null
          rating_count?: number | null
          registration_status?: string
          updated_at?: string
          user_id: string
          verified?: boolean | null
          website?: string | null
        }
        Update: {
          company_name?: string
          company_size?: string
          created_at?: string
          description?: string | null
          id?: string
          industry?: string
          location?: string
          logo_url?: string | null
          primary_contact_email?: string
          primary_contact_name?: string
          primary_contact_phone?: string
          rating?: number | null
          rating_count?: number | null
          registration_status?: string
          updated_at?: string
          user_id?: string
          verified?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      experience_assignments: {
        Row: {
          assigned_at: string
          created_at: string
          experience_id: string
          id: string
          last_activity_at: string | null
          participation_metrics: Json | null
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          assigned_at?: string
          created_at?: string
          experience_id: string
          id?: string
          last_activity_at?: string | null
          participation_metrics?: Json | null
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          assigned_at?: string
          created_at?: string
          experience_id?: string
          id?: string
          last_activity_at?: string | null
          participation_metrics?: Json | null
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_assignments_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_assignments_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_experience_assignments_student"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_co_educators: {
        Row: {
          created_at: string
          educator_id: string
          experience_id: string
          id: string
          permissions: Json | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          educator_id: string
          experience_id: string
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          educator_id?: string
          experience_id?: string
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_co_educators_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_co_educators_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_co_educators_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_matches: {
        Row: {
          created_at: string
          educator_notes: string | null
          employer_id: string
          employer_notes: string | null
          experience_id: string
          id: string
          match_criteria: Json | null
          match_score: number | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          educator_notes?: string | null
          employer_id: string
          employer_notes?: string | null
          experience_id: string
          id?: string
          match_criteria?: Json | null
          match_score?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          educator_notes?: string | null
          employer_id?: string
          employer_notes?: string | null
          experience_id?: string
          id?: string
          match_criteria?: Json | null
          match_score?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_matches_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_matches_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_matches_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_media: {
        Row: {
          created_at: string
          experience_id: string
          file_name: string
          file_path: string
          file_type: string
          id: string
        }
        Insert: {
          created_at?: string
          experience_id: string
          file_name: string
          file_path: string
          file_type: string
          id?: string
        }
        Update: {
          created_at?: string
          experience_id?: string
          file_name?: string
          file_path?: string
          file_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_media_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_media_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_milestones: {
        Row: {
          created_at: string
          description: string | null
          due_date: string
          experience_id: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date: string
          experience_id: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string
          experience_id?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_milestones_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_milestones_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_prerequisites: {
        Row: {
          created_at: string | null
          description: string | null
          experience_id: string | null
          id: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          experience_id?: string | null
          id?: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          experience_id?: string | null
          id?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_prerequisites_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_prerequisites_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_requests: {
        Row: {
          created_at: string
          employer_id: string
          experience_id: string
          id: string
          message: string | null
          requested_modifications: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          employer_id: string
          experience_id: string
          id?: string
          message?: string | null
          requested_modifications?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          employer_id?: string
          experience_id?: string
          id?: string
          message?: string | null
          requested_modifications?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_requests_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_requests_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_requests_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_settings: {
        Row: {
          access_control: Json | null
          auto_approve_requests: boolean | null
          communication_settings: Json | null
          created_at: string
          display_preferences: Json | null
          experience_id: string
          id: string
          notification_preferences: Json | null
          updated_at: string
          visibility_settings: Json | null
        }
        Insert: {
          access_control?: Json | null
          auto_approve_requests?: boolean | null
          communication_settings?: Json | null
          created_at?: string
          display_preferences?: Json | null
          experience_id: string
          id?: string
          notification_preferences?: Json | null
          updated_at?: string
          visibility_settings?: Json | null
        }
        Update: {
          access_control?: Json | null
          auto_approve_requests?: boolean | null
          communication_settings?: Json | null
          created_at?: string
          display_preferences?: Json | null
          experience_id?: string
          id?: string
          notification_preferences?: Json | null
          updated_at?: string
          visibility_settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_settings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: true
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_settings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: true
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_status_changes: {
        Row: {
          admin_id: string
          created_at: string
          experience_id: string
          feedback: string | null
          id: string
          new_status: Database["public"]["Enums"]["experience_approval_status"]
          old_status:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
        }
        Insert: {
          admin_id: string
          created_at?: string
          experience_id: string
          feedback?: string | null
          id?: string
          new_status: Database["public"]["Enums"]["experience_approval_status"]
          old_status?:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
        }
        Update: {
          admin_id?: string
          created_at?: string
          experience_id?: string
          feedback?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["experience_approval_status"]
          old_status?:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_status_changes_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_status_changes_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_team_members: {
        Row: {
          created_at: string
          id: string
          joined_at: string
          role: string | null
          student_id: string
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          joined_at?: string
          role?: string | null
          student_id: string
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          joined_at?: string
          role?: string | null
          student_id?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_team_members_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "experience_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_teams: {
        Row: {
          created_at: string
          description: string | null
          experience_id: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          experience_id: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          experience_id?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_teams_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_teams_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_updates: {
        Row: {
          author_id: string
          content: string
          created_at: string
          experience_id: string
          id: string
          media_urls: string[] | null
          title: string
          updated_at: string
          visibility: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          experience_id: string
          id?: string
          media_urls?: string[] | null
          title: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          experience_id?: string
          id?: string
          media_urls?: string[] | null
          title?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_updates_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_updates_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_updates_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_base_articles: {
        Row: {
          category: string
          content: string
          created_at: string
          created_by: string
          id: string
          is_published: boolean
          tags: string[] | null
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          created_by: string
          id?: string
          is_published?: boolean
          tags?: string[] | null
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          is_published?: boolean
          tags?: string[] | null
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          experience_id: string | null
          id: string
          message: string
          read: boolean | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          experience_id?: string | null
          id?: string
          message: string
          read?: boolean | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          experience_id?: string | null
          id?: string
          message?: string
          read?: boolean | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "notifications_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          last_status_change: string | null
          name: string
          requires_verification: boolean | null
          role: string
          status: Database["public"]["Enums"]["user_status"] | null
          status_changed_by: string | null
          updated_at: string
          verification_details: Json | null
          verification_documents: string[] | null
          verification_notes: string | null
          verification_submitted_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          last_status_change?: string | null
          name?: string
          requires_verification?: boolean | null
          role?: string
          status?: Database["public"]["Enums"]["user_status"] | null
          status_changed_by?: string | null
          updated_at?: string
          verification_details?: Json | null
          verification_documents?: string[] | null
          verification_notes?: string | null
          verification_submitted_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_status_change?: string | null
          name?: string
          requires_verification?: boolean | null
          role?: string
          status?: Database["public"]["Enums"]["user_status"] | null
          status_changed_by?: string | null
          updated_at?: string
          verification_details?: Json | null
          verification_documents?: string[] | null
          verification_notes?: string | null
          verification_submitted_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      project_media: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          file_type: string
          id: string
          project_id: string
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          file_type: string
          id?: string
          project_id: string
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_type?: string
          id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_reviews: {
        Row: {
          created_at: string
          feedback: string | null
          id: string
          project_id: string
          reviewer_id: string
          status: Database["public"]["Enums"]["project_review_status"]
        }
        Insert: {
          created_at?: string
          feedback?: string | null
          id?: string
          project_id: string
          reviewer_id: string
          status: Database["public"]["Enums"]["project_review_status"]
        }
        Update: {
          created_at?: string
          feedback?: string | null
          id?: string
          project_id?: string
          reviewer_id?: string
          status?: Database["public"]["Enums"]["project_review_status"]
        }
        Relationships: [
          {
            foreignKeyName: "project_reviews_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_status_changes: {
        Row: {
          admin_id: string
          created_at: string
          feedback: string | null
          id: string
          new_status: Database["public"]["Enums"]["project_review_status"]
          old_status:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          project_id: string
        }
        Insert: {
          admin_id: string
          created_at?: string
          feedback?: string | null
          id?: string
          new_status: Database["public"]["Enums"]["project_review_status"]
          old_status?:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          project_id: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          feedback?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["project_review_status"]
          old_status?:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_status_changes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          admin_feedback: string | null
          certifications_required: string[] | null
          created_at: string
          description: string
          employer_id: string
          end_date: string
          flexibility: string | null
          id: string
          industry: string | null
          location_type: string
          modification_requested: string | null
          positions: number
          project_type: string | null
          review_status:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          reviewed_at: string | null
          reviewed_by: string | null
          safety_requirements: string[] | null
          search_vector: unknown | null
          site_address: string | null
          skill_level: string
          start_date: string
          status: string
          title: string
          trade_type: string
          updated_at: string
        }
        Insert: {
          admin_feedback?: string | null
          certifications_required?: string[] | null
          created_at?: string
          description: string
          employer_id: string
          end_date: string
          flexibility?: string | null
          id?: string
          industry?: string | null
          location_type: string
          modification_requested?: string | null
          positions: number
          project_type?: string | null
          review_status?:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          safety_requirements?: string[] | null
          search_vector?: unknown | null
          site_address?: string | null
          skill_level: string
          start_date: string
          status?: string
          title: string
          trade_type: string
          updated_at?: string
        }
        Update: {
          admin_feedback?: string | null
          certifications_required?: string[] | null
          created_at?: string
          description?: string
          employer_id?: string
          end_date?: string
          flexibility?: string | null
          id?: string
          industry?: string | null
          location_type?: string
          modification_requested?: string | null
          positions?: number
          project_type?: string | null
          review_status?:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          safety_requirements?: string[] | null
          search_vector?: unknown | null
          site_address?: string | null
          skill_level?: string
          start_date?: string
          status?: string
          title?: string
          trade_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      settings_change_requests: {
        Row: {
          created_at: string
          id: string
          new_value: Json
          old_value: Json
          reason: string | null
          requested_by: string
          review_notes: string | null
          reviewed_by: string | null
          setting_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          new_value: Json
          old_value: Json
          reason?: string | null
          requested_by: string
          review_notes?: string | null
          reviewed_by?: string | null
          setting_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          new_value?: Json
          old_value?: Json
          reason?: string | null
          requested_by?: string
          review_notes?: string | null
          reviewed_by?: string | null
          setting_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "settings_change_requests_setting_id_fkey"
            columns: ["setting_id"]
            isOneToOne: false
            referencedRelation: "system_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      student_assignments: {
        Row: {
          completion_date: string | null
          created_at: string
          educator_id: string
          feedback: string | null
          grade: string | null
          id: string
          project_id: string
          start_date: string
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          completion_date?: string | null
          created_at?: string
          educator_id: string
          feedback?: string | null
          grade?: string | null
          id?: string
          project_id: string
          start_date: string
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          completion_date?: string | null
          created_at?: string
          educator_id?: string
          feedback?: string | null
          grade?: string | null
          id?: string
          project_id?: string
          start_date?: string
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_assignments_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_certifications: {
        Row: {
          created_at: string
          expiry_date: string | null
          id: string
          issue_date: string
          issuing_organization: string
          name: string
          status: string
          student_id: string
          updated_at: string
          verification_url: string | null
        }
        Insert: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date: string
          issuing_organization: string
          name: string
          status?: string
          student_id: string
          updated_at?: string
          verification_url?: string | null
        }
        Update: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string
          issuing_organization?: string
          name?: string
          status?: string
          student_id?: string
          updated_at?: string
          verification_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_certifications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress_reports: {
        Row: {
          areas_for_improvement: string[] | null
          created_at: string
          educator_id: string
          id: string
          overall_progress: string
          recommendations: string | null
          report_date: string
          strengths: string[] | null
          student_id: string
          updated_at: string
        }
        Insert: {
          areas_for_improvement?: string[] | null
          created_at?: string
          educator_id: string
          id?: string
          overall_progress: string
          recommendations?: string | null
          report_date: string
          strengths?: string[] | null
          student_id: string
          updated_at?: string
        }
        Update: {
          areas_for_improvement?: string[] | null
          created_at?: string
          educator_id?: string
          id?: string
          overall_progress?: string
          recommendations?: string | null
          report_date?: string
          strengths?: string[] | null
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_reports_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_reports_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: Database["public"]["Enums"]["ticket_category"]
          created_at: string
          created_by: string
          description: string
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          resolution_notes: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          category: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          created_by: string
          description: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          category?: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          key: string
          requires_approval: boolean | null
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          key: string
          requires_approval?: boolean | null
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          key?: string
          requires_approval?: boolean | null
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      ticket_messages: {
        Row: {
          created_at: string
          id: string
          is_internal: boolean
          message: string
          sender_id: string
          ticket_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_internal?: boolean
          message: string
          sender_id: string
          ticket_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_internal?: boolean
          message?: string
          sender_id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_support_notes: {
        Row: {
          content: string
          created_at: string
          created_by: string
          id: string
          note_type: string
          severity: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          id?: string
          note_type: string
          severity?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          note_type?: string
          severity?: string | null
          user_id?: string
        }
        Relationships: []
      }
      verification_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          type: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          code: string
          created_at?: string
          expires_at: string
          id?: string
          type: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          type?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      analytics_experiences: {
        Row: {
          completed_learners: number | null
          completion_rate: number | null
          created_at: string | null
          educator_id: string | null
          experience_id: string | null
          status: Database["public"]["Enums"]["experience_status"] | null
          title: string | null
          total_learners: number | null
        }
        Relationships: [
          {
            foreignKeyName: "educator_experiences_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_learner_participation: {
        Row: {
          active_learners: number | null
          completed_experiences: number | null
          month: string | null
          ongoing_experiences: number | null
        }
        Relationships: []
      }
      analytics_project_matches: {
        Row: {
          match_rate: number | null
          month: string | null
          review_status:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          total_matches: number | null
          total_projects: number | null
        }
        Relationships: []
      }
      analytics_user_registrations: {
        Row: {
          count: number | null
          month: string | null
          role: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_admin_audit_log: {
        Args: {
          admin_id: string
          action_type: string
          resource_type: string
          resource_id: string
          changes: Json
          ip_address: string
        }
        Returns: string
      }
      calculate_match_score: {
        Args: {
          experience_id: string
          project_id: string
        }
        Returns: number
      }
      check_user_auth: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      cleanup_expired_verification_codes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_experience_stats: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          total_experiences: number
          active_experiences: number
          total_learners: number
          avg_completion_rate: number
          completion_count: number
        }[]
      }
      get_learner_participation_stats: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          active_learners: number
          ongoing_experiences: number
          completed_experiences: number
          month: string
        }[]
      }
      get_project_match_stats: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          total_projects: number
          total_matches: number
          match_rate: number
          review_status: Database["public"]["Enums"]["project_review_status"]
          month: string
        }[]
      }
      get_registration_stats: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          month: string
          educators_count: number
          employers_count: number
          participants_count: number
          total_count: number
        }[]
      }
    }
    Enums: {
      admin_permission_level: "read" | "write" | "manage"
      admin_resource_type:
        | "users"
        | "experiences"
        | "projects"
        | "reports"
        | "settings"
        | "support"
      experience_approval_status:
        | "pending_review"
        | "approved"
        | "rejected"
        | "needs_modification"
      experience_status:
        | "incomplete"
        | "draft"
        | "pending_approval"
        | "published"
      notification_level: "all" | "important" | "critical" | "none"
      project_review_status:
        | "pending_review"
        | "approved"
        | "rejected"
        | "needs_modification"
      skill_level_enum: "beginner" | "intermediate" | "advanced"
      ticket_category: "technical" | "approval" | "experience" | "other"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
      user_status: "pending" | "approved" | "rejected" | "suspended"
      visibility_rule: "public" | "registered" | "verified" | "admin_approved"
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
