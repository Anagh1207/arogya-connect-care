
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Heart, Users, Phone, MessageCircle, Calendar } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Stethoscope className="w-12 h-12 text-arogya-dark-green" />,
      title: "Virtual Consultations",
      description: "Connect with certified doctors from the comfort of your home through secure video calls."
    },
    {
      icon: <Heart className="w-12 h-12 text-arogya-dark-green" />,
      title: "Health Monitoring",
      description: "Track your vital signs and health metrics with our AI-powered monitoring system."
    },
    {
      icon: <Users className="w-12 h-12 text-arogya-dark-green" />,
      title: "Care Team",
      description: "Access a dedicated team of healthcare professionals for comprehensive care."
    },
    {
      icon: <Phone className="w-12 h-12 text-arogya-dark-green" />,
      title: "Emergency Services",
      description: "24/7 emergency support with rapid response ambulance and blood donation services."
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-arogya-dark-green" />,
      title: "AI Health Assistant",
      description: "Get instant answers to health questions with our intelligent chatbot."
    },
    {
      icon: <Calendar className="w-12 h-12 text-arogya-dark-green" />,
      title: "Appointment Management",
      description: "Easy scheduling and management of all your medical appointments."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-arogya-dark-teal mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare solutions designed to meet all your medical needs with cutting-edge technology and compassionate care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-arogya-dark-teal">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
