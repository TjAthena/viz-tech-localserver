import { useState } from 'react';
import Layout from '@/components/Layout';
import EmbedReportModal from '@/components/EmbedReportModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash, 
  Share,
  Calendar,
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
  ExternalLink,
  Copy
} from 'lucide-react';

const CoreReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [embedReportModal, setEmbedReportModal] = useState(false);
  
  // Mock clients data for the embed modal
  const clients = [
    { id: '1', name: 'Acme Corporation', email: 'contact@acme.com' },
    { id: '2', name: 'TechStart Inc', email: 'john@techstart.io' },
    { id: '3', name: 'Global Solutions', email: 'sarah@global.com' }
  ];

  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Sales Performance Dashboard',
      description: 'Q1 2024 sales metrics and KPIs',
      embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiZGFjY...',
      assignedClients: ['Acme Corporation', 'TechStart Inc'],
      totalViews: 247,
      lastUpdated: '2024-01-20',
      createdAt: '2024-01-15',
      accessExpiry: '2024-07-15',
      status: 'Active',
      allowDownload: true,
      allowExport: false
    },
    {
      id: 2,
      title: 'Marketing ROI Analysis',
      description: 'Campaign performance and attribution data',
      embedUrl: 'https://public.tableau.com/views/Marketing...',
      assignedClients: ['Global Solutions'],
      totalViews: 89,
      lastUpdated: '2024-01-18',
      createdAt: '2024-01-10',
      accessExpiry: '2024-06-10',
      status: 'Active',
      allowDownload: false,
      allowExport: true
    },
    {
      id: 3,
      title: 'Financial Overview Report',
      description: 'Monthly financial statements and projections',
      embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiZmluYW...',
      assignedClients: ['Acme Corporation'],
      totalViews: 156,
      lastUpdated: '2024-01-08',
      createdAt: '2024-01-05',
      accessExpiry: '2024-02-05',
      status: 'Expiring Soon',
      allowDownload: true,
      allowExport: true
    }
  ]);

  const stats = [
    {
      title: 'Total Reports',
      value: reports.length.toString(),
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Active Reports',
      value: reports.filter(r => r.status === 'Active').length.toString(),
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Total Views',
      value: reports.reduce((sum, r) => sum + r.totalViews, 0).toString(),
      icon: Eye,
      color: 'text-purple-600'
    },
    {
      title: 'Expiring Soon',
      value: reports.filter(r => r.status === 'Expiring Soon').length.toString(),
      icon: AlertCircle,
      color: 'text-orange-600'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.assignedClients.some(client => 
                           client.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesStatus = statusFilter === 'all' || report.status.toLowerCase().replace(' ', '') === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEmbedReport = (reportData: any) => {
    const newReport = {
      id: reports.length + 1,
      title: reportData.reportTitle,
      description: reportData.description || 'No description provided',
      embedUrl: reportData.embedUrl,
      assignedClients: reportData.selectedClients.map((clientId: string) => {
        const client = clients.find(c => c.id === clientId);
        return client ? client.name : 'Unknown Client';
      }),
      totalViews: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      accessExpiry: reportData.accessExpiry || '',
      status: 'Active',
      allowDownload: reportData.allowDownload,
      allowExport: reportData.allowExport
    };

    setReports([...reports, newReport]);
    
    toast({
      title: "Report Embedded Successfully",
      description: `${reportData.reportTitle} has been embedded and assigned to ${reportData.selectedClients.length} client(s).`,
    });
  };

  const handleDeleteReport = (reportId: number) => {
    if (confirm('Are you sure you want to delete this report? This will remove access for all assigned clients.')) {
      setReports(reports.filter(r => r.id !== reportId));
      toast({
        title: "Report Deleted",
        description: "The report has been removed and client access revoked.",
        variant: "destructive"
      });
    }
  };

  const handleCopyEmbedUrl = (embedUrl: string) => {
    navigator.clipboard.writeText(embedUrl);
    toast({
      title: "URL Copied",
      description: "Embed URL has been copied to clipboard.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Expiring Soon':
        return <Badge className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>;
      case 'Expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    if (!expiryDate) return null;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout userType="core" currentPage="/core-reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Report Management</h1>
            <p className="text-gray-600">Embed and manage your BI dashboards for clients</p>
          </div>
          <Button onClick={() => setEmbedReportModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Embed New Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-full">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by title, description, or client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expiringsoon">Expiring Soon</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Reports ({filteredReports.length})</CardTitle>
            <CardDescription>Manage your embedded dashboards and client assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Assigned Clients</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Access Expiry</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => {
                  const daysUntilExpiry = getDaysUntilExpiry(report.accessExpiry);
                  return (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-sm text-gray-500">{report.description}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            {report.allowDownload && (
                              <Badge variant="outline" className="text-xs">Download</Badge>
                            )}
                            {report.allowExport && (
                              <Badge variant="outline" className="text-xs">Export</Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {report.assignedClients.map((client, index) => (
                            <div key={index} className="text-sm">
                              <Users className="h-3 w-3 inline mr-1" />
                              {client}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span>{report.totalViews}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(report.lastUpdated).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {report.accessExpiry ? (
                            <div>
                              <div>{new Date(report.accessExpiry).toLocaleDateString()}</div>
                              {daysUntilExpiry !== null && daysUntilExpiry <= 30 && (
                                <div className={`text-xs ${daysUntilExpiry <= 7 ? 'text-red-600' : 'text-orange-600'}`}>
                                  {daysUntilExpiry > 0 ? `${daysUntilExpiry} days left` : 'Expired'}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-500">No expiry</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="View report">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Edit report">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Copy embed URL"
                            onClick={() => handleCopyEmbedUrl(report.embedUrl)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Share report">
                            <Share className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Delete report"
                            onClick={() => handleDeleteReport(report.id)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Embed Report Modal */}
        <EmbedReportModal
          isOpen={embedReportModal}
          onClose={() => setEmbedReportModal(false)}
          onSubmit={handleEmbedReport}
          clients={clients}
        />
      </div>
    </Layout>
  );
};

export default CoreReports;