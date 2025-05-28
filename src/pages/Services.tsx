
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Stethoscope, 
  Heart, 
  Users, 
  Phone, 
  MessageCircle, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Stethoscope className="w-12 h-12 text-arogya-dark-green" />,
      title: "Virtual Consultations",
      description: "Connect with certified doctors from the comfort of your home through secure video calls.",
      features: ["HD Video Quality", "Secure & Private", "24/7 Available", "Instant Reports"],
      price: "₹299",
      popular: false
    },
    {
      icon: <Heart className="w-12 h-12 text-arogya-dark-green" />,
      title: "Health Monitoring",
      description: "Track your vital signs and health metrics with our AI-powered monitoring system.",
      features: ["Real-time Tracking", "AI Analysis", "Health Alerts", "Progress Reports"],
      price: "₹199",
      popular: true
    },
    {
      icon: <Users className="w-12 h-12 text-arogya-dark-green" />,
      title: "Care Team",
      description: "Access a dedicated team of healthcare professionals for comprehensive care.",
      features: ["Dedicated Team", "24/7 Support", "Personalized Care", "Emergency Access"],
      price: "₹599",
      popular: false
    },
    {
      icon: <Phone className="w-12 h-12 text-arogya-dark-green" />,
      title: "Emergency Services",
      description: "24/7 emergency support with rapid response ambulance and blood donation services.",
      features: ["Instant Response", "GPS Tracking", "Blood Bank", "Emergency Contacts"],
      price: "₹99",
      popular: false
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-arogya-dark-green" />,
      title: "AI Health Assistant",
      description: "Get instant answers to health questions with our intelligent chatbot.",
      features: ["Instant Responses", "Medical Database", "Symptom Checker", "Drug Information"],
      price: "₹149",
      popular: false
    },
    {
      icon: <Calendar className="w-12 h-12 text-arogya-dark-green" />,
      title: "Appointment Management",
      description: "Easy scheduling and management of all your medical appointments.",
      features: ["Easy Booking", "Reminders", "Rescheduling", "Multiple Doctors"],
      price: "₹79",
      popular: false
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "50,000+", label: "Happy Patients" },
    { icon: <Stethoscope className="w-8 h-8" />, value: "1,000+", label: "Expert Doctors" },
    { icon: <Clock className="w-8 h-8" />, value: "24/7", label: "Support Available" },
    { icon: <Star className="w-8 h-8" />, value: "4.9", label: "Average Rating" }
  ];

  const benefits = [
    { icon: <Shield className="w-6 h-6" />, title: "Secure & Private", desc: "Your data is protected with end-to-end encryption" },
    { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", desc: "Get connected to doctors in under 60 seconds" },
    { icon: <CheckCircle className="w-6 h-6" />, title: "Verified Doctors", desc: "All our doctors are certified and verified professionals" },
    { icon: <Heart className="w-6 h-6" />, title: "Compassionate Care", desc: "We prioritize your health and well-being above all" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-arogya-light-blue/30 via-white to-arogya-beige-yellow/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-arogya-dark-teal mb-6 animate-fade-in">
            Our Healthcare Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in">
            Comprehensive healthcare solutions designed to meet all your medical needs with cutting-edge technology and compassionate care.
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center mb-3 text-arogya-dark-green">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-arogya-dark-teal mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">Choose Your Perfect Plan</h2>
            <p className="text-xl text-gray-600">Affordable healthcare solutions tailored to your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden ${service.popular ? 'ring-2 ring-arogya-dark-green' : ''}`}>
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-arogya-dark-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="text-center pb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-arogya-light-blue/10 to-arogya-beige-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6 p-4 bg-arogya-light-blue/10 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-arogya-dark-teal mb-2">{service.title}</CardTitle>
                    <div className="text-3xl font-bold text-arogya-dark-green mb-2">{service.price}<span className="text-sm text-gray-500">/month</span></div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center mb-6">{service.description}</p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-arogya-dark-green mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-6 bg-arogya-dark-green hover:bg-arogya-teal text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">Why Choose Arogya Care?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our premium healthcare services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-arogya-light-blue/10 p-6 rounded-2xl mb-4 group-hover:bg-arogya-dark-green/10 transition-colors duration-300 mx-auto w-fit group-hover:scale-110 transition-transform">
                  <div className="text-arogya-dark-green group-hover:text-arogya-dark-teal transition-colors">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-arogya-dark-teal mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-arogya-dark-teal to-arogya-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Healthcare Journey?</h2>
          <p className="text-xl text-arogya-light-blue mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust Arogya Care for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-arogya-dark-teal hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-arogya-dark-teal font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
              Book Consultation
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
