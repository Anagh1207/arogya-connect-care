
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Crown, Shield, Video, FileText, Clock, Users, Zap, Heart, ArrowRight, X } from 'lucide-react';

const Subscription = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Care',
      description: 'Essential healthcare for individuals',
      price: { monthly: 299, yearly: 2990 },
      icon: <Heart className="w-8 h-8" />,
      color: 'from-blue-400 to-blue-600',
      popular: false,
      features: [
        '2 Video consultations per month',
        'Basic health records storage',
        'Prescription management',
        'Email support',
        'Mobile app access',
        'Appointment scheduling'
      ],
      limitations: [
        'No specialist consultations',
        'Limited health analytics',
        'No family sharing'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Care',
      description: 'Comprehensive healthcare for families',
      price: { monthly: 599, yearly: 5990 },
      icon: <Star className="w-8 h-8" />,
      color: 'from-green-400 to-green-600',
      popular: true,
      features: [
        'Unlimited video consultations',
        'Specialist doctor access',
        'Advanced health analytics',
        'Family account (up to 4 members)',
        'Priority support (24/7)',
        'Detailed health reports',
        'Medication reminders',
        'Lab test integration',
        'Mental health support'
      ],
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise Care',
      description: 'Advanced healthcare for organizations',
      price: { monthly: 1499, yearly: 14990 },
      icon: <Crown className="w-8 h-8" />,
      color: 'from-purple-400 to-purple-600',
      popular: false,
      features: [
        'Everything in Premium',
        'Corporate wellness programs',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced analytics dashboard',
        'Bulk user management',
        'API access',
        'White-label options',
        'Compliance reporting',
        'On-site health checkups'
      ],
      limitations: []
    }
  ];

  const addOns = [
    {
      name: 'Mental Health Plus',
      description: 'Additional therapy sessions and mental wellness tracking',
      price: 199,
      icon: <Shield className="w-6 h-6" />
    },
    {
      name: 'Lab Test Package',
      description: 'Monthly comprehensive lab tests with home collection',
      price: 499,
      icon: <FileText className="w-6 h-6" />
    },
    {
      name: 'Emergency Care',
      description: '24/7 emergency consultation with immediate response',
      price: 299,
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // In a real app, this would redirect to payment processing
    console.log(`Selected plan: ${planId} with ${billingCycle} billing`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/30 via-white to-arogya-beige-yellow/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-arogya-dark-green/10 text-arogya-dark-green px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Crown className="w-4 h-4 mr-2" />
            Choose Your Plan
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-arogya-dark-teal mb-6">
            Healthcare Plans for{' '}
            <span className="text-arogya-dark-green bg-gradient-to-r from-arogya-dark-green to-arogya-light-green bg-clip-text">
              Everyone
            </span>
          </h1>
          <p className="text-xl text-arogya-teal max-w-3xl mx-auto leading-relaxed mb-8">
            From individuals to large organizations, we have the perfect healthcare solution for your needs.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex bg-white rounded-xl p-1 shadow-lg border border-arogya-light-blue/30">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-arogya-dark-green text-white shadow-md'
                  : 'text-arogya-teal hover:text-arogya-dark-green'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 relative ${
                billingCycle === 'yearly'
                  ? 'bg-arogya-dark-green text-white shadow-md'
                  : 'text-arogya-teal hover:text-arogya-dark-green'
              }`}
            >
              Yearly
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5">
                Save 17%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl border-2 ${
                plan.popular
                  ? 'border-arogya-dark-green shadow-lg scale-105'
                  : selectedPlan === plan.id
                  ? 'border-arogya-light-green shadow-lg'
                  : 'border-gray-200 hover:border-arogya-light-blue'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-arogya-dark-green to-arogya-light-green text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <div className={`mx-auto mb-4 w-16 h-16 bg-gradient-to-r ${plan.color} text-white rounded-full flex items-center justify-center shadow-lg`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-arogya-dark-teal">{plan.name}</CardTitle>
                <p className="text-arogya-teal">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-arogya-dark-teal">
                    ₹{plan.price[billingCycle].toLocaleString()}
                  </span>
                  <span className="text-arogya-teal">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      Save ₹{((plan.price.monthly * 12) - plan.price.yearly).toLocaleString()} annually
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="px-6 pb-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-arogya-dark-teal mb-3">Included Features:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-arogya-teal text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-500 mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start">
                            <X className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-500 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full mt-8 py-3 font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-arogya-dark-green hover:bg-arogya-light-green text-white shadow-lg hover:shadow-xl'
                      : 'bg-white border-2 border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-dark-green hover:text-white'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-arogya-dark-teal mb-4">Enhance Your Plan</h2>
            <p className="text-xl text-arogya-teal max-w-2xl mx-auto">
              Add specialized services to get even more value from your healthcare plan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-arogya-light-blue transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-arogya-light-blue rounded-xl flex items-center justify-center text-arogya-dark-green">
                      {addon.icon}
                    </div>
                    <span className="text-2xl font-bold text-arogya-dark-teal">₹{addon.price}</span>
                  </div>
                  <h3 className="font-bold text-arogya-dark-teal mb-2">{addon.name}</h3>
                  <p className="text-arogya-teal text-sm mb-4">{addon.description}</p>
                  <Button variant="outline" className="w-full border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-dark-green hover:text-white">
                    Add to Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-arogya-light-blue to-arogya-beige-yellow border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-3xl font-bold text-arogya-dark-teal mb-4">Need Help Choosing?</h3>
                <p className="text-arogya-teal mb-6 text-lg">
                  Our healthcare experts are here to help you find the perfect plan for your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-arogya-dark-green hover:bg-arogya-light-green text-white px-8 py-3 rounded-xl font-semibold"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Talk to Expert
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-arogya-dark-green text-arogya-dark-green hover:bg-arogya-dark-green hover:text-white px-8 py-3 rounded-xl font-semibold"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
