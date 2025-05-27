
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Heart, Stethoscope, Phone, ArrowLeft, MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Trigger animation after component mounts
    setTimeout(() => setAnimationClass("animate-fade-in"), 100);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10 flex items-center justify-center px-4">
      <div className={`max-w-2xl mx-auto text-center space-y-8 ${animationClass}`}>
        
        {/* Healthcare-themed illustration */}
        <div className="relative">
          <div className="w-64 h-64 mx-auto mb-8 relative">
            {/* Nurse with map illustration */}
            <div className="absolute inset-0 bg-arogya-light-blue/20 rounded-full flex items-center justify-center">
              <div className="relative">
                {/* Broken heart with stethoscope */}
                <div className="text-8xl text-arogya-teal/30 animate-pulse">
                  <Heart className="w-20 h-20 mx-auto mb-4" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Stethoscope className="w-12 h-12 text-arogya-dark-green animate-bounce" />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <MapPin className="w-8 h-8 text-arogya-beige-yellow animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Floating medical icons */}
            <div className="absolute top-4 left-4 animate-float">
              <div className="w-6 h-6 bg-arogya-light-green rounded-full opacity-60"></div>
            </div>
            <div className="absolute bottom-8 right-8 animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-4 h-4 bg-arogya-teal rounded-full opacity-40"></div>
            </div>
            <div className="absolute top-12 right-12 animate-float" style={{ animationDelay: '2s' }}>
              <div className="w-3 h-3 bg-arogya-beige-yellow rounded-full opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-arogya-dark-teal mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-arogya-dark-teal mb-2">
            Oops! You seem to have wandered off
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Don't worry, even the best healthcare professionals sometimes take a wrong turn. 
            Let us guide you back to safety and wellness.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green hover:from-arogya-light-green hover:to-arogya-dark-green text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Safety
          </Button>
          
          <Button 
            onClick={() => navigate('/emergency-services')}
            variant="outline"
            className="border-2 border-arogya-teal text-arogya-teal hover:bg-arogya-teal hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300"
          >
            <Phone className="w-5 h-5 mr-2" />
            Emergency Services
          </Button>
        </div>

        {/* Helpful links */}
        <Card className="bg-white/70 backdrop-blur-sm border-arogya-light-blue/30 mt-12">
          <CardContent className="p-6">
            <h3 className="font-semibold text-arogya-dark-teal mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button 
                onClick={() => navigate('/team')}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-arogya-light-blue/30 transition-colors duration-200"
              >
                <Heart className="w-6 h-6 text-arogya-teal mb-2" />
                <span className="text-sm text-gray-700">Our Team</span>
              </button>
              
              <button 
                onClick={() => navigate('/login')}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-arogya-light-blue/30 transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6 text-arogya-teal mb-2" />
                <span className="text-sm text-gray-700">Sign In</span>
              </button>
              
              <button 
                onClick={() => navigate('/subscription')}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-arogya-light-blue/30 transition-colors duration-200"
              >
                <Stethoscope className="w-6 h-6 text-arogya-teal mb-2" />
                <span className="text-sm text-gray-700">Subscribe</span>
              </button>
              
              <button 
                onClick={() => navigate('/#contact')}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-arogya-light-blue/30 transition-colors duration-200"
              >
                <Phone className="w-6 h-6 text-arogya-teal mb-2" />
                <span className="text-sm text-gray-700">Contact</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Empathetic message */}
        <div className="text-center pt-4">
          <p className="text-arogya-teal italic">
            "Your health journey matters to us. We're here to help you find your way." 
            <br />
            <span className="text-sm">— The ArogyaCare Team</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
