
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface HospitalDoctor {
  id: string;
  full_name: string;
  specialization: string;
  experience_years: number;
  rating: number;
}

interface HospitalStats {
  totalDoctors: number;
  totalPatients: number;
  totalAmbulances: number;
  bedOccupancy: number;
}

export const useHospitalData = () => {
  const { user, profile } = useAuth();
  const [doctors, setDoctors] = useState<HospitalDoctor[]>([]);
  const [stats, setStats] = useState<HospitalStats>({
    totalDoctors: 0,
    totalPatients: 0,
    totalAmbulances: 0,
    bedOccupancy: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          id,
          specialization,
          experience_years,
          rating
        `)
        .eq('hospital_id', user.id);

      if (error) throw error;

      // Fetch doctor profiles separately
      const doctorsWithDetails = await Promise.all((data || []).map(async (doctor) => {
        const { data: doctorProfile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', doctor.id)
          .single();

        return {
          id: doctor.id,
          full_name: doctorProfile?.full_name || 'Unknown Doctor',
          specialization: doctor.specialization,
          experience_years: doctor.experience_years || 0,
          rating: doctor.rating || 0
        };
      }));

      setDoctors(doctorsWithDetails);
      setStats(prev => ({ ...prev, totalDoctors: doctorsWithDetails.length }));

    } catch (error: any) {
      console.error('Error fetching hospital doctors:', error);
      toast({
        title: "Error",
        description: "Failed to load doctors",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user && profile?.role === 'hospital') {
      const loadData = async () => {
        setLoading(true);
        await fetchDoctors();
        setLoading(false);
      };

      loadData();
    }
  }, [user, profile]);

  return {
    doctors,
    stats,
    loading,
    refetch: {
      doctors: fetchDoctors
    }
  };
};
