
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Ambulance, 
  Activity, 
  Stethoscope,
  AlertTriangle, 
  Shield,
  Timer
} from 'lucide-react';

interface EmergencyType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  urgency: string;
  responseTime: string;
}

interface EmergencyTypesProps {
  emergencyType: string | null;
  onEmergencyTypeSelect: (typeId: string) => void;
}

const EmergencyTypes: React.FC<EmergencyTypesProps> = ({
  emergencyType,
  onEmergencyTypeSelect
}) => {
  const emergencyTypes: EmergencyType[] = [
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
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
            onClick={() => onEmergencyTypeSelect(type.id)}
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
  );
};

export default EmergencyTypes;
