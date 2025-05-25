
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, Ambulance, BarChart3, Eye, Check, X } from 'lucide-react';

const AdminPanel = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@email.com', role: 'patient', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Dr. Sarah Wilson', email: 'sarah@email.com', role: 'doctor', status: 'active', joinDate: '2024-01-10' },
    { id: 3, name: 'Mike Johnson', email: 'mike@email.com', role: 'donor', status: 'pending', joinDate: '2024-01-20' },
    { id: 4, name: 'Dr. Alex Chen', email: 'alex@email.com', role: 'doctor', status: 'active', joinDate: '2024-01-12' },
  ]);

  const [bloodDonors] = useState([
    { id: 1, name: 'Mike Johnson', bloodGroup: 'O+', location: 'Mumbai', phone: '+91-9876543210', status: 'pending', verificationDate: '2024-01-20' },
    { id: 2, name: 'Priya Sharma', bloodGroup: 'A+', location: 'Delhi', phone: '+91-9876543211', status: 'verified', verificationDate: '2024-01-18' },
    { id: 3, name: 'Raj Patel', bloodGroup: 'B-', location: 'Bangalore', phone: '+91-9876543212', status: 'pending', verificationDate: '2024-01-22' },
  ]);

  const [ambulanceRequests] = useState([
    { id: 1, patientName: 'John Doe', location: 'Andheri, Mumbai', requestTime: '2024-01-25 14:30', status: 'completed', priority: 'high' },
    { id: 2, patientName: 'Mary Smith', location: 'CP, Delhi', requestTime: '2024-01-25 16:45', status: 'in-progress', priority: 'medium' },
    { id: 3, patientName: 'Raj Kumar', location: 'Koramangala, Bangalore', requestTime: '2024-01-25 18:20', status: 'pending', priority: 'high' },
  ]);

  const handleVerifyDonor = (donorId: number) => {
    console.log(`Verifying donor ${donorId}`);
  };

  const handleRejectDonor = (donorId: number) => {
    console.log(`Rejecting donor ${donorId}`);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      'in-progress': 'bg-orange-100 text-orange-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#c9e6e8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#013c22' }}>Admin Panel</h1>
          <p className="text-gray-600">Manage users, verify donors, and monitor platform activities</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold" style={{ color: '#013c22' }}>1,247</p>
                  <p className="text-green-600 text-sm">+12 this week</p>
                </div>
                <Users className="w-8 h-8" style={{ color: '#093e43' }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Active Doctors</p>
                  <p className="text-2xl font-bold" style={{ color: '#013c22' }}>89</p>
                  <p className="text-green-600 text-sm">+3 this week</p>
                </div>
                <UserCheck className="w-8 h-8" style={{ color: '#093e43' }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Blood Donors</p>
                  <p className="text-2xl font-bold" style={{ color: '#013c22' }}>342</p>
                  <p className="text-yellow-600 text-sm">5 pending</p>
                </div>
                <UserCheck className="w-8 h-8" style={{ color: '#093e43' }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Emergency Requests</p>
                  <p className="text-2xl font-bold" style={{ color: '#013c22' }}>28</p>
                  <p className="text-orange-600 text-sm">3 active</p>
                </div>
                <Ambulance className="w-8 h-8" style={{ color: '#093e43' }} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="donors">Blood Donors</TabsTrigger>
            <TabsTrigger value="ambulance">Ambulance Logs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#013c22' }}>User Management</CardTitle>
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
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">
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

          <TabsContent value="donors">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#013c22' }}>Blood Donor Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Blood Group</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bloodDonors.map((donor) => (
                      <TableRow key={donor.id}>
                        <TableCell className="font-medium">{donor.name}</TableCell>
                        <TableCell>
                          <Badge style={{ backgroundColor: '#093e43', color: 'white' }}>
                            {donor.bloodGroup}
                          </Badge>
                        </TableCell>
                        <TableCell>{donor.location}</TableCell>
                        <TableCell>{donor.phone}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(donor.status)}>
                            {donor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {donor.status === 'pending' ? (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleVerifyDonor(donor.id)}
                                style={{ backgroundColor: '#013c22', color: 'white' }}
                                className="hover:opacity-90"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Verify
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectDonor(donor.id)}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ambulance">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#013c22' }}>Ambulance Request Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Request Time</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ambulanceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.patientName}</TableCell>
                        <TableCell>{request.location}</TableCell>
                        <TableCell>{request.requestTime}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityBadge(request.priority)}>
                            {request.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(request.status)}>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: '#013c22' }}>Platform Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">Total Appointments</span>
                      <span className="text-2xl font-bold" style={{ color: '#093e43' }}>456</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">Blood Requests</span>
                      <span className="text-2xl font-bold" style={{ color: '#093e43' }}>89</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">Ambulance Calls</span>
                      <span className="text-2xl font-bold" style={{ color: '#093e43' }}>124</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <span className="font-medium">Reports Uploaded</span>
                      <span className="text-2xl font-bold" style={{ color: '#093e43' }}>678</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle style={{ color: '#013c22' }}>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#013c22' }}></div>
                      <div>
                        <p className="text-sm font-medium">New doctor registered</p>
                        <p className="text-xs text-gray-500">Dr. Alex Chen - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#093e43' }}></div>
                      <div>
                        <p className="text-sm font-medium">Blood donor verified</p>
                        <p className="text-xs text-gray-500">Priya Sharma - 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div>
                        <p className="text-sm font-medium">Emergency ambulance request</p>
                        <p className="text-xs text-gray-500">John Doe - 6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
