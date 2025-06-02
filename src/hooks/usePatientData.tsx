
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Appointment {
  id: string;
  doctor: {
    full_name: string;
    specialization: string;
  };
  hospital?: {
    full_name: string;
  };
  appointment_date: string;
  appointment_time: string;
  status: string;
  symptoms?: string;
  diagnosis?: string;
}

interface Prescription {
  id: string;
  doctor: {
    full_name: string;
  };
  medication_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  status: string;
  prescribed_date: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  weight: string;
  height: string;
  bloodSugar: string;
  temperature: string;
}

export const usePatientData = () => {
  const { user, profile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [vitals] = useState<VitalSigns>({
    bloodPressure: '120/80',
    heartRate: '72 bpm',
    weight: '68 kg',
    height: '5\'7"',
    bloodSugar: '95 mg/dL',
    temperature: '98.6°F'
  });

  const fetchAppointments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          appointment_date,
          appointment_time,
          status,
          symptoms,
          diagnosis,
          doctors!inner(
            id,
            specialization
          ),
          hospitals(
            id
          )
        `)
        .eq('patient_id', user.id)
        .order('appointment_date', { ascending: false });

      if (error) throw error;

      // Fetch doctor and hospital profiles separately to avoid the relationship ambiguity
      const appointmentsWithDetails = await Promise.all((data || []).map(async (apt) => {
        // Fetch doctor profile
        const { data: doctorProfile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', apt.doctors.id)
          .single();

        // Fetch hospital profile if hospital_id exists
        let hospitalProfile = null;
        if (apt.hospitals?.id) {
          const { data: hospitalData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', apt.hospitals.id)
            .single();
          hospitalProfile = hospitalData;
        }

        return {
          id: apt.id,
          doctor: {
            full_name: doctorProfile?.full_name || 'Unknown Doctor',
            specialization: apt.doctors?.specialization || 'General Medicine'
          },
          hospital: hospitalProfile ? {
            full_name: hospitalProfile.full_name
          } : undefined,
          appointment_date: apt.appointment_date,
          appointment_time: apt.appointment_time,
          status: apt.status,
          symptoms: apt.symptoms,
          diagnosis: apt.diagnosis
        };
      }));

      setAppointments(appointmentsWithDetails);
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        variant: "destructive",
      });
    }
  };

  const fetchPrescriptions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          id,
          medication_name,
          dosage,
          frequency,
          duration,
          instructions,
          status,
          prescribed_date,
          doctors!inner(
            id
          )
        `)
        .eq('patient_id', user.id)
        .order('prescribed_date', { ascending: false });

      if (error) throw error;

      // Fetch doctor profiles separately
      const prescriptionsWithDetails = await Promise.all((data || []).map(async (prescription) => {
        const { data: doctorProfile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', prescription.doctors.id)
          .single();

        return {
          id: prescription.id,
          doctor: {
            full_name: doctorProfile?.full_name || 'Unknown Doctor'
          },
          medication_name: prescription.medication_name,
          dosage: prescription.dosage,
          frequency: prescription.frequency,
          duration: prescription.duration,
          instructions: prescription.instructions,
          status: prescription.status,
          prescribed_date: prescription.prescribed_date
        };
      }));

      setPrescriptions(prescriptionsWithDetails);
    } catch (error: any) {
      console.error('Error fetching prescriptions:', error);
      toast({
        title: "Error",
        description: "Failed to load prescriptions",
        variant: "destructive",
      });
    }
  };

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setNotifications(data || []);
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error: any) {
      console.error('Error marking notification as read:', error);
    }
  };

  useEffect(() => {
    if (user && profile?.role === 'patient') {
      const loadData = async () => {
        setLoading(true);
        await Promise.all([
          fetchAppointments(),
          fetchPrescriptions(),
          fetchNotifications()
        ]);
        setLoading(false);
      };

      loadData();
    }
  }, [user, profile]);

  return {
    appointments,
    prescriptions,
    notifications,
    vitals,
    loading,
    markNotificationAsRead,
    refetch: {
      appointments: fetchAppointments,
      prescriptions: fetchPrescriptions,
      notifications: fetchNotifications
    }
  };
};
