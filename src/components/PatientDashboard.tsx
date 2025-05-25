
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PatientDashboard = () => {
  const [appointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2024-01-15', time: '10:00 AM', status: 'upcoming' },
    { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Dermatology', date: '2024-01-20', time: '2:30 PM', status: 'upcoming' },
    { id: 3, doctor: 'Dr. Emily Davis', specialty: 'General Practice', date: '2024-01-10', time: '9:00 AM', status: 'completed' }
  ]);

  const [medicalRecords] = useState([
    { id: 1, title: 'Blood Test Results', date: '2024-01-08', doctor: 'Dr. Sarah Johnson', type: 'Lab Report' },
    { id: 2, title: 'X-Ray Chest', date: '2024-01-05', doctor: 'Dr. Michael Chen', type: 'Imaging' },
    { id: 3, title: 'Prescription', date: '2024-01-03', doctor: 'Dr. Emily Davis', type: 'Prescription' }
  ]);

  return (
    <div className="min-h-screen bg-healthcare-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your healthcare journey.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-healthcare-blue text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Next Appointment</p>
                  <p className="text-2xl font-bold">Jan 15</p>
                  <p className="text-blue-100">10:00 AM</p>
                </div>
                <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total Consultations</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-healthcare-green text-sm">+2 this month</p>
                </div>
                <svg className="w-8 h-8 text-healthcare-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Medical Records</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-healthcare-green text-sm">Recently updated</p>
                </div>
                <svg className="w-8 h-8 text-healthcare-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h3a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Health Score</p>
                  <p className="text-2xl font-bold text-healthcare-green">Good</p>
                  <p className="text-gray-500 text-sm">Based on checkups</p>
                </div>
                <svg className="w-8 h-8 text-healthcare-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>My Appointments</CardTitle>
                  <Button className="bg-healthcare-blue hover:bg-healthcare-blue-dark">
                    Book New Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-healthcare-blue-light rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-healthcare-blue" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                          <p className="text-gray-600">{appointment.specialty}</p>
                          <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'upcoming' 
                            ? 'bg-healthcare-blue-light text-healthcare-blue' 
                            : 'bg-healthcare-green-light text-healthcare-green'
                        }`}>
                          {appointment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        </span>
                        {appointment.status === 'upcoming' && (
                          <Button size="sm" className="bg-healthcare-blue hover:bg-healthcare-blue-dark">
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

          <TabsContent value="records">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicalRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-healthcare-blue-light rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-healthcare-blue" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h3a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{record.title}</h3>
                          <p className="text-gray-600">by {record.doctor}</p>
                          <p className="text-sm text-gray-500">{record.date} • {record.type}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors">
            <Card>
              <CardHeader>
                <CardTitle>Find Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', rating: 4.9, experience: '15 years', available: true },
                    { name: 'Dr. Michael Chen', specialty: 'Dermatology', rating: 4.8, experience: '12 years', available: true },
                    { name: 'Dr. Emily Davis', specialty: 'General Practice', rating: 4.7, experience: '8 years', available: false }
                  ].map((doctor, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-healthcare-blue-light rounded-full mx-auto mb-3 flex items-center justify-center">
                          <svg className="w-8 h-8 text-healthcare-blue" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-healthcare-blue">{doctor.specialty}</p>
                        <p className="text-sm text-gray-500">{doctor.experience} experience</p>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          doctor.available 
                            ? 'bg-healthcare-green-light text-healthcare-green' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {doctor.available ? 'Available' : 'Busy'}
                        </span>
                      </div>
                      <Button 
                        className="w-full bg-healthcare-blue hover:bg-healthcare-blue-dark" 
                        disabled={!doctor.available}
                      >
                        Book Appointment
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Medical Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-healthcare-blue transition-colors">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your medical files</h3>
                  <p className="text-gray-600 mb-4">Drag and drop files here, or click to select files</p>
                  <Button className="bg-healthcare-blue hover:bg-healthcare-blue-dark">
                    Choose Files
                  </Button>
                  <p className="text-xs text-gray-500 mt-4">Supported formats: PDF, JPG, PNG, DOCX (Max 10MB)</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;
