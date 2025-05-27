
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-arogya-dark-teal mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last updated: January 2024</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-arogya-dark-teal mb-4">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  At Arogya Care, we collect information to provide better healthcare services. This includes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Personal information (name, email, phone number)</li>
                  <li>Medical history and health records</li>
                  <li>Appointment and consultation data</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-arogya-dark-teal mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  Your information is used to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide medical consultations and healthcare services</li>
                  <li>Maintain your health records securely</li>
                  <li>Send appointment reminders and health updates</li>
                  <li>Improve our services and user experience</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-arogya-dark-teal mb-4">Data Security</h2>
                <p className="text-gray-600">
                  We implement industry-standard security measures to protect your personal health information. 
                  All data is encrypted in transit and at rest, and we comply with HIPAA regulations for healthcare data protection.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-arogya-dark-teal mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at privacy@arogyacare.com 
                  or call 1-800-AROGYA.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
