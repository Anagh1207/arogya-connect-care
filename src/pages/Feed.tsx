
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Play, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Stream {
  id: string;
  title: string;
  description: string;
  category: string;
  is_live: boolean;
  viewer_count: number;
  thumbnail_url: string;
  doctors: {
    id: string;
    specialization: string;
    bio: string;
    country: string;
    profiles: {
      full_name: string;
      avatar_url: string;
    };
  };
}

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: string;
  likes_count: number;
  replies_count: number;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string;
    role: string;
  };
}

const Feed = () => {
  const { user } = useAuth();
  const [streams, setStreams] = useState<Stream[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'mental-health', name: 'Mental Health' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'diabetes', name: 'Diabetes' },
    { id: 'nutrition', name: 'Nutrition' },
  ];

  useEffect(() => {
    fetchStreams();
    fetchCommunityPosts();
  }, [selectedCategory]);

  const fetchStreams = async () => {
    try {
      let query = supabase
        .from('streams')
        .select(`
          *,
          doctors (
            id,
            specialization,
            bio,
            country,
            profiles (
              full_name,
              avatar_url
            )
          )
        `)
        .order('created_at', { ascending: false })
        .limit(6);

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      setStreams(data || []);
    } catch (error) {
      console.error('Error fetching streams:', error);
    }
  };

  const fetchCommunityPosts = async () => {
    try {
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url,
            role
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      setCommunityPosts(data || []);
    } catch (error) {
      console.error('Error fetching community posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-arogya-dark-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-arogya-dark-teal">Loading your health community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-arogya-light-blue/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/ab2f5346-9dbf-46fd-9e64-97bb5022d676.png" 
                alt="Arogya Care" 
                className="h-8 w-8 mr-3"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-arogya-dark-teal to-arogya-dark-green bg-clip-text text-transparent">
                Arogya Care
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/feed" className="text-arogya-dark-green font-medium">Feed</Link>
              <Link to="/explore" className="text-gray-600 hover:text-arogya-dark-green">Explore</Link>
              <Link to="/community" className="text-gray-600 hover:text-arogya-dark-green">Community</Link>
              <Link to="/chat" className="text-gray-600 hover:text-arogya-dark-green">Messages</Link>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <Link to={user.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'}>
                  <Button variant="outline" className="border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-dark-green hover:text-white">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-arogya-dark-green hover:bg-arogya-light-green">Join Now</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-arogya-dark-teal mb-6">Your Health Community</h1>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-arogya-dark-green text-white" 
                  : "border-arogya-light-blue text-arogya-dark-teal hover:bg-arogya-light-blue/30"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Streams Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-arogya-dark-teal">Live & Recent Streams</h2>
                <Link to="/explore?type=streams">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {streams.map((stream) => (
                  <Card key={stream.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-arogya-light-blue to-arogya-beige-yellow flex items-center justify-center">
                        <Play className="w-12 h-12 text-white opacity-80" />
                      </div>
                      {stream.is_live && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          LIVE
                        </Badge>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {stream.viewer_count}
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={stream.doctors.profiles.avatar_url || ''} />
                          <AvatarFallback>
                            {stream.doctors.profiles.full_name?.charAt(0) || 'D'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <Link to={`/stream/${stream.id}`}>
                            <h3 className="font-semibold text-arogya-dark-teal hover:text-arogya-dark-green line-clamp-2">
                              {stream.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">
                            Dr. {stream.doctors.profiles.full_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {stream.doctors.specialization} • {stream.doctors.country}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Community Posts Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-arogya-dark-teal">Community Discussions</h2>
                <Link to="/community">
                  <Button variant="outline" size="sm">Join Discussion</Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={post.profiles.avatar_url || ''} />
                          <AvatarFallback>
                            {post.profiles.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-arogya-dark-teal">
                              {post.profiles.full_name}
                            </span>
                            {post.profiles.role === 'doctor' && (
                              <Badge variant="secondary" className="text-xs">Doctor</Badge>
                            )}
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">
                              {formatTimeAgo(post.created_at)}
                            </span>
                          </div>
                          
                          <Link to={`/community/post/${post.id}`}>
                            <h3 className="font-semibold text-arogya-dark-teal hover:text-arogya-dark-green mb-2">
                              {post.title}
                            </h3>
                          </Link>
                          
                          <p className="text-gray-700 mb-4 line-clamp-3">
                            {post.content}
                          </p>
                          
                          <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{post.likes_count}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-arogya-dark-green transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm">{post.replies_count}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-arogya-dark-green transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/community/new-post" className="block">
                  <Button className="w-full bg-arogya-dark-green hover:bg-arogya-light-green">
                    Share Your Story
                  </Button>
                </Link>
                <Link to="/explore?type=doctors" className="block">
                  <Button variant="outline" className="w-full border-arogya-light-blue text-arogya-dark-teal hover:bg-arogya-light-blue/30">
                    Find Doctors
                  </Button>
                </Link>
                <Link to="/chat" className="block">
                  <Button variant="outline" className="w-full border-arogya-light-blue text-arogya-dark-teal hover:bg-arogya-light-blue/30">
                    Start Conversation
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-arogya-light-blue/20 rounded-lg">
                    <p className="font-medium text-arogya-dark-teal">#MentalHealthAwareness</p>
                    <p className="text-sm text-gray-600">142 discussions</p>
                  </div>
                  <div className="p-3 bg-arogya-beige-yellow/20 rounded-lg">
                    <p className="font-medium text-arogya-dark-teal">#HeartHealth</p>
                    <p className="text-sm text-gray-600">89 discussions</p>
                  </div>
                  <div className="p-3 bg-arogya-light-green/20 rounded-lg">
                    <p className="font-medium text-arogya-dark-teal">#Nutrition</p>
                    <p className="text-sm text-gray-600">67 discussions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Tip of the Day */}
            <Card>
              <CardHeader>
                <CardTitle className="text-arogya-dark-teal">Daily Health Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gradient-to-br from-arogya-light-blue/30 to-arogya-beige-yellow/30 rounded-lg">
                  <p className="text-sm text-arogya-dark-teal">
                    "Drink at least 8 glasses of water daily to maintain optimal hydration and support your body's natural detoxification processes."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">- Dr. Sarah Johnson, Nutritionist</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
