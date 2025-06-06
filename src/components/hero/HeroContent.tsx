
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Video } from 'lucide-react';

const HeroContent = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <div className="inline-flex items-center bg-arogya-dark-green/10 text-arogya-dark-green px-4 py-2 rounded-full text-sm font-medium mb-6">
        <Heart className="w-4 h-4 mr-2" />
        Trusted Healthcare Platform
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-arogya-dark-teal mb-6 leading-tight">
        Your Health,{' '}
        <span className="text-arogya-dark-green bg-gradient-to-r from-arogya-dark-green to-arogya-light-green bg-clip-text">
          Our Priority
        </span>
      </h1>
      
      <p className="text-xl text-arogya-teal mb-8 leading-relaxed">
        Connect with certified healthcare professionals from the comfort of your home. 
        Schedule appointments, upload medical records, and get expert 
        healthcare consultation through secure video calls.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button 
          onClick={() => navigate('/signup')}
          className="bg-arogya-dark-green hover:bg-arogya-light-green text-white px-8 py-4 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:shadow-xl"
        >
          <Users className="w-5 h-5 mr-2" />
          Join as Patient
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/login')}
          className="text-arogya-dark-green border-2 border-arogya-dark-green hover:bg-arogya-dark-green hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Video className="w-5 h-5 mr-2" />
          Login
        </Button>
      </div>
    </div>
  );
};

export default HeroContent;
