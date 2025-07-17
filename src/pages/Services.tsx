
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
      icon: <Brain className="w-8 h-8 text-red-500" />,
      title: "Mental Health Stigma",
      before: "People afraid to seek mental health support due to social stigma and lack of anonymous options.",
      after: "Anonymous community support and professional counseling without judgment or disclosure fears."
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: "Limited Access to Mental Health Care",
      before: "Long waiting lists for therapists, expensive sessions, and limited availability in rural areas.",
      after: "Instant access to mental health professionals, affordable counseling, and 24/7 crisis support."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Isolation and Lack of Community",
      before: "People struggling alone with mental health issues, lacking peer support and understanding.",
      after: "Vibrant support communities, peer-to-peer connections, and group therapy sessions for shared healing."
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-purple-500" />,
      title: "Crisis Intervention Gaps",
      before: "Limited emergency mental health resources and delayed response during mental health crises.",
      after: "Immediate crisis intervention, emergency counseling, and real-time professional support available."
    }
  ];

  const solutions = [
    {
      icon: <MessageCircle className="w-12 h-12 text-arogya-dark-green" />,
      title: "Anonymous Global Support Chat",
      description: "Safe, anonymous chatrooms where you can share experiences and receive peer support.",
      features: ["24/7 moderated support", "Anonymous identity protection", "Crisis intervention", "Peer counseling"]
    },
    {
      icon: <Brain className="w-12 h-12 text-arogya-dark-green" />,
      title: "Depression & Anxiety Tools",
      description: "Evidence-based coping strategies, mood tracking, and therapeutic resources.",
      features: ["Mood tracking", "Guided meditations", "CBT techniques", "Progress monitoring"]
    },
    {
      icon: <Heart className="w-12 h-12 text-arogya-dark-green" />,
      title: "Professional Counseling",
      description: "Direct messaging with licensed mental health professionals and therapists.",
      features: ["Licensed therapists", "Video consultations", "Personalized treatment", "Follow-up care"]
    },
    {
      icon: <Users className="w-12 h-12 text-arogya-dark-green" />,
      title: "Community Support Circles",
      description: "Facilitated support groups and community-led healing circles for specific challenges.",
      features: ["Group therapy sessions", "Peer support groups", "Topic-specific forums", "Community challenges"]
    }
  ];

  const impact = [
    { metric: "500K+", label: "Lives Supported", description: "Through anonymous communities" },
    { metric: "1,000+", label: "Mental Health Professionals", description: "Available 24/7" },
    { metric: "95%", label: "Crisis Response Rate", description: "Within 5 minutes" },
    { metric: "80%", label: "Improved Wellbeing", description: "Reported by community members" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-arogya-light-blue/30 via-white to-arogya-beige-yellow/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-arogya-dark-teal mb-6 animate-fade-in">
            Mental Health Support & Community Care
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 animate-fade-in">
            Breaking mental health barriers through anonymous support, professional counseling, and collaborative healing communities. 
            Making mental wellness accessible, affordable, and stigma-free for everyone.
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
            <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">Mental Health Challenges We Address</h2>
            <p className="text-xl text-gray-600">Breaking down barriers to mental wellness and emotional support</p>
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
                      Before Mental Health Support
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
            <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">Mental Health Solutions</h2>
            <p className="text-xl text-gray-600">Comprehensive mental wellness platform designed for everyone</p>
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
            <h2 className="text-4xl font-bold text-white mb-4">Our Mental Health Impact</h2>
            <p className="text-xl text-arogya-light-blue">Transforming lives through mental wellness support</p>
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
          <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">Ready to Start Your Mental Wellness Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands who have found support, healing, and community through our mental health platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-arogya-dark-green text-white hover:bg-arogya-teal font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
              Join Community Support
              <Heart className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-light-blue/20 font-semibold px-8 py-3 rounded-xl">
              Talk to a Counselor
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
