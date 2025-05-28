
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from './Header';
import Footer from './Footer';
import SubscriptionUpgrade from './SubscriptionUpgrade';

const DoctorDashboard = () => {
  const [showUpgrade, setShowUpgrade] = useState(true);
  
  const [appointments] = useState([
    { id: 1, patient: 'श्री राहुल शर्मा', age: 45, time: '10:00 AM', type: 'Follow-up', status: 'upcoming', location: 'दिल्ली' },
    { id: 2, patient: 'श्रीमती प्रिया पटेल', age: 32, time: '11:30 AM', type: 'Consultation', status: 'upcoming', location: 'मुंबई' },
    { id: 3, patient: 'श्री अमित कुमार', age: 28, time: '2:00 PM', type: 'Check-up', status: 'upcoming', location: 'बैंगलोर' },
    { id: 4, patient: 'श्रीमती सुनीता देवी', age: 55, time: '9:00 AM', type: 'Consultation', status: 'completed', location: 'कोलकाता' }
  ]);

  const [patients] = useState([
    { id: 1, name: 'श्री राहुल शर्मा', age: 45, lastVisit: '2024-01-08', condition: 'उच्च रक्तचाप', status: 'stable' },
    { id: 2, name: 'श्रीमती प्रिया पटेल', age: 32, lastVisit: '2024-01-10', condition: 'चिंता विकार', status: 'improving' },
    { id: 3, name: 'श्री अमित कुमार', age: 28, lastVisit: '2024-01-12', condition: 'एलर्जी', status: 'new' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-arogya-dark-teal mb-2">नमस्कार, डॉ. प्रिया शर्मा जी!</h1>
          <p className="text-gray-600">Welcome back! Manage your practice efficiently and serve patients better.</p>
        </div>

        {/* Subscription upgrade banner */}
        {showUpgrade && (
          <SubscriptionUpgrade 
            variant="banner" 
            context="ai-features"
            onClose={() => setShowUpgrade(false)}
          />
        )}

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-arogya-dark-green text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">आज के अपॉइंटमेंट</p>
                  <p className="text-2xl font-bold text-white">8</p>
                  <p className="text-green-100">3 completed</p>
                </div>
                <svg className="w-8 h-8 text-green-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">सक्रिय मरीज़</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-arogya-dark-green text-sm">+12 this week</p>
                </div>
                <svg className="w-8 h-8 text-arogya-dark-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">मासिक आय</p>
                  <p className="text-2xl font-bold text-gray-900">₹2,45,000</p>
                  <p className="text-arogya-dark-green text-sm">+8.2% increase</p>
                </div>
                <svg className="w-8 h-8 text-arogya-dark-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h10z" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">रेटिंग</p>
                  <p className="text-2xl font-bold text-arogya-dark-green">4.9</p>
                  <p className="text-gray-500 text-sm">89 reviews से</p>
                </div>
                <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="appointments">अपॉइंटमेंट</TabsTrigger>
            <TabsTrigger value="patients">मरीज़</TabsTrigger>
            <TabsTrigger value="schedule">समय सारणी</TabsTrigger>
            <TabsTrigger value="reports">रिपोर्ट</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-arogya-dark-teal">आज के अपॉइंटमेंट</CardTitle>
                  <Button className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                    नया अपॉइंटमेंट जोड़ें
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-arogya-light-blue rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-arogya-dark-green" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.patient}</h3>
                          <p className="text-gray-600">उम्र: {appointment.age} • {appointment.type}</p>
                          <p className="text-sm text-gray-500">{appointment.time} • {appointment.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'upcoming' 
                            ? 'bg-arogya-light-blue text-arogya-dark-green' 
                            : 'bg-green-100 text-arogya-dark-green'
                        }`}>
                          {appointment.status === 'upcoming' ? 'आगामी' : 'पूर्ण'}
                        </span>
                        {appointment.status === 'upcoming' && (
                          <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                            कॉल शुरू करें
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>मरीज़ प्रबंधन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-arogya-light-blue rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-arogya-dark-green" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                          <p className="text-gray-600">उम्र: {patient.age} • {patient.condition}</p>
                          <p className="text-sm text-gray-500">अंतिम भेंट: {patient.lastVisit}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'stable' ? 'bg-green-100 text-arogya-dark-green' :
                          patient.status === 'improving' ? 'bg-blue-100 text-blue-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {patient.status === 'stable' ? 'स्थिर' : 
                           patient.status === 'improving' ? 'सुधार' : 'नया'}
                        </span>
                        <Button variant="outline" size="sm">
                          रिकॉर्ड देखें
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>समय सारणी प्रबंधन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">उपलब्ध समय</h3>
                    <div className="space-y-3">
                      {['सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार'].map((day) => (
                        <div key={day} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <span className="font-medium text-gray-900">{day}</span>
                          <span className="text-gray-600">9:00 AM - 5:00 PM</span>
                          <Button variant="outline" size="sm">संपादित करें</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">छुट्टी के अनुरोध</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-arogya-light-blue rounded-lg">
                        <p className="font-medium text-gray-900">कोई छुट्टी निर्धारित नहीं</p>
                        <p className="text-gray-600 text-sm">आप अगले 30 दिनों के लिए उपलब्ध हैं</p>
                      </div>
                      <Button className="w-full bg-arogya-dark-green hover:bg-arogya-light-green text-white">
                        छुट्टी का अनुरोध करें
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>प्रैक्टिस एनालिटिक्स</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-arogya-light-blue rounded-lg">
                    <h3 className="text-2xl font-bold text-arogya-dark-teal mb-2">156</h3>
                    <p className="text-gray-600">कुल मरीज़</p>
                    <p className="text-sm text-arogya-dark-green mt-1">+12% इस महीने</p>
                  </div>
                  <div className="text-center p-6 bg-green-100 rounded-lg">
                    <h3 className="text-2xl font-bold text-green-900 mb-2">89%</h3>
                    <p className="text-gray-600">मरीज़ संतुष्टि</p>
                    <p className="text-sm text-green-700 mt-1">+5% सुधार</p>
                  </div>
                  <div className="text-center p-6 bg-yellow-100 rounded-lg">
                    <h3 className="text-2xl font-bold text-yellow-600 mb-2">32</h3>
                    <p className="text-gray-600">औसत परामर्श/सप्ताह</p>
                    <p className="text-sm text-green-700 mt-1">अनुकूल कार्यभार</p>
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

export default DoctorDashboard;
