
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
import SubscriptionUpgrade from './SubscriptionUpgrade';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: <Heart className="w-4 h-4" /> },
    { href: '/services', label: 'Services', icon: <Stethoscope className="w-4 h-4" /> },
    { href: '/community', label: 'Community', icon: <Users className="w-4 h-4" /> },
    { href: '/explore', label: 'Explore', icon: <MessageCircle className="w-4 h-4" /> },
    { href: '/emergency-services', label: 'Emergency', icon: <Phone className="w-4 h-4" /> },
    { href: '/team', label: 'Team', icon: <Users className="w-4 h-4" /> },
    { href: '/contact', label: 'Contact', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const getUserMenuItems = () => {
    if (!profile) return [];
    
    const baseItems = {
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
      hospital: [
        { label: 'Dashboard', href: '/hospital-dashboard', icon: <User className="w-4 h-4" /> },
        { label: 'Management', href: '/hospital-dashboard?tab=management', icon: <Settings className="w-4 h-4" /> },
      ],
      admin: [
        { label: 'Admin Panel', href: '/admin-panel', icon: <User className="w-4 h-4" /> },
        { label: 'Emergency Services', href: '/emergency-services', icon: <Phone className="w-4 h-4" /> },
      ]
    };

    return baseItems[profile.role] || [];
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.includes(href.replace('/#', ''));
  };

  const getWelcomeMessage = () => {
    if (!profile) return '';
    
    switch (profile.role) {
      case 'doctor':
        return `Dr. ${profile.full_name || 'Doctor'}`;
      case 'admin':
        return `Admin ${profile.full_name || 'Administrator'}`;
      default:
        return profile.full_name || 'User';
    }
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
            <img 
              src="/lovable-uploads/ab2f5346-9dbf-46fd-9e64-97bb5022d676.png" 
              alt="Arogya Care" 
              className="h-10 w-10 mr-3 group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-arogya-dark-teal to-arogya-dark-green bg-clip-text text-transparent">
              Arogya Care
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-arogya-light-blue/50 ${
                  isActive(link.href) 
                    ? 'text-arogya-dark-green bg-arogya-light-blue/30' 
                    : 'text-arogya-teal hover:text-arogya-dark-green'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop Auth/User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user && profile ? (
              <div className="flex items-center space-x-3">
                <SubscriptionUpgrade variant="badge" context="dashboard" />
                <span className="text-sm text-arogya-dark-teal font-medium">
                  Welcome, {getWelcomeMessage()}
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
                    {getUserMenuItems().map((item) => (
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
                <button
                  key={link.href}
                  onClick={() => {
                    navigate(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 text-left ${
                    isActive(link.href) 
                      ? 'text-arogya-dark-green bg-arogya-light-blue/30' 
                      : 'text-arogya-teal hover:text-arogya-dark-green hover:bg-arogya-light-blue/50'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              ))}
              
              <div className="pt-4 border-t border-arogya-light-blue/30 mt-4">
                {user && profile ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm text-arogya-dark-teal font-medium">
                      Welcome, {getWelcomeMessage()}
                    </div>
                    {getUserMenuItems().map((item) => (
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
