
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Stethoscope } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import DoctorDocumentUpload from '@/components/DoctorDocumentUpload';

const DoctorSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    specialization: '',
    experienceYears: '',
    qualification: '',
    consultationFee: '',
    licenseNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const specializations = [
    'General Medicine', 'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics',
    'Pediatrics', 'Psychiatry', 'Radiology', 'Surgery', 'Oncology',
    'Gynecology', 'Ophthalmology', 'ENT', 'Anesthesiology', 'Emergency Medicine'
  ];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.specialization) {
      newErrors.specialization = 'Specialization is required';
    }

    if (!formData.experienceYears) {
      newErrors.experienceYears = 'Experience is required';
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Qualification is required';
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      await signUp(formData.email.trim(), formData.password, {
        name: formData.fullName,
        role: 'doctor',
        phoneNumber: formData.phone,
        specialization: formData.specialization,
        experienceYears: parseInt(formData.experienceYears),
        qualification: formData.qualification,
        consultationFee: formData.consultationFee ? parseFloat(formData.consultationFee) : null,
        licenseNumber: formData.licenseNumber
      });

      setStep(3);
    } catch (error) {
      console.error('Doctor signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDocumentUploadComplete = () => {
    navigate('/doctor-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      {/* Header */}
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
        <div className="w-full max-w-2xl">
          {step === 1 && (
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <Stethoscope className="w-12 h-12 text-arogya-dark-green" />
                </div>
                <CardTitle className="text-3xl font-bold text-arogya-dark-teal">
                  Doctor Registration
                </CardTitle>
                <p className="text-gray-600">Step 1: Basic Information</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStep1Submit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`pl-10 h-12 border-2 focus:border-arogya-dark-green ${
                        errors.fullName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 h-12 border-2 focus:border-arogya-dark-green ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`pl-10 h-12 border-2 focus:border-arogya-dark-green ${
                        errors.phone ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pl-10 pr-10 h-12 border-2 focus:border-arogya-dark-green ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`pl-10 pr-10 h-12 border-2 focus:border-arogya-dark-green ${
                        errors.confirmPassword ? 'border-red-500' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-arogya-dark-green to-arogya-light-green hover:from-arogya-light-green hover:to-arogya-dark-green text-white font-semibold"
                  >
                    Continue
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl font-bold text-arogya-dark-teal">
                  Professional Information
                </CardTitle>
                <p className="text-gray-600">Step 2: Medical Credentials</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStep2Submit} className="space-y-4">
                  <div>
                    <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                      <SelectTrigger className={`h-12 border-2 focus:border-arogya-dark-green ${
                        errors.specialization ? 'border-red-500' : ''
                      }`}>
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map(spec => (
                          <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.specialization && (
                      <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="number"
                      placeholder="Years of Experience"
                      value={formData.experienceYears}
                      onChange={(e) => handleInputChange('experienceYears', e.target.value)}
                      className={`h-12 border-2 focus:border-arogya-dark-green ${
                        errors.experienceYears ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.experienceYears && (
                      <p className="text-red-500 text-xs mt-1">{errors.experienceYears}</p>
                    )}
                  </div>

                  <div>
                    <Textarea
                      placeholder="Qualifications (e.g., MBBS, MD, Certifications)"
                      value={formData.qualification}
                      onChange={(e) => handleInputChange('qualification', e.target.value)}
                      className={`border-2 focus:border-arogya-dark-green ${
                        errors.qualification ? 'border-red-500' : ''
                      }`}
                      rows={3}
                    />
                    {errors.qualification && (
                      <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="text"
                      placeholder="Medical License Number"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      className={`h-12 border-2 focus:border-arogya-dark-green ${
                        errors.licenseNumber ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.licenseNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="number"
                      placeholder="Consultation Fee (₹) - Optional"
                      value={formData.consultationFee}
                      onChange={(e) => handleInputChange('consultationFee', e.target.value)}
                      className="h-12 border-2 focus:border-arogya-dark-green"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 h-12"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="flex-1 h-12 bg-gradient-to-r from-arogya-dark-green to-arogya-light-green hover:from-arogya-light-green hover:to-arogya-dark-green text-white font-semibold"
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <Card className="shadow-2xl border-0">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-3xl font-bold text-arogya-dark-teal">
                    Account Created Successfully!
                  </CardTitle>
                  <p className="text-gray-600">Step 3: Upload Verification Documents</p>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4 mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Stethoscope className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-gray-600">
                      Your account has been created with "Pending Verification" status. 
                      Please upload your verification documents to complete the process.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <DoctorDocumentUpload onUploadComplete={handleDocumentUploadComplete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;
