import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Video, 
  Heart, 
  Share2, 
  Send, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  Users,
  Eye,
  CheckCircle,
  MoreVertical
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface StreamData {
  id: string;
  title: string;
  description: string;
  category: string;
  is_live: boolean;
  viewer_count: number;
  stream_url: string;
  thumbnail_url: string;
  started_at: string;
  doctors: {
    id: string;
    specialization: string;
    profiles: {
      full_name: string;
      avatar_url?: string;
    };
  };
}

interface ChatMessage {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
}

const StreamViewer = () => {
  const { id } = useParams<{ id: string }>();
  const [stream, setStream] = useState<StreamData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchStream();
      fetchChatMessages();
    }
  }, [id]);

  const fetchStream = async () => {
    try {
      const { data, error } = await supabase
        .from('streams')
        .select(`
          *,
          doctors (
            id,
            specialization,
            profiles (
              full_name,
              avatar_url
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      const transformedStream = {
        ...data,
        doctors: {
          ...data.doctors,
          profiles: (data.doctors?.profiles && typeof data.doctors.profiles === 'object' && !Array.isArray(data.doctors.profiles) && !('error' in data.doctors.profiles))
            ? (data.doctors.profiles as { full_name: string; avatar_url?: string })
            : {
                full_name: 'Unknown Doctor',
                avatar_url: undefined
              }
        }
      };

      setStream(transformedStream);
    } catch (error) {
      console.error('Error fetching stream:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load stream"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChatMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('stream_comments')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('stream_id', id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setChatMessages(data || []);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const { data, error } = await supabase
        .from('stream_comments')
        .insert({
          stream_id: id,
          content: newMessage,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      setNewMessage('');
      fetchChatMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message"
      });
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading stream...</p>
        </div>
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Stream not found</h2>
          <p className="text-muted-foreground mb-4">The requested stream could not be found.</p>
          <Link to="/streams">
            <Button>Back to Streams</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main Video Area */}
        <div className="flex-1 bg-black relative">
          {/* Video Player */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-center">
              <Video className="h-16 w-16 mx-auto mb-4 opacity-70" />
              <h3 className="text-xl font-semibold mb-2">Live Stream Active</h3>
              <p className="text-gray-300 mb-4">Professional video player would be integrated here</p>
              {stream.is_live && (
                <Badge variant="destructive" className="animate-pulse">
                  LIVE
                </Badge>
              )}
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <span className="text-sm">2:34:15</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-background border-l">
          {/* Stream Info */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Badge variant={stream.is_live ? "destructive" : "secondary"}>
                  {stream.is_live ? "LIVE" : "OFFLINE"}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="h-4 w-4 mr-1" />
                  {stream.viewer_count.toLocaleString()}
                </div>
              </div>
              <Button variant="outline" size="sm">
                Join Stream
              </Button>
            </div>

            <h1 className="font-semibold text-lg mb-2">{stream.title}</h1>
            <p className="text-sm text-muted-foreground mb-3">{stream.description}</p>

            {/* Doctor Info */}
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={stream.doctors.profiles?.avatar_url} />
                <AvatarFallback>
                  {stream.doctors.profiles?.full_name?.charAt(0) || 'D'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium text-sm">{stream.doctors.profiles?.full_name}</span>
                  <CheckCircle className="h-4 w-4 text-primary ml-1" />
                </div>
                <p className="text-xs text-muted-foreground">{stream.doctors.specialization}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Heart className="h-4 w-4 mr-1" />
                Subscribe
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Live Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-3 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Live Chat
                </h3>
                <span className="text-sm text-muted-foreground">
                  {chatMessages.length} messages
                </span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-96">
              {chatMessages.map((message) => (
                <div key={message.id} className="flex space-x-2 text-sm">
                  <Avatar className="h-6 w-6 flex-shrink-0">
                    <AvatarImage src={message.profiles?.avatar_url} />
                    <AvatarFallback className="text-xs">
                      {message.profiles?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-xs text-primary">
                        {message.profiles?.full_name || 'Anonymous'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.created_at)}
                      </span>
                    </div>
                    <p className="text-sm break-words">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask a question or share a comment..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 text-sm"
                />
                <Button 
                  onClick={sendMessage}
                  size="sm"
                  className="px-3"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center mt-2">
                <input type="checkbox" id="question" className="mr-2" />
                <label htmlFor="question" className="text-xs text-muted-foreground">
                  Mark as question for the doctor
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamViewer;