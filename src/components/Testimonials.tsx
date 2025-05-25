
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Patient",
      image: "👩‍💼",
      rating: 5,
      content: "Arogya Care has revolutionized my healthcare experience. The video consultations are convenient and the doctors are incredibly professional."
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      image: "👨‍⚕️",
      rating: 5,
      content: "As a healthcare provider, I appreciate the seamless platform that allows me to connect with patients efficiently while maintaining quality care."
    },
    {
      name: "John Rodriguez",
      role: "Patient",
      image: "👨‍💻",
      rating: 5,
      content: "The appointment scheduling is so easy, and having all my medical records in one place gives me peace of mind. Highly recommended!"
    },
    {
      name: "Dr. Emily Davis",
      role: "General Practitioner",
      image: "👩‍⚕️",
      rating: 5,
      content: "The platform's intuitive design makes patient management effortless. It's helped me provide better care to more patients."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-arogya-light-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-arogya-teal max-w-3xl mx-auto">
            Hear from patients and healthcare providers who trust Arogya Care for their medical needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-arogya-beige-yellow mb-2" />
                </div>
                <p className="text-arogya-teal mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{testimonial.image}</div>
                    <div>
                      <h4 className="font-bold text-arogya-dark-teal">{testimonial.name}</h4>
                      <p className="text-sm text-arogya-teal">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
