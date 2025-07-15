
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Play, Square, Users, Eye, Clock, Plus, Edit, Trash2 } from 'lucide-react';

interface Stream {
  id: string;
  title: string;
  description: string;
  category: string;
  is_live: boolean;
  viewer_count: number;
  started_at: string;
  ended_at: string;
  created_at: string;
}

const StreamingDashboard = () => {
  const { user } = useAuth();
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newStream, setNewStream] = useState({
    title: '',
    description: '',
    category: 'general'
  });

  const categories = [
    { value: 'general', label: 'General Health' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'mental-health', label: 'Mental Health' },
    { value: 'fitness', label: 'Fitness & Wellness' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'diabetes', label: 'Diabetes Care' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'dermatology', label: 'Dermatology' }
  ];

  useEffect(() => {
    if (user) {
      fetchStreams();
    }
  }, [user]);

  const fetchStreams = async () => {
    try {
      const { data, error } = await supabase
        .from('streams')
        .select('*')
        .eq('doctor_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStreams(data || []);
    } catch (error) {
      console.error('Error fetching streams:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your streams",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createStream = async () => {
    if (!newStream.title.trim()) {
      toast({
        title: "Error",
        description: "Stream title is required",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('streams')
        .insert({
          doctor_id: user?.id,
          title: newStream.title,
          description: newStream.description,
          category: newStream.category,
          is_live: false
        })
        .select()
        .single();

      if (error) throw error;

      setStreams([data, ...streams]);
      setNewStream({ title: '', description: '', category: 'general' });
      setIsCreateModalOpen(false);
      
      toast({
        title: "Success",
        description: "Stream created successfully!"
      });
    } catch (error: any) {
      console.error('Error creating stream:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create stream",
        variant: "destructive"
      });
    }
  };

  const startStream = async (streamId: string) => {
    try {
      const { error } = await supabase
        .from('streams')
        .update({
          is_live: true,
          started_at: new Date().toISOString()
        })
        .eq('id', streamId);

      if (error) throw error;
      
      await fetchStreams();
      toast({
        title: "Success",
        description: "Stream started successfully!"
      });
    } catch (error) {
      console.error('Error starting stream:', error);
      toast({
        title: "Error",
        description: "Failed to start stream",
        variant: "destructive"
      });
    }
  };

  const endStream = async (streamId: string) => {
    try {
      const { error } = await supabase
        .from('streams')
        .update({
          is_live: false,
          ended_at: new Date().toISOString()
        })
        .eq('id', streamId);

      if (error) throw error;
      
      await fetchStreams();
      toast({
        title: "Success",
        description: "Stream ended successfully!"
      });
    } catch (error) {
      console.error('Error ending stream:', error);
      toast({
        title: "Error",
        description: "Failed to end stream",
        variant: "destructive"
      });
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
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
          <h2 className="text-2xl font-bold text-arogya-dark-teal">Streaming Dashboard</h2>
          <p className="text-gray-600">Manage your live streams and educational content</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-arogya-dark-green hover:bg-arogya-light-green">
              <Plus className="w-4 h-4 mr-2" />
              Create Stream
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Stream</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stream Title</label>
                <Input
                  value={newStream.title}
                  onChange={(e) => setNewStream({ ...newStream, title: e.target.value })}
                  placeholder="e.g., Heart Health Q&A Session"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newStream.description}
                  onChange={(e) => setNewStream({ ...newStream, description: e.target.value })}
                  placeholder="Describe what viewers can expect from this stream..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={newStream.category} onValueChange={(value) => setNewStream({ ...newStream, category: value })}>
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
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createStream} className="bg-arogya-dark-green hover:bg-arogya-light-green">
                  Create Stream
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {streams.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No streams yet</h3>
            <p className="text-gray-600 mb-4">Create your first stream to start engaging with patients</p>
            <Button onClick={() => setIsCreateModalOpen(true)} className="bg-arogya-dark-green hover:bg-arogya-light-green">
              Create Your First Stream
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {streams.map((stream) => (
            <Card key={stream.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-arogya-dark-teal">{stream.title}</h3>
                      {stream.is_live && (
                        <Badge className="bg-red-500 text-white">LIVE</Badge>
                      )}
                      <Badge variant="outline">{categories.find(c => c.value === stream.category)?.label}</Badge>
                    </div>
                    
                    {stream.description && (
                      <p className="text-gray-600 mb-4">{stream.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{stream.viewer_count} viewers</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Created {formatDateTime(stream.created_at)}</span>
                      </div>
                      {stream.started_at && (
                        <div className="flex items-center">
                          <Play className="w-4 h-4 mr-1" />
                          <span>Started {formatDateTime(stream.started_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {stream.is_live ? (
                      <Button
                        onClick={() => endStream(stream.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        End Stream
                      </Button>
                    ) : (
                      <Button
                        onClick={() => startStream(stream.id)}
                        className="bg-arogya-dark-green hover:bg-arogya-light-green"
                        size="sm"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Stream
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StreamingDashboard;
