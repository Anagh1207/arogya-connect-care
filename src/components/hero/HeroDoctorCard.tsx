
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, CheckCircle, Video, FileText, Clock, Users, Award } from 'lucide-react';

const HeroDoctorCard = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default HeroDoctorCard;
