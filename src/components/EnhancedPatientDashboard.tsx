import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Heart, 
  Activity, 
  FileText, 
  Clock, 
  Star, 
  Phone, 
  Video, 
  MessageCircle,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Pill,
  Camera,
  Download,
  Bell,
  Settings,
  User,
  Shield
} from 'lucide-react';

const EnhancedPatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'video',
      status: 'confirmed',
      avatar: 'SJ',
      rating: 4.9
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: '2024-01-18',
      time: '2:30 PM',
      type: 'in-person',
      status: 'pending',
      avatar: 'MC',
      rating: 4.8
    }
  ];

  const healthMetrics = [
    {
      name: 'Heart Rate',
      value: '72 bpm',
      status: 'normal',
      change: '+2%',
      icon: <Heart className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Blood Pressure',
      value: '120/80',
      status: 'optimal',
      change: '-1%',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Weight',
      value: '68 kg',
      status: 'stable',
      change: '0%',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Sleep Quality',
      value: '7.5 hrs',
      status: 'good',
      change: '+5%',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  const medications = [
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      nextDose: '8:00 AM',
      remaining: 15,
      status: 'active'
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      nextDose: '6:00 PM',
      remaining: 8,
      status: 'low'
    },
    {
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      nextDose: '9:00 AM',
      remaining: 25,
      status: 'active'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Blood Test Results',
      date: '2024-01-10',
      doctor: 'Dr. Sarah Johnson',
      status: 'normal',
      type: 'lab'
    },
    {
      id: 2,
      name: 'Chest X-Ray',
      date: '2024-01-08',
      doctor: 'Dr. Michael Chen',
      status: 'reviewed',
      type: 'imaging'
    },
    {
      id: 3,
      name: 'ECG Report',
      date: '2024-01-05',
      doctor: 'Dr. Sarah Johnson',
      status: 'normal',
      type: 'diagnostic'
    }
  ];

  const healthGoals = [
    {
      name: 'Daily Steps',
      current: 8500,
      target: 10000,
      unit: 'steps',
      progress: 85
    },
    {
      name: 'Water Intake',
      current: 6,
      target: 8,
      unit: 'glasses',
      progress: 75
    },
    {
      name: 'Sleep Hours',
      current: 7.5,
      target: 8,
      unit: 'hours',
      progress: 94
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-arogya-dark-teal mb-2">Welcome back, John!</h1>
            <p className="text-arogya-teal">Here's your health overview for today</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-arogya-dark-green text-arogya-dark-green">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" className="border-arogya-dark-green text-arogya-dark-green">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                    <div className={metric.color}>{metric.icon}</div>
                  </div>
                  <Badge variant={metric.status === 'normal' || metric.status === 'optimal' || metric.status === 'good' || metric.status === 'stable' ? 'default' : 'destructive'}>
                    {metric.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-arogya-teal font-medium">{metric.name}</p>
                  <p className="text-2xl font-bold text-arogya-dark-teal">{metric.value}</p>
                  <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : metric.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                    {metric.change} from last week
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit bg-white shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">Appointments</TabsTrigger>
            <TabsTrigger value="medications" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">Medications</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">Reports</TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">Health Goals</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Upcoming Appointments */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-arogya-dark-green" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-arogya-light-blue/20 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-arogya-dark-green rounded-full flex items-center justify-center text-white font-semibold">
                            {appointment.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold text-arogya-dark-teal">{appointment.doctor}</h3>
                            <p className="text-sm text-arogya-teal">{appointment.specialty}</p>
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-sm text-arogya-teal">{appointment.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-arogya-dark-teal">{appointment.date}</p>
                          <p className="text-sm text-arogya-teal">{appointment.time}</p>
                          <div className="flex items-center mt-2 space-x-2">
                            <Badge variant={appointment.type === 'video' ? 'default' : 'secondary'}>
                              {appointment.type === 'video' ? <Video className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                              {appointment.type}
                            </Badge>
                            <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                              Join
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book New Appointment
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-arogya-light-blue text-arogya-dark-green hover:bg-arogya-dark-green hover:text-white">
                    <Video className="w-4 h-4 mr-2" />
                    Start Video Call
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Doctor
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Reports
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Pill className="w-4 h-4 mr-2" />
                    Medication Reminder
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Emergency Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-arogya-dark-green" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-arogya-light-blue/20 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-arogya-dark-green rounded-full flex items-center justify-center text-white font-semibold">
                          {appointment.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-arogya-dark-teal">{appointment.doctor}</h3>
                          <p className="text-sm text-arogya-teal">{appointment.specialty}</p>
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-arogya-teal">{appointment.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-arogya-dark-teal">{appointment.date}</p>
                        <p className="text-sm text-arogya-teal">{appointment.time}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge variant={appointment.type === 'video' ? 'default' : 'secondary'}>
                            {appointment.type === 'video' ? <Video className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                            {appointment.type}
                          </Badge>
                          <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                            Join
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book New Appointment
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-arogya-dark-green" />
                    Current Medications
                  </span>
                  <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    Add Medication
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((med, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          med.status === 'low' ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          <Pill className={`w-6 h-6 ${med.status === 'low' ? 'text-red-600' : 'text-green-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-arogya-dark-teal">{med.name}</h3>
                          <p className="text-sm text-arogya-teal">{med.dosage} • {med.frequency}</p>
                          <p className="text-xs text-gray-500">Next dose: {med.nextDose}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={med.status === 'low' ? 'destructive' : 'default'}>
                          {med.remaining} pills left
                        </Badge>
                        <div className="mt-2 space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                            Mark Taken
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-arogya-dark-green" />
                    Medical Reports
                  </span>
                  <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    Upload Report
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-arogya-light-blue rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-arogya-dark-green" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-arogya-dark-teal">{report.name}</h3>
                          <p className="text-sm text-arogya-teal">Dr. {report.doctor}</p>
                          <p className="text-xs text-gray-500">{report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={report.status === 'normal' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-arogya-dark-green" />
                  Health Goals Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {healthGoals.map((goal, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-arogya-dark-teal">{goal.name}</h3>
                        <span className="text-sm text-arogya-teal">
                          {goal.current} / {goal.target} {goal.unit}
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-3" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{goal.progress}% complete</span>
                        <span>{goal.target - goal.current} {goal.unit} to go</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-arogya-dark-green" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-arogya-dark-teal">Personal Information</h3>
                    <p className="text-sm text-arogya-teal">Update your personal details</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <input type="text" className="w-1/2 px-3 py-2 border rounded-md text-sm" placeholder="John Doe" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input type="email" className="w-1/2 px-3 py-2 border rounded-md text-sm" placeholder="john.doe@example.com" />
                      </div>
                      <Button className="mt-4 bg-arogya-dark-green hover:bg-arogya-light-green text-white">Update Profile</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-arogya-dark-teal">Security Settings</h3>
                    <p className="text-sm text-arogya-teal">Change your password and manage security preferences</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input type="password" className="w-1/2 px-3 py-2 border rounded-md text-sm" placeholder="********" />
                      </div>
                      <Button className="mt-4 bg-arogya-dark-green hover:bg-arogya-light-green text-white">Change Password</Button>
                    </div>
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

export default EnhancedPatientDashboard;
