
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-arogya-dark-teal mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last updated: January 2024</p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-arogya-dark-teal mb-4">Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By accessing and using Arogya Care services, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-arogya-dark-teal mb-4">Use of Services</h2>
                <p className="text-gray-600 mb-4">
                  Our services are intended for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Patients seeking medical consultations and healthcare services</li>
                  <li>Healthcare providers offering professional services</li>
                  <li>Emergency medical assistance and support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-arogya-dark-teal mb-4">Medical Disclaimer</h2>
                <p className="text-gray-600">
                  The information provided through Arogya Care is for informational purposes only and should not 
                  replace professional medical advice. Always consult with qualified healthcare providers for 
                  medical decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-arogya-dark-teal mb-4">Contact Information</h2>
                <p className="text-gray-600">
                  For questions regarding these terms, contact us at legal@arogyacare.com or 1-800-AROGYA.
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

export default Terms;
