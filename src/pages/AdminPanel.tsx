
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  MessageSquare, 
  Megaphone, 
  BarChart3, 
  Bell,
  Eye, 
  Check, 
  X,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  CreditCard,
  Globe,
  Activity,
  DollarSign,
  Crown,
  Zap,
  Lock,
  UserCog,
  FileText,
  Monitor
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AdminPanel = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@email.com', role: 'patient', status: 'active', subscription: 'Premium', joinDate: '2024-01-15', lastActive: '2 hours ago' },
    { id: 2, name: 'Dr. Sarah Wilson', email: 'sarah@email.com', role: 'doctor', status: 'active', subscription: 'Enterprise', joinDate: '2024-01-10', lastActive: '30 minutes ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike@email.com', role: 'patient', status: 'pending', subscription: 'Basic', joinDate: '2024-01-20', lastActive: '1 day ago' },
    { id: 4, name: 'Dr. Alex Chen', email: 'alex@email.com', role: 'doctor', status: 'active', subscription: 'Premium', joinDate: '2024-01-12', lastActive: '5 minutes ago' },
  ]);

  const [subscriptions] = useState([
    { id: 1, userId: 'user_001', plan: 'Premium', status: 'active', revenue: 599, nextBilling: '2024-02-25', gateway: 'Stripe' },
    { id: 2, userId: 'user_002', plan: 'Enterprise', status: 'active', revenue: 1499, nextBilling: '2024-02-28', gateway: 'Razorpay' },
    { id: 3, userId: 'user_003', plan: 'Basic', status: 'cancelled', revenue: 299, nextBilling: null, gateway: 'PhonePe' },
    { id: 4, userId: 'user_004', plan: 'Premium', status: 'pending', revenue: 0, nextBilling: '2024-02-26', gateway: 'Stripe' },
  ]);

  const [contentItems] = useState([
    { id: 1, type: 'Blog Post', title: 'Understanding Mental Health', status: 'published', author: 'Dr. Sarah Wilson', views: 1245 },
    { id: 2, type: 'Service Page', title: 'Cardiology Services', status: 'draft', author: 'Admin', views: 0 },
    { id: 3, type: 'FAQ', title: 'How to book appointments?', status: 'published', author: 'Support Team', views: 892 },
    { id: 4, type: 'Announcement', title: 'New Features Launch', status: 'scheduled', author: 'Product Team', views: 0 },
  ]);

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      published: 'bg-blue-100 text-blue-800 border-blue-200',
      draft: 'bg-gray-100 text-gray-800 border-gray-200',
      scheduled: 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getSubscriptionBadge = (plan: string) => {
    const colors = {
      Basic: 'bg-blue-100 text-blue-800 border-blue-200',
      Premium: 'bg-green-100 text-green-800 border-green-200',
      Enterprise: 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[plan as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <Header />
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-12 h-12 text-yellow-400" />
                <div>
                  <h1 className="text-4xl font-bold">Administrative Control Center</h1>
                  <p className="text-blue-200 text-lg">Ultimate platform management & oversight</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span>Super Administrator</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span>Maximum Privileges</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span>System Status: Operational</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold">₹2,47,680</div>
                <div className="text-blue-200 text-sm">Monthly Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Executive Dashboard */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold">12,847</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-blue-100 text-sm">+18% this month</span>
                  </div>
                </div>
                <Users className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active Subscriptions</p>
                  <p className="text-3xl font-bold">3,426</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-green-100 text-sm">+24% growth</span>
                  </div>
                </div>
                <CreditCard className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Monthly Revenue</p>
                  <p className="text-3xl font-bold">₹24.7L</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-purple-100 text-sm">+32% increase</span>
                  </div>
                </div>
                <DollarSign className="w-12 h-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">System Health</p>
                  <p className="text-3xl font-bold">99.9%</p>
                  <div className="flex items-center mt-2">
                    <Check className="w-4 h-4 mr-1" />
                    <span className="text-orange-100 text-sm">All systems operational</span>
                  </div>
                </div>
                <Monitor className="w-12 h-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-lg border">
            <TabsTrigger value="users" className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <UserCog className="w-4 h-4" />
              <span>User Control</span>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <CreditCard className="w-4 h-4" />
              <span>Subscriptions</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <FileText className="w-4 h-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2 data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <Shield className="w-4 h-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center space-x-2 data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
            </TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center">
                    <UserCog className="w-8 h-8 mr-3" />
                    User Management & Control
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="secondary" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search users..." className="pl-10 w-80" />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">Showing 4 of 12,847 users</div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Details</TableHead>
                      <TableHead>Role & Status</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Administrative Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                            <Badge className={getStatusBadge(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSubscriptionBadge(user.subscription)}>
                            {user.subscription}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Joined: {user.joinDate}</div>
                            <div className="text-gray-500">Last: {user.lastActive}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Control */}
          <TabsContent value="subscriptions">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardTitle className="text-2xl flex items-center">
                  <CreditCard className="w-8 h-8 mr-3" />
                  Subscription & Revenue Control
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-600">1,245</div>
                      <div className="text-sm text-blue-800">Basic Plans</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">1,892</div>
                      <div className="text-sm text-green-800">Premium Plans</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-purple-600">289</div>
                      <div className="text-sm text-purple-800">Enterprise Plans</div>
                    </CardContent>
                  </Card>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Plan & Status</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Payment Gateway</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">{sub.userId}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className={getSubscriptionBadge(sub.plan)}>
                              {sub.plan}
                            </Badge>
                            <Badge className={getStatusBadge(sub.status)}>
                              {sub.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">₹{sub.revenue}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span>{sub.gateway}</span>
                          </div>
                        </TableCell>
                        <TableCell>{sub.nextBilling || 'N/A'}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Modify</Button>
                            <Button variant="destructive" size="sm">Cancel</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management */}
          <TabsContent value="content">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardTitle className="text-2xl flex items-center">
                  <FileText className="w-8 h-8 mr-3" />
                  Content Management & Moderation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content Details</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Moderation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contentItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.type}</Badge>
                        </TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.views.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Approve</Button>
                            <Button variant="destructive" size="sm">Remove</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2" />
                    Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">Total Revenue (MTD)</span>
                      <span className="text-2xl font-bold text-green-600">₹24,76,800</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="font-medium">New Subscriptions</span>
                      <span className="text-2xl font-bold text-blue-600">456</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <span className="font-medium">Conversion Rate</span>
                      <span className="text-2xl font-bold text-purple-600">18.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                  <CardTitle className="flex items-center">
                    <Activity className="w-6 h-6 mr-2" />
                    Platform Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-gray-500">Dr. Priya Sharma - 5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="text-sm font-medium">Premium subscription activated</p>
                        <p className="text-xs text-gray-500">User ID: usr_458 - 12 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <div>
                        <p className="text-sm font-medium">High server load detected</p>
                        <p className="text-xs text-gray-500">CPU: 89% - 18 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Control */}
          <TabsContent value="system">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <CardTitle className="text-2xl flex items-center">
                  <Shield className="w-8 h-8 mr-3" />
                  System Administration & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">System Controls</h3>
                    <div className="space-y-3">
                      <Button className="w-full justify-start bg-red-600 hover:bg-red-700 text-white">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Emergency System Shutdown
                      </Button>
                      <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white">
                        <Monitor className="w-4 h-4 mr-2" />
                        Maintenance Mode
                      </Button>
                      <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                        <Globe className="w-4 h-4 mr-2" />
                        Global Settings
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Security Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <span className="text-sm font-medium">SSL Certificate</span>
                        <Badge className="bg-green-100 text-green-800">Valid</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <span className="text-sm font-medium">Firewall Status</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <span className="text-sm font-medium">Last Backup</span>
                        <Badge className="bg-yellow-100 text-yellow-800">2 hours ago</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Alerts */}
          <TabsContent value="alerts">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <CardTitle className="text-2xl flex items-center">
                  <Bell className="w-8 h-8 mr-3" />
                  System Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <div className="flex-1">
                      <p className="font-medium text-red-800">Critical: Payment Gateway Error</p>
                      <p className="text-sm text-red-700">Razorpay integration experiencing high failure rates (12% vs normal 2%)</p>
                      <p className="text-xs text-red-600 mt-1">Affected users: 47 | Last occurred: 3 minutes ago</p>
                    </div>
                    <Button size="sm" variant="destructive">Investigate</Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                    <Bell className="w-6 h-6 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-medium text-yellow-800">Warning: High Server Load</p>
                      <p className="text-sm text-yellow-700">Database server running at 89% capacity during peak hours</p>
                      <p className="text-xs text-yellow-600 mt-1">Recommendation: Scale up resources</p>
                    </div>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                    <Activity className="w-6 h-6 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-blue-800">Info: Scheduled Maintenance</p>
                      <p className="text-sm text-blue-700">Database optimization scheduled for tonight 2:00-4:00 AM IST</p>
                      <p className="text-xs text-blue-600 mt-1">Estimated downtime: 15 minutes</p>
                    </div>
                    <Button size="sm" variant="outline">Details</Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                    <Check className="w-6 h-6 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-green-800">Success: Security Scan Complete</p>
                      <p className="text-sm text-green-700">Weekly vulnerability scan completed successfully - No threats detected</p>
                      <p className="text-xs text-green-600 mt-1">Next scan: January 31, 2024</p>
                    </div>
                    <Button size="sm" variant="outline">Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
