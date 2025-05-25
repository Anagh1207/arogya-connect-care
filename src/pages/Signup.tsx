
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, EyeOff, CheckCircle } from 'lucide-react';

const Signup = () => {
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    specialty: '',
    licenseNumber: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === 'patient') {
      navigate('/patient-dashboard');
    } else {
      navigate('/doctor-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue to-white flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-arogya-dark-green text-white p-3 rounded-2xl mr-3">
              <Heart className="w-8 h-8" />
            </div>
            <span className="text-3xl font-bold text-arogya-dark-teal">Arogya Care</span>
          </div>
          <h1 className="text-3xl font-bold text-arogya-dark-teal mb-2">Join Our Community</h1>
          <p className="text-arogya-teal">Create your account to get started</p>
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
                  Patient Signup
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
                  Doctor Signup
                </button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-arogya-teal mb-2">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                    placeholder="First name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-arogya-teal mb-2">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-arogya-teal mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-arogya-teal mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                  placeholder="Your phone number"
                  required
                />
              </div>

              {userType === 'doctor' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-arogya-teal mb-2">
                      Medical Specialty
                    </label>
                    <Input
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                      placeholder="e.g., Cardiology, Dermatology"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-arogya-teal mb-2">
                      Medical License Number
                    </label>
                    <Input
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12"
                      placeholder="Your license number"
                      required
                    />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-arogya-teal mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12 pr-12"
                    placeholder="Create a password"
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

              <div>
                <label className="block text-sm font-medium text-arogya-teal mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="rounded-xl border-arogya-light-teal focus:border-arogya-dark-green h-12 pr-12"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-arogya-teal hover:text-arogya-dark-green"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input type="checkbox" className="rounded border-arogya-light-teal text-arogya-dark-green mt-1" required />
                <span className="text-sm text-arogya-teal">
                  I agree to the{' '}
                  <a href="#" className="text-arogya-dark-green hover:text-arogya-light-green font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-arogya-dark-green hover:text-arogya-light-green font-medium">
                    Privacy Policy
                  </a>
                </span>
              </div>

              <Button
                type="submit"
                className="w-full bg-arogya-dark-green hover:bg-arogya-light-green text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-arogya-teal">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-arogya-dark-green hover:text-arogya-light-green font-semibold"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
