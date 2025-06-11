
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, MapPin, UserCheck } from 'lucide-react';

interface LocationInputProps {
  location: string;
  setLocation: (location: string) => void;
  isLocationLoading: boolean;
  locationDetected: boolean;
  onLocationDetection: () => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  location,
  setLocation,
  isLocationLoading,
  locationDetected,
  onLocationDetection
}) => {
  return (
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
        
        <Button 
          onClick={onLocationDetection}
          disabled={isLocationLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
        >
          {isLocationLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Detecting Location...
            </>
          ) : locationDetected ? (
            <>
              <UserCheck className="w-5 h-5 mr-2" />
              Location Detected
            </>
          ) : (
            <>
              <Navigation className="w-5 h-5 mr-2" />
              Use Current Location
            </>
          )}
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
  );
};

export default LocationInput;
