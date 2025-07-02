
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BarChart3, 
  Plus,
  Share,
  Clock,
  TrendingUp,
  FileText,
  Zap
} from 'lucide-react';

const CoreDashboard = () => {
  const stats = [
    {
      title: 'Clients Created',
      value: '24',
      limit: '50',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Dashboards Shared',
      value: '18',
      limit: '25',
      icon: BarChart3,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Views',
      value: '1,247',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Storage Used',
      value: '2.4 GB',
      limit: '5 GB',
      icon: FileText,
      color: 'text-orange-600'
    }
  ];

  const recentClients = [
    { name: 'Acme Corp', email: 'contact@acme.com', reports: 3, status: 'Active', lastAccess: '2 hours ago' },
    { name: 'TechStart Inc', email: 'info@techstart.io', reports: 1, status: 'Active', lastAccess: '1 day ago' },
    { name: 'Global Solutions', email: 'team@global.com', reports: 5, status: 'Inactive', lastAccess: '3 days ago' },
    { name: 'Innovation Lab', email: 'lab@innovation.co', reports: 2, status: 'Active', lastAccess: '5 hours ago' },
  ];

  const recentReports = [
    { name: 'Sales Dashboard Q1', client: 'Acme Corp', views: 124, shared: '2024-01-10', expiry: '2024-07-10' },
    { name: 'Marketing Analytics', client: 'TechStart Inc', views: 87, shared: '2024-01-08', expiry: '2024-06-08' },
    { name: 'Financial Overview', client: 'Global Solutions', views: 203, shared: '2024-01-05', expiry: '2024-05-05' },
  ];

  return (
    <Layout userType="core" currentPage="/core-dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.limit ? (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Usage</span>
                      <span>{stat.value} / {stat.limit}</span>
                    </div>
                    <Progress 
                      value={(parseInt(stat.value) / parseInt(stat.limit)) * 100} 
                      className="h-2"
                    />
                  </div>
                ) : stat.change ? (
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to manage your clients and reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col space-y-2">
                <Plus className="h-6 w-6" />
                <span>Add New Client</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Share className="h-6 w-6" />
                <span>Embed Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Zap className="h-6 w-6" />
                <span>Upgrade Plan</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Clients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Your latest client additions</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                          {client.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{client.reports} reports</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Recently shared dashboards</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <BarChart3 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-gray-500">{report.client}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{report.views} views</div>
                      <div className="text-xs text-gray-500">
                        Expires: {new Date(report.expiry).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Usage Summary</CardTitle>
            <CardDescription>Current Pro Plan - Upgrade to Enterprise for unlimited access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Clients</span>
                  <span>24 / 50</span>
                </div>
                <Progress value={48} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Reports</span>
                  <span>18 / 25</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage</span>
                  <span>2.4 GB / 5 GB</span>
                </div>
                <Progress value={48} className="h-2" />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Current plan: <Badge>Pro Plan</Badge>
              </div>
              <Button size="sm">Upgrade Plan</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CoreDashboard;
