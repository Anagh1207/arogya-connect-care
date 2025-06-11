
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ConnectionStatusProps {
  isVideoLoading: boolean;
  isChatLoading: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isVideoLoading,
  isChatLoading
}) => {
  if (!isVideoLoading && !isChatLoading) return null;

  return (
    <div className="mb-8">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div>
              <h3 className="font-semibold text-blue-800">
                {isVideoLoading ? 'Connecting to Video Consultation...' : 'Connecting to Emergency Chat...'}
              </h3>
              <Progress value={66} className="w-64 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectionStatus;
