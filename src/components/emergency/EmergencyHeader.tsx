
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Ambulance, Droplets, Phone, Video, MessageCircle } from 'lucide-react';

interface EmergencyHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isVideoLoading: boolean;
  isChatLoading: boolean;
  videoConnected: boolean;
  chatConnected: boolean;
  onVideoConsult: () => void;
  onEmergencyChat: () => void;
  onCall911: () => void;
}

const EmergencyHeader: React.FC<EmergencyHeaderProps> = ({
  activeTab,
  setActiveTab,
  isVideoLoading,
  isChatLoading,
  videoConnected,
  chatConnected,
  onVideoConsult,
  onEmergencyChat,
  onCall911
}) => {
  return (
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

      {/* Service Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-lg p-2 flex space-x-2">
          <Button
            onClick={() => setActiveTab('emergency')}
            variant={activeTab === 'emergency' ? 'default' : 'outline'}
            className="px-6 py-2"
          >
            <Ambulance className="w-4 h-4 mr-2" />
            Emergency Services
          </Button>
          <Button
            onClick={() => setActiveTab('blood')}
            variant={activeTab === 'blood' ? 'default' : 'outline'}
            className="px-6 py-2"
          >
            <Droplets className="w-4 h-4 mr-2" />
            Blood Availability
          </Button>
        </div>
      </div>

      {/* Emergency Action Buttons - Only show for emergency tab */}
      {activeTab === 'emergency' && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg"
            onClick={onCall911}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <Phone className="w-6 h-6 mr-3" />
            CALL 911 NOW
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={onVideoConsult}
            disabled={isVideoLoading}
            className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {isVideoLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mr-3"></div>
                Connecting...
              </>
            ) : videoConnected ? (
              <>
                <Video className="w-6 h-6 mr-3" />
                Video Connected
              </>
            ) : (
              <>
                <Video className="w-6 h-6 mr-3" />
                Video Emergency Consult
              </>
            )}
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={onEmergencyChat}
            disabled={isChatLoading}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {isChatLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                Connecting...
              </>
            ) : chatConnected ? (
              <>
                <MessageCircle className="w-6 h-6 mr-3" />
                Chat Connected
              </>
            ) : (
              <>
                <MessageCircle className="w-6 h-6 mr-3" />
                Emergency Chat
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmergencyHeader;
