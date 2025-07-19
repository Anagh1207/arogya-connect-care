import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone,
  MessageCircle,
  Send,
  Calendar,
  Award,
  BookOpen,
  Users,
  Heart,
  Video,
  Stethoscope
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Doctor {
  id: string;
  specialization: string;
  license_number: string;
  qualification: string;
  experience_years: number;
  consultation_fee: number;
  bio: string;
  rating: number;
  total_reviews: number;
  verification_status: string;
  can_stream: boolean;
  profiles: {
    full_name: string;
    email: string;
    phone: string;
    avatar_url?: string;
  };
}

interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender_name: string;
  is_doctor: boolean;
}

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchDoctorProfile();
      initializeChat();
    }
  }, [id, user]);

  const fetchDoctorProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          profiles:id (
            full_name,
            email,
            phone,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedDoctor = {
        ...data,
        profiles: (data?.profiles && typeof data.profiles === 'object' && !Array.isArray(data.profiles) && !('error' in data.profiles)) 
          ? (data.profiles as { full_name: string; email: string; phone: string; avatar_url?: string })
          : {
              full_name: 'Unknown Doctor',
              email: '',
              phone: '',
              avatar_url: undefined
            }
      };
      
      setDoctor(transformedDoctor);
      
      // Simulate online status (in real app, this would be from presence/realtime)
      setIsOnline(Math.random() > 0.5);
    } catch (error) {
      console.error('Error fetching doctor:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeChat = async () => {
    if (!user || !id) return;

    try {
      // Check if conversation exists
      const { data: existingConversation } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('patient_id', user.id)
        .eq('doctor_id', id)
        .single();

      if (existingConversation) {
        setConversationId(existingConversation.id);
        fetchChatMessages(existingConversation.id);
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const createConversation = async () => {
    if (!user || !id) return null;

    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          patient_id: user.id,
          doctor_id: id
        })
        .select('id')
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      return null;
    }
  };

  const fetchChatMessages = async (convId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          sender:sender_id (
            full_name
          )
        `)
        .eq('conversation_id', convId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const transformedMessages = data?.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        created_at: msg.created_at,
        sender_name: msg.sender?.full_name || 'Unknown',
        is_doctor: msg.sender_id === id
      })) || [];

      setChatMessages(transformedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    let currentConversationId = conversationId;

    if (!currentConversationId) {
      currentConversationId = await createConversation();
      if (!currentConversationId) return;
      setConversationId(currentConversationId);
    }

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: currentConversationId,
          sender_id: user.id,
          content: newMessage
        });

      if (error) throw error;

      setNewMessage('');
      fetchChatMessages(currentConversationId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading doctor profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Not Found</h2>
            <p className="text-gray-600">The doctor profile you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={doctor.profiles?.avatar_url || ''} />
                      <AvatarFallback className="text-xl">
                        {doctor.profiles?.full_name?.charAt(0) || 'D'}
                      </AvatarFallback>
                    </Avatar>
                    {isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        Dr. {doctor.profiles?.full_name}
                      </h1>
                      {doctor.verification_status === 'verified' && (
                        <Badge className="bg-blue-500 text-white">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {isOnline && (
                        <Badge className="bg-green-500 text-white">
                          🟢 Online
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-lg text-blue-600 font-medium mb-2">{doctor.specialization}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{doctor.rating} ({doctor.total_reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{doctor.experience_years} years experience</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Stethoscope className="w-4 h-4" />
                        <span>₹{doctor.consultation_fee} consultation</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                      {doctor.can_stream && (
                        <Button variant="outline">
                          <Video className="w-4 h-4 mr-2" />
                          Join Live Session
                        </Button>
                      )}
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About Dr. {doctor.profiles?.full_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {doctor.bio || 'No bio available for this doctor.'}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Qualification</h4>
                    <p className="text-gray-600">{doctor.qualification || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">License Number</h4>
                    <p className="text-gray-600">{doctor.license_number}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Online Consultation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Heart className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Mental Health Counseling</span>
                  </div>
                  {doctor.can_stream && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Video className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">Live Streaming Sessions</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                    <span className="text-gray-700">Health Education</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Favorites
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  View Reviews
                </Button>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            {user && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Chat with Dr. {doctor.profiles?.full_name}
                    {isOnline && (
                      <Badge className="bg-green-500 text-white text-xs">Online</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Messages */}
                  <div className="h-64 overflow-y-auto p-4 space-y-3 border-b">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p>Start a conversation with the doctor</p>
                      </div>
                    ) : (
                      chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.is_doctor ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-xs px-3 py-2 rounded-lg ${
                              message.is_doctor
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-blue-600 text-white'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {new Date(message.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1"
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {isOnline ? 'Doctor is online - expect quick replies' : 'Doctor is offline - they\'ll reply when available'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!user && (
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Start Chatting</h3>
                  <p className="text-gray-600 mb-4">Login to start a conversation with this doctor</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Login to Chat
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoctorProfile;