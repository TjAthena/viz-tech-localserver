import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Clock, 
  BarChart3, 
  Users, 
  Activity,
  Shield,
  CreditCard,
  MapPin,
  Globe,
  Edit,
  UserX,
  UserCheck
} from 'lucide-react';

interface UserDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    plan: string;
    status: string;
    clients: number;
    dashboards: number;
    createdAt: string;
    lastLogin: string;
  };
}

const UserDetailsModal = ({ open, onOpenChange, user }: UserDetailsModalProps) => {
  // Extended user data that would come from API in real implementation
  const extendedUserData = {
    ...user,
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc.',
    address: '123 Business Ave, Suite 100',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States',
    timezone: 'PST (UTC-8)',
    profilePicture: null,
    bio: 'Senior Business Intelligence Consultant with 8+ years of experience in data analytics and dashboard development.',
    website: 'https://techsolutions.com',
    linkedIn: 'https://linkedin.com/in/johnsmith',
    
    // Account details
    accountType: 'Premium',
    subscriptionStart: '2023-06-15',
    subscriptionEnd: '2024-06-15',
    billingCycle: 'Annual',
    paymentMethod: '**** **** **** 4242',
    
    // Usage statistics
    totalViews: 2847,
    monthlyViews: 456,
    storageUsed: '2.4 GB',
    storageLimit: '5 GB',
    apiCalls: 1250,
    
    // Recent activity
    recentActivity: [
      { date: '2024-01-20', action: 'Created new dashboard', details: 'Sales Performance Q1' },
      { date: '2024-01-19', action: 'Added new client', details: 'Acme Corporation' },
      { date: '2024-01-18', action: 'Updated dashboard', details: 'Marketing Analytics' },
      { date: '2024-01-17', action: 'Logged in', details: 'From IP 192.168.1.100' }
    ],
    
    // Clients managed
    clientsList: [
      { name: 'Acme Corporation', email: 'contact@acme.com', dashboards: 3, lastAccess: '2024-01-20' },
      { name: 'TechStart Inc', email: 'info@techstart.io', dashboards: 2, lastAccess: '2024-01-19' },
      { name: 'Global Solutions', email: 'team@global.com', dashboards: 1, lastAccess: '2024-01-18' }
    ],
    
    // Dashboards created
    dashboardsList: [
      { name: 'Sales Performance Dashboard', clients: 2, views: 145, created: '2024-01-15' },
      { name: 'Marketing ROI Analysis', clients: 1, views: 89, created: '2024-01-10' },
      { name: 'Financial Overview', clients: 3, views: 203, created: '2024-01-05' }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Trial':
        return <Badge className="bg-blue-100 text-blue-800">Trial</Badge>;
      case 'Suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      case 'Core':
        return <Badge className="bg-blue-100 text-blue-800">Core</Badge>;
      case 'Client':
        return <Badge className="bg-gray-100 text-gray-800">Client</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <span>User Details - {extendedUserData.name}</span>
              <div className="flex items-center space-x-2 mt-1">
                {getRoleBadge(extendedUserData.role)}
                {getStatusBadge(extendedUserData.status)}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Complete user profile and account information
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium">{extendedUserData.name}</div>
                      <div className="text-sm text-gray-500">Full Name</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium">{extendedUserData.email}</div>
                      <div className="text-sm text-gray-500">Email Address</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium">{extendedUserData.phone}</div>
                      <div className="text-sm text-gray-500">Phone Number</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Building className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium">{extendedUserData.company}</div>
                      <div className="text-sm text-gray-500">Company</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location & Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location & Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <div className="font-medium">{extendedUserData.address}</div>
                      <div className="text-sm text-gray-500">
                        {extendedUserData.city}, {extendedUserData.state} {extendedUserData.zipCode}
                      </div>
                      <div className="text-sm text-gray-500">{extendedUserData.country}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium">{extendedUserData.timezone}</div>
                      <div className="text-sm text-gray-500">Timezone</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium">
                        <a href={extendedUserData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {extendedUserData.website}
                        </a>
                      </div>
                      <div className="text-sm text-gray-500">Website</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{extendedUserData.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">User ID:</span>
                    <span className="font-medium">#{extendedUserData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role:</span>
                    {getRoleBadge(extendedUserData.role)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    {getStatusBadge(extendedUserData.status)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Type:</span>
                    <span className="font-medium">{extendedUserData.accountType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{new Date(extendedUserData.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Login:</span>
                    <span className="font-medium">{new Date(extendedUserData.lastLogin).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Subscription Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subscription Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <Badge variant="outline">{extendedUserData.plan}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Billing Cycle:</span>
                    <span className="font-medium">{extendedUserData.billingCycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Started:</span>
                    <span className="font-medium">{new Date(extendedUserData.subscriptionStart).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expires:</span>
                    <span className="font-medium">{new Date(extendedUserData.subscriptionEnd).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">{extendedUserData.paymentMethod}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Usage Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clients:</span>
                    <span className="font-medium">{extendedUserData.clients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dashboards:</span>
                    <span className="font-medium">{extendedUserData.dashboards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Views:</span>
                    <span className="font-medium">{extendedUserData.totalViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Views:</span>
                    <span className="font-medium">{extendedUserData.monthlyViews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage Used:</span>
                    <span className="font-medium">{extendedUserData.storageUsed} / {extendedUserData.storageLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Calls:</span>
                    <span className="font-medium">{extendedUserData.apiCalls.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Clients List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Clients ({extendedUserData.clientsList.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {extendedUserData.clientsList.map((client, index) => (
                      <div key={index} className="border-b pb-2 last:border-b-0">
                        <div className="font-medium text-sm">{client.name}</div>
                        <div className="text-xs text-gray-500">{client.email}</div>
                        <div className="text-xs text-gray-500">{client.dashboards} dashboards</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dashboards List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dashboards ({extendedUserData.dashboardsList.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {extendedUserData.dashboardsList.map((dashboard, index) => (
                      <div key={index} className="border-b pb-2 last:border-b-0">
                        <div className="font-medium text-sm">{dashboard.name}</div>
                        <div className="text-xs text-gray-500">{dashboard.clients} clients • {dashboard.views} views</div>
                        <div className="text-xs text-gray-500">Created: {new Date(dashboard.created).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest actions performed by this user</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {extendedUserData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 border rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-gray-600">{activity.details}</div>
                        <div className="text-xs text-gray-500 mt-1">{new Date(activity.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Actions</CardTitle>
                  <CardDescription>Manage user account and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit User Details
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Reset Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </Button>
                  {extendedUserData.status === 'Active' ? (
                    <Button variant="destructive" className="w-full justify-start">
                      <UserX className="h-4 w-4 mr-2" />
                      Suspend User
                    </Button>
                  ) : (
                    <Button variant="default" className="w-full justify-start">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Activate User
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Data Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Actions</CardTitle>
                  <CardDescription>Export and manage user data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Usage Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Export Client List
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    Export Activity Log
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Notification
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            Edit User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;