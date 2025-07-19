import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Video, 
  Users, 
  TrendingUp, 
  Calendar,
  Heart,
  Play,
  Eye,
  Clock
} from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { user, profile } = useAuth();

  // Mock data for demonstration
  const liveStreams = [
    {
      id: '1',
      title: 'Mental Health Q&A Session',
      doctor: 'Dr. Sarah Wilson',
      viewers: 1247,
      category: 'Mental Health'
    },
    {
      id: '2', 
      title: 'Cardiology Basics Explained',
      doctor: 'Dr. Mike Chen',
      viewers: 890,
      category: 'Cardiology'
    }
  ];

  const recentPosts = [
    {
      id: '1',
      title: 'Tips for Managing Anxiety',
      author: 'MindfulUser42',
      replies: 23,
      likes: 156,
      timeAgo: '2h ago'
    },
    {
      id: '2',
      title: 'Support Group Meeting Tomorrow',
      author: 'CommunityMod',
      replies: 12,
      likes: 89,
      timeAgo: '4h ago'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {profile?.full_name || 'User'}!
            </h1>
            <p className="text-muted-foreground">
              Your personalized healthcare community dashboard
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link to="/community">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-3">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Global Chats</h3>
                  <p className="text-sm text-muted-foreground">
                    Join anonymous support discussions
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/streams">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-3">
                    <Video className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Live Streams</h3>
                  <p className="text-sm text-muted-foreground">
                    Watch live medical sessions
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/community">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-3">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Community Feed</h3>
                  <p className="text-sm text-muted-foreground">
                    Share experiences and get support
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Live Streams */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Video className="h-5 w-5 mr-2 text-red-500" />
                  Live Now
                </CardTitle>
                <Link to="/streams">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {liveStreams.map((stream) => (
                  <div key={stream.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="relative">
                      <div className="w-16 h-12 bg-black rounded flex items-center justify-center">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                      <Badge variant="destructive" className="absolute -top-1 -right-1 text-xs">
                        LIVE
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{stream.title}</h4>
                      <p className="text-xs text-muted-foreground">{stream.doctor}</p>
                      <div className="flex items-center mt-1">
                        <Eye className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {stream.viewers.toLocaleString()} watching
                        </span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {stream.category}
                        </Badge>
                      </div>
                    </div>
                    <Link to={`/stream/${stream.id}`}>
                      <Button size="sm" variant="outline">Join</Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Community Posts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  Trending Discussions
                </CardTitle>
                <Link to="/community">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <h4 className="font-medium text-sm mb-2">{post.title}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <span>by {post.author}</span>
                        <div className="flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {post.replies}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {post.likes}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.timeAgo}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">Tomorrow</Badge>
                    <span className="text-xs text-muted-foreground">2:00 PM</span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">Anxiety Support Group</h4>
                  <p className="text-xs text-muted-foreground">Weekly community meeting</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">This Week</Badge>
                    <span className="text-xs text-muted-foreground">7:00 PM</span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">Mindfulness Workshop</h4>
                  <p className="text-xs text-muted-foreground">Learn meditation techniques</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">Next Week</Badge>
                    <span className="text-xs text-muted-foreground">10:00 AM</span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">Health Q&A Session</h4>
                  <p className="text-xs text-muted-foreground">Ask experts anything</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;