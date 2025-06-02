
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="shadow-2xl border-0 text-center">
          <CardHeader className="space-y-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-10 h-10 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-red-600">Access Denied</CardTitle>
            <p className="text-gray-600">
              You don't have permission to access this page. Please contact your administrator if you believe this is an error.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">
                <strong>Error Code:</strong> 403 - Forbidden
              </p>
              <p className="text-red-700 text-sm mt-1">
                This resource requires special permissions that your account doesn't have.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button 
                onClick={() => navigate('/')}
                className="bg-arogya-dark-green hover:bg-arogya-light-green text-white"
              >
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Unauthorized;
