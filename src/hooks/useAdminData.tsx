
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface AdminStats {
  totalUsers: number;
  totalPatients: number;
  totalDoctors: number;
  totalHospitals: number;
}

export const useAdminData = () => {
  const { user, profile } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalPatients: 0,
    totalDoctors: 0,
    totalHospitals: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers(data || []);
      
      // Calculate stats
      const totalUsers = data?.length || 0;
      const totalPatients = data?.filter(u => u.role === 'patient').length || 0;
      const totalDoctors = data?.filter(u => u.role === 'doctor').length || 0;
      const totalHospitals = data?.filter(u => u.role === 'hospital').length || 0;

      setStats({
        totalUsers,
        totalPatients,
        totalDoctors,
        totalHospitals
      });

    } catch (error: any) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user && profile?.role === 'admin') {
      const loadData = async () => {
        setLoading(true);
        await fetchUsers();
        setLoading(false);
      };

      loadData();
    }
  }, [user, profile]);

  return {
    users,
    stats,
    loading,
    refetch: {
      users: fetchUsers
    }
  };
};
