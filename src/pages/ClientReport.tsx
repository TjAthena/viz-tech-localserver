
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Download, 
  Share, 
  Maximize2, 
  RefreshCw,
  Calendar,
  Clock,
  AlertCircle,
  HelpCircle,
  BarChart3
} from 'lucide-react';

const ClientReport = () => {
  const { id } = useParams();
  
  // Mock report data - in real app this would come from API
  const report = {
    id: id,
    name: 'Sales Performance Dashboard',
    description: 'Q1 2024 sales metrics and KPIs',
    provider: 'Acme Analytics',
    lastUpdated: '2024-01-15T10:30:00Z',
    expiryDate: '2024-07-15',
    embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiZGFjY...' // Mock PowerBI embed URL
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleDownload = () => {
    // Mock download functionality
    alert('Download feature would export the dashboard data');
  };

  const handleRefresh = () => {
    // Mock refresh functionality
    alert('Dashboard data refreshed');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
            <div className="border-l border-gray-200 pl-4">
              <h1 className="text-xl font-semibold text-gray-900">{report.name}</h1>
              <p className="text-sm text-gray-600">by {report.provider}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Status Bar */}
      <div className="bg-blue-50 border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-gray-700">
                Last updated: {new Date(report.lastUpdated).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-gray-700">
                Expires: {new Date(report.expiryDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">Live Data</Badge>
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Container */}
      <div className="flex flex-1">
        {/* Sidebar - Collapsible */}
        <div className="w-64 bg-white shadow-sm border-r hidden lg:block">
          <div className="p-4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Report Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <div className="text-gray-600">Provider</div>
                  <div className="font-medium">{report.provider}</div>
                </div>
                <div>
                  <div className="text-gray-600">Last Updated</div>
                  <div className="font-medium">
                    {new Date(report.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Access Expires</div>
                  <div className="font-medium">
                    {new Date(report.expiryDate).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Share className="h-4 w-4 mr-2" />
                  Share Link
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                  Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">
                  This dashboard will expire in 6 months. Contact your provider for renewal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Dashboard Area */}
        <div className="flex-1 p-6">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              {/* Mock Embedded Dashboard */}
              <div className="w-full h-full min-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border-2 border-dashed border-blue-200 rounded-lg">
                <div className="text-center space-y-4">
                  <div className="bg-blue-100 p-4 rounded-full mx-auto w-fit">
                    <BarChart3 className="h-12 w-12 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Sales Performance Dashboard
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Interactive Power BI dashboard would be embedded here
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">$2.4M</div>
                        <div className="text-sm text-gray-600">Total Revenue</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-green-600">18%</div>
                        <div className="text-sm text-gray-600">Growth Rate</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-purple-600">1,247</div>
                        <div className="text-sm text-gray-600">New Customers</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-orange-600">89%</div>
                        <div className="text-sm text-gray-600">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    In a real implementation, the actual Power BI or other BI tool dashboard would be embedded here using iframe or SDK
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Powered by Viz Tec • Secure dashboard sharing platform
          </div>
          <div className="flex items-center space-x-4">
            <span>Need help?</span>
            <Button variant="link" size="sm" className="h-auto p-0">
              Contact Support
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientReport;
