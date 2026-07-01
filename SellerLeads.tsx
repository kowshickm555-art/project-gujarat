import { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Check,
  X,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  listing: string;
  source: 'call' | 'whatsapp' | 'inquiry';
  status: 'new' | 'contacted' | 'converted' | 'lost';
  message?: string;
  createdAt: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul@example.com',
    listing: 'Green Leaf Organic Store',
    source: 'call',
    status: 'new',
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    name: 'Priya Patel',
    phone: '+91 87654 32109',
    listing: 'Fresh Vegetables Daily Delivery',
    source: 'whatsapp',
    status: 'contacted',
    message: 'Hi, I would like to know more about your delivery service.',
    createdAt: '5 hours ago',
  },
  {
    id: '3',
    name: 'Amit Kumar',
    phone: '+91 76543 21098',
    email: 'amit.k@example.com',
    listing: 'Green Leaf Organic Store',
    source: 'inquiry',
    status: 'converted',
    message: 'Do you have organic milk available?',
    createdAt: '1 day ago',
  },
  {
    id: '4',
    name: 'Neha Singh',
    phone: '+91 65432 10987',
    listing: 'Weekend Cooking Classes',
    source: 'call',
    status: 'new',
    createdAt: '2 days ago',
  },
];

const statusConfig = {
  new: { label: 'New', className: 'bg-seller/10 text-seller' },
  contacted: { label: 'Contacted', className: 'bg-warning/10 text-warning' },
  converted: { label: 'Converted', className: 'bg-success/10 text-success' },
  lost: { label: 'Lost', className: 'bg-destructive/10 text-destructive' },
};

const sourceIcons = {
  call: Phone,
  whatsapp: MessageCircle,
  inquiry: Mail,
};

export default function SellerLeads() {
  const [filter, setFilter] = useState('all');
  const [leads, setLeads] = useState(mockLeads);

  const filteredLeads =
    filter === 'all' ? leads : leads.filter((lead) => lead.status === filter);

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(
      leads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-seller/5 to-transparent">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Leads & Inquiries</h1>
            <p className="text-muted-foreground">
              Manage customer inquiries and convert them to sales
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="text-2xl font-bold text-seller">
              {leads.filter((l) => l.status === 'new').length}
            </div>
            <div className="text-sm text-muted-foreground">New Leads</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl font-bold text-warning">
              {leads.filter((l) => l.status === 'contacted').length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl font-bold text-success">
              {leads.filter((l) => l.status === 'converted').length}
            </div>
            <div className="text-sm text-muted-foreground">Converted</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl font-bold">
              {Math.round(
                (leads.filter((l) => l.status === 'converted').length / leads.length) * 100
              )}
              %
            </div>
            <div className="text-sm text-muted-foreground">Conversion Rate</div>
          </div>
        </div>

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.map((lead) => {
            const SourceIcon = sourceIcons[lead.source];
            return (
              <div
                key={lead.id}
                className="bg-card rounded-xl border border-border/50 p-4 md:p-5"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Lead Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-seller/10 flex items-center justify-center">
                          <span className="font-semibold text-seller">
                            {lead.name[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{lead.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {lead.listing}
                          </p>
                        </div>
                      </div>
                      <Badge className={statusConfig[lead.status].className}>
                        {statusConfig[lead.status].label}
                      </Badge>
                    </div>

                    {lead.message && (
                      <p className="text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3 mb-3">
                        "{lead.message}"
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <SourceIcon className="h-4 w-4" />
                        {lead.source === 'call'
                          ? 'Phone Call'
                          : lead.source === 'whatsapp'
                          ? 'WhatsApp'
                          : 'Inquiry Form'}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {lead.createdAt}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2 md:justify-center shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 md:flex-none"
                      onClick={() => window.open(`tel:${lead.phone}`)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 md:flex-none mode-toggle-seller border-0"
                      onClick={() =>
                        window.open(
                          `https://wa.me/${lead.phone.replace(/\D/g, '')}`,
                          '_blank'
                        )
                      }
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>

                {/* Status Update */}
                {lead.status !== 'converted' && lead.status !== 'lost' && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                    <span className="text-sm text-muted-foreground mr-2">
                      Update status:
                    </span>
                    {lead.status === 'new' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateLeadStatus(lead.id, 'contacted')}
                      >
                        Mark as Contacted
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-success"
                      onClick={() => updateLeadStatus(lead.id, 'converted')}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Converted
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => updateLeadStatus(lead.id, 'lost')}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Lost
                    </Button>
                  </div>
                )}
              </div>
            );
          })}

          {filteredLeads.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No leads found for this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
