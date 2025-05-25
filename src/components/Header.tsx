
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [userType, setUserType] = useState<'patient' | 'doctor' | null>(null);
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
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="bg-healthcare-blue text-white p-2 rounded-lg mr-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM9 9V6h2v3h3v2h-3v3H9v-3H6V9h3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Arogya Care</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-600 hover:text-healthcare-blue transition-colors">Services</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-healthcare-blue transition-colors">How It Works</a>
            <a href="#contact" className="text-gray-600 hover:text-healthcare-blue transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            {userType ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {userType === 'patient' ? 'Patient' : 'Dr. Smith'}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-healthcare-blue border-healthcare-blue hover:bg-healthcare-blue-light"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleLogin('patient')}
                  className="text-healthcare-blue border-healthcare-blue hover:bg-healthcare-blue-light"
                >
                  Patient Login
                </Button>
                <Button 
                  onClick={() => handleLogin('doctor')}
                  className="bg-healthcare-blue hover:bg-healthcare-blue-dark text-white"
                >
                  Doctor Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
