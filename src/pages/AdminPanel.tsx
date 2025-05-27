
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  MessageSquare, 
  Megaphone, 
  BarChart3, 
  Bell,
  Eye, 
  Check, 
  X,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AdminPanel = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@email.com', role: 'patient', status: 'active', joinDate: '2024-01-15', lastActive: '2 hours ago' },
    { id: 2, name: 'Dr. Sarah Wilson', email: 'sarah@email.com', role: 'doctor', status: 'active', joinDate: '2024-01-10', lastActive: '30 minutes ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike@email.com', role: 'patient', status: 'pending', joinDate: '2024-01-20', lastActive: '1 day ago' },
    { id: 4, name: 'Dr. Alex Chen', email: 'alex@email.com', role: 'doctor', status: 'active', joinDate: '2024-01-12', lastActive: '5 minutes ago' },
  ]);

  const [appointments] = useState([
    { id: 1, patientName: 'John Doe', doctorName: 'Dr. Sarah Wilson', date: '2024-01-25', time: '10:00 AM', status: 'confirmed', type: 'Video Call' },
    { id: 2, patientName: 'Mary Smith', doctorName: 'Dr. Alex Chen', date: '2024-01-25', time: '2:30 PM', status: 'pending', type: 'In-Person' },
    { id: 3, patientName: 'Raj Kumar', doctorName: 'Dr. Sarah Wilson', date: '2024-01-26', time: '9:00 AM', status: 'cancelled', type: 'Video Call' },
  ]);

  const [feedback] = useState([
    { id: 1, userName: 'John Doe', rating: 5, comment: 'Excellent service! Very satisfied with the consultation.', date: '2024-01-24', type: 'consultation' },
    { id: 2, userName: 'Mary Smith', rating: 4, comment: 'Good experience overall, but could improve waiting times.', date: '2024-01-23', type: 'appointment' },
    { id: 3, userName: 'Raj Kumar', rating: 5, comment: 'Amazing platform! Easy to use and very helpful.', date: '2024-01-22', type: 'platform' },
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'System Maintenance', message: 'Scheduled maintenance on Jan 30th from 2-4 AM', type: 'maintenance', date: '2024-01-25', active: true },
    { id: 2, title: 'New Feature Launch', message: 'AI Health Assistant now available for all premium users', type: 'feature', date: '2024-01-24', active: true },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    type: 'general'
  });

  const handleCreateAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.message) {
      const announcement = {
        id: announcements.length + 1,
        ...newAnnouncement,
        date: new Date().toISOString().split('T')[0],
        active: true
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', message: '', type: 'general' });
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-green-100 text-green-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getAnnouncementBadge = (type: string) => {
    const colors = {
      maintenance: 'bg-orange-100 text-orange-800',
      feature: 'bg-blue-100 text-blue-800',
      general: 'bg-gray-100 text-gray-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-${i < rating ? 'yellow' : 'gray'}-400`}>★</span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/10 via-white to-arogya-beige-yellow/5">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-arogya-dark-teal mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your healthcare platform</p>
        </div>

        {/* Quick Stats */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-arogya-dark-teal">1,247</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 text-sm">+12% this week</span>
                  </div>
                </div>
                <Users className="w-12 h-12 text-arogya-dark-green" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Doctors</p>
                  <p className="text-3xl font-bold text-arogya-dark-teal">89</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 text-sm">+3 this week</span>
                  </div>
                </div>
                <UserCheck className="w-12 h-12 text-arogya-dark-green" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                  <p className="text-3xl font-bold text-arogya-dark-teal">24</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-red-600 text-sm">-5% from yesterday</span>
                  </div>
                </div>
                <Calendar className="w-12 h-12 text-arogya-dark-green" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Health</p>
                  <p className="text-3xl font-bold text-green-600">99.8%</p>
                  <div className="flex items-center mt-2">
                    <Check className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600 text-sm">All systems operational</span>
                  </div>
                </div>
                <BarChart3 className="w-12 h-12 text-arogya-dark-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit bg-white shadow-sm">
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center space-x-2">
              <Megaphone className="w-4 h-4" />
              <span>Announcements</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
            </TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-arogya-dark-teal">User Management</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search users..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Management */}
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">Appointment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.patientName}</TableCell>
                        <TableCell>{appointment.doctorName}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Management */}
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">User Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.userName}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(item.rating)}</div>
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <p className="text-gray-700">{item.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements */}
          <TabsContent value="announcements">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-arogya-dark-teal">Create Announcement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Announcement title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Announcement message"
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})}
                    rows={4}
                  />
                  <select
                    value={newAnnouncement.type}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="general">General</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="feature">New Feature</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <Button onClick={handleCreateAnnouncement} className="w-full bg-arogya-dark-green">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Announcement
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-arogya-dark-teal">Active Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                          <Badge className={getAnnouncementBadge(announcement.type)}>
                            {announcement.type}
                          </Badge>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{announcement.message}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">{announcement.date}</span>
                          <Button variant="outline" size="sm">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-arogya-dark-teal">Platform Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">Total Consultations</span>
                      <span className="text-2xl font-bold text-arogya-dark-green">2,456</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">Blood Donations</span>
                      <span className="text-2xl font-bold text-arogya-dark-green">189</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">Emergency Calls</span>
                      <span className="text-2xl font-bold text-arogya-dark-green">124</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">User Satisfaction</span>
                      <span className="text-2xl font-bold text-arogya-dark-green">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-arogya-dark-teal">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-medium">New doctor verified</p>
                        <p className="text-xs text-gray-500">Dr. Alex Chen - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="text-sm font-medium">System backup completed</p>
                        <p className="text-xs text-gray-500">Automated - 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <div>
                        <p className="text-sm font-medium">High traffic detected</p>
                        <p className="text-xs text-gray-500">Peak hours - 6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">System Alerts & Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">Server Load Warning</p>
                      <p className="text-sm text-yellow-700">CPU usage is at 85%. Consider scaling resources.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">Scheduled Maintenance</p>
                      <p className="text-sm text-blue-700">System maintenance scheduled for tomorrow 2-4 AM.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                    <Check className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Backup Successful</p>
                      <p className="text-sm text-green-700">Daily backup completed successfully at 3:00 AM.</p>
                    </div>
                  </div>
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
