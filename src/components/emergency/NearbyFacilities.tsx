
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Navigation, Phone } from 'lucide-react';

interface Facility {
  name: string;
  distance: string;
  type: string;
  rating: number;
  emergencyServices: boolean;
  trauma: boolean;
  cardiac: boolean;
  estimatedTime: string;
}

interface NearbyFacilitiesProps {
  onFacilityAction: (facility: Facility, action: 'directions' | 'call') => void;
}

const NearbyFacilities: React.FC<NearbyFacilitiesProps> = ({ onFacilityAction }) => {
  const nearbyFacilities: Facility[] = [
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

  return (
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
                <Button 
                  size="sm" 
                  onClick={() => onFacilityAction(facility, 'directions')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Navigation className="w-4 h-4 mr-1" />
                  Directions
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onFacilityAction(facility, 'call')}
                  className="flex-1"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NearbyFacilities;
