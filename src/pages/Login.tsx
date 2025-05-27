
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login success
    toast({
      title: "Login Successful!",
      description: `Welcome back, ${userType}!`,
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
          <CardTitle className="text-2xl font-bold text-arogya-dark-teal">Sign In</CardTitle>
          <p className="text-gray-600">Welcome back to Arogya Care</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Type
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
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-arogya-dark-green hover:bg-arogya-light-green text-white"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/signup')}
                className="text-arogya-dark-green hover:text-arogya-light-green font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
