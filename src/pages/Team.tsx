
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail, Github, Users, Award, BookOpen, Coffee } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  github?: string;
  specialty?: string;
  experience?: string;
}

const Team = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & CEO',
      bio: 'Experienced physician with 15+ years in healthcare technology and digital health solutions.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/rajeshkumar',
      email: 'rajesh@arogyacare.com',
      specialty: 'Internal Medicine',
      experience: '15+ years'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Chief Technology Officer',
      bio: 'Former senior engineer at top tech companies, passionate about healthcare innovation.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/priyasharma',
      email: 'priya@arogyacare.com',
      github: 'https://github.com/priyasharma',
      specialty: 'Healthcare Tech',
      experience: '12+ years'
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      role: 'Chief Medical Officer',
      bio: 'Board-certified physician specializing in emergency medicine and telemedicine.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/amitpatel',
      email: 'amit@arogyacare.com',
      specialty: 'Emergency Medicine',
      experience: '18+ years'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      role: 'Head of Product',
      bio: 'Product management expert focused on creating user-friendly healthcare experiences.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/sarahwilson',
      email: 'sarah@arogyacare.com',
      specialty: 'Product Strategy',
      experience: '10+ years'
    },
    {
      id: 5,
      name: 'Ravi Menon',
      role: 'Head of Engineering',
      bio: 'Full-stack developer with expertise in scalable healthcare platforms and AI integration.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/ravimenon',
      email: 'ravi@arogyacare.com',
      github: 'https://github.com/ravimenon',
      specialty: 'Software Engineering',
      experience: '14+ years'
    },
    {
      id: 6,
      name: 'Dr. Meera Singh',
      role: 'Head of Clinical Operations',
      bio: 'Healthcare operations specialist ensuring quality care delivery and compliance.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/meerasingh',
      email: 'meera@arogyacare.com',
      specialty: 'Clinical Operations',
      experience: '16+ years'
    },
    {
      id: 7,
      name: 'Alex Thompson',
      role: 'Head of Design',
      bio: 'UX/UI designer creating intuitive interfaces for healthcare accessibility.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/alexthompson',
      email: 'alex@arogyacare.com',
      specialty: 'UX/UI Design',
      experience: '8+ years'
    },
    {
      id: 8,
      name: 'Kavya Reddy',
      role: 'Data Scientist',
      bio: 'AI/ML expert developing predictive models for better health outcomes.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/kavyareddy',
      email: 'kavya@arogyacare.com',
      github: 'https://github.com/kavyareddy',
      specialty: 'AI/Machine Learning',
      experience: '9+ years'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-arogya-dark-green/10 text-arogya-dark-green px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4 mr-2" />
            Meet Our Team
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-arogya-dark-teal mb-6">
            The People Behind{' '}
            <span className="text-arogya-dark-green bg-gradient-to-r from-arogya-dark-green to-arogya-light-green bg-clip-text">
              Arogya Care
            </span>
          </h1>
          <p className="text-xl text-arogya-teal max-w-3xl mx-auto leading-relaxed">
            Our diverse team of healthcare professionals, technologists, and innovators 
            working together to make quality healthcare accessible to everyone.
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6 bg-gradient-to-br from-arogya-light-blue to-white shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-arogya-dark-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-arogya-dark-teal">50+</h3>
            <p className="text-arogya-teal">Team Members</p>
          </Card>
          
          <Card className="text-center p-6 bg-gradient-to-br from-arogya-beige-yellow to-white shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-arogya-dark-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-arogya-dark-teal">200+</h3>
            <p className="text-arogya-teal">Years Combined Experience</p>
          </Card>
          
          <Card className="text-center p-6 bg-gradient-to-br from-arogya-light-green to-white shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-arogya-dark-green rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-arogya-dark-teal">15+</h3>
            <p className="text-arogya-teal">Medical Specialties</p>
          </Card>
          
          <Card className="text-center p-6 bg-gradient-to-br from-arogya-teal to-white shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-arogya-dark-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-arogya-dark-teal">24/7</h3>
            <p className="text-arogya-teal">Dedication</p>
          </Card>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                {/* Profile Image */}
                <div className="relative overflow-hidden">
                  <div 
                    className="w-full h-64 bg-gradient-to-br from-arogya-light-blue to-arogya-beige-yellow flex items-center justify-center relative"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=093e43&color=ffffff&size=250`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-arogya-dark-teal mb-1 group-hover:text-arogya-dark-green transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-arogya-dark-green mb-2">
                      {member.role}
                    </p>
                    {member.specialty && (
                      <p className="text-xs text-arogya-teal bg-arogya-light-blue/30 inline-block px-2 py-1 rounded-full">
                        {member.specialty} • {member.experience}
                      </p>
                    )}
                  </div>
                  
                  <p className="text-arogya-teal text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3">
                    {member.linkedin && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2 border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-dark-green hover:text-white transition-all duration-300 group-hover:scale-110"
                        onClick={() => window.open(member.linkedin, '_blank')}
                      >
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    )}
                    {member.email && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2 border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-dark-green hover:text-white transition-all duration-300 group-hover:scale-110"
                        onClick={() => window.open(`mailto:${member.email}`, '_blank')}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    )}
                    {member.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2 border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-dark-green hover:text-white transition-all duration-300 group-hover:scale-110"
                        onClick={() => window.open(member.github, '_blank')}
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Team Section */}
        <div className="mt-20">
          <Card className="overflow-hidden shadow-2xl border-0">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-arogya-dark-teal via-arogya-dark-green to-arogya-light-green text-white p-12 text-center relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Join Our Mission?</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    We're always looking for passionate individuals who want to make 
                    a difference in healthcare and improve lives around the world.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg"
                      className="bg-white text-arogya-dark-green hover:bg-arogya-beige-yellow font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      View Open Positions
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-arogya-dark-green font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105"
                    >
                      Learn About Our Culture
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Team;
