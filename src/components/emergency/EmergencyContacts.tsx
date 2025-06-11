
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Stethoscope, MessageCircle } from 'lucide-react';

const EmergencyContacts: React.FC = () => {
  return (
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
  );
};

export default EmergencyContacts;
