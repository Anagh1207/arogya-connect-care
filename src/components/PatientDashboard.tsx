
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, FileText, Heart, Phone, Video, MessageSquare, Star, MapPin } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SubscriptionUpgrade from './SubscriptionUpgrade';

const PatientDashboard = () => {
  const [showUpgrade, setShowUpgrade] = useState(true);
  
  const [appointments] = useState([
    { id: 1, doctor: 'Dr. Priya Sharma', specialty: 'Cardiologist', date: '2024-01-15', time: '10:00 AM', status: 'upcoming', hospital: 'AIIMS Delhi' },
    { id: 2, doctor: 'Dr. Rajesh Kumar', specialty: 'Neurologist', date: '2024-01-18', time: '2:00 PM', status: 'upcoming', hospital: 'Apollo Chennai' },
    { id: 3, doctor: 'Dr. Sunita Patel', specialty: 'Dermatologist', date: '2024-01-10', time: '11:00 AM', status: 'completed', hospital: 'Fortis Mumbai' }
  ]);

  const [prescriptions] = useState([
    { id: 1, doctor: 'Dr. Priya Sharma', medication: 'Atorvastatin 10mg', dosage: 'Once daily after dinner', date: '2024-01-10' },
    { id: 2, doctor: 'Dr. Rajesh Kumar', medication: 'Paracetamol 500mg', dosage: 'Twice daily after meals', date: '2024-01-08' }
  ]);

  const vitals = {
    bloodPressure: '120/80',
    heartRate: '72 bpm',
    weight: '68 kg',
    height: '5\'7"',
    bloodSugar: '95 mg/dL',
    temperature: '98.6°F'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-arogya-dark-teal mb-2">नमस्कार, राहुल जी!</h1>
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
                  <p className="text-2xl font-bold text-white">Jan 15</p>
                  <p className="text-green-100">Dr. Priya Sharma</p>
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
                  <p className="text-2xl font-bold text-gray-900">4</p>
                  <p className="text-arogya-dark-green text-sm">2 expiring soon</p>
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
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-arogya-light-blue rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-arogya-dark-green" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                          <p className="text-gray-600">{appointment.specialty} • {appointment.hospital}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
                          {appointment.status}
                        </Badge>
                        {appointment.status === 'upcoming' && (
                          <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                            <Video className="w-4 h-4 mr-2" />
                            Join Call
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
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

          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <CardTitle>Current Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{prescription.medication}</h3>
                          <p className="text-gray-600">{prescription.dosage}</p>
                          <p className="text-sm text-gray-500">Prescribed by {prescription.doctor} on {prescription.date}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
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
