
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Calendar, 
  User, 
  Activity, 
  Heart, 
  Thermometer,
  Droplets,
  Weight,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Camera,
  Mic,
  Brain,
  Pill,
  Stethoscope,
  Plus,
  Filter,
  Search
} from 'lucide-react';

const MyHealthRecords = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const healthRecords = [
    {
      id: 1,
      title: 'Annual Physical Exam',
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      type: 'Physical Exam',
      status: 'completed',
      category: 'routine',
      summary: 'Overall health is excellent. Blood pressure and heart rate normal.',
      attachments: ['blood_test.pdf', 'ecg_report.pdf'],
      aiAnalysis: 'All vital signs within normal ranges. Recommend continued healthy lifestyle.'
    },
    {
      id: 2,
      title: 'Blood Work Results',
      date: '2024-01-12',
      doctor: 'Dr. Michael Chen',
      type: 'Lab Results',
      status: 'reviewed',
      category: 'lab',
      summary: 'Complete blood count and metabolic panel results.',
      attachments: ['complete_blood_count.pdf'],
      aiAnalysis: 'Cholesterol levels slightly elevated. Recommend dietary modifications.'
    },
    {
      id: 3,
      title: 'Chest X-Ray',
      date: '2024-01-10',
      doctor: 'Dr. Emily Rodriguez',
      type: 'Imaging',
      status: 'normal',
      category: 'imaging',
      summary: 'Routine chest X-ray for annual physical.',
      attachments: ['chest_xray.jpg'],
      aiAnalysis: 'Clear lungs, no abnormalities detected.'
    },
    {
      id: 4,
      title: 'Vaccination Record',
      date: '2024-01-08',
      doctor: 'Dr. James Wilson',
      type: 'Immunization',
      status: 'completed',
      category: 'vaccination',
      summary: 'COVID-19 booster and flu shot administered.',
      attachments: ['vaccination_card.pdf'],
      aiAnalysis: 'Immunization schedule up to date.'
    }
  ];

  const vitalSigns = [
    { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', icon: <Heart className="w-5 h-5" />, color: 'text-green-600', bgColor: 'bg-green-100' },
    { name: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', icon: <Activity className="w-5 h-5" />, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { name: 'Temperature', value: '98.6', unit: '°F', status: 'normal', icon: <Thermometer className="w-5 h-5" />, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { name: 'Weight', value: '68', unit: 'kg', status: 'stable', icon: <Weight className="w-5 h-5" />, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { name: 'Blood Sugar', value: '95', unit: 'mg/dL', status: 'normal', icon: <Droplets className="w-5 h-5" />, color: 'text-red-600', bgColor: 'bg-red-100' },
    { name: 'Oxygen Saturation', value: '98', unit: '%', status: 'excellent', icon: <Stethoscope className="w-5 h-5" />, color: 'text-teal-600', bgColor: 'bg-teal-100' }
  ];

  const medications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2024-01-01', status: 'active' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2023-12-15', status: 'active' },
    { name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily', startDate: '2023-11-01', status: 'active' }
  ];

  const allergies = [
    { allergen: 'Penicillin', severity: 'Severe', reaction: 'Anaphylaxis', date: '2020-03-15' },
    { allergen: 'Shellfish', severity: 'Moderate', reaction: 'Hives, swelling', date: '2019-08-22' }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      completed: 'bg-green-100 text-green-800',
      reviewed: 'bg-blue-100 text-blue-800',
      normal: 'bg-emerald-100 text-emerald-800',
      pending: 'bg-yellow-100 text-yellow-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      routine: <User className="w-4 h-4" />,
      lab: <FileText className="w-4 h-4" />,
      imaging: <Camera className="w-4 h-4" />,
      vaccination: <Pill className="w-4 h-4" />,
      emergency: <AlertCircle className="w-4 h-4" />
    };
    return icons[category as keyof typeof icons] || <FileText className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-arogya-dark-teal mb-2">My Health Records</h1>
            <p className="text-arogya-teal">Comprehensive view of your medical history and health data</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white shadow-md">
              <Upload className="w-4 h-4 mr-2" />
              Upload Record
            </Button>
            <Button variant="outline" className="border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-light-blue/50">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit bg-white shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="records" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">Records</TabsTrigger>
            <TabsTrigger value="vitals" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">Vital Signs</TabsTrigger>
            <TabsTrigger value="medications" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">Medications</TabsTrigger>
            <TabsTrigger value="allergies" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">Allergies</TabsTrigger>
            <TabsTrigger value="ai-insights" className="data-[state=active]:bg-arogya-dark-green data-[state=active]:text-white">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Records */}
              <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-arogya-dark-green" />
                    Recent Health Records
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {healthRecords.slice(0, 3).map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 bg-arogya-light-blue/20 rounded-xl hover:bg-arogya-light-blue/30 transition-colors duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-arogya-dark-green/10 rounded-xl flex items-center justify-center">
                            {getCategoryIcon(record.category)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-arogya-dark-teal">{record.title}</h3>
                            <p className="text-sm text-arogya-teal">{record.doctor} • {record.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusBadge(record.status)}>
                            {record.status}
                          </Badge>
                          <Button size="sm" variant="outline" className="border-arogya-dark-green text-arogya-dark-green">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    View All Records
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Health Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-arogya-dark-green to-arogya-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-arogya-dark-teal">Excellent</h3>
                    <p className="text-arogya-teal">Overall Health Score</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-arogya-teal">Health Goals</span>
                        <span className="text-sm text-arogya-teal">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-arogya-dark-green">24</p>
                        <p className="text-xs text-arogya-teal">Total Records</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-arogya-dark-green">3</p>
                        <p className="text-xs text-arogya-teal">Active Medications</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="records">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-arogya-dark-green" />
                    All Health Records
                  </CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-arogya-dark-green focus:border-transparent"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthRecords.map((record) => (
                    <div key={record.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:border-arogya-light-blue">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-arogya-light-blue rounded-xl flex items-center justify-center">
                            {getCategoryIcon(record.category)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-arogya-dark-teal">{record.title}</h3>
                            <p className="text-arogya-teal">{record.doctor} • {record.type}</p>
                            <p className="text-sm text-gray-500">{record.date}</p>
                          </div>
                        </div>
                        <Badge className={getStatusBadge(record.status)}>
                          {record.status}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{record.summary}</p>
                      
                      {record.aiAnalysis && (
                        <div className="bg-arogya-light-blue/20 rounded-lg p-4 mb-4">
                          <div className="flex items-center mb-2">
                            <Brain className="w-4 h-4 text-arogya-dark-green mr-2" />
                            <span className="font-medium text-arogya-dark-green">AI Analysis</span>
                          </div>
                          <p className="text-sm text-arogya-teal">{record.aiAnalysis}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          {record.attachments.map((attachment, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {attachment}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vitalSigns.map((vital, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${vital.bgColor}`}>
                        <div className={vital.color}>{vital.icon}</div>
                      </div>
                      <Badge variant={vital.status === 'normal' || vital.status === 'excellent' || vital.status === 'stable' ? 'default' : 'destructive'}>
                        {vital.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-arogya-teal mb-2">{vital.name}</p>
                      <p className="text-3xl font-bold text-arogya-dark-teal">
                        {vital.value}
                        <span className="text-lg text-arogya-teal ml-1">{vital.unit}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medications">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-arogya-dark-green" />
                    Current Medications
                  </span>
                  <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Medication
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((med, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-arogya-light-blue rounded-xl flex items-center justify-center">
                          <Pill className="w-6 h-6 text-arogya-dark-green" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-arogya-dark-teal">{med.name}</h3>
                          <p className="text-sm text-arogya-teal">{med.dosage} • {med.frequency}</p>
                          <p className="text-xs text-gray-500">Started: {med.startDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-green-100 text-green-800">{med.status}</Badge>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allergies">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                    Known Allergies
                  </span>
                  <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Allergy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-red-800">{allergy.allergen}</h3>
                          <p className="text-sm text-red-600">{allergy.reaction}</p>
                          <p className="text-xs text-red-500">Identified: {allergy.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={allergy.severity === 'Severe' ? 'bg-red-600 text-white' : 'bg-yellow-100 text-yellow-800'}>
                          {allergy.severity}
                        </Badge>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-arogya-dark-green" />
                    Health Trends Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">Positive Trend</span>
                      </div>
                      <p className="text-sm text-green-700">Your blood pressure has been consistently stable over the past 6 months.</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center mb-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-medium text-yellow-800">Attention Needed</span>
                      </div>
                      <p className="text-sm text-yellow-700">Cholesterol levels showing slight upward trend. Consider dietary consultation.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-arogya-dark-green" />
                    Personalized Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-arogya-light-blue/20 rounded-lg">
                      <h4 className="font-medium text-arogya-dark-teal mb-2">Exercise Recommendation</h4>
                      <p className="text-sm text-arogya-teal">Based on your health profile, 30 minutes of moderate cardio 3x weekly would be beneficial.</p>
                    </div>
                    
                    <div className="p-4 bg-arogya-light-blue/20 rounded-lg">
                      <h4 className="font-medium text-arogya-dark-teal mb-2">Nutrition Suggestion</h4>
                      <p className="text-sm text-arogya-teal">Increase omega-3 rich foods to help with cholesterol management.</p>
                    </div>
                    
                    <div className="p-4 bg-arogya-light-blue/20 rounded-lg">
                      <h4 className="font-medium text-arogya-dark-teal mb-2">Preventive Care</h4>
                      <p className="text-sm text-arogya-teal">Schedule your annual eye exam - it's been 14 months since your last visit.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyHealthRecords;
