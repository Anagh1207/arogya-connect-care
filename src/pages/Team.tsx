
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail, Github } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  github?: string;
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
      email: 'rajesh@arogyacare.com'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Chief Technology Officer',
      bio: 'Former senior engineer at top tech companies, passionate about healthcare innovation.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/priyasharma',
      email: 'priya@arogyacare.com',
      github: 'https://github.com/priyasharma'
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      role: 'Chief Medical Officer',
      bio: 'Board-certified physician specializing in emergency medicine and telemedicine.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/amitpatel',
      email: 'amit@arogyacare.com'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      role: 'Head of Product',
      bio: 'Product management expert focused on creating user-friendly healthcare experiences.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/sarahwilson',
      email: 'sarah@arogyacare.com'
    },
    {
      id: 5,
      name: 'Ravi Menon',
      role: 'Head of Engineering',
      bio: 'Full-stack developer with expertise in scalable healthcare platforms and AI integration.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/ravimenon',
      email: 'ravi@arogyacare.com',
      github: 'https://github.com/ravimenon'
    },
    {
      id: 6,
      name: 'Dr. Meera Singh',
      role: 'Head of Clinical Operations',
      bio: 'Healthcare operations specialist ensuring quality care delivery and compliance.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/meerasingh',
      email: 'meera@arogyacare.com'
    },
    {
      id: 7,
      name: 'Alex Thompson',
      role: 'Head of Design',
      bio: 'UX/UI designer creating intuitive interfaces for healthcare accessibility.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/alexthompson',
      email: 'alex@arogyacare.com'
    },
    {
      id: 8,
      name: 'Kavya Reddy',
      role: 'Data Scientist',
      bio: 'AI/ML expert developing predictive models for better health outcomes.',
      image: '/api/placeholder/150/150',
      linkedin: 'https://linkedin.com/in/kavyareddy',
      email: 'kavya@arogyacare.com',
      github: 'https://github.com/kavyareddy'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#c9e6e8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#013c22' }}>
            Meet the Team Behind Arogya Care
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team of healthcare professionals, technologists, and innovators 
            working together to make quality healthcare accessible to everyone.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                {/* Profile Image */}
                <div className="mb-6">
                  <div 
                    className="w-32 h-32 mx-auto rounded-full border-4 overflow-hidden"
                    style={{ borderColor: '#093e43' }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=093e43&color=ffffff&size=150`;
                      }}
                    />
                  </div>
                </div>

                {/* Member Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#013c22' }}>
                    {member.name}
                  </h3>
                  <p 
                    className="text-sm font-semibold mb-3"
                    style={{ color: '#093e43' }}
                  >
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {member.linkedin && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-2"
                      style={{ borderColor: '#093e43', color: '#093e43' }}
                      onClick={() => window.open(member.linkedin, '_blank')}
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  )}
                  {member.email && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-2"
                      style={{ borderColor: '#093e43', color: '#093e43' }}
                      onClick={() => window.open(`mailto:${member.email}`, '_blank')}
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                  )}
                  {member.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-2"
                      style={{ borderColor: '#093e43', color: '#093e43' }}
                      onClick={() => window.open(member.github, '_blank')}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Team Section */}
        <div className="mt-20 text-center">
          <Card 
            className="p-12"
            style={{ backgroundColor: '#013c22', color: 'white' }}
          >
            <h2 className="text-3xl font-bold mb-4">Want to Join Our Team?</h2>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for passionate individuals who want to make 
              a difference in healthcare.
            </p>
            <Button 
              size="lg"
              style={{ backgroundColor: '#cdd193', color: '#013c22' }}
              className="hover:opacity-90 font-semibold"
            >
              View Open Positions
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Team;
