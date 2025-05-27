import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubscriptionUpgrade from './SubscriptionUpgrade';

const DoctorDashboard = () => {
  const [showUpgrade, setShowUpgrade] = useState(true);
  
  const [appointments] = useState([
    { id: 1, patient: 'John Smith', age: 45, time: '10:00 AM', type: 'Follow-up', status: 'upcoming' },
    { id: 2, patient: 'Sarah Wilson', age: 32, time: '11:30 AM', type: 'Consultation', status: 'upcoming' },
    { id: 3, patient: 'Mike Johnson', age: 28, time: '2:00 PM', type: 'Check-up', status: 'upcoming' },
    { id: 4, patient: 'Emily Davis', age: 55, time: '9:00 AM', type: 'Consultation', status: 'completed' }
  ]);

  const [patients] = useState([
    { id: 1, name: 'John Smith', age: 45, lastVisit: '2024-01-08', condition: 'Hypertension', status: 'stable' },
    { id: 2, name: 'Sarah Wilson', age: 32, lastVisit: '2024-01-10', condition: 'Anxiety', status: 'improving' },
    { id: 3, name: 'Mike Johnson', age: 28, lastVisit: '2024-01-12', condition: 'Allergy', status: 'new' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-arogya-dark-teal mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Welcome back, Dr. Smith! Manage your practice efficiently.</p>
        </div>

        {/* Subscription upgrade banner */}
        {showUpgrade && (
          <SubscriptionUpgrade 
            variant="banner" 
            context="ai-features"
            onClose={() => setShowUpgrade(false)}
          />
        )}

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-arogya-dark-green text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Today's Appointments</p>
                  <p className="text-2xl font-bold text-white">8</p>
                  <p className="text-green-100">3 completed</p>
                </div>
                <svg className="w-8 h-8 text-green-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Active Patients</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-arogya-dark-green text-sm">+12 this week</p>
                </div>
                <svg className="w-8 h-8 text-arogya-dark-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$24,500</p>
                  <p className="text-arogya-dark-green text-sm">+8.2% increase</p>
                </div>
                <svg className="w-8 h-8 text-arogya-dark-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h10z" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-arogya-dark-green">4.9</p>
                  <p className="text-gray-500 text-sm">From 89 reviews</p>
                </div>
                <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-arogya-dark-teal">Today's Appointments</CardTitle>
                  <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    Add Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-arogya-light-blue rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-arogya-dark-green" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.patient}</h3>
                          <p className="text-gray-600">Age: {appointment.age} • {appointment.type}</p>
                          <p className="text-sm text-gray-500">{appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'upcoming' 
                            ? 'bg-arogya-light-blue text-arogya-dark-green' 
                            : 'bg-green-100 text-arogya-dark-green'
                        }`}>
                          {appointment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </span>
                        {appointment.status === 'upcoming' && (
                          <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                            Start Call
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-arogya-light-blue rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-arogya-dark-green" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                          <p className="text-gray-600">Age: {patient.age} • {patient.condition}</p>
                          <p className="text-sm text-gray-500">Last visit: {patient.lastVisit}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'stable' ? 'bg-green-100 text-arogya-dark-green' :
                          patient.status === 'improving' ? 'bg-blue-100 text-blue-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {patient.status}
                        </span>
                        <Button variant="outline" size="sm">
                          View Records
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Manage Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Available Hours</h3>
                    <div className="space-y-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                        <div key={day} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <span className="font-medium text-gray-900">{day}</span>
                          <span className="text-gray-600">9:00 AM - 5:00 PM</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Time Off Requests</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-arogya-light-blue rounded-lg">
                        <p className="font-medium text-gray-900">No time off scheduled</p>
                        <p className="text-gray-600 text-sm">You're available for the next 30 days</p>
                      </div>
                      <Button className="w-full bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                        Request Time Off
                      </Button>
                    </div>
                  </div>
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
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-arogya-light-blue rounded-lg">
                    <h3 className="text-2xl font-bold text-arogya-light-blue mb-2">156</h3>
                    <p className="text-gray-600">Total Patients</p>
                    <p className="text-sm text-green-100 mt-1">+12% this month</p>
                  </div>
                  <div className="text-center p-6 bg-green-100 rounded-lg">
                    <h3 className="text-2xl font-bold text-green-900 mb-2">89%</h3>
                    <p className="text-gray-600">Patient Satisfaction</p>
                    <p className="text-sm text-green-100 mt-1">+5% improvement</p>
                  </div>
                  <div className="text-center p-6 bg-yellow-100 rounded-lg">
                    <h3 className="text-2xl font-bold text-yellow-600 mb-2">32</h3>
                    <p className="text-gray-600">Avg. Consultations/Week</p>
                    <p className="text-sm text-green-100 mt-1">Optimal workload</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;
