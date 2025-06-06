
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, XCircle, FileText, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Document {
  id: string;
  document_type: string;
  document_name: string;
  document_url: string;
  uploaded_at: string;
}

interface Doctor {
  verification_status: string;
  verification_notes?: string;
  verified_at?: string;
}

const DoctorVerificationStatus = () => {
  const { user } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchVerificationStatus();
      fetchDocuments();
    }
  }, [user]);

  const fetchVerificationStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('verification_status, verification_notes, verified_at')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setDoctor(data);
    } catch (error: any) {
      console.error('Error fetching verification status:', error);
    }
  };

  const fetchDocuments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('doctor_documents')
        .select('*')
        .eq('doctor_id', user.id)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error: any) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadDocument = async (documentUrl: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('doctor-documents')
        .download(documentUrl.split('/').pop() || '');

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Error downloading document:', error);
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      license: 'Medical License',
      id: 'Government ID',
      degree: 'Medical Degree',
      experience_certificate: 'Experience Certificate',
      other: 'Other'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-arogya-dark-green mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-arogya-dark-teal flex items-center">
            {doctor && getStatusIcon(doctor.verification_status)}
            <span className="ml-2">Verification Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {doctor && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Status:</span>
                <Badge className={getStatusColor(doctor.verification_status)}>
                  {doctor.verification_status.charAt(0).toUpperCase() + doctor.verification_status.slice(1)}
                </Badge>
              </div>

              {doctor.verification_notes && (
                <div>
                  <span className="text-gray-600 block mb-2">Admin Notes:</span>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{doctor.verification_notes}</p>
                </div>
              )}

              {doctor.verified_at && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Verified At:</span>
                  <span className="text-sm">{new Date(doctor.verified_at).toLocaleDateString()}</span>
                </div>
              )}

              {doctor.verification_status === 'pending' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    Your account is under review. You'll be notified once the verification is complete.
                  </p>
                </div>
              )}

              {doctor.verification_status === 'rejected' && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-800 text-sm">
                    Your verification was rejected. Please review the admin notes and resubmit your documents.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-arogya-dark-teal">Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No documents uploaded yet.</p>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">{getDocumentTypeLabel(doc.document_type)}</p>
                      <p className="text-sm text-gray-500">{doc.document_name}</p>
                      <p className="text-xs text-gray-400">
                        Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadDocument(doc.document_url, doc.document_name)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorVerificationStatus;
