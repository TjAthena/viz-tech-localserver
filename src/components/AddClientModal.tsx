
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clientData: any) => void;
}

const AddClientModal = ({ isOpen, onClose, onSubmit }: AddClientModalProps) => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    company: '',
    accessExpiry: '',
    notes: '',
    autoInvite: 'yes'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.email) {
      alert('Client name and email are required');
      return;
    }

    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    onSubmit(formData);
    setFormData({
      clientName: '',
      email: '',
      phone: '',
      company: '',
      accessExpiry: '',
      notes: '',
      autoInvite: 'yes'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Add New Client</CardTitle>
            <CardDescription>Create a new client account and assign dashboard access</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="Enter client full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="client@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Client's company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accessExpiry">Access Expiry Date</Label>
                <Input
                  id="accessExpiry"
                  type="date"
                  value={formData.accessExpiry}
                  onChange={(e) => handleInputChange('accessExpiry', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="autoInvite">Send Invitation Email</Label>
                <Select value={formData.autoInvite} onValueChange={(value) => handleInputChange('autoInvite', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, send invitation</SelectItem>
                    <SelectItem value="no">No, I'll invite manually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional notes about this client..."
                rows={3}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" className="flex-1">
                Add Client
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

export default AddClientModal;
