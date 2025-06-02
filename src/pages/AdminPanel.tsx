
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  UserPlus, 
  Stethoscope, 
  Building2, 
  Shield,
  BarChart3,
  Settings
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAdminData } from '@/hooks/useAdminData';
import { useAuth } from '@/hooks/useAuth';

const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const { users, stats, loading } = useAdminData();
  const { profile } = useAuth();

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'hospital': return 'bg-purple-100 text-purple-800';
      case 'patient': return 'bg-green-100 text-green-800';
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
                <Shield className="w-8 h-8 mr-3" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600">System Management & Analytics</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Administrator</p>
              <p className="text-lg font-semibold text-arogya-dark-teal">{profile?.full_name}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Users</p>
                  <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                  <p className="text-green-100 text-sm">all users</p>
                </div>
                <Users className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Patients</p>
                  <p className="text-3xl font-bold text-white">{stats.totalPatients}</p>
                  <p className="text-blue-100 text-sm">registered</p>
                </div>
                <Users className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Doctors</p>
                  <p className="text-3xl font-bold text-white">{stats.totalDoctors}</p>
                  <p className="text-purple-100 text-sm">verified</p>
                </div>
                <Stethoscope className="w-10 h-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Hospitals</p>
                  <p className="text-3xl font-bold text-white">{stats.totalHospitals}</p>
                  <p className="text-orange-100 text-sm">registered</p>
                </div>
                <Building2 className="w-10 h-10 text-orange-200" />
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
            <TabsTrigger value="users" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white p-6 h-auto flex-col">
                    <UserPlus className="w-8 h-8 mb-2" />
                    Add New User
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto flex-col">
                    <BarChart3 className="w-8 h-8 mb-2" />
                    View Analytics
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto flex-col">
                    <Settings className="w-8 h-8 mb-2" />
                    System Settings
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto flex-col">
                    <Shield className="w-8 h-8 mb-2" />
                    Security Audit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-arogya-dark-teal">User Management</CardTitle>
                  <div className="flex space-x-4">
                    <Input placeholder="Search users..." className="w-64" />
                    <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-arogya-light-blue rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-arogya-dark-green" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{user.full_name}</h3>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-500">
                              Joined: {new Date(user.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                          <Badge className={user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">System Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Advanced analytics coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">System settings panel coming soon</p>
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
