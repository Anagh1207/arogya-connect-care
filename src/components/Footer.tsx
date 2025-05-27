
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

  return (
    <footer className="bg-arogya-dark-teal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/ab2f5346-9dbf-46fd-9e64-97bb5022d676.png" 
                alt="Arogya Care" 
                className="h-8 w-8 mr-3 cursor-pointer" 
                onClick={() => navigate('/')}
              />
              <span className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>Arogya Care</span>
            </div>
            <p className="text-arogya-light-blue mb-6 leading-relaxed">
              Revolutionizing healthcare through innovative digital solutions. 
              Connecting patients with healthcare professionals for better health outcomes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-arogya-light-blue hover:text-white transition-colors p-2 bg-arogya-teal rounded-lg hover:bg-arogya-dark-green">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-arogya-light-blue hover:text-white transition-colors p-2 bg-arogya-teal rounded-lg hover:bg-arogya-dark-green">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-arogya-light-blue hover:text-white transition-colors p-2 bg-arogya-teal rounded-lg hover:bg-arogya-dark-green">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-arogya-light-blue hover:text-white transition-colors p-2 bg-arogya-teal rounded-lg hover:bg-arogya-dark-green">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-arogya-beige-yellow">For Patients</h3>
            <ul className="space-y-3">
              <li><button onClick={() => navigate('/patient-dashboard')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Book Consultation</button></li>
              <li><button onClick={() => navigate('/team')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Find Doctors</button></li>
              <li><button onClick={() => navigate('/my-health-records')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Medical Records</button></li>
              <li><button onClick={() => navigate('/subscription')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Health Insurance</button></li>
              <li><button onClick={() => navigate('/patient-dashboard')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Prescription Refills</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-arogya-beige-yellow">For Doctors</h3>
            <ul className="space-y-3">
              <li><button onClick={() => navigate('/doctor-dashboard')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Join Our Network</button></li>
              <li><button onClick={() => navigate('/doctor-dashboard')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Practice Management</button></li>
              <li><button onClick={() => navigate('/services')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Billing Support</button></li>
              <li><button onClick={() => navigate('/services')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Training Resources</button></li>
              <li><button onClick={() => navigate('/services')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Telemedicine Tools</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-arogya-beige-yellow">Support & Newsletter</h3>
            <ul className="space-y-3 mb-6">
              <li><button onClick={() => navigate('/contact')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Help Center</button></li>
              <li><button onClick={() => navigate('/contact')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Contact Support</button></li>
              <li><button onClick={() => navigate('/privacy')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => navigate('/terms')} className="text-arogya-light-blue hover:text-white transition-colors text-left">Terms of Service</button></li>
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
                  className="bg-arogya-teal border-arogya-light-teal text-white placeholder:text-arogya-light-blue"
                  required
                />
                <Button 
                  type="submit" 
                  size="sm"
                  className="bg-arogya-dark-green hover:bg-arogya-light-green text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>

            <div className="p-4 bg-arogya-teal rounded-xl">
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
            <button onClick={() => navigate('/privacy')} className="text-arogya-light-blue hover:text-white text-sm transition-colors">Privacy</button>
            <button onClick={() => navigate('/terms')} className="text-arogya-light-blue hover:text-white text-sm transition-colors">Terms</button>
            <button onClick={() => navigate('/accessibility')} className="text-arogya-light-blue hover:text-white text-sm transition-colors">Accessibility</button>
            <button onClick={() => navigate('/cookies')} className="text-arogya-light-blue hover:text-white text-sm transition-colors">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
