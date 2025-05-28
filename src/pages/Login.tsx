
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, Stethoscope, Heart, Phone, Chrome } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone' | 'google'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Login Successful!",
        description: `Welcome back to Arogya Care!`,
      });

      redirectUser();
      setIsLoading(false);
    }, 1500);
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      // Send OTP
      setIsLoading(true);
      setTimeout(() => {
        setOtpSent(true);
        setIsLoading(false);
        toast({
          title: "OTP Sent!",
          description: `Verification code sent to ${phoneNumber}`,
        });
      }, 1000);
    } else {
      // Verify OTP
      setIsLoading(true);
      setTimeout(() => {
        toast({
          title: "Login Successful!",
          description: "Phone number verified successfully!",
        });
        redirectUser();
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      toast({
        title: "Login Successful!",
        description: "Signed in with Google successfully!",
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

  const resetPhoneLogin = () => {
    setOtpSent(false);
    setOtp('');
    setPhoneNumber('');
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
                {/* User Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I am a
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

                {/* Login Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Sign in with
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={loginMethod === 'email' ? "default" : "outline"}
                      onClick={() => setLoginMethod('email')}
                      className={`transition-all duration-300 ${
                        loginMethod === 'email' 
                          ? "bg-arogya-dark-green text-white" 
                          : "hover:bg-arogya-light-blue/30"
                      }`}
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={loginMethod === 'phone' ? "default" : "outline"}
                      onClick={() => {
                        setLoginMethod('phone');
                        resetPhoneLogin();
                      }}
                      className={`transition-all duration-300 ${
                        loginMethod === 'phone' 
                          ? "bg-arogya-dark-green text-white" 
                          : "hover:bg-arogya-light-blue/30"
                      }`}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Phone
                    </Button>
                    <Button
                      type="button"
                      variant={loginMethod === 'google' ? "default" : "outline"}
                      onClick={() => setLoginMethod('google')}
                      className={`transition-all duration-300 ${
                        loginMethod === 'google' 
                          ? "bg-arogya-dark-green text-white" 
                          : "hover:bg-arogya-light-blue/30"
                      }`}
                    >
                      <Chrome className="w-4 h-4 mr-1" />
                      Google
                    </Button>
                  </div>
                </div>

                {/* Email Login Form */}
                {loginMethod === 'email' && (
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 border-2 focus:border-arogya-dark-green"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        'Sign In with Email'
                      )}
                    </Button>
                  </form>
                )}

                {/* Phone Login Form */}
                {loginMethod === 'phone' && (
                  <form onSubmit={handlePhoneLogin} className="space-y-4">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="tel"
                        placeholder="Phone number (+91 XXXXXXXXXX)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                            onClick={resetPhoneLogin}
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
                        otpSent ? 'Verify OTP' : 'Send OTP'
                      )}
                    </Button>
                  </form>
                )}

                {/* Google Login */}
                {loginMethod === 'google' && (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <Chrome className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-600 mb-6">
                        Sign in securely with your Google account
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      className="w-full h-12 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing in...</span>
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
