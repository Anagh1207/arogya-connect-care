
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Download, 
  Receipt,
  Shield,
  Star,
  Crown
} from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl?: string;
}

const PaymentDashboard = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<'active' | 'pending' | 'failed'>('active');

  // Mock data - in real app, this would come from backend
  useEffect(() => {
    // Simulate getting selected plan from localStorage or API
    const mockPlan = {
      id: 'premium',
      name: 'Premium Care',
      price: 599,
      billing: 'monthly',
      features: [
        'Unlimited video consultations',
        'Specialist doctor access',
        'Advanced health analytics',
        'Family account (up to 4 members)',
        'Priority support (24/7)'
      ]
    };
    setSelectedPlan(mockPlan);
  }, []);

  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      date: '2024-01-15',
      amount: 599,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-002',
      date: '2024-02-15',
      amount: 599,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-003',
      date: '2024-03-15',
      amount: 599,
      status: 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePayment = () => {
    // Simulate payment process
    setPaymentStatus('pending');
    setTimeout(() => {
      setPaymentStatus('active');
    }, 2000);
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <CardContent>
            <Shield className="w-16 h-16 text-arogya-dark-green mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-arogya-dark-teal mb-4">No Plan Selected</h2>
            <p className="text-arogya-teal mb-6">Please select a subscription plan first.</p>
            <Button 
              onClick={() => navigate('/subscription')}
              className="bg-arogya-dark-green hover:bg-arogya-light-green text-white"
            >
              Choose Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-arogya-light-blue/20 via-white to-arogya-beige-yellow/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-arogya-dark-teal mb-4">Payment Dashboard</h1>
          <p className="text-xl text-arogya-teal">Manage your subscription and billing</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2 mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Current Plan */}
              <Card className="border-2 border-arogya-dark-green">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Star className="w-6 h-6 text-arogya-dark-green mr-2" />
                      Current Plan
                    </CardTitle>
                    <Badge className={getStatusColor(paymentStatus)}>
                      {getStatusIcon(paymentStatus)}
                      <span className="ml-2 capitalize">{paymentStatus}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-arogya-dark-teal">{selectedPlan.name}</h3>
                      <p className="text-3xl font-bold text-arogya-dark-green">
                        ₹{selectedPlan.price.toLocaleString()}
                        <span className="text-lg text-arogya-teal">/{selectedPlan.billing}</span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      {selectedPlan.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm text-arogya-teal">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-6 h-6 text-arogya-dark-green mr-2" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-arogya-teal">Plan Cost</span>
                      <span className="font-semibold">₹{selectedPlan.price}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-arogya-teal">Tax (18% GST)</span>
                      <span className="font-semibold">₹{Math.round(selectedPlan.price * 0.18)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-lg font-bold text-arogya-dark-teal">
                      <span>Total Amount</span>
                      <span>₹{Math.round(selectedPlan.price * 1.18)}</span>
                    </div>
                    <div className="flex items-center text-sm text-arogya-teal">
                      <Calendar className="w-4 h-4 mr-2" />
                      Next billing: March 15, 2024
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Complete Your Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-arogya-light-blue/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-arogya-dark-teal mb-2">Payment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Plan:</span>
                      <span className="font-medium">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">₹{Math.round(selectedPlan.price * 1.18)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Billing Cycle:</span>
                      <span className="font-medium capitalize">{selectedPlan.billing}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-arogya-dark-teal">Payment Methods</h4>
                  <div className="grid gap-4">
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto p-4 border-2 hover:border-arogya-dark-green"
                      onClick={handlePayment}
                    >
                      <CreditCard className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-gray-500">Visa, Mastercard, RuPay</div>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto p-4 border-2 hover:border-arogya-dark-green"
                      onClick={handlePayment}
                    >
                      <div className="w-6 h-6 mr-3 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold">
                        UPI
                      </div>
                      <div className="text-left">
                        <div className="font-medium">UPI Payment</div>
                        <div className="text-sm text-gray-500">Pay using your UPI ID</div>
                      </div>
                    </Button>
                  </div>
                </div>

                <div className="text-center text-sm text-arogya-teal">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your payment is secured with 256-bit SSL encryption
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="w-6 h-6 text-arogya-dark-green mr-2" />
                  Invoice History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(invoice.status)}
                        <div>
                          <div className="font-medium">{invoice.id}</div>
                          <div className="text-sm text-gray-500">{invoice.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">₹{invoice.amount}</div>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </div>
                        {invoice.downloadUrl && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/subscription')}
                    className="w-full justify-start"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Change Plan
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Subscription
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentDashboard;
