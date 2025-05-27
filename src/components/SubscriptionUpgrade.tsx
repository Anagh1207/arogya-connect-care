
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Crown, Zap, Shield, X, Sparkles } from 'lucide-react';

interface SubscriptionUpgradeProps {
  variant?: 'badge' | 'card' | 'floating' | 'banner';
  context?: 'dashboard' | 'emergency' | 'ai-features' | 'blood-donation';
  onClose?: () => void;
}

const SubscriptionUpgrade = ({ 
  variant = 'card', 
  context = 'dashboard',
  onClose 
}: SubscriptionUpgradeProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const contextMessages = {
    dashboard: {
      title: 'Unlock Premium Features',
      description: 'Get AI health insights, priority support, and exclusive tools',
      icon: <Crown className="w-5 h-5" />
    },
    emergency: {
      title: 'Priority Emergency Care',
      description: 'Get faster response times and dedicated emergency support',
      icon: <Shield className="w-5 h-5" />
    },
    'ai-features': {
      title: 'Advanced AI Analysis',
      description: 'Unlock detailed health reports and personalized recommendations',
      icon: <Zap className="w-5 h-5" />
    },
    'blood-donation': {
      title: 'Early Blood Alerts',
      description: 'Get priority notifications for urgent blood donation needs',
      icon: <Sparkles className="w-5 h-5" />
    }
  };

  const message = contextMessages[context];

  if (!isVisible) return null;

  // Badge variant for headers
  if (variant === 'badge') {
    return (
      <Badge 
        className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green text-white cursor-pointer hover:shadow-lg transition-all duration-300 animate-pulse"
        onClick={() => navigate('/subscription')}
      >
        {message.icon}
        <span className="ml-1">Upgrade</span>
      </Badge>
    );
  }

  // Floating CTA
  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
        <Card className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green text-white shadow-2xl border-0 max-w-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {message.icon}
                <span className="ml-2 font-semibold text-sm">{message.title}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 p-1"
                onClick={handleClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-white/90 mb-3">{message.description}</p>
            <Button 
              onClick={() => navigate('/subscription')}
              className="w-full bg-white text-arogya-dark-green hover:bg-white/90 text-sm py-2"
            >
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Banner variant
  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-arogya-light-blue/20 to-arogya-beige-yellow/20 border border-arogya-light-blue/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-arogya-dark-green rounded-lg text-white">
              {message.icon}
            </div>
            <div>
              <h3 className="font-semibold text-arogya-dark-teal">{message.title}</h3>
              <p className="text-sm text-gray-600">{message.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => navigate('/subscription')}
              className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green text-white hover:shadow-lg transition-all duration-300"
            >
              Upgrade
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <Card className="bg-gradient-to-r from-arogya-light-blue/10 to-arogya-beige-yellow/10 border-arogya-light-blue/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-arogya-dark-green rounded-xl text-white">
              {message.icon}
            </div>
            <div>
              <h3 className="font-semibold text-arogya-dark-teal text-lg">{message.title}</h3>
              <p className="text-gray-600">{message.description}</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/subscription')}
            className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green text-white hover:shadow-lg transition-all duration-300"
          >
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionUpgrade;
