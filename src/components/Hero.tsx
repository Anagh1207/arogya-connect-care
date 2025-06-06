import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, CheckCircle, Video, FileText, Clock, Users, Award, Shield } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-arogya-light-blue via-white to-arogya-beige-yellow/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center bg-arogya-dark-green/10 text-arogya-dark-green px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Trusted Healthcare Platform
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-arogya-dark-teal mb-6 leading-tight">
              Your Health,{' '}
              <span className="text-arogya-dark-green bg-gradient-to-r from-arogya-dark-green to-arogya-light-green bg-clip-text">
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
                className="bg-arogya-dark-green hover:bg-arogya-light-green text-white px-8 py-4 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:shadow-xl"
              >
                <Users className="w-5 h-5 mr-2" />
                Join as Patient
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/login')}
                className="text-arogya-dark-green border-2 border-arogya-dark-green hover:bg-arogya-dark-green hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Video className="w-5 h-5 mr-2" />
                Login
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center text-arogya-teal bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <CheckCircle className="w-5 h-5 mr-2 text-arogya-dark-green flex-shrink-0" />
                <span className="font-medium text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center text-arogya-teal bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <Shield className="w-5 h-5 mr-2 text-arogya-dark-green flex-shrink-0" />
                <span className="font-medium text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center text-arogya-teal bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <Award className="w-5 h-5 mr-2 text-arogya-dark-green flex-shrink-0" />
                <span className="font-medium text-sm">Expert Doctors</span>
              </div>
            </div>

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
          </div>
          
          <div className="relative animate-slide-up">
            {/* Main doctor consultation card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-arogya-light-blue to-arogya-beige-yellow/30 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-arogya-dark-green rounded-full flex items-center justify-center mr-4">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-arogya-dark-green" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-arogya-dark-teal text-lg">Dr. Sarah Johnson</h3>
                      <p className="text-arogya-teal text-sm">Cardiologist • 15+ years exp</p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {'★★★★★'.split('').map((star, i) => (
                            <span key={i} className="text-xs">{star}</span>
                          ))}
                        </div>
                        <span className="text-xs text-arogya-teal ml-1">(4.9)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-arogya-dark-green">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-arogya-dark-green font-semibold bg-green-100 px-3 py-1 rounded-full text-sm flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Available Now
                  </span>
                  <span className="text-arogya-teal text-sm font-medium">₹500/consultation</span>
                </div>
                
                <Button 
                  onClick={() => navigate('/signup')}
                  className="w-full bg-arogya-dark-green hover:bg-arogya-light-green text-white rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-arogya-teal bg-arogya-light-blue/30 rounded-lg p-3">
                  <Video className="w-5 h-5 mr-3 text-arogya-dark-green" />
                  <span className="text-sm font-medium">Secure Video Consultation</span>
                </div>
                <div className="flex items-center text-arogya-teal bg-arogya-light-blue/30 rounded-lg p-3">
                  <FileText className="w-5 h-5 mr-3 text-arogya-dark-green" />
                  <span className="text-sm font-medium">Digital Prescription & Reports</span>
                </div>
                <div className="flex items-center text-arogya-teal bg-arogya-light-blue/30 rounded-lg p-3">
                  <Clock className="w-5 h-5 mr-3 text-arogya-dark-green" />
                  <span className="text-sm font-medium">Instant Appointments</span>
                </div>
              </div>
            </div>

            {/* Floating stats cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-pulse">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-arogya-dark-teal">1000+</p>
                  <p className="text-xs text-arogya-teal">Patients Treated</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-pulse" style={{ animationDelay: '1s' }}>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Award className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-arogya-dark-teal">98%</p>
                  <p className="text-xs text-arogya-teal">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <p className="text-arogya-teal mb-8 font-medium">Trusted by leading healthcare institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-white rounded-lg px-6 py-3 shadow-sm">
              <span className="text-arogya-dark-teal font-semibold">AIIMS</span>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-sm">
              <span className="text-arogya-dark-teal font-semibold">Apollo</span>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-sm">
              <span className="text-arogya-dark-teal font-semibold">Fortis</span>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-sm">
              <span className="text-arogya-dark-teal font-semibold">Max Healthcare</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
