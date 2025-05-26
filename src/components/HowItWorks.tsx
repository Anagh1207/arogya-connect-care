
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Search, Calendar, Video, ArrowRight, CheckCircle, Star, Clock } from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: '01',
      title: 'Sign Up & Profile',
      description: 'Create your account and complete your medical profile with basic information and health history.',
      icon: <User className="w-8 h-8" />,
      image: '/placeholder.svg',
      color: 'from-blue-400 to-blue-600'
    },
    {
      number: '02',
      title: 'Choose Doctor',
      description: 'Browse our network of verified doctors, read reviews, and select the best fit for your needs.',
      icon: <Search className="w-8 h-8" />,
      image: '/placeholder.svg',
      color: 'from-green-400 to-green-600'
    },
    {
      number: '03',
      title: 'Book Appointment',
      description: 'Schedule your consultation at a time that works for you with instant confirmation.',
      icon: <Calendar className="w-8 h-8" />,
      image: '/placeholder.svg',
      color: 'from-purple-400 to-purple-600'
    },
    {
      number: '04',
      title: 'Video Consultation',
      description: 'Connect with your doctor through secure video call and receive professional medical advice.',
      icon: <Video className="w-8 h-8" />,
      image: '/placeholder.svg',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-arogya-light-blue/30 via-white to-arogya-beige-yellow/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-arogya-dark-green/10 text-arogya-dark-green px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Clock className="w-4 h-4 mr-2" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-arogya-dark-teal mb-6">
            How Arogya Care Works
          </h2>
          <p className="text-xl text-arogya-teal max-w-3xl mx-auto leading-relaxed">
            Getting quality healthcare has never been easier. Follow these simple steps to connect with expert doctors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-arogya-light-blue to-arogya-beige-yellow transform translate-x-4 z-0">
                  <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-arogya-dark-green" />
                </div>
              )}
              
              <div className="relative z-10 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`mx-auto mb-6 w-16 h-16 bg-gradient-to-r ${step.color} text-white rounded-full flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {step.number}
                </div>
                
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-arogya-light-blue rounded-xl text-arogya-dark-green group-hover:bg-arogya-dark-green group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-arogya-dark-teal mb-3">{step.title}</h3>
                <p className="text-arogya-teal leading-relaxed text-sm">{step.description}</p>
                
                <div className="mt-4 w-full h-32 bg-arogya-light-blue/20 rounded-lg flex items-center justify-center">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-20 h-20 object-contain opacity-60"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-arogya-dark-teal mb-2">98%</h3>
            <p className="text-arogya-teal">Patient Satisfaction</p>
          </div>
          
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-arogya-dark-teal mb-2">4.9/5</h3>
            <p className="text-arogya-teal">Average Rating</p>
          </div>
          
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-arogya-dark-teal mb-2">< 2 min</h3>
            <p className="text-arogya-teal">Average Wait Time</p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-arogya-light-blue to-arogya-beige-yellow rounded-3xl p-8 max-w-4xl mx-auto shadow-xl">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-arogya-dark-teal mb-4">Ready to get started?</h3>
              <p className="text-arogya-teal mb-8 text-lg">Join thousands of patients who trust Arogya Care for their healthcare needs.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/signup')}
                  className="bg-arogya-dark-green hover:bg-arogya-light-green text-white px-8 py-4 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Start as Patient
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/signup')}
                  className="border-2 border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-dark-green hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Join as Doctor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
