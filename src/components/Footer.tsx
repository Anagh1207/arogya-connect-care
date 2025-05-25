
import { Heart, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-arogya-dark-teal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-arogya-dark-green text-white p-2 rounded-lg mr-3">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Arogya Care</span>
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
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Book Consultation</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Find Doctors</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Medical Records</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Health Insurance</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Prescription Refills</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-arogya-beige-yellow">For Doctors</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Join Our Network</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Practice Management</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Billing Support</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Training Resources</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Telemedicine Tools</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-arogya-beige-yellow">Support & Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-arogya-light-blue hover:text-white transition-colors">HIPAA Compliance</a></li>
            </ul>
            <div className="mt-6 p-4 bg-arogya-teal rounded-xl">
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
            <a href="#" className="text-arogya-light-blue hover:text-white text-sm transition-colors">Privacy</a>
            <a href="#" className="text-arogya-light-blue hover:text-white text-sm transition-colors">Terms</a>
            <a href="#" className="text-arogya-light-blue hover:text-white text-sm transition-colors">Accessibility</a>
            <a href="#" className="text-arogya-light-blue hover:text-white text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
