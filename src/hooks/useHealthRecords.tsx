
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface HealthRecord {
  id: string;
  title: string;
  description?: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size?: number;
  uploaded_at: string;
}

export const useHealthRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('health_records')
        .select('*')
        .eq('patient_id', user.id)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;

      setRecords(data || []);
    } catch (error: any) {
      console.error('Error fetching health records:', error);
      toast({
        title: "Error",
        description: "Failed to load health records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecords();
    } else {
      setLoading(false);
    }
  }, [user]);

  return {
    records,
    loading,
    refetch: fetchRecords
  };
};
