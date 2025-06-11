
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Droplets, 
  MapPin, 
  Phone, 
  Clock, 
  Users, 
  Heart,
  Search,
  Plus,
  AlertCircle,
  CheckCircle,
  User,
  Building2,
  Calendar
} from 'lucide-react';

// Define blood group type
type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

interface Patient {
  id: string;
  blood_group: BloodGroup | null;
  donor_consent: boolean;
  profiles: {
    full_name: string;
    phone: string;
  };
}

interface BloodDonor {
  id: string;
  donor_name: string;
  donor_type: 'individual' | 'blood_bank';
  blood_group: BloodGroup;
  contact_phone: string | null;
  address: string | null;
  city: string;
  state: string;
  pincode: string;
  is_available: boolean;
  last_donation_date: string | null;
  consent_given: boolean;
}

interface BloodRequest {
  id: string;
  blood_group: BloodGroup;
  units_needed: number;
  urgency_level: string;
  hospital_name: string | null;
  contact_person: string;
  contact_phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const BloodAvailability = () => {
  const [activeSection, setActiveSection] = useState('search');
  const [patientId, setPatientId] = useState('');
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [donorData, setDonorData] = useState<BloodDonor[]>([]);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup | ''>('');

  // Form states
  const [requestForm, setRequestForm] = useState({
    blood_group: '' as BloodGroup | '',
    units_needed: 1,
    urgency_level: 'high',
    hospital_name: '',
    contact_person: '',
    contact_phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: ''
  });

  const [donorForm, setDonorForm] = useState({
    donor_name: '',
    donor_type: 'individual' as 'individual' | 'blood_bank',
    blood_group: '' as BloodGroup | '',
    contact_phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    consent_given: false
  });

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const compatibilityMap: Record<BloodGroup, BloodGroup[]> = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'AB-': ['A-', 'B-', 'AB-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-']
  };

  useEffect(() => {
    fetchBloodRequests();
  }, []);

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
      console.log('Looking up patient:', patientId);
      
      const { data: patient, error } = await supabase
        .from('patients')
        .select(`
          id,
          blood_group,
          donor_consent,
          profiles!inner (
            full_name,
            phone
          )
        `)
        .eq('id', patientId)
        .single();

      if (error) {
        console.error('Error fetching patient:', error);
        toast({
          title: "Patient Not Found",
          description: "Unable to find patient with the provided ID",
          variant: "destructive",
        });
        return;
      }

      setPatientData(patient);
      if (patient.blood_group) {
        setSelectedBloodGroup(patient.blood_group);
        await fetchCompatibleDonors(patient.blood_group);
      }

      toast({
        title: "Patient Found",
        description: `Found patient: ${patient.profiles.full_name}`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An error occurred while fetching patient data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompatibleDonors = async (bloodGroup: BloodGroup) => {
    const compatibleTypes = compatibilityMap[bloodGroup] || [];
    
    try {
      const { data: donors, error } = await supabase
        .from('blood_donors')
        .select('*')
        .in('blood_group', compatibleTypes)
        .eq('is_available', true)
        .eq('consent_given', true);

      if (error) {
        console.error('Error fetching donors:', error);
        return;
      }

      setDonorData(donors || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchBloodRequests = async () => {
    try {
      const { data: requests, error } = await supabase
        .from('blood_requests')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blood requests:', error);
        return;
      }

      setBloodRequests(requests || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitRequest = async () => {
    if (!requestForm.blood_group || !requestForm.contact_person || !requestForm.contact_phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const requestData = {
        ...requestForm,
        blood_group: requestForm.blood_group as BloodGroup,
        patient_id: patientData?.id || null,
        requested_by: (await supabase.auth.getUser()).data.user?.id || null
      };

      const { error } = await supabase
        .from('blood_requests')
        .insert([requestData]);

      if (error) {
        console.error('Error submitting request:', error);
        toast({
          title: "Error",
          description: "Failed to submit blood request",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Request Submitted",
        description: "Your blood request has been submitted successfully",
      });

      // Reset form
      setRequestForm({
        blood_group: '',
        units_needed: 1,
        urgency_level: 'high',
        hospital_name: '',
        contact_person: '',
        contact_phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        notes: ''
      });

      // Refresh requests
      await fetchBloodRequests();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An error occurred while submitting the request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonorRegistration = async () => {
    if (!donorForm.donor_name || !donorForm.blood_group || !donorForm.city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const donorData = {
        ...donorForm,
        blood_group: donorForm.blood_group as BloodGroup,
        patient_id: patientData?.id || null
      };

      const { error } = await supabase
        .from('blood_donors')
        .insert([donorData]);

      if (error) {
        console.error('Error registering donor:', error);
        toast({
          title: "Error",
          description: "Failed to register as donor",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Registration Successful",
        description: "You have been registered as a blood donor",
      });

      // Reset form
      setDonorForm({
        donor_name: '',
        donor_type: 'individual',
        blood_group: '',
        contact_phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        consent_given: false
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Blood Availability System</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Connect blood donors with patients in need. Search for compatible donors, 
          submit blood requests, and register as a donor to save lives.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-2 flex space-x-2">
          <Button
            onClick={() => setActiveSection('search')}
            variant={activeSection === 'search' ? 'default' : 'outline'}
            className="px-6 py-2"
          >
            <Search className="w-4 h-4 mr-2" />
            Find Donors
          </Button>
          <Button
            onClick={() => setActiveSection('request')}
            variant={activeSection === 'request' ? 'default' : 'outline'}
            className="px-6 py-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Request Blood
          </Button>
          <Button
            onClick={() => setActiveSection('donate')}
            variant={activeSection === 'donate' ? 'default' : 'outline'}
            className="px-6 py-2"
          >
            <Heart className="w-4 h-4 mr-2" />
            Donate Blood
          </Button>
          <Button
            onClick={() => setActiveSection('requests')}
            variant={activeSection === 'requests' ? 'default' : 'outline'}
            className="px-6 py-2"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Active Requests
          </Button>
        </div>
      </div>

      {/* Patient Lookup Section */}
      {(activeSection === 'search' || activeSection === 'request') && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <User className="w-5 h-5 mr-2 text-red-600" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  placeholder="Enter patient ID to lookup blood group"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                />
              </div>
              <Button 
                onClick={handlePatientIdLookup}
                disabled={isLoading}
                className="mt-6"
              >
                {isLoading ? 'Looking up...' : 'Lookup'}
              </Button>
            </div>
            
            {patientData && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Patient Found</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {patientData.profiles.full_name}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {patientData.profiles.phone}
                  </div>
                  <div>
                    <span className="font-medium">Blood Group:</span> 
                    <Badge className="ml-2 bg-red-100 text-red-800">
                      {patientData.blood_group || 'Not specified'}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Donor Consent:</span> 
                    <Badge className={`ml-2 ${patientData.donor_consent ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {patientData.donor_consent ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Content based on active section */}
      {activeSection === 'search' && (
        <>
          {/* Manual Blood Group Selection */}
          {!patientData?.blood_group && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Manual Blood Group Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select 
                      value={selectedBloodGroup} 
                      onValueChange={(value) => {
                        setSelectedBloodGroup(value as BloodGroup);
                        if (value) fetchCompatibleDonors(value as BloodGroup);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Compatible Donors */}
          {selectedBloodGroup && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Droplets className="w-5 h-5 mr-2 text-red-600" />
                    Compatible Donors for {selectedBloodGroup}
                  </span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {donorData.length} Available
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {donorData.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No compatible donors found</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {donorData.map((donor) => (
                      <Card key={donor.id} className="border-2 border-gray-200 hover:border-red-300 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{donor.donor_name}</h3>
                              <div className="flex items-center mt-1">
                                {donor.donor_type === 'individual' ? (
                                  <User className="w-4 h-4 text-gray-500 mr-1" />
                                ) : (
                                  <Building2 className="w-4 h-4 text-gray-500 mr-1" />
                                )}
                                <span className="text-sm text-gray-600 capitalize">{donor.donor_type}</span>
                              </div>
                            </div>
                            <Badge className="bg-red-100 text-red-800">
                              {donor.blood_group}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            {donor.contact_phone && (
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 text-gray-500 mr-2" />
                                <span>{donor.contact_phone}</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                              <span>{donor.city}, {donor.state}</span>
                            </div>
                            {donor.last_donation_date && (
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                                <span>Last donated: {new Date(donor.last_donation_date).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                          
                          <Button 
                            size="sm" 
                            className="w-full mt-3 bg-red-600 hover:bg-red-700"
                            onClick={() => {
                              if (donor.contact_phone) {
                                window.open(`tel:${donor.contact_phone}`);
                              }
                            }}
                          >
                            Contact Donor
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {activeSection === 'request' && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-red-600" />
              Submit Blood Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="request-blood-group">Blood Group *</Label>
                <Select 
                  value={requestForm.blood_group} 
                  onValueChange={(value) => setRequestForm({...requestForm, blood_group: value as BloodGroup})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="units-needed">Units Needed</Label>
                <Input
                  id="units-needed"
                  type="number"
                  min="1"
                  value={requestForm.units_needed}
                  onChange={(e) => setRequestForm({...requestForm, units_needed: parseInt(e.target.value) || 1})}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select 
                  value={requestForm.urgency_level} 
                  onValueChange={(value) => setRequestForm({...requestForm, urgency_level: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hospital-name">Hospital Name</Label>
                <Input
                  id="hospital-name"
                  value={requestForm.hospital_name}
                  onChange={(e) => setRequestForm({...requestForm, hospital_name: e.target.value})}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-person">Contact Person *</Label>
                <Input
                  id="contact-person"
                  value={requestForm.contact_person}
                  onChange={(e) => setRequestForm({...requestForm, contact_person: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contact-phone">Contact Phone *</Label>
                <Input
                  id="contact-phone"
                  value={requestForm.contact_phone}
                  onChange={(e) => setRequestForm({...requestForm, contact_phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={requestForm.address}
                onChange={(e) => setRequestForm({...requestForm, address: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={requestForm.city}
                  onChange={(e) => setRequestForm({...requestForm, city: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={requestForm.state}
                  onChange={(e) => setRequestForm({...requestForm, state: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={requestForm.pincode}
                  onChange={(e) => setRequestForm({...requestForm, pincode: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={requestForm.notes}
                onChange={(e) => setRequestForm({...requestForm, notes: e.target.value})}
                placeholder="Any additional information about the blood requirement"
              />
            </div>

            <Button 
              onClick={handleSubmitRequest}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Submitting...' : 'Submit Blood Request'}
            </Button>
          </CardContent>
        </Card>
      )}

      {activeSection === 'donate' && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-600" />
              Register as Blood Donor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="donor-name">Full Name *</Label>
                <Input
                  id="donor-name"
                  value={donorForm.donor_name}
                  onChange={(e) => setDonorForm({...donorForm, donor_name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="donor-type">Donor Type</Label>
                <Select 
                  value={donorForm.donor_type} 
                  onValueChange={(value) => setDonorForm({...donorForm, donor_type: value as 'individual' | 'blood_bank'})}
                >
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
                <Label htmlFor="donor-blood-group">Blood Group *</Label>
                <Select 
                  value={donorForm.blood_group} 
                  onValueChange={(value) => setDonorForm({...donorForm, blood_group: value as BloodGroup})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="donor-phone">Contact Phone</Label>
                <Input
                  id="donor-phone"
                  value={donorForm.contact_phone}
                  onChange={(e) => setDonorForm({...donorForm, contact_phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="donor-address">Address</Label>
              <Input
                id="donor-address"
                value={donorForm.address}
                onChange={(e) => setDonorForm({...donorForm, address: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="donor-city">City *</Label>
                <Input
                  id="donor-city"
                  value={donorForm.city}
                  onChange={(e) => setDonorForm({...donorForm, city: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="donor-state">State *</Label>
                <Input
                  id="donor-state"
                  value={donorForm.state}
                  onChange={(e) => setDonorForm({...donorForm, state: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="donor-pincode">Pincode</Label>
                <Input
                  id="donor-pincode"
                  value={donorForm.pincode}
                  onChange={(e) => setDonorForm({...donorForm, pincode: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="donor-consent"
                checked={donorForm.consent_given}
                onChange={(e) => setDonorForm({...donorForm, consent_given: e.target.checked})}
                className="rounded border-gray-300"
              />
              <Label htmlFor="donor-consent" className="text-sm">
                I consent to be contacted for blood donation requests
              </Label>
            </div>

            <Button 
              onClick={handleDonorRegistration}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Registering...' : 'Register as Donor'}
            </Button>
          </CardContent>
        </Card>
      )}

      {activeSection === 'requests' && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                Active Blood Requests
              </span>
              <Badge className="bg-blue-100 text-blue-800">
                {bloodRequests.length} Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bloodRequests.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No active blood requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bloodRequests.map((request) => (
                  <Card key={request.id} className="border-2 border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-red-100 text-red-800">
                              {request.blood_group}
                            </Badge>
                            <Badge className={getUrgencyColor(request.urgency_level)}>
                              {request.urgency_level.toUpperCase()}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {request.units_needed} {request.units_needed === 1 ? 'unit' : 'units'} needed
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900">{request.contact_person}</h3>
                          {request.hospital_name && (
                            <p className="text-sm text-gray-600">{request.hospital_name}</p>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {new Date(request.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-500 mr-2" />
                          <span>{request.contact_phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                          <span>{request.city}, {request.state}</span>
                        </div>
                      </div>
                      
                      {request.notes && (
                        <div className="bg-gray-50 rounded p-2 text-sm mb-3">
                          <strong>Notes:</strong> {request.notes}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => window.open(`tel:${request.contact_phone}`)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            const address = `${request.address}, ${request.city}, ${request.state} ${request.pincode}`;
                            window.open(`https://maps.google.com/maps?q=${encodeURIComponent(address)}`);
                          }}
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BloodAvailability;
