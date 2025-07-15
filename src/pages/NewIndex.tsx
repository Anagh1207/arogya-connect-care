
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Users, MessageCircle, Heart, Star, Video, Globe, Shield } from 'lucide-react';

const NewIndex = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-arogya-light-blue/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/ab2f5346-9dbf-46fd-9e64-97bb5022d676.png" 
                alt="Arogya Care" 
                className="h-8 w-8 mr-3"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-arogya-dark-teal to-arogya-dark-green bg-clip-text text-transparent">
                Arogya Care
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/about" className="text-gray-600 hover:text-arogya-dark-green">About</Link>
              <Link to="/explore" className="text-gray-600 hover:text-arogya-dark-green">Explore</Link>
              <Link to="/community" className="text-gray-600 hover:text-arogya-dark-green">Community</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-dark-green hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-arogya-dark-green hover:bg-arogya-light-green">
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-arogya-dark-teal mb-6 leading-tight">
                Your Global Health
                <span className="bg-gradient-to-r from-arogya-dark-green to-arogya-light-green bg-clip-text text-transparent">
                  {" "}Community
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with verified doctors through live streams, join health discussions, 
                and learn from experts worldwide. Your journey to better health starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/signup?type=patient">
                  <Button size="lg" className="bg-arogya-dark-green hover:bg-arogya-light-green text-white px-8 py-3 text-lg">
                    Join as Patient
                  </Button>
                </Link>
                <Link to="/signup?type=doctor">
                  <Button size="lg" variant="outline" className="border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-dark-green hover:text-white px-8 py-3 text-lg">
                    Join as Doctor
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-arogya-dark-green" />
                  <span>10K+ Active Members</span>
                </div>
                <div className="flex items-center">
                  <Video className="w-5 h-5 mr-2 text-arogya-dark-green" />
                  <span>500+ Doctors</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-arogya-dark-green" />
                  <span>50+ Countries</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-arogya-light-blue to-arogya-beige-yellow rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 mb-4">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-arogya-dark-green rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-arogya-dark-teal">Live Stream</h3>
                      <p className="text-sm text-gray-600">Heart Health Workshop</p>
                    </div>
                    <div className="ml-auto bg-red-500 text-white px-2 py-1 rounded text-xs">
                      LIVE
                    </div>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-arogya-light-blue/30 to-arogya-beige-yellow/30 rounded-lg flex items-center justify-center">
                    <Play className="w-12 h-12 text-arogya-dark-green" />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>234 watching</span>
                    </div>
                    <div className="flex space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <MessageCircle className="w-5 h-5 text-arogya-dark-green" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-arogya-dark-teal mb-2">Community Discussion</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    "What are the best exercises for maintaining heart health after 40?"
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>23 replies</span>
                    <Heart className="w-4 h-4 ml-4 mr-1" />
                    <span>45 likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-arogya-dark-teal mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a thriving community where healthcare meets technology, 
              connecting patients and doctors through modern digital experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-arogya-dark-green to-arogya-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-arogya-dark-teal mb-3">Live Health Streams</h3>
                <p className="text-gray-600">
                  Watch live educational sessions, Q&As, and workshops hosted by verified medical professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-arogya-light-blue to-arogya-beige-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-arogya-dark-teal" />
                </div>
                <h3 className="text-xl font-semibold text-arogya-dark-teal mb-3">Direct Doctor Chat</h3>
                <p className="text-gray-600">
                  Connect one-on-one with doctors through secure text messaging for personalized health guidance.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-arogya-dark-green to-arogya-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-arogya-dark-teal mb-3">Community Forum</h3>
                <p className="text-gray-600">
                  Share experiences, ask questions, and support others in a safe, moderated health community.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-arogya-light-blue to-arogya-beige-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-arogya-dark-teal" />
                </div>
                <h3 className="text-xl font-semibold text-arogya-dark-teal mb-3">Verified Doctors</h3>
                <p className="text-gray-600">
                  All medical professionals are thoroughly verified and licensed to ensure quality care.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-arogya-dark-green to-arogya-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-arogya-dark-teal mb-3">Global Access</h3>
                <p className="text-gray-600">
                  Connect with healthcare professionals from around the world, breaking geographical barriers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-arogya-light-blue to-arogya-beige-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-arogya-dark-teal" />
                </div>
                <h3 className="text-xl font-semibold text-arogya-dark-teal mb-3">Personalized Feed</h3>
                <p className="text-gray-600">
                  Get content recommendations based on your health interests and followed doctors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-arogya-dark-teal to-arogya-dark-green">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="text-xl text-arogya-light-blue mb-8">
            Join thousands of people who trust Arogya Care for their health and wellness needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup?type=patient">
              <Button size="lg" className="bg-white text-arogya-dark-teal hover:bg-arogya-light-blue px-8 py-3 text-lg">
                Start as Patient
              </Button>
            </Link>
            <Link to="/signup?type=doctor">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-arogya-dark-teal px-8 py-3 text-lg">
                Join as Doctor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-arogya-dark-teal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/ab2f5346-9dbf-46fd-9e64-97bb5022d676.png" 
                  alt="Arogya Care" 
                  className="h-8 w-8 mr-3"
                />
                <span className="text-xl font-bold">Arogya Care</span>
              </div>
              <p className="text-arogya-light-blue">
                Connecting global health communities through technology and care.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-arogya-light-blue">
                <li><Link to="/explore" className="hover:text-white">Explore</Link></li>
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
                <li><Link to="/live-streams" className="hover:text-white">Live Streams</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-arogya-light-blue">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/safety" className="hover:text-white">Safety</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-arogya-light-blue">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/guidelines" className="hover:text-white">Community Guidelines</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-arogya-light-blue/30 mt-8 pt-8 text-center text-arogya-light-blue">
            <p>&copy; 2024 Arogya Care. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewIndex;
