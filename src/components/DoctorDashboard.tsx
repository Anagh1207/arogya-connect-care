
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Header from './Header';
import Footer from './Footer';
import SubscriptionUpgrade from './SubscriptionUpgrade';
import DoctorVerificationStatus from './DoctorVerificationStatus';
import DoctorDocumentUpload from './DoctorDocumentUpload';
import { useDoctorData } from '@/hooks/useDoctorData';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Users, DollarSign, Star, Clock, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const DoctorDashboard = () => {
  const [showUpgrade, setShowUpgrade] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<string>('');
  const { appointments, stats, loading } = useDoctorData();
  const { profile, user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchVerificationStatus();
    }
  }, [user]);

  const fetchVerificationStatus = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('doctors')
        .select('verification_status')
        .eq('id', user.id)
        .single();

      if (data) {
        setVerificationStatus(data.verification_status);
      }
    } catch (error) {
      console.error('Error fetching verification status:', error);
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getVerificationMessage = (status: string) => {
    switch (status) {
      case 'verified':
        return { text: 'Your account is verified! You can now receive appointments.', color: 'text-green-700 bg-green-50' };
      case 'rejected':
        return { text: 'Your verification was rejected. Please check the verification status and resubmit documents.', color: 'text-red-700 bg-red-50' };
      default:
        return { text: 'Your account is pending verification. Please upload your documents if you haven\'t already.', color: 'text-yellow-700 bg-yellow-50' };
    }
  };

  if (loading) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const verificationMessage = getVerificationMessage(verificationStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-arogya-dark-teal mb-2">
            Welcome, Dr. {profile?.full_name || 'Doctor'}!
          </h1>
          <p className="text-gray-600">Manage your practice efficiently and serve patients better.</p>
        </div>

        {/* Verification Status Banner */}
        {verificationStatus && (
          <div className={`p-4 rounded-lg mb-6 ${verificationMessage.color}`}>
            <div className="flex items-center space-x-3">
              {getVerificationIcon(verificationStatus)}
              <p className="font-medium">{verificationMessage.text}</p>
            </div>
          </div>
        )}

        {/* Subscription upgrade banner */}
        {showUpgrade && verificationStatus === 'verified' && (
          <SubscriptionUpgrade 
            variant="banner" 
            context="ai-features"
            onClose={() => setShowUpgrade(false)}
          />
        )}

        {/* Stats Cards */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-arogya-dark-green text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Today's Appointments</p>
                  <p className="text-2xl font-bold text-white">{stats.todayAppointments}</p>
                  <p className="text-green-100">scheduled today</p>
                </div>
                <Calendar className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
                  <p className="text-arogya-dark-green text-sm">lifetime patients</p>
                </div>
                <Users className="w-8 h-8 text-arogya-dark-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Monthly Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.monthlyEarnings.toLocaleString()}</p>
                  <p className="text-arogya-dark-green text-sm">this month</p>
                </div>
                <DollarSign className="w-8 h-8 text-arogya-dark-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-arogya-dark-green">{stats.rating.toFixed(1)}</p>
                  <p className="text-gray-500 text-sm">patient reviews</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-arogya-dark-teal">Your Appointments</CardTitle>
                  {verificationStatus === 'verified' && (
                    <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                      Schedule New Appointment
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {verificationStatus !== 'verified' ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <p className="text-gray-500">Complete verification to start receiving appointments</p>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No appointments scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-arogya-light-blue rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-arogya-dark-green" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.patient.full_name}</h3>
                            <p className="text-gray-600">
                              {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}
                            </p>
                            {appointment.symptoms && (
                              <p className="text-sm text-gray-500">Symptoms: {appointment.symptoms}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          {appointment.status === 'scheduled' && (
                            <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                              Start Consultation
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification">
            <div className="space-y-6">
              <DoctorVerificationStatus />
              {verificationStatus !== 'verified' && (
                <DoctorDocumentUpload onUploadComplete={fetchVerificationStatus} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Patient management features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Schedule management features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Practice Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Analytics and reports coming soon</p>
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

export default DoctorDashboard;
