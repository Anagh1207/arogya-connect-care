
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Heart, UserPlus, Phone } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'hospital' | 'admin'>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await signUp(formData.email, formData.password, {
        name: formData.name,
        role: userType,
        phoneNumber: formData.phoneNumber
      });
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          onClick={() => navigate('/login')}
          className="text-arogya-dark-green hover:bg-arogya-light-blue/50"
        >
          Already have an account? Sign in
        </Button>
      </div>

      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full">
          {/* Illustration Side */}
          <div className="hidden lg:flex flex-col justify-center items-center text-center space-y-8">
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-arogya-beige-yellow to-arogya-light-blue rounded-full flex items-center justify-center mb-6">
                <UserPlus className="w-32 h-32 text-arogya-dark-green animate-pulse" />
              </div>
              <Heart className="absolute -bottom-4 -left-4 w-12 h-12 text-red-500 animate-bounce" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-arogya-dark-teal">
                Join the Arogya Care Family
              </h2>
              <p className="text-lg text-gray-600 max-w-md">
                Start your journey towards better health with our comprehensive healthcare platform.
              </p>
            </div>
          </div>

          {/* Signup Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-2xl border-0">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl font-bold text-arogya-dark-teal">Create Account</CardTitle>
                <p className="text-gray-600">Join thousands of satisfied users</p>
              </CardHeader>
              <CardContent>
                {/* User Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I want to join as a
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['patient', 'doctor', 'hospital', 'admin'] as const).map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={userType === type ? "default" : "outline"}
                        onClick={() => setUserType(type)}
                        className={`transition-all duration-300 ${
                          userType === type 
                            ? "bg-arogya-dark-green text-white shadow-lg scale-105" 
                            : "hover:bg-arogya-light-blue/30"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`pl-10 h-12 border-2 focus:border-arogya-dark-green ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="tel"
                      placeholder="Phone number (optional)"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      className="pl-10 h-12 border-2 focus:border-arogya-dark-green"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password (min. 6 characters)"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
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

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className={`pl-10 pr-10 h-12 border-2 focus:border-arogya-dark-green ${
                        errors.confirmPassword ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-arogya-dark-green"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
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
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-500">
                  By creating an account, you agree to our{' '}
                  <button 
                    onClick={() => navigate('/terms')}
                    className="text-arogya-dark-green hover:underline"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button 
                    onClick={() => navigate('/privacy')}
                    className="text-arogya-dark-green hover:underline"
                  >
                    Privacy Policy
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

export default Signup;
