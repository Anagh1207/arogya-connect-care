
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-healthcare-blue-light to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Health,{' '}
              <span className="text-healthcare-blue">
                Our Priority
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with certified doctors from the comfort of your home. 
              Schedule appointments, upload medical records, and get expert 
              healthcare consultation through secure video calls.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/patient-dashboard')}
                className="bg-healthcare-blue hover:bg-healthcare-blue-dark text-white px-8 py-3 text-lg"
              >
                Book Consultation
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/doctor-dashboard')}
                className="text-healthcare-blue border-healthcare-blue hover:bg-healthcare-blue-light px-8 py-3 text-lg"
              >
                Join as Doctor
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-healthcare-blue-light rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-healthcare-blue rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-healthcare-green">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Dr. Sarah Johnson</h3>
                <p className="text-gray-600 text-sm mb-3">Cardiologist • 15 years experience</p>
                <div className="flex items-center justify-between">
                  <span className="text-healthcare-green font-medium">Available Now</span>
                  <Button size="sm" className="bg-healthcare-blue hover:bg-healthcare-blue-dark text-white">
                    Consult
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-healthcare-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Secure Video Consultation
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-healthcare-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Digital Prescription
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-healthcare-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24/7 Support
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
