import { useState } from 'react';
import Layout from '@/components/Layout';
import AddClientModal from '@/components/AddClientModal';
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
  Mail,
  Calendar,
  BarChart3,
  Users,
  UserCheck,
  Clock,
  AlertCircle
} from 'lucide-react';

const CoreClients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addClientModal, setAddClientModal] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corporation',
      status: 'Active',
      reportsAssigned: 3,
      lastAccess: '2024-01-20',
      createdAt: '2024-01-15',
      accessExpiry: '2024-07-15',
      notes: 'Primary client for Q1 analytics'
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john@techstart.io',
      phone: '+1 (555) 234-5678',
      company: 'TechStart Inc',
      status: 'Active',
      reportsAssigned: 2,
      lastAccess: '2024-01-19',
      createdAt: '2024-01-10',
      accessExpiry: '2024-06-10',
      notes: 'Marketing dashboard client'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah@global.com',
      phone: '+1 (555) 345-6789',
      company: 'Global Solutions',
      status: 'Inactive',
      reportsAssigned: 1,
      lastAccess: '2024-01-05',
      createdAt: '2024-01-01',
      accessExpiry: '2024-02-01',
      notes: 'Trial period expired'
    }
  ]);

  const stats = [
    {
      title: 'Total Clients',
      value: clients.length.toString(),
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Clients',
      value: clients.filter(c => c.status === 'Active').length.toString(),
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      title: 'Reports Assigned',
      value: clients.reduce((sum, c) => sum + c.reportsAssigned, 0).toString(),
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      title: 'Expiring Soon',
      value: clients.filter(c => {
        const expiry = new Date(c.accessExpiry);
        const today = new Date();
        const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && diffDays > 0;
      }).length.toString(),
      icon: AlertCircle,
      color: 'text-orange-600'
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddClient = (clientData: any) => {
    const newClient = {
      id: clients.length + 1,
      name: clientData.clientName,
      email: clientData.email,
      phone: clientData.phone || '',
      company: clientData.company || clientData.clientName,
      status: 'Active',
      reportsAssigned: 0,
      lastAccess: 'Never',
      createdAt: new Date().toISOString().split('T')[0],
      accessExpiry: clientData.accessExpiry || '',
      notes: clientData.notes || ''
    };

    setClients([...clients, newClient]);
    
    toast({
      title: "Client Added Successfully",
      description: `${clientData.clientName} has been added to your client list.`,
    });

    if (clientData.autoInvite === 'yes') {
      toast({
        title: "Invitation Sent",
        description: `An invitation email has been sent to ${clientData.email}.`,
      });
    }
  };

  const handleDeleteClient = (clientId: number) => {
    if (confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      setClients(clients.filter(c => c.id !== clientId));
      toast({
        title: "Client Deleted",
        description: "The client has been removed from your list.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
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
    <Layout userType="core" currentPage="/core-clients">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600">Manage your clients and their dashboard access</p>
          </div>
          <Button onClick={() => setAddClientModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
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
            <CardTitle>Search & Filter Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
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

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Clients ({filteredClients.length})</CardTitle>
            <CardDescription>Manage your client accounts and their dashboard access</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Last Access</TableHead>
                  <TableHead>Access Expiry</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => {
                  const daysUntilExpiry = getDaysUntilExpiry(client.accessExpiry);
                  return (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{client.company}</TableCell>
                      <TableCell>{getStatusBadge(client.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <BarChart3 className="h-4 w-4 text-gray-400" />
                          <span>{client.reportsAssigned}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {client.lastAccess === 'Never' ? (
                            <span className="text-gray-500">Never</span>
                          ) : (
                            new Date(client.lastAccess).toLocaleDateString()
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {client.accessExpiry ? (
                            <div>
                              <div>{new Date(client.accessExpiry).toLocaleDateString()}</div>
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
                          <Button variant="ghost" size="sm" title="View details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Edit client">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Send email">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Delete client"
                            onClick={() => handleDeleteClient(client.id)}
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

        {/* Add Client Modal */}
        <AddClientModal
          isOpen={addClientModal}
          onClose={() => setAddClientModal(false)}
          onSubmit={handleAddClient}
        />
      </div>
    </Layout>
  );
};

export default CoreClients;