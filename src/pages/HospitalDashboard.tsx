
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

  // Sample data with Indian context
  const patientData = [
    { month: 'जन', patients: 1200 },
    { month: 'फर', patients: 1400 },
    { month: 'मार', patients: 1300 },
    { month: 'अप्र', patients: 1600 },
    { month: 'मई', patients: 1800 },
    { month: 'जून', patients: 1750 },
  ];

  const departmentData = [
    { name: 'कार्डियोलॉजी', value: 30, color: '#22C55E' },
    { name: 'न्यूरोलॉजी', value: 25, color: '#3B82F6' },
    { name: 'ऑर्थोपेडिक्स', value: 20, color: '#F59E0B' },
    { name: 'पीडियाट्रिक्स', value: 15, color: '#EF4444' },
    { name: 'अन्य', value: 10, color: '#8B5CF6' },
  ];

  const patients = [
    { id: 1, name: 'श्री राहुल शर्मा', age: 45, department: 'कार्डियोलॉजी', doctor: 'डॉ. प्रिया गुप्ता', status: 'admitted', bed: 'ICU-101', contact: '+91-98765-43210' },
    { id: 2, name: 'श्रीमती सुनीता देवी', age: 62, department: 'न्यूरोलॉजी', doctor: 'डॉ. अमित कुमार', status: 'discharged', bed: 'N/A', contact: '+91-87654-32109' },
    { id: 3, name: 'श्री विकास पटेल', age: 28, department: 'ऑर्थोपेडिक्स', doctor: 'डॉ. रीता शर्मा', status: 'outpatient', bed: 'N/A', contact: '+91-76543-21098' },
    { id: 4, name: 'श्रीमती आरती सिंह', age: 35, department: 'गायनेकोलॉजी', doctor: 'डॉ. मीना अग्रवाल', status: 'admitted', bed: 'GEN-205', contact: '+91-65432-10987' },
  ];

  const doctors = [
    { id: 1, name: 'डॉ. प्रिया गुप्ता', specialty: 'कार्डियोलॉजी', patients: 45, availability: 'उपलब्ध', schedule: '9:00 AM - 6:00 PM', contact: '+91-98123-45678' },
    { id: 2, name: 'डॉ. अमित कुमार', specialty: 'न्यूरोलॉजी', patients: 38, availability: 'व्यस्त', schedule: '10:00 AM - 7:00 PM', contact: '+91-87123-45679' },
    { id: 3, name: 'डॉ. रीता शर्मा', specialty: 'ऑर्थोपेडिक्स', patients: 42, availability: 'उपलब्ध', schedule: '8:00 AM - 5:00 PM', contact: '+91-76123-45680' },
    { id: 4, name: 'डॉ. मीना अग्रवाल', specialty: 'गायनेकोलॉजी', patients: 35, availability: 'छुट्टी पर', schedule: 'N/A', contact: '+91-65123-45681' },
  ];

  const ambulances = [
    { id: 1, vehicleNo: 'DL-01-AB-1234', driver: 'श्री राम प्रसाद', status: 'उपलब्ध', location: 'कनॉट प्लेस', contact: '+91-98765-11111', lastService: '2024-01-10' },
    { id: 2, vehicleNo: 'DL-02-CD-5678', driver: 'श्री शंकर लाल', status: 'इमरजेंसी में', location: 'लाजपत नगर', contact: '+91-98765-22222', lastService: '2024-01-08' },
    { id: 3, vehicleNo: 'DL-03-EF-9012', driver: 'श्री मुकेश कुमार', status: 'मेंटेनेंस में', location: 'गैरेज', contact: '+91-98765-33333', lastService: '2024-01-05' },
    { id: 4, vehicleNo: 'DL-04-GH-3456', driver: 'श्री सुरेश चंद', status: 'उपलब्ध', location: 'सरोजिनी नगर', contact: '+91-98765-44444', lastService: '2024-01-12' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'उपलब्ध': return 'bg-green-100 text-green-800';
      case 'व्यस्त': case 'इमरजेंसी में': return 'bg-red-100 text-red-800';
      case 'छुट्टी पर': case 'मेंटेनेंस में': return 'bg-yellow-100 text-yellow-800';
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
                अस्पताल प्रबंधन डैशबोर्ड
              </h1>
              <p className="text-gray-600">AIIMS नई दिल्ली - व्यापक स्वास्थ्य देखभाल प्रबंधन</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">आज की तारीख</p>
              <p className="text-lg font-semibold text-arogya-dark-teal">{new Date().toLocaleDateString('hi-IN')}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">कुल मरीज़</p>
                  <p className="text-3xl font-bold text-white">1,247</p>
                  <p className="text-green-100 text-sm">+8% इस सप्ताह</p>
                </div>
                <Users className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">डॉक्टर</p>
                  <p className="text-3xl font-bold text-white">89</p>
                  <p className="text-blue-100 text-sm">12 ऑन ड्यूटी</p>
                </div>
                <Stethoscope className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">एम्बुलेंस</p>
                  <p className="text-3xl font-bold text-white">12</p>
                  <p className="text-orange-100 text-sm">8 उपलब्ध</p>
                </div>
                <Ambulance className="w-10 h-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">बेड उपलब्धता</p>
                  <p className="text-3xl font-bold text-white">156/200</p>
                  <p className="text-purple-100 text-sm">78% भरे हुए</p>
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
              ओवरव्यू
            </TabsTrigger>
            <TabsTrigger value="patients" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              मरीज़
            </TabsTrigger>
            <TabsTrigger value="doctors" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              डॉक्टर
            </TabsTrigger>
            <TabsTrigger value="ambulances" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">
              एम्बुलेंस
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-arogya-dark-teal flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    मरीज़ों का प्रवाह
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
                  <CardTitle className="text-arogya-dark-teal">विभागीय वितरण</CardTitle>
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
                <CardTitle className="text-arogya-dark-teal">त्वरित कार्य</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white p-6 h-auto flex-col">
                    <UserPlus className="w-8 h-8 mb-2" />
                    नया मरीज़ जोड़ें
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto flex-col">
                    <Calendar className="w-8 h-8 mb-2" />
                    अपॉइंटमेंट बुक करें
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto flex-col">
                    <Ambulance className="w-8 h-8 mb-2" />
                    एम्बुलेंस भेजें
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto flex-col">
                    <AlertTriangle className="w-8 h-8 mb-2" />
                    इमरजेंसी अलर्ट
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
                  <CardTitle className="text-arogya-dark-teal">मरीज़ प्रबंधन</CardTitle>
                  <div className="flex space-x-4">
                    <Input placeholder="मरीज़ खोजें..." className="w-64" />
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="विभाग चुनें" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">कार्डियोलॉजी</SelectItem>
                        <SelectItem value="neurology">न्यूरोलॉजी</SelectItem>
                        <SelectItem value="orthopedics">ऑर्थोपेडिक्स</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                      <UserPlus className="w-4 h-4 mr-2" />
                      नया मरीज़
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
                            <p className="text-gray-600">उम्र: {patient.age} • {patient.department}</p>
                            <p className="text-sm text-gray-500">डॉक्टर: {patient.doctor}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {patient.contact}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status === 'admitted' ? 'भर्ती' : 
                             patient.status === 'discharged' ? 'छुट्टी' : 'बाह्य रोगी'}
                          </Badge>
                          {patient.bed !== 'N/A' && (
                            <span className="text-sm text-gray-600">बेड: {patient.bed}</span>
                          )}
                          <Button variant="outline" size="sm">
                            विवरण देखें
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
                  <CardTitle className="text-arogya-dark-teal">डॉक्टर प्रबंधन</CardTitle>
                  <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    नया डॉक्टर जोड़ें
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
                            <p className="text-sm text-gray-500">मरीज़: {doctor.patients} • {doctor.schedule}</p>
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
                            शेड्यूल देखें
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
                  <CardTitle className="text-arogya-dark-teal">एम्बुलेंस प्रबंधन</CardTitle>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    इमरजेंसी भेजें
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
                            <p className="text-gray-600">चालक: {ambulance.driver}</p>
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
                          <span className="text-xs text-gray-500">सर्विस: {ambulance.lastService}</span>
                          <Button variant="outline" size="sm">
                            ट्रैक करें
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
