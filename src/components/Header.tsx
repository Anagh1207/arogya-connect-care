
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Stethoscope, Users, Phone, MessageCircle, User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (type: 'patient' | 'doctor' | 'admin') => {
    setUserType(type);
    if (type === 'patient') {
      navigate('/patient-dashboard');
    } else if (type === 'doctor') {
      navigate('/doctor-dashboard');
    } else {
      navigate('/admin-panel');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    navigate('/');
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: <Heart className="w-4 h-4" /> },
    { href: '/#services', label: 'Services', icon: <Stethoscope className="w-4 h-4" /> },
    { href: '/team', label: 'Team', icon: <Users className="w-4 h-4" /> },
    { href: '/emergency-services', label: 'Emergency', icon: <Phone className="w-4 h-4" /> },
    { href: '/#contact', label: 'Contact', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const userMenuItems = {
    patient: [
      { label: 'Dashboard', href: '/patient-dashboard', icon: <User className="w-4 h-4" /> },
      { label: 'Health Records', href: '/my-health-records', icon: <Stethoscope className="w-4 h-4" /> },
      { label: 'Subscription', href: '/subscription', icon: <Heart className="w-4 h-4" /> },
    ],
    doctor: [
      { label: 'Dashboard', href: '/doctor-dashboard', icon: <User className="w-4 h-4" /> },
      { label: 'Patients', href: '/doctor-dashboard?tab=patients', icon: <Users className="w-4 h-4" /> },
      { label: 'Schedule', href: '/doctor-dashboard?tab=schedule', icon: <Heart className="w-4 h-4" /> },
    ],
    admin: [
      { label: 'Admin Panel', href: '/admin-panel', icon: <User className="w-4 h-4" /> },
      { label: 'Emergency Services', href: '/emergency-services', icon: <Phone className="w-4 h-4" /> },
    ]
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.includes(href.replace('/#', ''));
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-arogya-light-blue/30 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green text-white p-2.5 rounded-xl mr-3 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-arogya-dark-teal to-arogya-dark-green bg-clip-text text-transparent">
              Arogya Care
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-arogya-light-blue/50 ${
                  isActive(link.href) 
                    ? 'text-arogya-dark-green bg-arogya-light-blue/30' 
                    : 'text-arogya-teal hover:text-arogya-dark-green'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Desktop Auth/User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {userType ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-arogya-teal font-medium">
                  Welcome, {userType === 'patient' ? 'John' : userType === 'doctor' ? 'Dr. Smith' : 'Admin'}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-light-blue/50"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white shadow-xl border border-arogya-light-blue/30">
                    {userMenuItems[userType]?.map((item) => (
                      <DropdownMenuItem 
                        key={item.href}
                        onClick={() => navigate(item.href)}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-arogya-light-blue/20"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 cursor-pointer text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-light-blue/50 transition-all duration-300"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green hover:from-arogya-light-green hover:to-arogya-dark-green text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-arogya-dark-teal hover:bg-arogya-light-blue/50"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-arogya-light-blue/30 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.href) 
                      ? 'text-arogya-dark-green bg-arogya-light-blue/30' 
                      : 'text-arogya-teal hover:text-arogya-dark-green hover:bg-arogya-light-blue/50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
              
              <div className="pt-4 border-t border-arogya-light-blue/30 mt-4">
                {userType ? (
                  <div className="space-y-2">
                    {userMenuItems[userType]?.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => {
                          navigate(item.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left text-arogya-teal hover:text-arogya-dark-green hover:bg-arogya-light-blue/50 transition-all duration-300"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left text-red-600 hover:bg-red-50 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 px-4">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        navigate('/login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-light-blue/50 w-full justify-start"
                    >
                      Login
                    </Button>
                    <Button 
                      onClick={() => {
                        navigate('/signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green text-white w-full justify-start"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
