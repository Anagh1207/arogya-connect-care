
-- Create streams table for doctor livestreams
CREATE TABLE public.streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  is_live BOOLEAN NOT NULL DEFAULT false,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  viewer_count INTEGER DEFAULT 0,
  stream_url TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create community posts table
CREATE TABLE public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  is_pinned BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create post reactions table
CREATE TABLE public.post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL DEFAULT 'like',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Create post replies table
CREATE TABLE public.post_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  parent_reply_id UUID REFERENCES public.post_replies(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create doctor follows table
CREATE TABLE public.doctor_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(follower_id, doctor_id)
);

-- Create chat conversations table
CREATE TABLE public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(patient_id, doctor_id)
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create stream comments table
CREATE TABLE public.stream_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id UUID NOT NULL REFERENCES public.streams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add new columns to doctors table for streaming
ALTER TABLE public.doctors 
ADD COLUMN bio TEXT,
ADD COLUMN country TEXT,
ADD COLUMN followers_count INTEGER DEFAULT 0,
ADD COLUMN total_views INTEGER DEFAULT 0,
ADD COLUMN can_stream BOOLEAN DEFAULT false;

-- Enable RLS on new tables
ALTER TABLE public.streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for streams
CREATE POLICY "Anyone can view public streams" ON public.streams
  FOR SELECT USING (true);

CREATE POLICY "Verified doctors can create streams" ON public.streams
  FOR INSERT WITH CHECK (
    doctor_id = auth.uid() AND 
    EXISTS (SELECT 1 FROM public.doctors WHERE id = auth.uid() AND verification_status = 'verified' AND can_stream = true)
  );

CREATE POLICY "Doctors can update their own streams" ON public.streams
  FOR UPDATE USING (doctor_id = auth.uid());

-- RLS Policies for community posts
CREATE POLICY "Anyone can view community posts" ON public.community_posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts" ON public.community_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts" ON public.community_posts
  FOR UPDATE USING (auth.uid() = author_id);

-- RLS Policies for post reactions
CREATE POLICY "Anyone can view reactions" ON public.post_reactions
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own reactions" ON public.post_reactions
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for post replies
CREATE POLICY "Anyone can view replies" ON public.post_replies
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create replies" ON public.post_replies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own replies" ON public.post_replies
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for doctor follows
CREATE POLICY "Users can view follows" ON public.doctor_follows
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own follows" ON public.doctor_follows
  FOR ALL USING (auth.uid() = follower_id);

-- RLS Policies for chat conversations
CREATE POLICY "Users can view their own conversations" ON public.chat_conversations
  FOR SELECT USING (
    auth.uid() IN (patient_id, doctor_id)
  );

CREATE POLICY "Patients can start conversations with doctors" ON public.chat_conversations
  FOR INSERT WITH CHECK (auth.uid() = patient_id);

-- RLS Policies for chat messages
CREATE POLICY "Users can view messages in their conversations" ON public.chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.chat_conversations 
      WHERE id = conversation_id AND auth.uid() IN (patient_id, doctor_id)
    )
  );

CREATE POLICY "Users can send messages in their conversations" ON public.chat_messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.chat_conversations 
      WHERE id = conversation_id AND auth.uid() IN (patient_id, doctor_id)
    )
  );

-- RLS Policies for stream comments
CREATE POLICY "Anyone can view stream comments" ON public.stream_comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can comment on streams" ON public.stream_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
