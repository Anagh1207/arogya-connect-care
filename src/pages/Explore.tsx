import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Play,
  Users,
  Heart,
  Clock,
  MapPin,
  Star,
  Calendar,
  Video,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

interface Stream {
  id: string;
  title: string;
  description: string;
  category: string;
  is_live: boolean;
  viewer_count: number;
  started_at: string;
  thumbnail_url?: string;
  doctors: {
    specialization: string;
    rating: number;
    profiles: {
      full_name: string;
      avatar_url?: string;
    };
  };
}

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
  is_active: boolean;
  next_meeting?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'workshop' | 'webinar' | 'support-group';
  host: string;
  capacity: number;
  registered: number;
}

const Explore = () => {
  const [activeTab, setActiveTab] = useState('streams');
  const [searchTerm, setSearchTerm] = useState('');
  const [streams, setStreams] = useState<Stream[]>([]);
  const [supportGroups] = useState<SupportGroup[]>([
    {
      id: '1',
      name: 'Anxiety Support Circle',
      description: 'Weekly meetups for anxiety management and peer support',
      category: 'anxiety',
      member_count: 127,
      is_active: true,
      next_meeting: '2024-07-20T18:00:00Z'
    },
    {
      id: '2',
      name: 'Depression Warriors',
      description: 'A community fighting depression together with daily check-ins',
      category: 'depression',
      member_count: 89,
      is_active: true,
      next_meeting: '2024-07-18T19:30:00Z'
    },
    {
      id: '3',
      name: 'Mindfulness Meditation Group',
      description: 'Guided meditation sessions for mental wellness',
      category: 'meditation',
      member_count: 156,
      is_active: true,
      next_meeting: '2024-07-19T07:00:00Z'
    }
  ]);

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Managing Work-Life Balance',
      description: 'Interactive workshop on maintaining mental health in professional settings',
      date: '2024-07-25',
      time: '16:00',
      type: 'workshop',
      host: 'Dr. Sarah Wilson',
      capacity: 50,
      registered: 32
    },
    {
      id: '2',
      title: 'Understanding Depression: A Medical Perspective',
      description: 'Educational webinar by leading psychiatrists',
      date: '2024-07-22',
      time: '18:00',
      type: 'webinar',
      host: 'Dr. Michael Chen',
      capacity: 200,
      registered: 145
    }
  ]);

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      const { data, error } = await supabase
        .from('streams')
        .select(`
          *,
          doctors:doctor_id (
            specialization,
            rating,
            profiles:id (
              full_name,
              avatar_url
            )
          )
        `)
        .eq('is_live', true)
        .order('viewer_count', { ascending: false });

      if (error) throw error;

      // Transform the data to match our interface
      const transformedStreams = (data || []).map(stream => ({
        ...stream,
        doctors: {
          ...stream.doctors,
          profiles: (stream.doctors?.profiles && typeof stream.doctors.profiles === 'object' && !Array.isArray(stream.doctors.profiles) && !('error' in stream.doctors.profiles))
            ? (stream.doctors.profiles as { full_name: string; avatar_url?: string })
            : {
                full_name: 'Unknown Doctor',
                avatar_url: undefined
              }
        }
      }));

      setStreams(transformedStreams);
    } catch (error) {
      console.error('Error fetching streams:', error);
    }
  };

  const tabs = [
    { id: 'streams', label: 'Live Streams', icon: <Video className="w-4 h-4" /> },
    { id: 'groups', label: 'Support Groups', icon: <Users className="w-4 h-4" /> },
    { id: 'events', label: 'Upcoming Events', icon: <Calendar className="w-4 h-4" /> }
  ];

  const renderStreams = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {streams.map((stream) => (
        <Card key={stream.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
              {stream.thumbnail_url ? (
                <img src={stream.thumbnail_url} alt={stream.title} className="w-full h-full object-cover" />
              ) : (
                <Play className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-500 text-white animate-pulse">
                🔴 LIVE
              </Badge>
            </div>
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-xs">
                {stream.viewer_count} viewers
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={stream.doctors?.profiles?.avatar_url || ''} />
                <AvatarFallback>
                  {stream.doctors?.profiles?.full_name?.charAt(0) || 'D'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{stream.title}</h3>
                <p className="text-sm text-gray-600">
                  Dr. {stream.doctors?.profiles?.full_name || 'Unknown'}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-600">{stream.doctors?.rating || 0}</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{stream.description}</p>
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {stream.category}
              </Badge>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Join Stream
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSupportGroups = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {supportGroups.map((group) => (
        <Card key={group.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg text-gray-900">{group.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    #{group.category}
                  </Badge>
                  {group.is_active && (
                    <Badge className="bg-green-500 text-white text-xs">
                      Active
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{group.member_count}</div>
                <div className="text-xs text-gray-500">members</div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 mb-4">{group.description}</p>
            
            {group.next_meeting && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Clock className="w-4 h-4" />
                <span>Next meeting: {new Date(group.next_meeting).toLocaleDateString()}</span>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Join Group
              </Button>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                {event.type === 'workshop' && <Sparkles className="w-6 h-6 text-blue-600" />}
                {event.type === 'webinar' && <Video className="w-6 h-6 text-blue-600" />}
                {event.type === 'support-group' && <Users className="w-6 h-6 text-blue-600" />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <Badge className="bg-green-500 text-white text-xs">
                    {event.type.replace('-', ' ')}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-3">{event.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{event.registered}/{event.capacity}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hosted by {event.host}</span>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Mental Health Resources</h1>
          <p className="text-xl text-gray-600 mb-6">
            Discover live streams, support groups, and events to support your mental wellness journey
          </p>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 bg-gray-100 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {activeTab === 'streams' && renderStreams()}
          {activeTab === 'groups' && renderSupportGroups()}
          {activeTab === 'events' && renderEvents()}
        </div>

        {/* Featured Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Need Immediate Support?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Our mental health professionals are available 24/7 for crisis intervention and emotional support.
            </p>
            <div className="flex gap-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Start Chat Now
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Emergency Resources
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;