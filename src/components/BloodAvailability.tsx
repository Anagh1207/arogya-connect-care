
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { 
  Droplets, 
  MapPin, 
  Phone, 
  Clock, 
  User, 
  Building2,
  Search,
  Plus,
  Heart,
  UserPlus,
  AlertTriangle
} from 'lucide-react';

const BloodAvailability = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('request');
  const [bloodDonors, setBloodDonors] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [patientBloodGroup, setPatientBloodGroup] = useState('');
  const [patientId, setPatientId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [donorConsent, setDonorConsent] = useState(false);

  // Blood request form state
  const [requestForm, setRequestForm] = useState({
    unitsNeeded: 1,
    urgencyLevel: 'high',
    hospitalName: '',
    contactPerson: '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: ''
  });

  // Donor registration form state
  const [donorForm, setDonorForm] = useState({
    donorName: '',
    donorType: 'individual',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = [
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' }
  ];

  useEffect(() => {
    fetchBloodDonors();
    fetchBloodRequests();
    if (user && profile?.role === 'patient') {
      fetchPatientBloodGroup();
    }
  }, [user, profile]);

  const fetchPatientBloodGroup = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('blood_group, donor_consent')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setPatientBloodGroup(data.blood_group || '');
        setDonorConsent(data.donor_consent || false);
      }
    } catch (error) {
      console.error('Error fetching patient blood group:', error);
    }
  };

  const fetchBloodDonors = async () => {
    try {
      const { data, error } = await supabase
        .from('blood_donors')
        .select('*')
        .eq('is_available', true)
        .eq('consent_given', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBloodDonors(data || []);
    } catch (error) {
      console.error('Error fetching blood donors:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blood donors",
        variant: "destructive",
      });
    }
  };

  const fetchBloodRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('blood_requests')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBloodRequests(data || []);
    } catch (error) {
      console.error('Error fetching blood requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blood requests",
        variant: "destructive",
      });
    }
  };

  const handlePatientIdLookup = async () => {
    if (!patientId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a patient ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('blood_group')
        .eq('id', patientId)
        .single();

      if (error) throw error;
      
      if (data?.blood_group) {
        setPatientBloodGroup(data.blood_group);
        toast({
          title: "Success",
          description: `Patient blood group found: ${data.blood_group}`,
        });
      } else {
        toast({
          title: "Warning",
          description: "Patient found but blood group not set",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
      toast({
        title: "Error",
        description: "Patient not found or error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBloodRequest = async () => {
    if (!patientBloodGroup) {
      toast({
        title: "Error",
        description: "Please select or fetch patient blood group first",
        variant: "destructive",
      });
      return;
    }

    if (!requestForm.contactPerson || !requestForm.contactPhone || !requestForm.address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('blood_requests')
        .insert({
          patient_id: patientId || user?.id,
          blood_group: patientBloodGroup,
          units_needed: requestForm.unitsNeeded,
          urgency_level: requestForm.urgencyLevel,
          hospital_name: requestForm.hospitalName,
          contact_person: requestForm.contactPerson,
          contact_phone: requestForm.contactPhone,
          address: requestForm.address,
          city: requestForm.city,
          state: requestForm.state,
          pincode: requestForm.pincode,
          notes: requestForm.notes,
          requested_by: user?.id
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blood request submitted successfully!",
      });

      // Reset form
      setRequestForm({
        unitsNeeded: 1,
        urgencyLevel: 'high',
        hospitalName: '',
        contactPerson: '',
        contactPhone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        notes: ''
      });

      fetchBloodRequests();
    } catch (error) {
      console.error('Error submitting blood request:', error);
      toast({
        title: "Error",
        description: "Failed to submit blood request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonorRegistration = async () => {
    if (!patientBloodGroup) {
      toast({
        title: "Error",
        description: "Please set your blood group first",
        variant: "destructive",
      });
      return;
    }

    if (!donorForm.donorName || !donorForm.city || !donorForm.state || !donorForm.pincode) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('blood_donors')
        .insert({
          donor_name: donorForm.donorName,
          donor_type: donorForm.donorType,
          blood_group: patientBloodGroup,
          contact_phone: donorForm.contactPhone,
          address: donorForm.address,
          city: donorForm.city,
          state: donorForm.state,
          pincode: donorForm.pincode,
          consent_given: true,
          patient_id: user?.id
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Thank you for registering as a blood donor!",
      });

      // Reset form
      setDonorForm({
        donorName: '',
        donorType: 'individual',
        contactPhone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
      });

      fetchBloodDonors();
    } catch (error) {
      console.error('Error registering donor:', error);
      toast({
        title: "Error",
        description: "Failed to register as donor",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBloodGroup = async (bloodGroup: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('patients')
        .update({ blood_group: bloodGroup })
        .eq('id', user.id);

      if (error) throw error;

      setPatientBloodGroup(bloodGroup);
      toast({
        title: "Success",
        description: "Blood group updated successfully!",
      });
    } catch (error) {
      console.error('Error updating blood group:', error);
      toast({
        title: "Error",
        description: "Failed to update blood group",
        variant: "destructive",
      });
    }
  };

  const handleDonorConsentToggle = async () => {
    if (!user) return;

    try {
      const newConsent = !donorConsent;
      const { error } = await supabase
        .from('patients')
        .update({ donor_consent: newConsent })
        .eq('id', user.id);

      if (error) throw error;

      setDonorConsent(newConsent);
      toast({
        title: "Success",
        description: newConsent ? "Thank you for consenting to donate blood!" : "Donor consent removed",
      });
    } catch (error) {
      console.error('Error updating donor consent:', error);
      toast({
        title: "Error",
        description: "Failed to update donor consent",
        variant: "destructive",
      });
    }
  };

  const getUrgencyColor = (urgency: string) => {
    const level = urgencyLevels.find(l => l.value === urgency);
    return level?.color || 'bg-gray-100 text-gray-800';
  };

  const getDonorTypeIcon = (type: string) => {
    return type === 'blood_bank' ? <Building2 className="w-4 h-4" /> : <User className="w-4 h-4" />;
  };

  const getCompatibleBloodGroups = (requestedGroup: string) => {
    const compatibility = {
      'A+': ['A+', 'A-', 'O+', 'O-'],
      'A-': ['A-', 'O-'],
      'B+': ['B+', 'B-', 'O+', 'O-'],
      'B-': ['B-', 'O-'],
      'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      'AB-': ['A-', 'B-', 'AB-', 'O-'],
      'O+': ['O+', 'O-'],
      'O-': ['O-']
    };
    return compatibility[requestedGroup] || [];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center bg-red-100 text-red-800 px-6 py-3 rounded-full text-lg font-bold mb-4">
          <Droplets className="w-6 h-6 mr-2" />
          BLOOD AVAILABILITY SYSTEM
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Blood Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find blood donors quickly or register as a donor to help save lives in emergency situations.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-lg p-2 flex space-x-2">
          <Button
            onClick={() => setActiveTab('request')}
            variant={activeTab === 'request' ? 'default' : 'outline'}
            className="px-6 py-2"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Request Blood
          </Button>
          <Button
            onClick={() => setActiveTab('donors')}
            variant={activeTab === 'donors' ? 'default' : 'outline'}
            className="px-6 py-2"
          >
            <Search className="w-4 h-4 mr-2" />
            Find Donors
          </Button>
          <Button
            onClick={() => setActiveTab('register')}
            variant={activeTab === 'register' ? 'default' : 'outline'}
            className="px-6 py-2"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Register as Donor
          </Button>
          <Button
            onClick={() => setActiveTab('requests')}
            variant={activeTab === 'requests' ? 'default' : 'outline'}
            className="px-6 py-2"
          >
            <Heart className="w-4 h-4 mr-2" />
            Active Requests
          </Button>
        </div>
      </div>

      {/* Patient Blood Group Section */}
      {profile?.role === 'patient' && (
        <Card className="mb-8 border-2 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <Droplets className="w-5 h-5 mr-2" />
              Your Blood Group & Donor Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Blood Group</label>
                <Select value={patientBloodGroup} onValueChange={handleUpdateBloodGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map(group => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={donorConsent}
                  onChange={handleDonorConsentToggle}
                  className="rounded"
                />
                <label className="text-sm font-medium">I consent to donate blood</label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Patient ID Lookup Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Patient Blood Group Lookup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handlePatientIdLookup} disabled={isLoading}>
              {isLoading ? 'Looking up...' : 'Lookup'}
            </Button>
          </div>
          {patientBloodGroup && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 font-semibold">
                Blood Group: <span className="text-2xl">{patientBloodGroup}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === 'request' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Submit Blood Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Units Needed</label>
                <Input
                  type="number"
                  min="1"
                  value={requestForm.unitsNeeded}
                  onChange={(e) => setRequestForm({...requestForm, unitsNeeded: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Urgency Level</label>
                <Select value={requestForm.urgencyLevel} onValueChange={(value) => setRequestForm({...requestForm, urgencyLevel: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Hospital Name</label>
                <Input
                  value={requestForm.hospitalName}
                  onChange={(e) => setRequestForm({...requestForm, hospitalName: e.target.value})}
                  placeholder="Enter hospital name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Person *</label>
                <Input
                  value={requestForm.contactPerson}
                  onChange={(e) => setRequestForm({...requestForm, contactPerson: e.target.value})}
                  placeholder="Enter contact person name"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contact Phone *</label>
                <Input
                  value={requestForm.contactPhone}
                  onChange={(e) => setRequestForm({...requestForm, contactPhone: e.target.value})}
                  placeholder="Enter contact phone"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address *</label>
                <Input
                  value={requestForm.address}
                  onChange={(e) => setRequestForm({...requestForm, address: e.target.value})}
                  placeholder="Enter address"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Input
                  value={requestForm.city}
                  onChange={(e) => setRequestForm({...requestForm, city: e.target.value})}
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <Input
                  value={requestForm.state}
                  onChange={(e) => setRequestForm({...requestForm, state: e.target.value})}
                  placeholder="Enter state"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pincode</label>
                <Input
                  value={requestForm.pincode}
                  onChange={(e) => setRequestForm({...requestForm, pincode: e.target.value})}
                  placeholder="Enter pincode"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Additional Notes</label>
              <Textarea
                value={requestForm.notes}
                onChange={(e) => setRequestForm({...requestForm, notes: e.target.value})}
                placeholder="Any additional information..."
                rows={3}
              />
            </div>

            <Button 
              onClick={handleBloodRequest} 
              disabled={isLoading || !patientBloodGroup}
              className="w-full bg-red-600 hover:bg-red-700"
              size="lg"
            >
              {isLoading ? 'Submitting...' : 'Submit Blood Request'}
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'donors' && (
        <div className="space-y-6">
          {patientBloodGroup && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Showing compatible donors for blood group: {patientBloodGroup}
                </h3>
                <p className="text-blue-600 text-sm">
                  Compatible donors: {getCompatibleBloodGroups(patientBloodGroup).join(', ')}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bloodDonors
              .filter(donor => !patientBloodGroup || getCompatibleBloodGroups(patientBloodGroup).includes(donor.blood_group))
              .map((donor) => (
              <Card key={donor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{donor.donor_name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {getDonorTypeIcon(donor.donor_type)}
                        <span className="text-sm text-gray-600 capitalize">
                          {donor.donor_type.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 text-lg font-bold">
                      {donor.blood_group}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    {donor.contact_phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{donor.contact_phone}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{donor.city}, {donor.state}</span>
                    </div>
                    {donor.last_donation_date && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Last donated: {new Date(donor.last_donation_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      Location
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {bloodDonors.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Droplets className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Donors Found</h3>
                <p className="text-gray-500">No blood donors are currently available. Please try again later.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'register' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <UserPlus className="w-5 h-5 mr-2" />
              Register as Blood Donor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Donor Name *</label>
                <Input
                  value={donorForm.donorName}
                  onChange={(e) => setDonorForm({...donorForm, donorName: e.target.value})}
                  placeholder="Enter donor name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Donor Type</label>
                <Select value={donorForm.donorType} onValueChange={(value) => setDonorForm({...donorForm, donorType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="blood_bank">Blood Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contact Phone</label>
                <Input
                  value={donorForm.contactPhone}
                  onChange={(e) => setDonorForm({...donorForm, contactPhone: e.target.value})}
                  placeholder="Enter contact phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  value={donorForm.address}
                  onChange={(e) => setDonorForm({...donorForm, address: e.target.value})}
                  placeholder="Enter address"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <Input
                  value={donorForm.city}
                  onChange={(e) => setDonorForm({...donorForm, city: e.target.value})}
                  placeholder="Enter city"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State *</label>
                <Input
                  value={donorForm.state}
                  onChange={(e) => setDonorForm({...donorForm, state: e.target.value})}
                  placeholder="Enter state"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pincode *</label>
                <Input
                  value={donorForm.pincode}
                  onChange={(e) => setDonorForm({...donorForm, pincode: e.target.value})}
                  placeholder="Enter pincode"
                  required
                />
              </div>
            </div>

            {patientBloodGroup && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-semibold">
                  Your blood group: <span className="text-xl">{patientBloodGroup}</span>
                </p>
              </div>
            )}

            <Button 
              onClick={handleDonorRegistration} 
              disabled={isLoading || !patientBloodGroup}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {isLoading ? 'Registering...' : 'Register as Donor'}
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bloodRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge className="bg-red-100 text-red-800 text-lg font-bold mb-2">
                        {request.blood_group}
                      </Badge>
                      <h3 className="font-bold text-lg">{request.units_needed} Unit(s) Needed</h3>
                    </div>
                    <Badge className={getUrgencyColor(request.urgency_level)}>
                      {request.urgency_level.charAt(0).toUpperCase() + request.urgency_level.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{request.contact_person}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{request.contact_phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{request.city}, {request.state}</span>
                    </div>
                    {request.hospital_name && (
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{request.hospital_name}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{new Date(request.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {request.notes && (
                    <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                      <strong>Notes:</strong> {request.notes}
                    </div>
                  )}

                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                      <Phone className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Heart className="w-4 h-4 mr-1" />
                      Respond
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {bloodRequests.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Active Requests</h3>
                <p className="text-gray-500">There are currently no active blood requests.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default BloodAvailability;
