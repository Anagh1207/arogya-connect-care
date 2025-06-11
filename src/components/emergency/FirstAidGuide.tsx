
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake, Heart } from 'lucide-react';

interface FirstAidGuideProps {
  emergencyType: string | null;
}

const FirstAidGuide: React.FC<FirstAidGuideProps> = ({ emergencyType }) => {
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

  const emergencyTypes = [
    { id: 'cardiac', title: 'Cardiac Emergency' },
    { id: 'breathing', title: 'Breathing Emergency' },
    { id: 'accident', title: 'Accident & Trauma' }
  ];

  return (
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
  );
};

export default FirstAidGuide;
