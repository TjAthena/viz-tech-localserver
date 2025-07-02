
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

interface EmbedReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reportData: any) => void;
  clients: Array<{ id: string; name: string; email: string; }>;
}

const EmbedReportModal = ({ isOpen, onClose, onSubmit, clients }: EmbedReportModalProps) => {
  const [formData, setFormData] = useState({
    reportTitle: '',
    embedUrl: '',
    description: '',
    selectedClients: [] as string[],
    accessExpiry: '',
    allowDownload: false,
    allowExport: false
  });

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClientSelection = (clientId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        selectedClients: [...prev.selectedClients, clientId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        selectedClients: prev.selectedClients.filter(id => id !== clientId)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reportTitle || !formData.embedUrl) {
      alert('Report title and embed URL are required');
      return;
    }

    if (formData.selectedClients.length === 0) {
      alert('Please select at least one client to assign this report');
      return;
    }

    onSubmit(formData);
    setFormData({
      reportTitle: '',
      embedUrl: '',
      description: '',
      selectedClients: [],
      accessExpiry: '',
      allowDownload: false,
      allowExport: false
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Embed New Report</CardTitle>
            <CardDescription>Add a new dashboard and assign it to clients</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reportTitle">Report Title *</Label>
              <Input
                id="reportTitle"
                value={formData.reportTitle}
                onChange={(e) => handleInputChange('reportTitle', e.target.value)}
                placeholder="e.g., Sales Dashboard Q1 2024"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="embedUrl">Embed URL *</Label>
              <Textarea
                id="embedUrl"
                value={formData.embedUrl}
                onChange={(e) => handleInputChange('embedUrl', e.target.value)}
                placeholder="Paste your Power BI, Tableau, or other dashboard embed URL here..."
                rows={3}
                required
              />
              <p className="text-xs text-gray-500">
                This should be the full embed URL from your BI tool (Power BI, Tableau, etc.)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of what this dashboard shows..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessExpiry">Access Expiry Date</Label>
              <Input
                id="accessExpiry"
                type="date"
                value={formData.accessExpiry}
                onChange={(e) => handleInputChange('accessExpiry', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Leave empty for no expiration. Clients will lose access after this date.
              </p>
            </div>

            <div className="space-y-3">
              <Label>Assign to Clients *</Label>
              <div className="border rounded-lg p-4 max-h-40 overflow-y-auto">
                {clients.length === 0 ? (
                  <p className="text-gray-500 text-sm">No clients available. Add clients first.</p>
                ) : (
                  <div className="space-y-2">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`client-${client.id}`}
                          checked={formData.selectedClients.includes(client.id)}
                          onCheckedChange={(checked) => handleClientSelection(client.id, checked as boolean)}
                        />
                        <Label htmlFor={`client-${client.id}`} className="text-sm">
                          {client.name} ({client.email})
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Client Permissions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowDownload"
                    checked={formData.allowDownload}
                    onCheckedChange={(checked) => handleInputChange('allowDownload', checked as boolean)}
                  />
                  <Label htmlFor="allowDownload" className="text-sm">
                    Allow clients to download dashboard data
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowExport"
                    checked={formData.allowExport}
                    onCheckedChange={(checked) => handleInputChange('allowExport', checked as boolean)}
                  />
                  <Label htmlFor="allowExport" className="text-sm">
                    Allow clients to export dashboard as PDF/Image
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" className="flex-1">
                Embed Report
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmbedReportModal;
