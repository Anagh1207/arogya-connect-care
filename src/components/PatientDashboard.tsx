
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  Users, 
  MessageCircle, 
  Settings, 
  Bell,
  Heart,
  Play,
  Search,
  LogOut,
  BookOpen,
  Calendar
} from 'lucide-react';
import CommunityDashboard from './CommunityDashboard';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');

  const followedDoctors = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      avatar: null,
      followers: '2.3K',
      isLive: true
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Mental Health',
      avatar: null,
      followers: '1.8K',
      isLive: false
    },
    {
      name: 'Dr. Emily Davis',
      specialty: 'Nutrition',
      avatar: null,
      followers: '3.1K',
      isLive: false
    }
  ];

  const upcomingStreams = [
    {
      title: 'Managing Diabetes in Daily Life',
      doctor: 'Dr. Robert Kim',
      time: 'Today, 3:00 PM',
      viewers: 245
    },
    {
      title: 'Stress Management Techniques',
      doctor: 'Dr. Lisa Wang',
      time: 'Tomorrow, 10:00 AM',
      viewers: 180
    },
    {
      title: 'Healthy Heart Exercises',
      doctor: 'Dr. Sarah Johnson',
      time: 'Tomorrow, 7:00 PM',
      viewers: 320
    }
  ];

  const healthTopics = [
    { name: 'Heart Health', posts: 145, trending: true },
    { name: 'Mental Wellness', posts: 234, trending: true },
    { name: 'Diabetes Care', posts: 89, trending: false },
    { name: 'Nutrition', posts: 167, trending: true },
    { name: 'Exercise & Fitness', posts: 201, trending: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 to-white">
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
              <Link to="/feed" className="text-arogya-dark-green font-medium">Feed</Link>
              <Link to="/explore" className="text-gray-600 hover:text-arogya-dark-green">Explore</Link>
              <Link to="/community" className="text-gray-600 hover:text-arogya-dark-green">Community</Link>
              <Link to="/chat" className="text-gray-600 hover:text-arogya-dark-green">Messages</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4" />
              </Button>
              <Avatar>
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback>
                  {profile?.full_name?.charAt(0) || 'P'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-arogya-dark-teal">
            Welcome back, {profile?.full_name}
          </h1>
          <p className="text-gray-600 mt-1">
            Stay connected with your health community and discover new content
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">My Feed</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-arogya-dark-teal flex items-center">
                      <Play className="w-5 h-5 mr-2" />
                      Live Now
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-arogya-light-blue/30 to-arogya-beige-yellow/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-arogya-dark-teal">Dr. Sarah Johnson</p>
                            <p className="text-sm text-gray-600">Cardiology Specialist</p>
                          </div>
                        </div>
                        <Badge className="bg-red-500 text-white">LIVE</Badge>
                      </div>
                      <h3 className="font-semibold text-arogya-dark-teal mb-2">
                        Heart Health Q&A Session
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          <span>234 watching</span>
                        </div>
                        <Button size="sm" className="bg-arogya-dark-green hover:bg-arogya-light-green">
                          Join Stream
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-arogya-dark-teal">Upcoming Streams</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingStreams.map((stream, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-arogya-dark-teal">{stream.title}</h4>
                            <p className="text-sm text-gray-600">{stream.doctor} • {stream.time}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">{stream.viewers} interested</span>
                            <Button size="sm" variant="outline">
                              <Bell className="w-3 h-3 mr-1" />
                              Remind
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-arogya-dark-teal">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-arogya-dark-green hover:bg-arogya-light-green">
                      <Search className="w-4 h-4 mr-2" />
                      Find Doctors
                    </Button>
                    <Button variant="outline" className="w-full border-arogya-light-blue text-arogya-dark-teal">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask Question
                    </Button>
                    <Button variant="outline" className="w-full border-arogya-light-blue text-arogya-dark-teal">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Health Library
                    </Button>
                  </CardContent>
                </Card>

                {/* Health Topics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-arogya-dark-teal">Trending Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {healthTopics.map((topic, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-arogya-dark-teal">{topic.name}</p>
                            <p className="text-sm text-gray-600">{topic.posts} discussions</p>
                          </div>
                          {topic.trending && (
                            <Badge variant="secondary" className="text-xs">
                              Trending
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="discover">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-arogya-dark-green to-arogya-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-arogya-dark-teal mb-2">Explore Doctors</h3>
                <p className="text-gray-600 mb-4">Find verified doctors by specialty and location</p>
                <Button className="bg-arogya-dark-green hover:bg-arogya-light-green">
                  Browse Doctors
                </Button>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-arogya-light-blue to-arogya-beige-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-arogya-dark-teal" />
                </div>
                <h3 className="text-lg font-semibold text-arogya-dark-teal mb-2">Live Streams</h3>
                <p className="text-gray-600 mb-4">Watch live educational sessions and Q&As</p>
                <Button variant="outline" className="border-arogya-dark-green text-arogya-dark-green">
                  View Streams
                </Button>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-arogya-dark-green to-arogya-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-arogya-dark-teal mb-2">Join Communities</h3>
                <p className="text-gray-600 mb-4">Connect with others on similar health journeys</p>
                <Button variant="outline" className="border-arogya-dark-green text-arogya-dark-green">
                  Explore Topics
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <CommunityDashboard />
          </TabsContent>

          <TabsContent value="following">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-arogya-dark-teal">Doctors You Follow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {followedDoctors.map((doctor, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar>
                            <AvatarImage src={doctor.avatar || ''} />
                            <AvatarFallback>
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-arogya-dark-teal">{doctor.name}</p>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          </div>
                          {doctor.isLive && (
                            <Badge className="bg-red-500 text-white text-xs">LIVE</Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{doctor.followers} followers</span>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;
