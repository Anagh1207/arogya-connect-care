import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  UserPlus, 
  Stethoscope, 
  Ambulance, 
  Activity, 
  Calendar, 
  MapPin, 
  Phone,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Building2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HospitalDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Sample data with English context
  const patientData = [
    { month: 'Jan', patients: 1200 },
    { month: 'Feb', patients: 1400 },
    { month: 'Mar', patients: 1300 },
    { month: 'Apr', patients: 1600 },
    { month: 'May', patients: 1800 },
    { month: 'Jun', patients: 1750 },
  ];

  const departmentData = [
    { name: 'Cardiology', value: 30, color: '#22C55E' },
    { name: 'Neurology', value: 25, color: '#3B82F6' },
    { name: 'Orthopedics', value: 20, color: '#F59E0B' },
    { name: 'Pediatrics', value: 15, color: '#EF4444' },
    { name: 'Others', value: 10, color: '#8B5CF6' },
  ];

  const patients = [
    { id: 1, name: 'Mr. Rahul Sharma', age: 45, department: 'Cardiology', doctor: 'Dr. Priya Gupta', status: 'admitted', bed: 'ICU-101', contact: '+91-98765-43210' },
    { id: 2, name: 'Mrs. Sunita Devi', age: 62, department: 'Neurology', doctor: 'Dr. Amit Kumar', status: 'discharged', bed: 'N/A', contact: '+91-87654-32109' },
    { id: 3, name: 'Mr. Vikas Patel', age: 28, department: 'Orthopedics', doctor: 'Dr. Rita Sharma', status: 'outpatient', bed: 'N/A', contact: '+91-76543-21098' },
    { id: 4, name: 'Mrs. Aarti Singh', age: 35, department: 'Gynecology', doctor: 'Dr. Meena Agarwal', status: 'admitted', bed: 'GEN-205', contact: '+91-65432-10987' },
  ];

  const doctors = [
    { id: 1, name: 'Dr. Priya Gupta', specialty: 'Cardiology', patients: 45, availability: 'Available', schedule: '9:00 AM - 6:00 PM', contact: '+91-98123-45678' },
    { id: 2, name: 'Dr. Amit Kumar', specialty: 'Neurology', patients: 38, availability: 'Busy', schedule: '10:00 AM - 7:00 PM', contact: '+91-87123-45679' },
    { id: 3, name: 'Dr. Rita Sharma', specialty: 'Orthopedics', patients: 42, availability: 'Available', schedule: '8:00 AM - 5:00 PM', contact: '+91-76123-45680' },
    { id: 4, name: 'Dr. Meena Agarwal', specialty: 'Gynecology', patients: 35, availability: 'On Leave', schedule: 'N/A', contact: '+91-65123-45681' },
  ];

  const ambulances = [
    { id: 1, vehicleNo: 'DL-01-AB-1234', driver: 'Mr. Ram Prasad', status: 'Available', location: 'Connaught Place', contact: '+91-98765-11111', lastService: '2024-01-10' },
    { id: 2, vehicleNo: 'DL-02-CD-5678', driver: 'Mr. Shankar Lal', status: 'On Emergency', location: 'Lajpat Nagar', contact: '+91-98765-22222', lastService: '2024-01-08' },
    { id: 3, vehicleNo: 'DL-03-EF-9012', driver: 'Mr. Mukesh Kumar', status: 'Under Maintenance', location: 'Garage', contact: '+91-98765-33333', lastService: '2024-01-05' },
    { id: 4, vehicleNo: 'DL-04-GH-3456', driver: 'Mr. Suresh Chand', status: 'Available', location: 'Sarojini Nagar', contact: '+91-98765-44444', lastService: '2024-01-12' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': case 'On Emergency': return 'bg-red-100 text-red-800';
      case 'On Leave': case 'Under Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'admitted': return 'bg-blue-100 text-blue-800';
      case 'discharged': return 'bg-green-100 text-green-800';
      case 'outpatient': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-arogya-dark-teal mb-2 flex items-center">
                <Building2 className="w-8 h-8 mr-3" />
                Hospital Management Dashboard
              </h1>
              <p className="text-gray-600">AIIMS New Delhi - Comprehensive Healthcare Management</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Today's Date</p>
              <p className="text-lg font-semibold text-arogya-dark-teal">{new Date().toLocaleDateString('en-IN')}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Patients</p>
                  <p className="text-3xl font-bold text-white">1,247</p>
                  <p className="text-green-100 text-sm">+8% this week</p>
                </div>
                <Users className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Doctors</p>
                  <p className="text-3xl font-bold text-white">89</p>
                  <p className="text-blue-100 text-sm">12 on duty</p>
                </div>
                <Stethoscope className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Ambulances</p>
                  <p className="text-3xl font-bold text-white">12</p>
                  <p className="text-orange-100 text-sm">8 available</p>
                </div>
                <Ambulance className="w-10 h-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Bed Availability</p>
                  <p className="text-3xl font-bold text-white">156/200</p>
                  <p className="text-purple-100 text-sm">78% occupied</p>
                </div>
                <Activity className="w-10 h-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit bg-white shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="patients" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Patients
            </TabsTrigger>
            <TabsTrigger value="doctors" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Doctors
            </TabsTrigger>
            <TabsTrigger value="ambulances" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Ambulances
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-arogya-dark-teal flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Patient Flow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={patientData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="patients" fill="#22C55E" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-arogya-dark-teal">Department Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white p-6 h-auto flex-col">
                    <UserPlus className="w-8 h-8 mb-2" />
                    Add New Patient
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto flex-col">
                    <Calendar className="w-8 h-8 mb-2" />
                    Book Appointment
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto flex-col">
                    <Ambulance className="w-8 h-8 mb-2" />
                    Dispatch Ambulance
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto flex-col">
                    <AlertTriangle className="w-8 h-8 mb-2" />
                    Emergency Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-arogya-dark-teal">Patient Management</CardTitle>
                  <div className="flex space-x-4">
                    <Input placeholder="Search patients..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                      <UserPlus className="w-4 h-4 mr-2" />
                      New Patient
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-arogya-light-blue rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-arogya-dark-green" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                            <p className="text-gray-600">Age: {patient.age} • {patient.department}</p>
                            <p className="text-sm text-gray-500">Doctor: {patient.doctor}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {patient.contact}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status === 'admitted' ? 'Admitted' : 
                             patient.status === 'discharged' ? 'Discharged' : 'Outpatient'}
                          </Badge>
                          {patient.bed !== 'N/A' && (
                            <span className="text-sm text-gray-600">Bed: {patient.bed}</span>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-arogya-dark-teal">Doctor Management</CardTitle>
                  <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Doctor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-gray-600">{doctor.specialty}</p>
                            <p className="text-sm text-gray-500">Patients: {doctor.patients} • {doctor.schedule}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {doctor.contact}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(doctor.availability)}>
                            {doctor.availability}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Schedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ambulances Tab */}
          <TabsContent value="ambulances" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-arogya-dark-teal">Ambulance Management</CardTitle>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Emergency Dispatch
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ambulances.map((ambulance) => (
                    <div key={ambulance.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <Ambulance className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{ambulance.vehicleNo}</h3>
                            <p className="text-gray-600">Driver: {ambulance.driver}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {ambulance.location}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {ambulance.contact}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(ambulance.status)}>
                            {ambulance.status}
                          </Badge>
                          <span className="text-xs text-gray-500">Service: {ambulance.lastService}</span>
                          <Button variant="outline" size="sm">
                            Track
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
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

export default HospitalDashboard;
