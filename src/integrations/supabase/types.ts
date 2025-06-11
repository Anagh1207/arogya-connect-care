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
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          consultation_fee: number | null
          created_at: string | null
          diagnosis: string | null
          doctor_id: string
          hospital_id: string | null
          id: string
          notes: string | null
          patient_id: string
          status: Database["public"]["Enums"]["appointment_status"] | null
          symptoms: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          consultation_fee?: number | null
          created_at?: string | null
          diagnosis?: string | null
          doctor_id: string
          hospital_id?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          status?: Database["public"]["Enums"]["appointment_status"] | null
          symptoms?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          consultation_fee?: number | null
          created_at?: string | null
          diagnosis?: string | null
          doctor_id?: string
          hospital_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          status?: Database["public"]["Enums"]["appointment_status"] | null
          symptoms?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_donors: {
        Row: {
          address: string | null
          blood_group: Database["public"]["Enums"]["blood_group"]
          city: string
          consent_given: boolean | null
          contact_phone: string | null
          created_at: string | null
          donor_name: string
          donor_type: Database["public"]["Enums"]["donor_type"]
          id: string
          is_available: boolean | null
          last_donation_date: string | null
          latitude: number | null
          longitude: number | null
          patient_id: string | null
          pincode: string
          state: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          blood_group: Database["public"]["Enums"]["blood_group"]
          city: string
          consent_given?: boolean | null
          contact_phone?: string | null
          created_at?: string | null
          donor_name: string
          donor_type?: Database["public"]["Enums"]["donor_type"]
          id?: string
          is_available?: boolean | null
          last_donation_date?: string | null
          latitude?: number | null
          longitude?: number | null
          patient_id?: string | null
          pincode: string
          state: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          blood_group?: Database["public"]["Enums"]["blood_group"]
          city?: string
          consent_given?: boolean | null
          contact_phone?: string | null
          created_at?: string | null
          donor_name?: string
          donor_type?: Database["public"]["Enums"]["donor_type"]
          id?: string
          is_available?: boolean | null
          last_donation_date?: string | null
          latitude?: number | null
          longitude?: number | null
          patient_id?: string | null
          pincode?: string
          state?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blood_donors_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_requests: {
        Row: {
          address: string
          blood_group: Database["public"]["Enums"]["blood_group"]
          city: string
          contact_person: string
          contact_phone: string
          created_at: string | null
          hospital_name: string | null
          id: string
          latitude: number | null
          longitude: number | null
          notes: string | null
          patient_id: string
          pincode: string
          requested_by: string | null
          state: string
          status: string | null
          units_needed: number
          updated_at: string | null
          urgency_level: string
        }
        Insert: {
          address: string
          blood_group: Database["public"]["Enums"]["blood_group"]
          city: string
          contact_person: string
          contact_phone: string
          created_at?: string | null
          hospital_name?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          patient_id: string
          pincode: string
          requested_by?: string | null
          state: string
          status?: string | null
          units_needed?: number
          updated_at?: string | null
          urgency_level?: string
        }
        Update: {
          address?: string
          blood_group?: Database["public"]["Enums"]["blood_group"]
          city?: string
          contact_person?: string
          contact_phone?: string
          created_at?: string | null
          hospital_name?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          patient_id?: string
          pincode?: string
          requested_by?: string | null
          state?: string
          status?: string | null
          units_needed?: number
          updated_at?: string | null
          urgency_level?: string
        }
        Relationships: [
          {
            foreignKeyName: "blood_requests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_documents: {
        Row: {
          created_at: string
          doctor_id: string
          document_name: string
          document_type: string
          document_url: string
          file_size: number | null
          id: string
          updated_at: string
          uploaded_at: string
        }
        Insert: {
          created_at?: string
          doctor_id: string
          document_name: string
          document_type: string
          document_url: string
          file_size?: number | null
          id?: string
          updated_at?: string
          uploaded_at?: string
        }
        Update: {
          created_at?: string
          doctor_id?: string
          document_name?: string
          document_type?: string
          document_url?: string
          file_size?: number | null
          id?: string
          updated_at?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_documents_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          available_from: string | null
          available_to: string | null
          consultation_fee: number | null
          experience_years: number | null
          hospital_id: string | null
          id: string
          license_number: string
          qualification: string | null
          rating: number | null
          specialization: string
          total_reviews: number | null
          verification_notes: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          available_from?: string | null
          available_to?: string | null
          consultation_fee?: number | null
          experience_years?: number | null
          hospital_id?: string | null
          id: string
          license_number: string
          qualification?: string | null
          rating?: number | null
          specialization: string
          total_reviews?: number | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          available_from?: string | null
          available_to?: string | null
          consultation_fee?: number | null
          experience_years?: number | null
          hospital_id?: string | null
          id?: string
          license_number?: string
          qualification?: string | null
          rating?: number | null
          specialization?: string
          total_reviews?: number | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doctors_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctors_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctors_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors_availability: {
        Row: {
          created_at: string
          date: string
          doctor_id: string
          end_time: string
          id: string
          is_available: boolean
          start_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          doctor_id: string
          end_time: string
          id?: string
          is_available?: boolean
          start_time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          doctor_id?: string
          end_time?: string
          id?: string
          is_available?: boolean
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctors_availability_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      health_records: {
        Row: {
          created_at: string
          description: string | null
          file_name: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          patient_id: string
          title: string
          updated_at: string
          uploaded_at: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_name: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          patient_id: string
          title: string
          updated_at?: string
          uploaded_at?: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          patient_id?: string
          title?: string
          updated_at?: string
          uploaded_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_records_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          address: string
          ambulance_count: number | null
          bed_capacity: number | null
          city: string
          emergency_contact: string | null
          id: string
          license_number: string
          pincode: string
          state: string
        }
        Insert: {
          address: string
          ambulance_count?: number | null
          bed_capacity?: number | null
          city: string
          emergency_contact?: string | null
          id: string
          license_number: string
          pincode: string
          state: string
        }
        Update: {
          address?: string
          ambulance_count?: number | null
          bed_capacity?: number | null
          city?: string
          emergency_contact?: string | null
          id?: string
          license_number?: string
          pincode?: string
          state?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospitals_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          blood_group: string | null
          date_of_birth: string | null
          donor_consent: boolean | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          gender: string | null
          id: string
          medical_history: string | null
        }
        Insert: {
          address?: string | null
          blood_group?: string | null
          date_of_birth?: string | null
          donor_consent?: boolean | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          id: string
          medical_history?: string | null
        }
        Update: {
          address?: string | null
          blood_group?: string | null
          date_of_birth?: string | null
          donor_consent?: boolean | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          id?: string
          medical_history?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          created_at: string | null
          doctor_id: string
          dosage: string
          duration: string
          frequency: string
          id: string
          instructions: string | null
          medication_name: string
          patient_id: string
          prescribed_date: string
          status: Database["public"]["Enums"]["prescription_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          doctor_id: string
          dosage: string
          duration: string
          frequency: string
          id?: string
          instructions?: string | null
          medication_name: string
          patient_id: string
          prescribed_date?: string
          status?: Database["public"]["Enums"]["prescription_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          doctor_id?: string
          dosage?: string
          duration?: string
          frequency?: string
          id?: string
          instructions?: string | null
          medication_name?: string
          patient_id?: string
          prescribed_date?: string
          status?: Database["public"]["Enums"]["prescription_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      ambulance_status: "available" | "dispatched" | "busy" | "maintenance"
      appointment_status: "scheduled" | "completed" | "cancelled" | "no_show"
      blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
      donor_type: "individual" | "blood_bank"
      prescription_status: "active" | "completed" | "discontinued"
      user_role: "patient" | "doctor" | "hospital" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ambulance_status: ["available", "dispatched", "busy", "maintenance"],
      appointment_status: ["scheduled", "completed", "cancelled", "no_show"],
      blood_group: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      donor_type: ["individual", "blood_bank"],
      prescription_status: ["active", "completed", "discontinued"],
      user_role: ["patient", "doctor", "hospital", "admin"],
    },
  },
} as const
