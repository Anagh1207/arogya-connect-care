
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Shield, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Patients" },
    { icon: Heart, value: "500+", label: "Expert Doctors" },
    { icon: Shield, value: "99.9%", label: "Uptime" },
    { icon: Award, value: "5-Star", label: "Average Rating" }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">
            About Arogya Care
          </h2>
          <p className="text-xl text-arogya-teal max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make quality healthcare accessible to everyone, 
            anywhere, anytime through innovative digital health solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-arogya-dark-teal mb-6">
              Revolutionizing Healthcare Access
            </h3>
            <p className="text-arogya-teal mb-6 leading-relaxed">
              Founded with the vision of bridging the gap between patients and healthcare providers, 
              Arogya Care leverages cutting-edge technology to deliver exceptional medical services 
              right to your doorstep.
            </p>
            <p className="text-arogya-teal mb-6 leading-relaxed">
              Our platform connects you with certified healthcare professionals, ensuring you receive 
              the care you deserve without the hassle of traditional healthcare barriers.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-arogya-dark-green rounded-full mr-4"></div>
                <span className="text-arogya-teal">HIPAA Compliant & Secure</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-arogya-dark-green rounded-full mr-4"></div>
                <span className="text-arogya-teal">24/7 Emergency Support</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-arogya-dark-green rounded-full mr-4"></div>
                <span className="text-arogya-teal">AI-Powered Health Insights</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-arogya-light-blue rounded-3xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-2xl font-bold text-arogya-dark-teal mb-4">Our Mission</h4>
                <p className="text-arogya-teal leading-relaxed">
                  To democratize healthcare by providing accessible, affordable, and quality 
                  medical services through innovative digital solutions that put patients first.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 bg-arogya-light-blue border-0 rounded-2xl">
              <CardContent className="p-6">
                <stat.icon className="w-12 h-12 text-arogya-dark-green mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-arogya-dark-teal mb-2">{stat.value}</h3>
                <p className="text-arogya-teal font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
