
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BarChart3, 
  DollarSign, 
  Activity,
  TrendingUp,
  UserCheck,
  Shield,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const kpiData = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Reports',
      value: '1,429',
      change: '+8%',
      icon: BarChart3,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$24,800',
      change: '+18%',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      icon: Activity,
      color: 'text-emerald-600'
    }
  ];

  const recentUsers = [
    { name: 'John Smith', email: 'john@company.com', role: 'Core', status: 'Active', plan: 'Pro' },
    { name: 'Sarah Johnson', email: 'sarah@corp.com', role: 'Client', status: 'Active', plan: 'Free' },
    { name: 'Mike Chen', email: 'mike@startup.io', role: 'Core', status: 'Pending', plan: 'Enterprise' },
    { name: 'Lisa Wang', email: 'lisa@tech.co', role: 'Client', status: 'Active', plan: 'Pro' },
  ];

  const auditLogs = [
    { time: '10:30 AM', user: 'john@company.com', action: 'Created new dashboard', type: 'Create' },
    { time: '10:15 AM', user: 'sarah@corp.com', action: 'Accessed client report', type: 'Access' },
    { time: '09:45 AM', user: 'admin@viztec.com', action: 'Updated user permissions', type: 'Update' },
    { time: '09:30 AM', user: 'mike@startup.io', action: 'Failed login attempt', type: 'Security' },
  ];

  return (
    <Layout userType="admin" currentPage="/admin-dashboard">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{kpi.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system activities and user actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditLogs.slice(0, 4).map((log, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {log.type === 'Security' ? (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <Activity className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{log.action}</p>
                          <p className="text-sm text-gray-500">{log.user}</p>
                        </div>
                        <div className="text-sm text-gray-500">{log.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Distribution</CardTitle>
                  <CardDescription>Active plans across all users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Free Plan</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">1,281</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pro Plan</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">996</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Enterprise</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">570</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button size="sm">Add User</Button>
                      <Button variant="outline" size="sm">Import</Button>
                    </div>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                  
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-5 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Role</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    {recentUsers.map((user, index) => (
                      <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b last:border-b-0">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-gray-600">{user.email}</div>
                        <div>
                          <Badge variant={user.role === 'Core' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                        </div>
                        <div>
                          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Deactivate</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Revenue</CardTitle>
                <CardDescription>Monitor subscriptions and financial metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">$24,800</div>
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">$298,400</div>
                    <div className="text-sm text-gray-600">Annual Revenue</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <div className="text-sm text-gray-600">Collection Rate</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Recent Transactions</h4>
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-4 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                      <div>Date</div>
                      <div>Customer</div>
                      <div>Plan</div>
                      <div>Amount</div>
                    </div>
                    {[
                      { date: '2024-01-15', customer: 'TechCorp Ltd', plan: 'Enterprise', amount: '$499' },
                      { date: '2024-01-14', customer: 'StartupXYZ', plan: 'Pro', amount: '$99' },
                      { date: '2024-01-14', customer: 'DataFlow Inc', plan: 'Pro', amount: '$99' },
                    ].map((transaction, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b last:border-b-0">
                        <div>{transaction.date}</div>
                        <div>{transaction.customer}</div>
                        <div>
                          <Badge variant="outline">{transaction.plan}</Badge>
                        </div>
                        <div className="font-medium text-green-600">{transaction.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>System activities and security events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">All Events</Button>
                    <Button variant="outline" size="sm">Security</Button>
                    <Button variant="outline" size="sm">User Actions</Button>
                    <Button variant="outline" size="sm">System</Button>
                  </div>
                  
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-4 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                      <div>Time</div>
                      <div>User</div>
                      <div>Action</div>
                      <div>Type</div>
                    </div>
                    {auditLogs.map((log, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b last:border-b-0">
                        <div className="text-sm">{log.time}</div>
                        <div className="text-sm">{log.user}</div>
                        <div className="text-sm">{log.action}</div>
                        <div>
                          <Badge 
                            variant={log.type === 'Security' ? 'destructive' : 'outline'}
                          >
                            {log.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
