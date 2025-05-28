
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  UserPlus,
  Stethoscope,
  Ambulance,
  Calendar,
  Activity,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Phone,
  MapPin,
  Clock,
  Heart,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const HospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const patients = [
    { id: 1, name: 'John Doe', age: 34, condition: 'Hypertension', doctor: 'Dr. Smith', status: 'Active', lastVisit: '2024-01-15' },
    { id: 2, name: 'Jane Smith', age: 28, condition: 'Diabetes', doctor: 'Dr. Johnson', status: 'Recovered', lastVisit: '2024-01-14' },
    { id: 3, name: 'Mike Wilson', age: 45, condition: 'Heart Disease', doctor: 'Dr. Brown', status: 'Critical', lastVisit: '2024-01-16' },
  ];

  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith', specialty: 'Cardiology', experience: '15 years', status: 'Available', patients: 23 },
    { id: 2, name: 'Dr. John Johnson', specialty: 'Neurology', experience: '12 years', status: 'Busy', patients: 18 },
    { id: 3, name: 'Dr. Emily Brown', specialty: 'Pediatrics', experience: '8 years', status: 'Available', patients: 31 },
  ];

  const ambulances = [
    { id: 'AMB001', location: 'Downtown', status: 'Available', driver: 'Mark Davis', lastService: '2 hrs ago' },
    { id: 'AMB002', location: 'Suburbs', status: 'On Route', driver: 'Lisa Chen', lastService: '30 mins ago' },
    { id: 'AMB003', location: 'Hospital', status: 'Maintenance', driver: 'Tom Wilson', lastService: '1 day ago' },
  ];

  const chartData = [
    { name: 'Mon', patients: 65, appointments: 45 },
    { name: 'Tue', patients: 78, appointments: 52 },
    { name: 'Wed', patients: 82, appointments: 61 },
    { name: 'Thu', patients: 91, appointments: 68 },
    { name: 'Fri', patients: 87, appointments: 72 },
    { name: 'Sat', patients: 45, appointments: 28 },
    { name: 'Sun', patients: 32, appointments: 18 },
  ];

  const departmentData = [
    { name: 'Cardiology', value: 30, color: '#0088FE' },
    { name: 'Neurology', value: 25, color: '#00C49F' },
    { name: 'Pediatrics', value: 20, color: '#FFBB28' },
    { name: 'Orthopedics', value: 15, color: '#FF8042' },
    { name: 'Others', value: 10, color: '#8884D8' },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': case 'available': return 'bg-green-100 text-green-800';
      case 'critical': case 'emergency': return 'bg-red-100 text-red-800';
      case 'busy': case 'on route': return 'bg-yellow-100 text-yellow-800';
      case 'recovered': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hospital Management Dashboard</h1>
              <p className="text-gray-600">Welcome back, Admin</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <div className="p-6">
            <div className="space-y-2">
              <Button
                variant={activeTab === 'overview' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('overview')}
              >
                <Activity className="w-4 h-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeTab === 'patients' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('patients')}
              >
                <Users className="w-4 h-4 mr-2" />
                Patients
              </Button>
              <Button
                variant={activeTab === 'doctors' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('doctors')}
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Doctors
              </Button>
              <Button
                variant={activeTab === 'ambulances' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('ambulances')}
              >
                <Ambulance className="w-4 h-4 mr-2" />
                Ambulances
              </Button>
              <Button
                variant={activeTab === 'appointments' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('appointments')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Appointments
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Patients</p>
                        <p className="text-3xl font-bold text-blue-600">1,234</p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          +12% from last month
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Doctors</p>
                        <p className="text-3xl font-bold text-green-600">89</p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          All available
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <Stethoscope className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Emergency Cases</p>
                        <p className="text-3xl font-bold text-red-600">23</p>
                        <p className="text-sm text-red-600 flex items-center mt-1">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Needs attention
                        </p>
                      </div>
                      <div className="p-3 bg-red-100 rounded-full">
                        <Heart className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Available Ambulances</p>
                        <p className="text-3xl font-bold text-purple-600">12</p>
                        <p className="text-sm text-purple-600 flex items-center mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          Ready for dispatch
                        </p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <Ambulance className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Flow & Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="patients" stroke="#3B82F6" strokeWidth="3" />
                          <Line type="monotone" dataKey="appointments" stroke="#10B981" strokeWidth="3" />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Department Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={departmentData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {departmentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search patients..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {patients.map((patient) => (
                          <tr key={patient.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 font-medium">{patient.name.charAt(0)}</span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.condition}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.doctor}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.lastVisit}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'doctors' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Doctor Management</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Doctor
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-green-600" />
                        </div>
                        <Badge className={getStatusColor(doctor.status)}>{doctor.status}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                      <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                      <p className="text-sm text-gray-500 mb-4">{doctor.experience} experience</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{doctor.patients} patients</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ambulances' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Ambulance Fleet</h2>
                <Button className="bg-red-600 hover:bg-red-700">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Emergency Dispatch
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ambulances.map((ambulance) => (
                  <Card key={ambulance.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Ambulance className="w-6 h-6 text-red-600" />
                        </div>
                        <Badge className={getStatusColor(ambulance.status)}>{ambulance.status}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{ambulance.id}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {ambulance.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {ambulance.driver}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Last service: {ambulance.lastService}
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Track
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Dispatch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
