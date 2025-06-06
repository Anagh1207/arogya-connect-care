
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroStats = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-arogya-light-blue/30">
      <div className="flex items-center mb-4">
        <div className="flex -space-x-2">
          <div className="w-10 h-10 bg-arogya-dark-green rounded-full flex items-center justify-center text-white font-semibold text-sm">
            Dr
          </div>
          <div className="w-10 h-10 bg-arogya-teal rounded-full flex items-center justify-center text-white font-semibold text-sm">
            M
          </div>
          <div className="w-10 h-10 bg-arogya-light-green rounded-full flex items-center justify-center text-white font-semibold text-sm">
            S
          </div>
        </div>
        <div className="ml-4">
          <p className="text-arogya-dark-teal font-semibold">1000+ Happy Patients</p>
          <p className="text-arogya-teal text-sm">Trusted by healthcare seekers</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-arogya-dark-green">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm font-medium">50+ Doctors Online</span>
        </div>
        <Button 
          size="sm" 
          onClick={() => navigate('/signup')}
          className="bg-arogya-dark-green hover:bg-arogya-light-green text-white rounded-xl px-4 py-2 text-sm"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default HeroStats;
