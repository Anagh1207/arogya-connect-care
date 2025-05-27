
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Ambulance, 
  Heart, 
  AlertTriangle, 
  Stethoscope,
  Users,
  Shield,
  Zap,
  Navigation,
  HeartHandshake,
  Activity,
  Truck,
  Hospital,
  PhoneCall,
  MessageCircle,
  Video,
  UserCheck,
  Timer,
  Star
} from 'lucide-react';

const EmergencyServices = () => {
  const [emergencyType, setEmergencyType] = useState<string | null>(null);
  const [location, setLocation] = useState('');

  const emergencyTypes = [
    {
      id: 'cardiac',
      title: 'Cardiac Emergency',
      description: 'Heart attack, chest pain, cardiac arrest',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-red-500 to-red-600',
      urgency: 'Critical',
      responseTime: '3-5 min'
    },
    {
      id: 'accident',
      title: 'Accident & Trauma',
      description: 'Motor accidents, falls, injuries',
      icon: <Ambulance className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      urgency: 'High',
      responseTime: '5-8 min'
    },
    {
      id: 'breathing',
      title: 'Breathing Emergency',
      description: 'Asthma attack, choking, breathing difficulties',
      icon: <Activity className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      urgency: 'Critical',
      responseTime: '3-5 min'
    },
    {
      id: 'stroke',
      title: 'Stroke Emergency',
      description: 'Signs of stroke, loss of consciousness',
      icon: <Stethoscope className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      urgency: 'Critical',
      responseTime: '3-5 min'
    },
    {
      id: 'poisoning',
      title: 'Poisoning',
      description: 'Drug overdose, chemical exposure, food poisoning',
      icon: <AlertTriangle className="w-8 h-8" />,
      color: 'from-yellow-500 to-yellow-600',
      urgency: 'High',
      responseTime: '5-8 min'
    },
    {
      id: 'general',
      title: 'General Emergency',
      description: 'Other medical emergencies',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      urgency: 'Medium',
      responseTime: '8-12 min'
    }
  ];

  const nearbyFacilities = [
    {
      name: 'City General Hospital',
      distance: '2.3 km',
      type: 'Multi-specialty Hospital',
      rating: 4.8,
      emergencyServices: true,
      trauma: true,
      cardiac: true,
      estimatedTime: '8 min'
    },
    {
      name: 'Heart Care Center',
      distance: '3.1 km',
      type: 'Cardiac Specialty',
      rating: 4.9,
      emergencyServices: true,
      trauma: false,
      cardiac: true,
      estimatedTime: '12 min'
    },
    {
      name: 'Emergency Clinic 24/7',
      distance: '1.8 km',
      type: 'Emergency Clinic',
      rating: 4.6,
      emergencyServices: true,
      trauma: true,
      cardiac: false,
      estimatedTime: '6 min'
    }
  ];

  const firstAidSteps = {
    cardiac: [
      'Call emergency services immediately',
      'Check if person is responsive',
      'If unconscious, start CPR',
      'Push hard and fast on center of chest',
      'Continue until help arrives'
    ],
    breathing: [
      'Keep the person calm and upright',
      'Loosen tight clothing',
      'Help with prescribed inhaler if available',
      'Call emergency services',
      'Monitor breathing continuously'
    ],
    accident: [
      'Ensure scene is safe',
      'Check for responsiveness',
      'Control any bleeding with pressure',
      'Do not move if spinal injury suspected',
      'Call emergency services immediately'
    ]
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-100 text-red-800 px-6 py-3 rounded-full text-lg font-bold mb-6 animate-pulse">
            <Zap className="w-6 h-6 mr-2" />
            EMERGENCY SERVICES
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Emergency Medical{' '}
            <span className="text-red-600 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text">
              Response
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Immediate medical assistance when you need it most. Our emergency response team is available 24/7 
            to provide life-saving care and rapid transport to medical facilities.
          </p>

          {/* Emergency Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-6 h-6 mr-3" />
              CALL 911 NOW
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Video className="w-6 h-6 mr-3" />
              Video Emergency Consult
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Emergency Chat
            </Button>
          </div>
        </div>

        {/* Emergency Types Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Select Emergency Type</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyTypes.map((type) => (
              <Card 
                key={type.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 ${
                  emergencyType === type.id 
                    ? 'border-red-500 shadow-xl scale-105' 
                    : 'border-gray-200 hover:border-red-300'
                }`}
                onClick={() => setEmergencyType(type.id)}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className={`mx-auto mb-4 w-16 h-16 bg-gradient-to-r ${type.color} text-white rounded-full flex items-center justify-center shadow-lg`}>
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <Badge className={`${getUrgencyColor(type.urgency)} border`}>
                        {type.urgency}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Timer className="w-4 h-4 mr-1" />
                        {type.responseTime}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Location and Quick Response */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Location Input */}
          <Card className="shadow-xl border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Navigation className="w-6 h-6 mr-3 text-red-600" />
                Your Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your current address or allow location access"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                <Navigation className="w-5 h-5 mr-2" />
                Use Current Location
              </Button>
              
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center mb-2">
                  <UserCheck className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Response Team Status</span>
                </div>
                <p className="text-green-700 text-sm">Emergency teams are available in your area. Average response time: 5-8 minutes.</p>
              </div>
            </CardContent>
          </Card>

          {/* First Aid Quick Guide */}
          <Card className="shadow-xl border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <HeartHandshake className="w-6 h-6 mr-3 text-red-600" />
                First Aid Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              {emergencyType && firstAidSteps[emergencyType as keyof typeof firstAidSteps] ? (
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg text-gray-900 mb-3">
                    {emergencyTypes.find(t => t.id === emergencyType)?.title} - First Aid Steps:
                  </h4>
                  <ol className="space-y-2">
                    {firstAidSteps[emergencyType as keyof typeof firstAidSteps].map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select an emergency type above to see first aid instructions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Nearby Medical Facilities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Nearest Medical Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyFacilities.map((facility, index) => (
              <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-blue-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{facility.name}</h3>
                      <p className="text-gray-600 text-sm">{facility.type}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-semibold">{facility.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance:</span>
                      <span className="font-semibold">{facility.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ETA:</span>
                      <span className="font-semibold text-blue-600">{facility.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {facility.emergencyServices && (
                      <Badge className="bg-red-100 text-red-800">Emergency</Badge>
                    )}
                    {facility.trauma && (
                      <Badge className="bg-orange-100 text-orange-800">Trauma</Badge>
                    )}
                    {facility.cardiac && (
                      <Badge className="bg-blue-100 text-blue-800">Cardiac</Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      <Navigation className="w-4 h-4 mr-1" />
                      Directions
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <Card className="shadow-2xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
                  <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-red-600 mb-2">Emergency Line</h3>
                  <p className="text-3xl font-bold text-gray-900">911</p>
                  <p className="text-gray-600">Life-threatening emergencies</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
                  <Stethoscope className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Arogya Emergency</h3>
                  <p className="text-2xl font-bold text-gray-900">1-800-AROGYA</p>
                  <p className="text-gray-600">24/7 Medical Assistance</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
                  <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-600 mb-2">Poison Control</h3>
                  <p className="text-2xl font-bold text-gray-900">1-800-222-1222</p>
                  <p className="text-gray-600">Poisoning emergencies</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default EmergencyServices;
