
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
  Zap,
  FileText,
  Brain,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

const Services = () => {
  const problems = [
    {
      icon: <FileText className="w-8 h-8 text-red-500" />,
      title: "Fragmented Patient Records",
      before: "Medical records scattered across multiple hospitals, clinics, and labs - often lost or inaccessible during emergencies.",
      after: "Complete digital health history accessible instantly from anywhere in India, ensuring continuity of care."
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: "Delayed Medical Access",
      before: "Hours wasted in queues, appointment booking confusion, and delayed access to specialist doctors.",
      after: "Instant video consultations with certified doctors, smart appointment scheduling, and priority emergency access."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Poor Doctor-Patient Communication",
      before: "Limited consultation time, language barriers, and no follow-up mechanism after treatment.",
      after: "Real-time communication tools, multilingual support, and continuous health monitoring with personalized guidance."
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: "Lack of Data-Driven Insights",
      before: "Healthcare decisions based on limited information, no predictive analysis for preventive care.",
      after: "AI-powered health insights, early disease detection, and personalized treatment recommendations."
    }
  ];

  const solutions = [
    {
      icon: <Shield className="w-12 h-12 text-arogya-dark-green" />,
      title: "Smart Digital Records",
      description: "Secure, encrypted health records accessible across all healthcare providers in India.",
      features: ["Blockchain-secured data", "Multi-language support", "Emergency access protocols", "Family health linkage"]
    },
    {
      icon: <Zap className="w-12 h-12 text-arogya-dark-green" />,
      title: "Real-Time Access",
      description: "Instant access to medical history, test reports, and prescriptions from any device.",
      features: ["24/7 availability", "Offline access", "QR code sharing", "Emergency contact alerts"]
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-arogya-dark-green" />,
      title: "Doctor-Patient Coordination",
      description: "Seamless communication platform connecting patients with healthcare professionals.",
      features: ["Video consultations", "Chat support", "Appointment reminders", "Follow-up tracking"]
    },
    {
      icon: <Brain className="w-12 h-12 text-arogya-dark-green" />,
      title: "AI-Powered Insights",
      description: "Intelligent health analytics for early detection and personalized care plans.",
      features: ["Predictive analysis", "Risk assessment", "Treatment optimization", "Health recommendations"]
    }
  ];

  const impact = [
    { metric: "2M+", label: "Patients Empowered", description: "Across rural and urban India" },
    { metric: "50,000+", label: "Doctors Connected", description: "From AIIMS to PHCs" },
    { metric: "85%", label: "Faster Diagnosis", description: "With instant record access" },
    { metric: "₹500Cr+", label: "Healthcare Savings", description: "Through preventive care" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-arogya-light-blue/30 via-white to-arogya-beige-yellow/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-arogya-dark-teal mb-6 animate-fade-in">
            Transforming Healthcare in India
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 animate-fade-in">
            Bridging the gap between patients and quality healthcare through innovative digital solutions. 
            Making healthcare accessible, affordable, and efficient for every Indian.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button className="bg-arogya-dark-green hover:bg-arogya-teal text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
              Experience the Solution
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-light-blue/20 font-semibold px-8 py-3 rounded-xl">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Problems We Solve */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">Healthcare Challenges We Address</h2>
            <p className="text-xl text-gray-600">Real problems faced by millions of Indians every day</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-gray-100 group-hover:bg-arogya-light-blue/20 transition-colors duration-300">
                      {problem.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-arogya-dark-teal ml-4">{problem.title}</CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Before Arogya Connect Care
                    </h4>
                    <p className="text-red-700 text-sm">{problem.before}</p>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      After Our Solution
                    </h4>
                    <p className="text-green-700 text-sm">{problem.after}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Our Solutions */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">Innovative Solutions</h2>
            <p className="text-xl text-gray-600">Technology-driven healthcare solutions designed for India</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-arogya-light-blue/5 to-arogya-beige-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="flex justify-center mb-6 p-4 bg-arogya-light-blue/10 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                    {solution.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-arogya-dark-teal mb-2">{solution.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4 relative z-10">
                  <p className="text-gray-600 text-center mb-6">{solution.description}</p>
                  
                  <div className="space-y-3">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-arogya-dark-green mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-20 bg-gradient-to-r from-arogya-dark-teal to-arogya-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact on Indian Healthcare</h2>
            <p className="text-xl text-arogya-light-blue">Measurable change across the nation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-arogya-beige-yellow transition-colors">
                    {item.metric}
                  </div>
                  <div className="text-xl font-semibold text-arogya-light-blue mb-2">{item.label}</div>
                  <div className="text-sm text-arogya-light-blue/80">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-arogya-light-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">Ready to Transform Healthcare?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions of Indians who have already experienced better healthcare through Arogya Connect Care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-arogya-dark-green text-white hover:bg-arogya-teal font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
              Start Your Health Journey
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-light-blue/20 font-semibold px-8 py-3 rounded-xl">
              Speak to a Health Expert
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
