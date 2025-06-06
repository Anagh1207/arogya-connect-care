
import { CheckCircle, Shield, Award } from 'lucide-react';

const HeroFeatures = () => {
  const features = [
    { icon: CheckCircle, text: "24/7 Support" },
    { icon: Shield, text: "Secure & Private" },
    { icon: Award, text: "Expert Doctors" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <div key={index} className="flex items-center text-arogya-teal bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <IconComponent className="w-5 h-5 mr-2 text-arogya-dark-green flex-shrink-0" />
            <span className="font-medium text-sm">{feature.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default HeroFeatures;
