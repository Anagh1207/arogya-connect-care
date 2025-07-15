
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Heart, MessageCircle, Share2, Plus, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const CommunityDashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [myPosts, setMyPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'feed' | 'my-posts'>('feed');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  const categories = [
    { value: 'general', label: 'General Health' },
    { value: 'mental-health', label: 'Mental Health' },
    { value: 'fitness', label: 'Fitness & Exercise' },
    { value: 'nutrition', label: 'Nutrition & Diet' },
    { value: 'chronic-conditions', label: 'Chronic Conditions' },
    { value: 'preventive-care', label: 'Preventive Care' },
    { value: 'medications', label: 'Medications' },
    { value: 'lifestyle', label: 'Lifestyle & Wellness' }
  ];

  useEffect(() => {
    fetchPosts();
    if (user) {
      fetchMyPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
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
        .limit(20);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url,
            role
          )
        `)
        .eq('author_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMyPosts(data || []);
    } catch (error) {
      console.error('Error fetching my posts:', error);
    }
  };

  const createPost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert({
          author_id: user?.id,
          title: newPost.title,
          content: newPost.content,
          category: newPost.category
        })
        .select(`
          *,
          profiles (
            full_name,
            avatar_url,
            role
          )
        `)
        .single();

      if (error) throw error;

      setPosts([data, ...posts]);
      setMyPosts([data, ...myPosts]);
      setNewPost({ title: '', content: '', category: 'general' });
      setIsCreateModalOpen(false);
      
      toast({
        title: "Success",
        description: "Post created successfully!"
      });
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive"
      });
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
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-arogya-dark-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-arogya-dark-teal">Community Dashboard</h2>
          <p className="text-gray-600">Engage with the health community and share your knowledge</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-arogya-dark-green hover:bg-arogya-light-green">
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Share Your Story</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="What's on your mind?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Share your experience, ask a question, or provide helpful information..."
                  rows={5}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createPost} className="bg-arogya-dark-green hover:bg-arogya-light-green">
                  Share Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={selectedTab === 'feed' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('feed')}
          className={selectedTab === 'feed' ? 'bg-arogya-dark-green text-white' : ''}
        >
          Community Feed
        </Button>
        <Button
          variant={selectedTab === 'my-posts' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('my-posts')}
          className={selectedTab === 'my-posts' ? 'bg-arogya-dark-green text-white' : ''}
        >
          My Posts ({myPosts.length})
        </Button>
      </div>

      {/* Posts Content */}
      <div className="space-y-4">
        {(selectedTab === 'feed' ? posts : myPosts).length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedTab === 'feed' ? 'No posts in the community yet' : 'You haven\'t created any posts yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedTab === 'feed' 
                  ? 'Be the first to start a conversation in the community!' 
                  : 'Share your health experience or ask questions to engage with the community'
                }
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)} className="bg-arogya-dark-green hover:bg-arogya-light-green">
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          (selectedTab === 'feed' ? posts : myPosts).map((post) => (
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
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.value === post.category)?.label}
                      </Badge>
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
                      <Link to={`/community/post/${post.id}`} className="flex items-center space-x-2 text-gray-500 hover:text-arogya-dark-green transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.replies_count}</span>
                      </Link>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-arogya-dark-green transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityDashboard;
