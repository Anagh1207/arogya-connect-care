
import { Heart, Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscription Successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0); // Smooth scroll to top when navigating
  };

  return (
    <footer className="bg-arogya-dark-teal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/ab2f5346-9dbf-46fd-9e64-97bb5022d676.png" 
                alt="Arogya Care" 
                className="h-8 w-8 mr-3 cursor-pointer transition-transform hover:scale-110" 
                onClick={() => handleNavigation('/')}
              />
              <span 
                className="text-xl font-bold cursor-pointer transition-colors hover:text-arogya-beige-yellow" 
                onClick={() => handleNavigation('/')}
              >
                Arogya Care
              </span>
            </div>
            <p className="text-arogya-light-blue mb-6 leading-relaxed">
              Revolutionizing healthcare through innovative digital solutions. 
              Connecting patients with healthcare professionals for better health outcomes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-arogya-light-blue hover:text-white transition-all duration-300 p-2 bg-arogya-teal rounded-lg hover:bg-arogya-dark-green hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-arogya-light-blue hover:text-white transition-all duration-300 p-2 bg-arogya-teal rounded-lg hover:bg-arogya-dark-green hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-arogya-light-blue hover:text-white transition-all duration-300 p-2 bg-arogya-teal rounded-lg hover:bg-arogya-dark-green hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-arogya-light-blue hover:text-white transition-all duration-300 p-2 bg-arogya-teal rounded-lg hover:bg-arogya-dark-green hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-arogya-beige-yellow">Company</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavigation('/about')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/team')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/services')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/contact')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-arogya-beige-yellow">For Patients</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavigation('/patient-dashboard')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Book Consultation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/team')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Find Doctors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/my-health-records')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Medical Records
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/subscription')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Health Insurance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/emergency-services')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Emergency Services
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-arogya-beige-yellow">Support & Newsletter</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <button 
                  onClick={() => handleNavigation('/contact')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/contact')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/privacy')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/terms')} 
                  className="text-arogya-light-blue hover:text-white transition-all duration-300 text-left hover:translate-x-1 transform"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
            
            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscription} className="mb-6">
              <h4 className="text-sm font-medium mb-3 text-arogya-beige-yellow">Subscribe to Newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-arogya-teal border-arogya-light-teal text-white placeholder:text-arogya-light-blue focus:ring-arogya-beige-yellow"
                  required
                />
                <Button 
                  type="submit" 
                  size="sm"
                  className="bg-arogya-dark-green hover:bg-arogya-light-green text-white transition-all duration-300 hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>

            <div className="p-4 bg-arogya-teal rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm text-arogya-light-blue mb-2 font-medium">24/7 Emergency Support</p>
              <p className="text-white font-bold text-lg">1-800-AROGYA</p>
              <p className="text-xs text-arogya-light-blue mt-1">(276-4921)</p>
            </div>
          </div>
        </div>

        <div className="border-t border-arogya-teal mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-arogya-light-blue text-sm">
            © 2024 Arogya Care. All rights reserved. | Empowering health through technology.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button 
              onClick={() => handleNavigation('/privacy')} 
              className="text-arogya-light-blue hover:text-white text-sm transition-all duration-300 hover:scale-105"
            >
              Privacy
            </button>
            <button 
              onClick={() => handleNavigation('/terms')} 
              className="text-arogya-light-blue hover:text-white text-sm transition-all duration-300 hover:scale-105"
            >
              Terms
            </button>
            <button 
              onClick={() => handleNavigation('/about')} 
              className="text-arogya-light-blue hover:text-white text-sm transition-all duration-300 hover:scale-105"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('/contact')} 
              className="text-arogya-light-blue hover:text-white text-sm transition-all duration-300 hover:scale-105"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
