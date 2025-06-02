
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface DoctorAppointment {
  id: string;
  patient: {
    full_name: string;
  };
  appointment_date: string;
  appointment_time: string;
  status: string;
  symptoms?: string;
  diagnosis?: string;
}

interface DoctorStats {
  totalPatients: number;
  todayAppointments: number;
  monthlyEarnings: number;
  rating: number;
}

export const useDoctorData = () => {
  const { user, profile } = useAuth();
  const [appointments, setAppointments] = useState<DoctorAppointment[]>([]);
  const [stats, setStats] = useState<DoctorStats>({
    totalPatients: 0,
    todayAppointments: 0,
    monthlyEarnings: 0,
    rating: 0
  });
  const [loading, setLoading] = useState(true);

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
          patient_id
        `)
        .eq('doctor_id', user.id)
        .order('appointment_date', { ascending: true });

      if (error) throw error;

      // Fetch patient details separately
      const appointmentsWithDetails = await Promise.all((data || []).map(async (apt) => {
        const { data: patientProfile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', apt.patient_id)
          .single();

        return {
          id: apt.id,
          patient: {
            full_name: patientProfile?.full_name || 'Unknown Patient'
          },
          appointment_date: apt.appointment_date,
          appointment_time: apt.appointment_time,
          status: apt.status,
          symptoms: apt.symptoms,
          diagnosis: apt.diagnosis
        };
      }));

      setAppointments(appointmentsWithDetails);

      // Calculate stats
      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = appointmentsWithDetails.filter(apt => apt.appointment_date === today).length;
      
      setStats(prev => ({
        ...prev,
        todayAppointments,
        totalPatients: appointmentsWithDetails.length
      }));

    } catch (error: any) {
      console.error('Error fetching doctor appointments:', error);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user && profile?.role === 'doctor') {
      const loadData = async () => {
        setLoading(true);
        await fetchAppointments();
        setLoading(false);
      };

      loadData();
    }
  }, [user, profile]);

  return {
    appointments,
    stats,
    loading,
    refetch: {
      appointments: fetchAppointments
    }
  };
};
