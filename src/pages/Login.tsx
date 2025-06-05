
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Stethoscope, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { signIn, user, profile, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user && profile) {
      console.log('User already logged in, redirecting to dashboard');
      const dashboardPaths = {
        'patient': '/patient-dashboard',
        'doctor': '/doctor-dashboard',
        'hospital': '/hospital-dashboard',
        'admin': '/admin-panel'
      };
      const targetPath = dashboardPaths[profile.role as keyof typeof dashboardPaths] || '/';
      navigate(targetPath, { replace: true });
    }
  }, [user, profile, loading, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await signIn(email.trim(), password);
      // Redirection will happen automatically via useAuth hook
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading if auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-arogya-dark-green mx-auto mb-4"></div>
            <p className="text-arogya-dark-teal">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      {/* Header with Logo */}
      <div className="flex justify-between items-center p-6">
        <div 
          className="flex items-center cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          <img 
            src="/lovable-uploads/ab2f5346-9dbf-46fd-9e64-97bb5022d676.png" 
            alt="Arogya Care" 
            className="h-10 w-10 mr-3 group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-arogya-dark-teal to-arogya-dark-green bg-clip-text text-transparent">
            Arogya Care
          </span>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/signup')}
          className="text-arogya-dark-green hover:bg-arogya-light-blue/50"
        >
          Don't have an account? Sign up
        </Button>
      </div>

      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full">
          {/* Illustration Side */}
          <div className="hidden lg:flex flex-col justify-center items-center text-center space-y-8">
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-arogya-light-blue to-arogya-beige-yellow rounded-full flex items-center justify-center mb-6">
                <Stethoscope className="w-32 h-32 text-arogya-dark-green animate-pulse" />
              </div>
              <Heart className="absolute -top-4 -right-4 w-12 h-12 text-red-500 animate-bounce" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-arogya-dark-teal">
                Welcome Back to Your Health Journey
              </h2>
              <p className="text-lg text-gray-600 max-w-md">
                Continue accessing world-class healthcare services from the comfort of your home.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-2xl border-0">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl font-bold text-arogya-dark-teal">Sign In</CardTitle>
                <p className="text-gray-600">Access your healthcare dashboard</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 h-12 border-2 focus:border-arogya-dark-green ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 h-12 border-2 focus:border-arogya-dark-green ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-arogya-dark-green"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-arogya-dark-green to-arogya-light-green hover:from-arogya-light-green hover:to-arogya-dark-green text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button className="text-sm text-arogya-dark-green hover:text-arogya-light-green font-medium hover:underline">
                    Forgot your password?
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
