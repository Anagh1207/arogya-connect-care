
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BloodAvailability from '@/components/BloodAvailability';
import EmergencyHeader from '@/components/emergency/EmergencyHeader';
import EmergencyTypes from '@/components/emergency/EmergencyTypes';
import LocationInput from '@/components/emergency/LocationInput';
import FirstAidGuide from '@/components/emergency/FirstAidGuide';
import NearbyFacilities from '@/components/emergency/NearbyFacilities';
import EmergencyContacts from '@/components/emergency/EmergencyContacts';
import ConnectionStatus from '@/components/emergency/ConnectionStatus';
import { toast } from '@/hooks/use-toast';

const EmergencyServices = () => {
  const [emergencyType, setEmergencyType] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [videoConnected, setVideoConnected] = useState(false);
  const [chatConnected, setChatConnected] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [activeTab, setActiveTab] = useState('emergency');

  const handleVideoConsult = async () => {
    setIsVideoLoading(true);
    toast({
      title: "Connecting...",
      description: "Searching for available emergency doctors",
    });

    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setVideoConnected(true);
      setIsVideoLoading(false);
      
      toast({
        title: "Connected!",
        description: "You are now connected to Dr. Sarah Johnson - Emergency Medicine",
      });
    } catch (error) {
      setIsVideoLoading(false);
      toast({
        title: "Connection Failed",
        description: "Unable to connect to video consultation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEmergencyChat = async () => {
    setIsChatLoading(true);
    toast({
      title: "Connecting to Chat...",
      description: "Finding available emergency support",
    });

    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setChatConnected(true);
      setIsChatLoading(false);
      
      toast({
        title: "Chat Connected!",
        description: "Emergency support specialist is ready to help you",
      });
    } catch (error) {
      setIsChatLoading(false);
      toast({
        title: "Connection Failed",
        description: "Unable to connect to emergency chat. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLocationDetection = async () => {
    setIsLocationLoading(true);
    toast({
      title: "Detecting Location...",
      description: "Accessing your current location",
    });

    try {
      // Use browser geolocation API
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      // Simulate reverse geocoding
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAddress = "123 Main Street, Downtown, City Center, 12345";
      setLocation(mockAddress);
      setLocationDetected(true);
      setIsLocationLoading(false);
      
      toast({
        title: "Location Detected!",
        description: `Your location: ${mockAddress}`,
      });
    } catch (error) {
      setIsLocationLoading(false);
      toast({
        title: "Location Error",
        description: "Unable to detect location. Please enter manually.",
        variant: "destructive",
      });
    }
  };

  const handleCall911 = () => {
    toast({
      title: "Calling 911",
      description: "Emergency services have been contacted",
    });
    // In a real app, this would trigger actual call functionality
    window.open('tel:911');
  };

  const handleEmergencyTypeSelect = (typeId: string) => {
    setEmergencyType(typeId);
    const emergencyTypes = [
      { id: 'cardiac', title: 'Cardiac Emergency', responseTime: '3-5 min' },
      { id: 'accident', title: 'Accident & Trauma', responseTime: '5-8 min' },
      { id: 'breathing', title: 'Breathing Emergency', responseTime: '3-5 min' },
      { id: 'stroke', title: 'Stroke Emergency', responseTime: '3-5 min' },
      { id: 'poisoning', title: 'Poisoning', responseTime: '5-8 min' },
      { id: 'general', title: 'General Emergency', responseTime: '8-12 min' }
    ];
    
    const selectedType = emergencyTypes.find(t => t.id === typeId);
    toast({
      title: "Emergency Type Selected",
      description: `${selectedType?.title} - Response time: ${selectedType?.responseTime}`,
    });
  };

  const handleFacilityAction = (facility: any, action: 'directions' | 'call') => {
    if (action === 'directions') {
      toast({
        title: "Opening Directions",
        description: `Navigation to ${facility.name}`,
      });
      // In a real app, this would open Google Maps or similar
      window.open(`https://maps.google.com/maps?q=${encodeURIComponent(facility.name)}`);
    } else if (action === 'call') {
      toast({
        title: "Calling Hospital",
        description: `Connecting to ${facility.name}`,
      });
      // In a real app, this would initiate a call
      window.open(`tel:+1234567890`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmergencyHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isVideoLoading={isVideoLoading}
          isChatLoading={isChatLoading}
          videoConnected={videoConnected}
          chatConnected={chatConnected}
          onVideoConsult={handleVideoConsult}
          onEmergencyChat={handleEmergencyChat}
          onCall911={handleCall911}
        />

        <ConnectionStatus
          isVideoLoading={isVideoLoading}
          isChatLoading={isChatLoading}
        />

        {/* Conditional Content Based on Active Tab */}
        {activeTab === 'blood' ? (
          <BloodAvailability />
        ) : (
          <>
            <EmergencyTypes
              emergencyType={emergencyType}
              onEmergencyTypeSelect={handleEmergencyTypeSelect}
            />

            {/* Location and Quick Response */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <LocationInput
                location={location}
                setLocation={setLocation}
                isLocationLoading={isLocationLoading}
                locationDetected={locationDetected}
                onLocationDetection={handleLocationDetection}
              />

              <FirstAidGuide emergencyType={emergencyType} />
            </div>

            <NearbyFacilities onFacilityAction={handleFacilityAction} />

            <EmergencyContacts />
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default EmergencyServices;
