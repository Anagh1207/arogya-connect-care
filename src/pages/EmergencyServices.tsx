
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Ambulance, MapPin, Clock, Phone, User, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmergencyServices = () => {
  const navigate = useNavigate();
  const [bloodRequest, setBloodRequest] = useState({
    bloodGroup: '',
    urgency: 'high',
    hospitalName: '',
    location: '',
    patientName: '',
    contactNumber: ''
  });

  const [ambulanceRequest, setAmbulanceRequest] = useState({
    patientName: '',
    location: '',
    emergencyType: '',
    contactNumber: '',
    description: ''
  });

  const [nearbyDonors] = useState([
    { id: 1, name: 'Rajesh Kumar', bloodGroup: 'O+', distance: '2.3 km', status: 'available', phone: '+91-9876543210' },
    { id: 2, name: 'Priya Sharma', bloodGroup: 'O+', distance: '3.1 km', status: 'available', phone: '+91-9876543211' },
    { id: 3, name: 'Amit Singh', bloodGroup: 'O+', distance: '4.5 km', status: 'on-call', phone: '+91-9876543212' }
  ]);

  const handleBloodRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Blood request submitted:', bloodRequest);
    // Here you would typically send the request to backend
  };

  const handleAmbulanceRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ambulance request submitted:', ambulanceRequest);
    // Here you would typically send the request to backend
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-arogya-light-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-600 text-white p-3 rounded-2xl mr-3">
              <Heart className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold text-arogya-dark-teal">Emergency Services</h1>
          </div>
          <p className="text-arogya-teal text-lg">Get immediate help when you need it most</p>
          <div className="flex items-center justify-center mt-4 space-x-6">
            <div className="flex items-center text-red-600">
              <Phone className="w-5 h-5 mr-2" />
              <span className="font-semibold">Emergency: 108</span>
            </div>
            <div className="flex items-center text-arogya-dark-green">
              <Heart className="w-5 h-5 mr-2" />
              <span className="font-semibold">Blood Helpline: 1910</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="blood" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-fit mx-auto">
            <TabsTrigger value="blood" className="flex items-center space-x-2">
              <Droplets className="w-4 h-4" />
              <span>Blood Request</span>
            </TabsTrigger>
            <TabsTrigger value="ambulance" className="flex items-center space-x-2">
              <Ambulance className="w-4 h-4" />
              <span>Ambulance</span>
            </TabsTrigger>
          </TabsList>

          {/* Blood Request Tab */}
          <TabsContent value="blood">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Blood Request Form */}
              <Card className="bg-white shadow-xl border-0 rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-arogya-dark-teal flex items-center">
                    <Droplets className="w-6 h-6 mr-2 text-red-600" />
                    Request Blood
                  </CardTitle>
                  <p className="text-arogya-teal">Find nearby blood donors quickly</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBloodRequest} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-arogya-teal mb-2">
                          Patient Name
                        </label>
                        <Input
                          value={bloodRequest.patientName}
                          onChange={(e) => setBloodRequest({...bloodRequest, patientName: e.target.value})}
                          className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                          placeholder="Enter patient name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-arogya-teal mb-2">
                          Blood Group Required
                        </label>
                        <select
                          value={bloodRequest.bloodGroup}
                          onChange={(e) => setBloodRequest({...bloodRequest, bloodGroup: e.target.value})}
                          className="w-full h-12 rounded-xl border border-arogya-light-teal focus:border-arogya-dark-green px-3 py-2"
                          required
                        >
                          <option value="">Select Blood Group</option>
                          {bloodGroups.map(group => (
                            <option key={group} value={group}>{group}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-arogya-teal mb-2">
                        Hospital/Location
                      </label>
                      <Input
                        value={bloodRequest.hospitalName}
                        onChange={(e) => setBloodRequest({...bloodRequest, hospitalName: e.target.value})}
                        className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                        placeholder="Hospital name and address"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-arogya-teal mb-2">
                          Contact Number
                        </label>
                        <Input
                          type="tel"
                          value={bloodRequest.contactNumber}
                          onChange={(e) => setBloodRequest({...bloodRequest, contactNumber: e.target.value})}
                          className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                          placeholder="Phone number"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-arogya-teal mb-2">
                          Urgency Level
                        </label>
                        <select
                          value={bloodRequest.urgency}
                          onChange={(e) => setBloodRequest({...bloodRequest, urgency: e.target.value})}
                          className="w-full h-12 rounded-xl border border-arogya-light-teal focus:border-arogya-dark-green px-3 py-2"
                        >
                          <option value="critical">Critical (within 1 hour)</option>
                          <option value="high">High (within 3 hours)</option>
                          <option value="medium">Medium (within 6 hours)</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Send Blood Request Alert
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Nearby Donors */}
              <Card className="bg-white shadow-xl border-0 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-xl text-arogya-dark-teal">Nearby Donors (O+ Blood)</CardTitle>
                  <p className="text-arogya-teal">Based on your location</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nearbyDonors.map((donor) => (
                      <div key={donor.id} className="flex items-center justify-between p-4 border border-arogya-light-teal rounded-xl hover:bg-arogya-light-blue transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-arogya-dark-green text-white rounded-full flex items-center justify-center">
                            <User className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-arogya-dark-teal">{donor.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-arogya-teal">
                              <span className="font-medium">{donor.bloodGroup}</span>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {donor.distance}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            donor.status === 'available' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {donor.status}
                          </span>
                          <Button 
                            size="sm" 
                            className="bg-arogya-dark-green hover:bg-arogya-light-green text-white"
                            disabled={donor.status !== 'available'}
                          >
                            Contact
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-arogya-beige-yellow rounded-xl">
                    <p className="text-arogya-dark-teal text-sm">
                      <strong>Note:</strong> Donors will be notified immediately. You can also call our 24/7 blood helpline at <strong>1910</strong> for additional support.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ambulance Request Tab */}
          <TabsContent value="ambulance">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Ambulance Request Form */}
              <Card className="bg-white shadow-xl border-0 rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-arogya-dark-teal flex items-center">
                    <Ambulance className="w-6 h-6 mr-2 text-red-600" />
                    Request Ambulance
                  </CardTitle>
                  <p className="text-arogya-teal">Emergency medical transportation</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAmbulanceRequest} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-arogya-teal mb-2">
                          Patient Name
                        </label>
                        <Input
                          value={ambulanceRequest.patientName}
                          onChange={(e) => setAmbulanceRequest({...ambulanceRequest, patientName: e.target.value})}
                          className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                          placeholder="Enter patient name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-arogya-teal mb-2">
                          Emergency Type
                        </label>
                        <select
                          value={ambulanceRequest.emergencyType}
                          onChange={(e) => setAmbulanceRequest({...ambulanceRequest, emergencyType: e.target.value})}
                          className="w-full h-12 rounded-xl border border-arogya-light-teal focus:border-arogya-dark-green px-3 py-2"
                          required
                        >
                          <option value="">Select Emergency Type</option>
                          <option value="cardiac">Cardiac Emergency</option>
                          <option value="accident">Accident/Trauma</option>
                          <option value="stroke">Stroke</option>
                          <option value="breathing">Breathing Difficulty</option>
                          <option value="other">Other Medical Emergency</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-arogya-teal mb-2">
                        Pickup Location
                      </label>
                      <Input
                        value={ambulanceRequest.location}
                        onChange={(e) => setAmbulanceRequest({...ambulanceRequest, location: e.target.value})}
                        className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                        placeholder="Enter complete address"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-arogya-teal mb-2">
                        Contact Number
                      </label>
                      <Input
                        type="tel"
                        value={ambulanceRequest.contactNumber}
                        onChange={(e) => setAmbulanceRequest({...ambulanceRequest, contactNumber: e.target.value})}
                        className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                        placeholder="Phone number"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-arogya-teal mb-2">
                        Brief Description
                      </label>
                      <textarea
                        value={ambulanceRequest.description}
                        onChange={(e) => setAmbulanceRequest({...ambulanceRequest, description: e.target.value})}
                        className="w-full h-24 rounded-xl border border-arogya-light-teal focus:border-arogya-dark-green px-3 py-2 resize-none"
                        placeholder="Describe the emergency situation briefly..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Request Ambulance Now
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Ambulance Status */}
              <Card className="bg-white shadow-xl border-0 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-xl text-arogya-dark-teal">Ambulance Status</CardTitle>
                  <p className="text-arogya-teal">Real-time tracking</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-arogya-light-blue rounded-xl">
                      <Clock className="w-12 h-12 mx-auto mb-3 text-arogya-dark-green" />
                      <h3 className="text-lg font-semibold text-arogya-dark-teal mb-2">No Active Request</h3>
                      <p className="text-arogya-teal">Submit a request to track ambulance status</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-arogya-dark-teal">Emergency Contacts</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-3 text-red-600" />
                            <span className="font-medium text-red-700">Emergency Services</span>
                          </div>
                          <span className="font-bold text-red-600">108</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-3 text-blue-600" />
                            <span className="font-medium text-blue-700">Police</span>
                          </div>
                          <span className="font-bold text-blue-600">100</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-3 text-orange-600" />
                            <span className="font-medium text-orange-700">Fire Service</span>
                          </div>
                          <span className="font-bold text-orange-600">101</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-arogya-beige-yellow rounded-xl">
                      <p className="text-arogya-dark-teal text-sm">
                        <strong>Important:</strong> For life-threatening emergencies, call 108 directly. This service provides additional support and coordination.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/patient-dashboard')}
            variant="outline"
            className="text-arogya-dark-green border-arogya-dark-green hover:bg-arogya-dark-green hover:text-white"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServices;
