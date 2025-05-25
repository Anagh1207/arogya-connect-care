
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-arogya-light-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-arogya-dark-teal mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-arogya-teal max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to our support team anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-arogya-dark-teal mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-arogya-dark-green rounded-xl flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-arogya-dark-teal mb-1">Phone Support</h4>
                  <p className="text-arogya-teal">1-800-AROGYA (276-4921)</p>
                  <p className="text-sm text-arogya-teal">Available 24/7 for emergencies</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-arogya-dark-green rounded-xl flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-arogya-dark-teal mb-1">Email Support</h4>
                  <p className="text-arogya-teal">support@arogyacare.com</p>
                  <p className="text-sm text-arogya-teal">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-arogya-dark-green rounded-xl flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-arogya-dark-teal mb-1">Headquarters</h4>
                  <p className="text-arogya-teal">123 Healthcare Avenue</p>
                  <p className="text-arogya-teal">Medical District, CA 90210</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-arogya-dark-green rounded-xl flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-arogya-dark-teal mb-1">Business Hours</h4>
                  <p className="text-arogya-teal">Monday - Friday: 8:00 AM - 8:00 PM</p>
                  <p className="text-arogya-teal">Weekend: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-xl border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-arogya-dark-teal">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-arogya-teal mb-2">First Name</label>
                  <Input className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-arogya-teal mb-2">Last Name</label>
                  <Input className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-arogya-teal mb-2">Email</label>
                <Input type="email" className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green" />
              </div>
              <div>
                <label className="block text-sm font-medium text-arogya-teal mb-2">Subject</label>
                <Input className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green" />
              </div>
              <div>
                <label className="block text-sm font-medium text-arogya-teal mb-2">Message</label>
                <textarea 
                  className="w-full p-3 border border-arogya-light-teal rounded-xl focus:outline-none focus:border-arogya-dark-green resize-none"
                  rows={5}
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              <Button className="w-full bg-arogya-dark-green hover:bg-arogya-light-green text-white py-3 rounded-xl">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
