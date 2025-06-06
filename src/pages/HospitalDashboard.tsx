
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
  Ambulance, 
  Activity, 
  Building2
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useHospitalData } from '@/hooks/useHospitalData';
import { useAuth } from '@/hooks/useAuth';

const HospitalDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const { doctors, stats, loading } = useHospitalData();
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
                {profile?.full_name || 'Hospital'} Dashboard
              </h1>
              <p className="text-gray-600">Comprehensive Healthcare Management</p>
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
                  <p className="text-3xl font-bold text-white">{stats.totalPatients}</p>
                  <p className="text-green-100 text-sm">registered patients</p>
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
                  <p className="text-3xl font-bold text-white">{stats.totalDoctors}</p>
                  <p className="text-blue-100 text-sm">on staff</p>
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
                  <p className="text-3xl font-bold text-white">{stats.totalAmbulances}</p>
                  <p className="text-orange-100 text-sm">available</p>
                </div>
                <Ambulance className="w-10 h-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Bed Occupancy</p>
                  <p className="text-3xl font-bold text-white">{stats.bedOccupancy}%</p>
                  <p className="text-purple-100 text-sm">occupied</p>
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
            <TabsTrigger value="doctors" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Doctors
            </TabsTrigger>
            <TabsTrigger value="patients" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Patients
            </TabsTrigger>
            <TabsTrigger value="ambulances" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              Ambulances
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white p-6 h-auto flex-col">
                    <UserPlus className="w-8 h-8 mb-2" />
                    Add New Doctor
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto flex-col">
                    <Users className="w-8 h-8 mb-2" />
                    Manage Patients
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto flex-col">
                    <Ambulance className="w-8 h-8 mb-2" />
                    Dispatch Ambulance
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto flex-col">
                    <Activity className="w-8 h-8 mb-2" />
                    View Analytics
                  </Button>
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
                {doctors.length === 0 ? (
                  <div className="text-center py-8">
                    <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No doctors registered yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {doctors.map((doctor) => (
                      <div key={doctor.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Stethoscope className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{doctor.full_name}</h3>
                              <p className="text-gray-600">{doctor.specialization}</p>
                              <p className="text-sm text-gray-500">Experience: {doctor.experience_years} years</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className="bg-green-100 text-green-800">
                              Rating: {doctor.rating.toFixed(1)}
                            </Badge>
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-arogya-dark-teal">Patient Management</CardTitle>
                  <Input placeholder="Search patients..." className="w-64" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Patient management features coming soon</p>
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
                    <Ambulance className="w-4 h-4 mr-2" />
                    Add Ambulance
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Ambulance className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Ambulance management features coming soon</p>
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
