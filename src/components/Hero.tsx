
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, CheckCircle, Video, FileText, Clock } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-arogya-light-blue to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-arogya-dark-teal mb-6 leading-tight">
              Your Health,{' '}
              <span className="text-arogya-dark-green">
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
                className="bg-arogya-dark-green hover:bg-arogya-light-green text-white px-8 py-4 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/login')}
                className="text-arogya-dark-green border-arogya-dark-green hover:bg-arogya-beige-yellow px-8 py-4 text-lg rounded-xl border-2"
              >
                Login
              </Button>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center text-arogya-teal">
                <CheckCircle className="w-5 h-5 mr-2 text-arogya-dark-green" />
                <span className="font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center text-arogya-teal">
                <CheckCircle className="w-5 h-5 mr-2 text-arogya-dark-green" />
                <span className="font-medium">Secure & Private</span>
              </div>
              <div className="flex items-center text-arogya-teal">
                <CheckCircle className="w-5 h-5 mr-2 text-arogya-dark-green" />
                <span className="font-medium">Expert Doctors</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-arogya-light-blue rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-arogya-dark-green rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-arogya-dark-green">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-bold text-arogya-dark-teal mb-2 text-lg">Dr. Sarah Johnson</h3>
                <p className="text-arogya-teal text-sm mb-3">Cardiologist • 15 years experience</p>
                <div className="flex items-center justify-between">
                  <span className="text-arogya-dark-green font-semibold bg-arogya-beige-yellow px-3 py-1 rounded-full text-sm">Available Now</span>
                  <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white rounded-xl">
                    Consult
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-arogya-teal">
                  <Video className="w-5 h-5 mr-3 text-arogya-dark-green" />
                  Secure Video Consultation
                </div>
                <div className="flex items-center text-arogya-teal">
                  <FileText className="w-5 h-5 mr-3 text-arogya-dark-green" />
                  Digital Prescription
                </div>
                <div className="flex items-center text-arogya-teal">
                  <Clock className="w-5 h-5 mr-3 text-arogya-dark-green" />
                  Instant Appointments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
