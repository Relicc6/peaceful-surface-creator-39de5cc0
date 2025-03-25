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
      applications: {
        Row: {
          applicant_id: string | null
          created_at: string | null
          employer_id: string | null
          id: string
          last_message: string | null
          last_message_at: string | null
          learner_id: string | null
          project_id: string | null
          status: string | null
          unread_count: number | null
          updated_at: string | null
        }
        Insert: {
          applicant_id?: string | null
          created_at?: string | null
          employer_id?: string | null
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          learner_id?: string | null
          project_id?: string | null
          status?: string | null
          unread_count?: number | null
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string | null
          created_at?: string | null
          employer_id?: string | null
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          learner_id?: string | null
          project_id?: string | null
          status?: string | null
          unread_count?: number | null
          updated_at?: string | null
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
      educator_employer_collaborations: {
        Row: {
          created_at: string | null
          educator_id: string | null
          employer_id: string | null
          id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          educator_id?: string | null
          employer_id?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          educator_id?: string | null
          employer_id?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      educator_events: {
        Row: {
          created_at: string | null
          description: string | null
          educator_id: string | null
          event_date: string | null
          event_type: string | null
          id: string
          location: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          educator_id?: string | null
          event_date?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          educator_id?: string | null
          event_date?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      educator_experiences: {
        Row: {
          company_types: string[] | null
          created_at: string | null
          description: string | null
          duration_hours: number | null
          educator_id: string | null
          expected_outcomes: string[] | null
          id: string
          learner_capabilities: string | null
          learner_level: string | null
          max_learners: number | null
          media_urls: string[] | null
          preferred_companies: Json | null
          preferred_industries: string[] | null
          project_examples: string[] | null
          required_certifications: string[] | null
          screening_questions: Json | null
          skill_tags: string[] | null
          status: string | null
          subcategories: string[] | null
          team_size: number | null
          team_structure: string | null
          title: string
          trade_category: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          company_types?: string[] | null
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          educator_id?: string | null
          expected_outcomes?: string[] | null
          id?: string
          learner_capabilities?: string | null
          learner_level?: string | null
          max_learners?: number | null
          media_urls?: string[] | null
          preferred_companies?: Json | null
          preferred_industries?: string[] | null
          project_examples?: string[] | null
          required_certifications?: string[] | null
          screening_questions?: Json | null
          skill_tags?: string[] | null
          status?: string | null
          subcategories?: string[] | null
          team_size?: number | null
          team_structure?: string | null
          title: string
          trade_category?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          company_types?: string[] | null
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          educator_id?: string | null
          expected_outcomes?: string[] | null
          id?: string
          learner_capabilities?: string | null
          learner_level?: string | null
          max_learners?: number | null
          media_urls?: string[] | null
          preferred_companies?: Json | null
          preferred_industries?: string[] | null
          project_examples?: string[] | null
          required_certifications?: string[] | null
          screening_questions?: Json | null
          skill_tags?: string[] | null
          status?: string | null
          subcategories?: string[] | null
          team_size?: number | null
          team_structure?: string | null
          title?: string
          trade_category?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
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
      educator_tasks: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          educator_id: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          educator_id?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          educator_id?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
      employers: {
        Row: {
          company_name: string | null
          company_size: string | null
          description: string | null
          id: string
          industry: string | null
          location: string | null
          logo_url: string | null
          primary_contact_email: string | null
          primary_contact_name: string | null
          primary_contact_phone: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          company_name?: string | null
          company_size?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          company_name?: string | null
          company_size?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      experience_feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          experience_id: string | null
          id: string
          rating: number | null
          reviewer_profile_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          experience_id?: string | null
          id?: string
          rating?: number | null
          reviewer_profile_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          experience_id?: string | null
          id?: string
          rating?: number | null
          reviewer_profile_id?: string | null
        }
        Relationships: []
      }
      experience_milestones: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          participant_experience_id: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          participant_experience_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          participant_experience_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      experience_screening_questions: {
        Row: {
          created_at: string | null
          experience_id: string | null
          id: string
          options: string[] | null
          question: string
          question_type: string | null
          required: boolean | null
        }
        Insert: {
          created_at?: string | null
          experience_id?: string | null
          id?: string
          options?: string[] | null
          question: string
          question_type?: string | null
          required?: boolean | null
        }
        Update: {
          created_at?: string | null
          experience_id?: string | null
          id?: string
          options?: string[] | null
          question?: string
          question_type?: string | null
          required?: boolean | null
        }
        Relationships: []
      }
      experience_templates: {
        Row: {
          created_at: string | null
          description: string | null
          educator_id: string | null
          id: string
          is_public: boolean | null
          metadata: Json | null
          skill_level: string | null
          status: string | null
          title: string
          trade_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          educator_id?: string | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          skill_level?: string | null
          status?: string | null
          title: string
          trade_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          educator_id?: string | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          skill_level?: string | null
          status?: string | null
          title?: string
          trade_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
          application_id: string | null
          attachments: Json | null
          content: string | null
          created_at: string | null
          edited_at: string | null
          id: string
          is_edited: boolean | null
          is_pinned: boolean | null
          reactions: Json | null
          read_at: string | null
          receiver_id: string | null
          sender_id: string | null
          thread_id: string | null
          timestamp: string | null
        }
        Insert: {
          application_id?: string | null
          attachments?: Json | null
          content?: string | null
          created_at?: string | null
          edited_at?: string | null
          id: string
          is_edited?: boolean | null
          is_pinned?: boolean | null
          reactions?: Json | null
          read_at?: string | null
          receiver_id?: string | null
          sender_id?: string | null
          thread_id?: string | null
          timestamp?: string | null
        }
        Update: {
          application_id?: string | null
          attachments?: Json | null
          content?: string | null
          created_at?: string | null
          edited_at?: string | null
          id?: string
          is_edited?: boolean | null
          is_pinned?: boolean | null
          reactions?: Json | null
          read_at?: string | null
          receiver_id?: string | null
          sender_id?: string | null
          thread_id?: string | null
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
          content: string | null
          created_at: string | null
          experience_id: string | null
          id: string
          message: string | null
          priority: string | null
          read: boolean | null
          read_at: string | null
          status: string | null
          timestamp: string | null
          title: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          experience_id?: string | null
          id: string
          message?: string | null
          priority?: string | null
          read?: boolean | null
          read_at?: string | null
          status?: string | null
          timestamp?: string | null
          title?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          experience_id?: string | null
          id?: string
          message?: string | null
          priority?: string | null
          read?: boolean | null
          read_at?: string | null
          status?: string | null
          timestamp?: string | null
          title?: string | null
          type?: string | null
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
      participant_achievements: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          issued_at: string | null
          participant_id: string | null
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          issued_at?: string | null
          participant_id?: string | null
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          issued_at?: string | null
          participant_id?: string | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      participant_events: {
        Row: {
          created_at: string | null
          description: string | null
          event_type: string | null
          id: string
          participant_id: string | null
          start_time: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_type?: string | null
          id?: string
          participant_id?: string | null
          start_time?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_type?: string | null
          id?: string
          participant_id?: string | null
          start_time?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      participant_experiences: {
        Row: {
          created_at: string | null
          description: string | null
          duration_hours: number | null
          educator_profile_id: string | null
          end_date: string | null
          expected_outcomes: string[] | null
          id: string
          learner_capabilities: string | null
          learner_level: string | null
          max_learners: number | null
          media_urls: string[] | null
          participant_id: string | null
          preferred_companies: Json | null
          project_examples: string[] | null
          skill_tags: string[] | null
          start_date: string | null
          status: string | null
          subcategories: string[] | null
          team_size: number | null
          team_structure: string | null
          title: string
          trade_category: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          educator_profile_id?: string | null
          end_date?: string | null
          expected_outcomes?: string[] | null
          id?: string
          learner_capabilities?: string | null
          learner_level?: string | null
          max_learners?: number | null
          media_urls?: string[] | null
          participant_id?: string | null
          preferred_companies?: Json | null
          project_examples?: string[] | null
          skill_tags?: string[] | null
          start_date?: string | null
          status?: string | null
          subcategories?: string[] | null
          team_size?: number | null
          team_structure?: string | null
          title: string
          trade_category?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          educator_profile_id?: string | null
          end_date?: string | null
          expected_outcomes?: string[] | null
          id?: string
          learner_capabilities?: string | null
          learner_level?: string | null
          max_learners?: number | null
          media_urls?: string[] | null
          participant_id?: string | null
          preferred_companies?: Json | null
          project_examples?: string[] | null
          skill_tags?: string[] | null
          start_date?: string | null
          status?: string | null
          subcategories?: string[] | null
          team_size?: number | null
          team_structure?: string | null
          title?: string
          trade_category?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
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
      participant_recommendations: {
        Row: {
          created_at: string | null
          experience_id: string | null
          id: string
          match_score: number | null
          participant_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          experience_id?: string | null
          id?: string
          match_score?: number | null
          participant_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          experience_id?: string | null
          id?: string
          match_score?: number | null
          participant_id?: string | null
          status?: string | null
        }
        Relationships: []
      }
      participant_settings: {
        Row: {
          appearance_settings: Json | null
          created_at: string | null
          digest_settings: Json | null
          id: string
          language_preference: string | null
          mentorship_mode: string | null
          notification_preferences: Json | null
          participant_id: string | null
          privacy_settings: Json | null
          security_settings: Json | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          appearance_settings?: Json | null
          created_at?: string | null
          digest_settings?: Json | null
          id?: string
          language_preference?: string | null
          mentorship_mode?: string | null
          notification_preferences?: Json | null
          participant_id?: string | null
          privacy_settings?: Json | null
          security_settings?: Json | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          appearance_settings?: Json | null
          created_at?: string | null
          digest_settings?: Json | null
          id?: string
          language_preference?: string | null
          mentorship_mode?: string | null
          notification_preferences?: Json | null
          participant_id?: string | null
          privacy_settings?: Json | null
          security_settings?: Json | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      participant_tasks: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          participant_id: string | null
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          participant_id?: string | null
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          participant_id?: string | null
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      participant_workflow_status: {
        Row: {
          created_at: string | null
          id: string
          last_status_change: string | null
          needs_admin_review: boolean | null
          onboarding_step: string | null
          participant_id: string | null
          profile_completion: number | null
          registration_status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_status_change?: string | null
          needs_admin_review?: boolean | null
          onboarding_step?: string | null
          participant_id?: string | null
          profile_completion?: number | null
          registration_status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_status_change?: string | null
          needs_admin_review?: boolean | null
          onboarding_step?: string | null
          participant_id?: string | null
          profile_completion?: number | null
          registration_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          preferred_contact: string | null
          role: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id: string
          name: string
          phone?: string | null
          preferred_contact?: string | null
          role: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          preferred_contact?: string | null
          role?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          additional_feedback: string | null
          certifications_required: string[] | null
          created_at: string | null
          description: string | null
          employer_id: string | null
          end_date: string | null
          expectations: string | null
          id: string
          location_type: string | null
          positions: number | null
          required_tools: string[] | null
          review_status: string | null
          safety_requirements: string[] | null
          site_address: string | null
          skill_level: string | null
          start_date: string | null
          status: string | null
          subcategories: string[] | null
          title: string | null
          tools_provided: boolean | null
          trade_type: string | null
          updated_at: string | null
        }
        Insert: {
          additional_feedback?: string | null
          certifications_required?: string[] | null
          created_at?: string | null
          description?: string | null
          employer_id?: string | null
          end_date?: string | null
          expectations?: string | null
          id: string
          location_type?: string | null
          positions?: number | null
          required_tools?: string[] | null
          review_status?: string | null
          safety_requirements?: string[] | null
          site_address?: string | null
          skill_level?: string | null
          start_date?: string | null
          status?: string | null
          subcategories?: string[] | null
          title?: string | null
          tools_provided?: boolean | null
          trade_type?: string | null
          updated_at?: string | null
        }
        Update: {
          additional_feedback?: string | null
          certifications_required?: string[] | null
          created_at?: string | null
          description?: string | null
          employer_id?: string | null
          end_date?: string | null
          expectations?: string | null
          id?: string
          location_type?: string | null
          positions?: number | null
          required_tools?: string[] | null
          review_status?: string | null
          safety_requirements?: string[] | null
          site_address?: string | null
          skill_level?: string | null
          start_date?: string | null
          status?: string | null
          subcategories?: string[] | null
          title?: string | null
          tools_provided?: boolean | null
          trade_type?: string | null
          updated_at?: string | null
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
      task_submissions: {
        Row: {
          content: string | null
          feedback: string | null
          grade: string | null
          id: string
          status: string | null
          submitted_at: string | null
          task_id: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          feedback?: string | null
          grade?: string | null
          id?: string
          status?: string | null
          submitted_at?: string | null
          task_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          feedback?: string | null
          grade?: string | null
          id?: string
          status?: string | null
          submitted_at?: string | null
          task_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_submissions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_by: string | null
          assigned_to: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          project_id: string | null
          status: string | null
          submission_requirements: Json | null
          submission_type: string | null
          title: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_by?: string | null
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id: string
          priority?: string | null
          project_id?: string | null
          status?: string | null
          submission_requirements?: Json | null
          submission_type?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_by?: string | null
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          status?: string | null
          submission_requirements?: Json | null
          submission_type?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
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
      user_message_settings: {
        Row: {
          dark_mode: boolean | null
          desktop_notifications: boolean | null
          email_notifications: boolean | null
          id: string
          message_preview: boolean | null
          sound_notifications: boolean | null
          typing_preview: boolean | null
          user_id: string | null
        }
        Insert: {
          dark_mode?: boolean | null
          desktop_notifications?: boolean | null
          email_notifications?: boolean | null
          id?: string
          message_preview?: boolean | null
          sound_notifications?: boolean | null
          typing_preview?: boolean | null
          user_id?: string | null
        }
        Update: {
          dark_mode?: boolean | null
          desktop_notifications?: boolean | null
          email_notifications?: boolean | null
          id?: string
          message_preview?: boolean | null
          sound_notifications?: boolean | null
          typing_preview?: boolean | null
          user_id?: string | null
        }
        Relationships: []
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
