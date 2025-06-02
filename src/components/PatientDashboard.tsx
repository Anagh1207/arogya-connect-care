import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, FileText, Heart, Phone, Video, MessageSquare, Star, MapPin } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SubscriptionUpgrade from './SubscriptionUpgrade';
import { useAuth } from '@/hooks/useAuth';
import { usePatientData } from '@/hooks/usePatientData';
import { format } from 'date-fns';

const PatientDashboard = () => {
  const { profile } = useAuth();
  const { appointments, prescriptions, vitals, loading } = usePatientData();
  const [showUpgrade, setShowUpgrade] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-arogya-dark-green"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const upcomingAppointments = appointments.filter(apt => apt.status === 'scheduled');
  const nextAppointment = upcomingAppointments[0];
  const activePrescriptions = prescriptions.filter(p => p.status === 'active');

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-arogya-dark-teal mb-2">
            Hello, {profile?.full_name || 'Patient'}!
          </h1>
          <p className="text-gray-600">Welcome to your personal health dashboard</p>
        </div>

        {/* Subscription upgrade banner */}
        {showUpgrade && (
          <SubscriptionUpgrade 
            variant="banner" 
            context="dashboard" 
            onClose={() => setShowUpgrade(false)} 
          />
        )}

        {/* Quick Stats */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-arogya-dark-green text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Next Appointment</p>
                  {nextAppointment ? (
                    <>
                      <p className="text-2xl font-bold text-white">
                        {format(new Date(nextAppointment.appointment_date), 'MMM dd')}
                      </p>
                      <p className="text-green-100">{nextAppointment.doctor.full_name}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-white">None</p>
                      <p className="text-green-100">No upcoming appointments</p>
                    </>
                  )}
                </div>
                <Calendar className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Health Score</p>
                  <p className="text-2xl font-bold text-arogya-dark-green">85/100</p>
                  <p className="text-arogya-dark-green text-sm">Very Good</p>
                </div>
                <Heart className="w-8 h-8 text-arogya-dark-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Active Prescriptions</p>
                  <p className="text-2xl font-bold text-gray-900">{activePrescriptions.length}</p>
                  <p className="text-arogya-dark-green text-sm">
                    {activePrescriptions.length} medications
                  </p>
                </div>
                <FileText className="w-8 h-8 text-arogya-dark-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Emergency Contact</p>
                  <p className="text-lg font-bold text-red-600">102</p>
                  <p className="text-gray-500 text-sm">24/7 Available</p>
                </div>
                <Phone className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="records">Health Records</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-arogya-dark-teal">My Appointments</CardTitle>
                  <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    Book New Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Appointments</h3>
                      <p className="text-gray-600">You don't have any appointments scheduled.</p>
                    </div>
                  ) : (
                    appointments.map(appointment => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-arogya-light-blue rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-arogya-dark-green" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.doctor.full_name}</h3>
                            <p className="text-gray-600">
                              {appointment.doctor.specialization}
                              {appointment.hospital && ` • ${appointment.hospital.full_name}`}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {format(new Date(appointment.appointment_date), 'MMM dd, yyyy')} at {appointment.appointment_time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={appointment.status === 'scheduled' ? 'default' : 'secondary'}>
                            {appointment.status}
                          </Badge>
                          {appointment.status === 'scheduled' && (
                            <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                              <Video className="w-4 h-4 mr-2" />
                              Join Call
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals">
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(vitals).map(([key, value]) => (
                    <div key={key} className="text-center p-4 bg-arogya-light-blue rounded-lg">
                      <h3 className="text-lg font-semibold text-arogya-dark-teal mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-2xl font-bold text-gray-900">{value}</p>
                      <p className="text-sm text-gray-600 mt-1">Normal range</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <CardTitle>Current Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Prescriptions</h3>
                      <p className="text-gray-600">You don't have any active prescriptions.</p>
                    </div>
                  ) : (
                    prescriptions.map(prescription => (
                      <div key={prescription.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{prescription.medication_name}</h3>
                            <p className="text-gray-600">{prescription.dosage} - {prescription.frequency}</p>
                            <p className="text-sm text-gray-500">
                              Prescribed by {prescription.doctor.full_name} on {format(new Date(prescription.prescribed_date), 'MMM dd, yyyy')}
                            </p>
                            <Badge variant={prescription.status === 'active' ? 'default' : 'secondary'} className="mt-2">
                              {prescription.status}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Emergency Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Emergency Contacts</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-red-800">Ambulance</p>
                          <p className="text-red-600">+91-102</p>
                        </div>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium text-blue-800">Police</p>
                          <p className="text-blue-600">+91-100</p>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Nearest Hospitals</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium">AIIMS Delhi</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          2.5 km away • Emergency: +91-11-2658-8500
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium">Safdarjung Hospital</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          3.2 km away • Emergency: +91-11-2673-0000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records">
            <Card>
              <CardHeader>
                <CardTitle>Health Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your Health Records</h3>
                  <p className="text-gray-600 mb-6">Upload and manage your medical documents securely</p>
                  <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    Upload Records
                  </Button>
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

export default PatientDashboard;
