
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const Header = () => {
  const [userType, setUserType] = useState<'patient' | 'doctor' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (type: 'patient' | 'doctor') => {
    setUserType(type);
    if (type === 'patient') {
      navigate('/patient-dashboard');
    } else {
      navigate('/doctor-dashboard');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-arogya-light-blue sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="bg-arogya-dark-green text-white p-2 rounded-lg mr-3">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-arogya-dark-teal">Arogya Care</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-arogya-teal hover:text-arogya-dark-green transition-colors font-medium">Services</a>
            <a href="#how-it-works" className="text-arogya-teal hover:text-arogya-dark-green transition-colors font-medium">How It Works</a>
            <a href="#testimonials" className="text-arogya-teal hover:text-arogya-dark-green transition-colors font-medium">Testimonials</a>
            <a href="#about" className="text-arogya-teal hover:text-arogya-dark-green transition-colors font-medium">About</a>
            <a href="#contact" className="text-arogya-teal hover:text-arogya-dark-green transition-colors font-medium">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {userType ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-arogya-teal">
                  Welcome, {userType === 'patient' ? 'Patient' : 'Dr. Smith'}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-arogya-dark-green border-arogya-dark-green hover:bg-arogya-beige-yellow"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="text-arogya-dark-green border-arogya-dark-green hover:bg-arogya-beige-yellow"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="bg-arogya-dark-green hover:bg-arogya-light-green text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-arogya-dark-teal"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-arogya-light-blue">
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-arogya-teal hover:text-arogya-dark-green transition-colors font-medium">Services</a>
              <a href="#how-it-works" className="text-arogya-teal hover:text-arogya-dark-green transition-colors font-medium">How It Works</a>
              <a href="#testimonials" className="text-arogya-teal hover:text-arogya-dark-green transition-colors font-medium">Testimonials</a>
              <a href="#about" className="text-arogya-teal hover:text-arogya-dark-green transition-colors font-medium">About</a>
              <a href="#contact" className="text-arogya-teal hover:text-arogya-dark-green transition-colors font-medium">Contact</a>
              {userType ? (
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-arogya-dark-green border-arogya-dark-green hover:bg-arogya-beige-yellow w-fit"
                >
                  Logout
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/login')}
                    className="text-arogya-dark-green border-arogya-dark-green hover:bg-arogya-beige-yellow w-fit"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => navigate('/signup')}
                    className="bg-arogya-dark-green hover:bg-arogya-light-green text-white w-fit"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
