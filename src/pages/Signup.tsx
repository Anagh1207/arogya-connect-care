
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // Simulate signup success
    toast({
      title: "Account Created!",
      description: `Welcome to Arogya Care, ${formData.name}!`,
    });

    // Redirect based on user type
    switch(userType) {
      case 'patient':
        navigate('/patient-dashboard');
        break;
      case 'doctor':
        navigate('/doctor-dashboard');
        break;
      case 'admin':
        navigate('/admin-panel');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-arogya-dark-teal">Create Account</CardTitle>
          <p className="text-gray-600">Join Arogya Care today</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['patient', 'doctor', 'admin'] as const).map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={userType === type ? "default" : "outline"}
                    onClick={() => setUserType(type)}
                    className={userType === type ? "bg-arogya-dark-green text-white" : ""}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Input
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-arogya-dark-green hover:bg-arogya-light-green text-white"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-arogya-dark-green hover:text-arogya-light-green font-medium"
              >
                Sign in
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
