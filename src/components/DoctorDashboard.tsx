
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
  Play,
  Eye,
  Heart,
  LogOut
} from 'lucide-react';
import StreamingDashboard from './StreamingDashboard';
import CommunityDashboard from './CommunityDashboard';

const DoctorDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { 
      title: 'Total Views', 
      value: '12.5K', 
      icon: Eye, 
      change: '+23%',
      color: 'text-arogya-dark-green'
    },
    { 
      title: 'Followers', 
      value: '2.8K', 
      icon: Users, 
      change: '+12%',
      color: 'text-arogya-light-blue'
    },
    { 
      title: 'Live Streams', 
      value: '24', 
      icon: Video, 
      change: '+8%',
      color: 'text-arogya-dark-teal'
    },
    { 
      title: 'Engagement', 
      value: '89%', 
      icon: Heart, 
      change: '+5%',
      color: 'text-red-500'
    }
  ];

  const recentActivities = [
    {
      type: 'stream',
      title: 'Heart Health Q&A Session',
      time: '2 hours ago',
      viewers: 145,
      icon: Video
    },
    {
      type: 'message',
      title: 'New patient message from Sarah Johnson',
      time: '4 hours ago',
      icon: MessageCircle
    },
    {
      type: 'follow',
      title: '5 new followers joined',
      time: '6 hours ago',
      icon: Users
    }
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
                  {profile?.full_name?.charAt(0) || 'D'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-arogya-dark-teal">
                Welcome back, Dr. {profile?.full_name}
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your streams, connect with patients, and grow your community
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">
                Verified Doctor
              </Badge>
              <Badge variant="outline">
                Streaming Enabled
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-arogya-dark-teal">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change} from last week</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="streaming">Live Streaming</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-arogya-dark-teal">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-arogya-dark-green hover:bg-arogya-light-green">
                    <Play className="w-4 h-4 mr-2" />
                    Start Live Stream
                  </Button>
                  <Button variant="outline" className="w-full border-arogya-light-blue text-arogya-dark-teal">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    View Messages
                  </Button>
                  <Button variant="outline" className="w-full border-arogya-light-blue text-arogya-dark-teal">
                    <Users className="w-4 h-4 mr-2" />
                    Community Posts
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-arogya-dark-teal">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-arogya-light-blue/20 rounded-full">
                          <activity.icon className="w-4 h-4 text-arogya-dark-teal" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-arogya-dark-teal">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.time}</p>
                        </div>
                        {activity.viewers && (
                          <Badge variant="outline">
                            {activity.viewers} viewers
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="streaming">
            <StreamingDashboard />
          </TabsContent>

          <TabsContent value="community">
            <CommunityDashboard />
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardContent className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Messages Coming Soon</h3>
                <p className="text-gray-600">
                  Direct messaging with patients will be available in the next update
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;
