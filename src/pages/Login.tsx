
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === 'patient') {
      navigate('/patient-dashboard');
    } else {
      navigate('/doctor-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-arogya-dark-green text-white p-3 rounded-2xl mr-3">
              <Heart className="w-8 h-8" />
            </div>
            <span className="text-3xl font-bold text-arogya-dark-teal">Arogya Care</span>
          </div>
          <h1 className="text-3xl font-bold text-arogya-dark-teal mb-2">Welcome Back</h1>
          <p className="text-arogya-teal">Sign in to your account</p>
        </div>

        <Card className="bg-white shadow-2xl border-0 rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-center">
              <div className="flex bg-arogya-light-blue rounded-2xl p-1 mb-6">
                <button
                  type="button"
                  onClick={() => setUserType('patient')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    userType === 'patient'
                      ? 'bg-arogya-dark-green text-white shadow-lg'
                      : 'text-arogya-teal hover:text-arogya-dark-green'
                  }`}
                >
                  Patient Login
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('doctor')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    userType === 'doctor'
                      ? 'bg-arogya-dark-green text-white shadow-lg'
                      : 'text-arogya-teal hover:text-arogya-dark-green'
                  }`}
                >
                  Doctor Login
                </button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-arogya-teal mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-arogya-teal mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12 pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-arogya-teal hover:text-arogya-dark-green"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-arogya-light-teal text-arogya-dark-green mr-2" />
                  <span className="text-sm text-arogya-teal">Remember me</span>
                </label>
                <a href="#" className="text-sm text-arogya-dark-green hover:text-arogya-light-green font-medium">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-arogya-dark-green hover:bg-arogya-light-green text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-arogya-teal">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-arogya-dark-green hover:text-arogya-light-green font-semibold"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
