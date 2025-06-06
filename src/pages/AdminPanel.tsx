
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  UserPlus, 
  Stethoscope, 
  Building2, 
  Shield,
  BarChart3,
  Settings,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  AlertCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAdminData } from '@/hooks/useAdminData';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface DoctorWithDocuments {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  specialization: string;
  license_number: string;
  verification_status: string;
  verification_notes?: string;
  verified_at?: string;
  documents: Array<{
    id: string;
    document_type: string;
    document_name: string;
    document_url: string;
    uploaded_at: string;
  }>;
}

const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [doctors, setDoctors] = useState<DoctorWithDocuments[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorWithDocuments | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const { users, stats, loading } = useAdminData();
  const { profile } = useAuth();

  useEffect(() => {
    fetchDoctorsWithDocuments();

    // Set up real-time updates
    const channel = supabase
      .channel('admin-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'doctors' }, () => {
        fetchDoctorsWithDocuments();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'doctor_documents' }, () => {
        fetchDoctorsWithDocuments();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchDoctorsWithDocuments();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDoctorsWithDocuments = async () => {
    try {
      // First get all doctors
      const { data: doctorsData, error: doctorsError } = await supabase
        .from('doctors')
        .select('*')
        .order('created_at', { ascending: false });

      if (doctorsError) throw doctorsError;

      // Then get profiles and documents for each doctor
      const doctorsWithDetails = await Promise.all(
        (doctorsData || []).map(async (doctor) => {
          // Get profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email, phone')
            .eq('id', doctor.id)
            .single();

          // Get documents
          const { data: documents } = await supabase
            .from('doctor_documents')
            .select('*')
            .eq('doctor_id', doctor.id)
            .order('uploaded_at', { ascending: false });

          return {
            id: doctor.id,
            full_name: profile?.full_name || 'Unknown Doctor',
            email: profile?.email || '',
            phone: profile?.phone,
            specialization: doctor.specialization,
            license_number: doctor.license_number,
            verification_status: doctor.verification_status,
            verification_notes: doctor.verification_notes,
            verified_at: doctor.verified_at,
            documents: documents || []
          };
        })
      );

      setDoctors(doctorsWithDetails);
    } catch (error: any) {
      console.error('Error fetching doctors:', error);
      toast({
        title: "Error",
        description: "Failed to load doctors data",
        variant: "destructive",
      });
    } finally {
      setLoadingDoctors(false);
    }
  };

  const updateDoctorVerification = async (doctorId: string, status: 'verified' | 'rejected', notes?: string) => {
    try {
      const updateData: any = {
        verification_status: status,
        verification_notes: notes || null
      };

      if (status === 'verified') {
        updateData.verified_at = new Date().toISOString();
        updateData.verified_by = profile?.id;
      }

      const { error } = await supabase
        .from('doctors')
        .update(updateData)
        .eq('id', doctorId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Doctor ${status === 'verified' ? 'verified' : 'rejected'} successfully`,
      });

      fetchDoctorsWithDocuments();
      setSelectedDoctor(null);
      setVerificationNotes('');
    } catch (error: any) {
      console.error('Error updating verification:', error);
      toast({
        title: "Error",
        description: "Failed to update verification status",
        variant: "destructive",
      });
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

  if (loading || loadingDoctors) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-arogya-dark-green"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'hospital': return 'bg-purple-100 text-purple-800';
      case 'patient': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-500" />;
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

  const pendingDoctors = doctors.filter(d => d.verification_status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-arogya-dark-teal mb-2 flex items-center">
                <Shield className="w-8 h-8 mr-3" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600">System Management & Analytics</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Administrator</p>
              <p className="text-lg font-semibold text-arogya-dark-teal">{profile?.full_name}</p>
            </div>
          </div>
        </div>

        {/* Pending Verification Alert */}
        {pendingDoctors > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <p className="text-yellow-800 font-medium">
                {pendingDoctors} doctor{pendingDoctors > 1 ? 's' : ''} pending verification
              </p>
              <Button
                size="sm"
                onClick={() => setSelectedTab('verification')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Review Now
              </Button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Users</p>
                  <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                  <p className="text-green-100 text-sm">all users</p>
                </div>
                <Users className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Patients</p>
                  <p className="text-3xl font-bold text-white">{stats.totalPatients}</p>
                  <p className="text-blue-100 text-sm">registered</p>
                </div>
                <Users className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Doctors</p>
                  <p className="text-3xl font-bold text-white">{stats.totalDoctors}</p>
                  <p className="text-purple-100 text-sm">total registered</p>
                </div>
                <Stethoscope className="w-10 h-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Pending</p>
                  <p className="text-3xl font-bold text-white">{pendingDoctors}</p>
                  <p className="text-orange-100 text-sm">need verification</p>
                </div>
                <AlertCircle className="w-10 h-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit bg-white shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="verification" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Verification {pendingDoctors > 0 && <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded">{pendingDoctors}</span>}
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => setSelectedTab('verification')}
                    className="bg-arogya-dark-green hover:bg-arogya-light-green text-white p-6 h-auto flex-col"
                  >
                    <CheckCircle className="w-8 h-8 mb-2" />
                    Verify Doctors
                    {pendingDoctors > 0 && (
                      <span className="mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {pendingDoctors} pending
                      </span>
                    )}
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto flex-col">
                    <BarChart3 className="w-8 h-8 mb-2" />
                    View Analytics
                  </Button>
                  <Button 
                    onClick={() => setSelectedTab('users')}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto flex-col"
                  >
                    <UserPlus className="w-8 h-8 mb-2" />
                    Manage Users
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto flex-col">
                    <Shield className="w-8 h-8 mb-2" />
                    Security Audit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Doctor Verification Tab */}
          <TabsContent value="verification" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">Doctor Verification</CardTitle>
                <p className="text-gray-600">Review and verify doctor registrations</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-arogya-light-blue rounded-full flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-arogya-dark-green" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900">{doctor.full_name}</h3>
                              {getVerificationIcon(doctor.verification_status)}
                            </div>
                            <p className="text-gray-600">{doctor.email}</p>
                            <p className="text-sm text-gray-500">{doctor.specialization}</p>
                            <p className="text-sm text-gray-500">License: {doctor.license_number}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getVerificationStatusColor(doctor.verification_status)}>
                            {doctor.verification_status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {doctor.documents.length} document{doctor.documents.length !== 1 ? 's' : ''}
                          </span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedDoctor(doctor)}
                              >
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Review Doctor: {doctor.full_name}</DialogTitle>
                              </DialogHeader>
                              {selectedDoctor && (
                                <div className="space-y-6">
                                  {/* Doctor Info */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Email</label>
                                      <p className="text-gray-900">{selectedDoctor.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Phone</label>
                                      <p className="text-gray-900">{selectedDoctor.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Specialization</label>
                                      <p className="text-gray-900">{selectedDoctor.specialization}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">License Number</label>
                                      <p className="text-gray-900">{selectedDoctor.license_number}</p>
                                    </div>
                                  </div>

                                  {/* Documents */}
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-3">Uploaded Documents</h4>
                                    {selectedDoctor.documents.length === 0 ? (
                                      <p className="text-gray-500">No documents uploaded</p>
                                    ) : (
                                      <div className="grid grid-cols-1 gap-3">
                                        {selectedDoctor.documents.map((doc) => (
                                          <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                              <FileText className="w-5 h-5 text-blue-500" />
                                              <div>
                                                <p className="font-medium text-gray-900">
                                                  {getDocumentTypeLabel(doc.document_type)}
                                                </p>
                                                <p className="text-sm text-gray-500">{doc.document_name}</p>
                                                <p className="text-xs text-gray-400">
                                                  {new Date(doc.uploaded_at).toLocaleDateString()}
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
                                  </div>

                                  {/* Verification Notes */}
                                  <div>
                                    <label htmlFor="notes" className="text-sm font-medium text-gray-700 block mb-2">
                                      Verification Notes (Optional)
                                    </label>
                                    <Textarea
                                      id="notes"
                                      placeholder="Add notes for the doctor..."
                                      value={verificationNotes}
                                      onChange={(e) => setVerificationNotes(e.target.value)}
                                      rows={3}
                                    />
                                  </div>

                                  {/* Action Buttons */}
                                  {selectedDoctor.verification_status === 'pending' && (
                                    <div className="flex space-x-3">
                                      <Button
                                        onClick={() => updateDoctorVerification(selectedDoctor.id, 'verified', verificationNotes)}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Verify Doctor
                                      </Button>
                                      <Button
                                        onClick={() => updateDoctorVerification(selectedDoctor.id, 'rejected', verificationNotes)}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                      >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Reject Application
                                      </Button>
                                    </div>
                                  )}

                                  {/* Previous Verification Info */}
                                  {selectedDoctor.verification_notes && (
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                      <label className="text-sm font-medium text-gray-700 block mb-1">
                                        Previous Notes:
                                      </label>
                                      <p className="text-sm text-gray-600">{selectedDoctor.verification_notes}</p>
                                    </div>
                                  )}

                                  {selectedDoctor.verified_at && (
                                    <div className="text-sm text-gray-500">
                                      Verified on: {new Date(selectedDoctor.verified_at).toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-arogya-dark-teal">User Management</CardTitle>
                  <div className="flex space-x-4">
                    <Input placeholder="Search users..." className="w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-arogya-light-blue rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-arogya-dark-green" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{user.full_name}</h3>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-500">
                              Joined: {new Date(user.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                          <Badge className={user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">System Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Advanced analytics coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">System settings panel coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
