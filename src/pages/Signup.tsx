
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, Heart, UserPlus, Phone, Chrome } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [signupMethod, setSignupMethod] = useState<'email' | 'phone' | 'google'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Account Created!",
        description: `Welcome to Arogya Care, ${formData.name}!`,
      });

      redirectUser();
      setIsLoading(false);
    }, 2000);
  };

  const handlePhoneSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      // Send OTP
      if (!formData.name || !formData.phoneNumber) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      
      setIsLoading(true);
      setTimeout(() => {
        setOtpSent(true);
        setIsLoading(false);
        toast({
          title: "OTP Sent!",
          description: `Verification code sent to ${formData.phoneNumber}`,
        });
      }, 1000);
    } else {
      // Verify OTP and create account
      setIsLoading(true);
      setTimeout(() => {
        toast({
          title: "Account Created!",
          description: "Phone number verified and account created successfully!",
        });
        redirectUser();
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      toast({
        title: "Account Created!",
        description: "Account created with Google successfully!",
      });
      redirectUser();
      setIsLoading(false);
    }, 1500);
  };

  const redirectUser = () => {
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

  const resetPhoneSignup = () => {
    setOtpSent(false);
    setOtp('');
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
                  <div className="grid grid-cols-3 gap-2">
                    {(['patient', 'doctor', 'admin'] as const).map((type) => (
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

                {/* Signup Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Sign up with
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={signupMethod === 'email' ? "default" : "outline"}
                      onClick={() => {
                        setSignupMethod('email');
                        resetPhoneSignup();
                      }}
                      className={`transition-all duration-300 ${
                        signupMethod === 'email' 
                          ? "bg-arogya-dark-green text-white" 
                          : "hover:bg-arogya-light-blue/30"
                      }`}
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={signupMethod === 'phone' ? "default" : "outline"}
                      onClick={() => {
                        setSignupMethod('phone');
                        resetPhoneSignup();
                      }}
                      className={`transition-all duration-300 ${
                        signupMethod === 'phone' 
                          ? "bg-arogya-dark-green text-white" 
                          : "hover:bg-arogya-light-blue/30"
                      }`}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Phone
                    </Button>
                    <Button
                      type="button"
                      variant={signupMethod === 'google' ? "default" : "outline"}
                      onClick={() => setSignupMethod('google')}
                      className={`transition-all duration-300 ${
                        signupMethod === 'google' 
                          ? "bg-arogya-dark-green text-white" 
                          : "hover:bg-arogya-light-blue/30"
                      }`}
                    >
                      <Chrome className="w-4 h-4 mr-1" />
                      Google
                    </Button>
                  </div>
                </div>

                {/* Email Signup Form */}
                {signupMethod === 'email' && (
                  <form onSubmit={handleEmailSignup} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="pl-10 h-12 border-2 focus:border-arogya-dark-green"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-10 h-12 border-2 focus:border-arogya-dark-green"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password (min. 6 characters)"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="pl-10 pr-10 h-12 border-2 focus:border-arogya-dark-green"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-arogya-dark-green"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="pl-10 pr-10 h-12 border-2 focus:border-arogya-dark-green"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-arogya-dark-green"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
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
                        'Create Account with Email'
                      )}
                    </Button>
                  </form>
                )}

                {/* Phone Signup Form */}
                {signupMethod === 'phone' && (
                  <form onSubmit={handlePhoneSignup} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="pl-10 h-12 border-2 focus:border-arogya-dark-green"
                        disabled={otpSent}
                        required
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="tel"
                        placeholder="Phone number (+91 XXXXXXXXXX)"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        className="pl-10 h-12 border-2 focus:border-arogya-dark-green"
                        disabled={otpSent}
                        required
                      />
                    </div>

                    {otpSent && (
                      <div className="space-y-2">
                        <Input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="h-12 border-2 focus:border-arogya-dark-green text-center text-lg tracking-widest"
                          maxLength={6}
                          required
                        />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Didn't receive OTP?</span>
                          <button
                            type="button"
                            onClick={resetPhoneSignup}
                            className="text-arogya-dark-green hover:underline"
                          >
                            Resend
                          </button>
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-arogya-dark-green to-arogya-light-green hover:from-arogya-light-green hover:to-arogya-dark-green text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>{otpSent ? 'Verifying...' : 'Sending OTP...'}</span>
                        </div>
                      ) : (
                        otpSent ? 'Verify OTP & Create Account' : 'Send OTP'
                      )}
                    </Button>
                  </form>
                )}

                {/* Google Signup */}
                {signupMethod === 'google' && (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <Chrome className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-600 mb-6">
                        Create your account securely with Google
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handleGoogleSignup}
                      disabled={isLoading}
                      className="w-full h-12 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        <>
                          <Chrome className="w-5 h-5 mr-2 text-blue-500" />
                          Continue with Google
                        </>
                      )}
                    </Button>
                  </div>
                )}

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
