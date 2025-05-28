
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Award, Globe, Shield, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-12 h-12 text-arogya-dark-green" />,
      title: "Compassionate Care",
      description: "We put patients first, ensuring every interaction is filled with empathy and understanding."
    },
    {
      icon: <Users className="w-12 h-12 text-arogya-dark-green" />,
      title: "Inclusive Healthcare",
      description: "Making quality healthcare accessible to everyone, regardless of location or economic status."
    },
    {
      icon: <Award className="w-12 h-12 text-arogya-dark-green" />,
      title: "Excellence",
      description: "Committed to the highest standards of medical care and technological innovation."
    },
    {
      icon: <Globe className="w-12 h-12 text-arogya-dark-green" />,
      title: "Global Reach",
      description: "Connecting patients worldwide with India's finest healthcare professionals."
    },
    {
      icon: <Shield className="w-12 h-12 text-arogya-dark-green" />,
      title: "Trust & Security",
      description: "Your health data is protected with enterprise-grade security and privacy measures."
    },
    {
      icon: <Zap className="w-12 h-12 text-arogya-dark-green" />,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to revolutionize healthcare delivery."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-arogya-dark-teal mb-6">
              About{' '}
              <span className="text-arogya-dark-green bg-gradient-to-r from-arogya-dark-green to-arogya-light-green bg-clip-text">
                Arogya Care
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transforming healthcare through technology, compassion, and innovation. 
              We're on a mission to make quality healthcare accessible to everyone.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-arogya-dark-teal flex items-center">
                  <Heart className="w-8 h-8 mr-3 text-arogya-dark-green" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To democratize healthcare by leveraging technology to connect patients 
                  with qualified healthcare professionals, making quality medical care 
                  accessible, affordable, and convenient for everyone, especially in 
                  underserved communities across India.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-arogya-dark-teal flex items-center">
                  <Globe className="w-8 h-8 mr-3 text-arogya-dark-green" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To become India's most trusted digital healthcare platform, 
                  where every individual has access to world-class medical care 
                  at their fingertips, creating a healthier and more connected society.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-arogya-dark-teal text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-arogya-dark-teal mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <Card className="bg-gradient-to-r from-arogya-dark-teal to-arogya-dark-green text-white">
            <CardContent className="p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg leading-relaxed max-w-4xl mx-auto opacity-90">
                  Founded in 2024, Arogya Care emerged from a simple yet powerful idea: 
                  healthcare should be accessible to everyone, everywhere. Our founders, 
                  recognizing the gaps in India's healthcare system, set out to create 
                  a platform that would bridge the distance between patients and quality care. 
                  Today, we serve thousands of patients across India, connecting them with 
                  certified healthcare professionals through our innovative digital platform.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
