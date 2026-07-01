import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Eye,
  Users,
  Pencil,
  Pause,
  Play,
  Rocket,
  MoreVertical,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Listing {
  id: string;
  title: string;
  category: string;
  status: 'live' | 'pending' | 'expired' | 'paused';
  views: number;
  leads: number;
  image: string;
  createdAt: string;
  expiresAt?: string;
  isBoosted?: boolean;
}

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Green Leaf Organic Store',
    category: 'Shops',
    status: 'live',
    views: 1234,
    leads: 28,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=150&fit=crop',
    createdAt: 'Dec 15, 2024',
    expiresAt: 'Mar 15, 2025',
    isBoosted: true,
  },
  {
    id: '2',
    title: 'Fresh Vegetables Daily Delivery',
    category: 'Services',
    status: 'live',
    views: 856,
    leads: 15,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=150&fit=crop',
    createdAt: 'Jan 10, 2025',
    expiresAt: 'Apr 10, 2025',
  },
  {
    id: '3',
    title: 'Weekend Cooking Classes',
    category: 'Entertainment',
    status: 'pending',
    views: 0,
    leads: 0,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200&h=150&fit=crop',
    createdAt: 'Jan 20, 2025',
  },
  {
    id: '4',
    title: 'Organic Honey - Direct from Farm',
    category: 'Shops',
    status: 'expired',
    views: 2100,
    leads: 45,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=150&fit=crop',
    createdAt: 'Oct 1, 2024',
    expiresAt: 'Jan 1, 2025',
  },
];

const statusConfig = {
  live: { label: 'Live', className: 'bg-success/10 text-success' },
  pending: { label: 'Pending Review', className: 'bg-warning/10 text-warning' },
  expired: { label: 'Expired', className: 'bg-destructive/10 text-destructive' },
  paused: { label: 'Paused', className: 'bg-muted text-muted-foreground' },
};

export default function SellerListings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('live');

  const filteredListings = mockListings.filter((listing) => {
    if (activeTab === 'live') return listing.status === 'live' || listing.status === 'paused';
    if (activeTab === 'pending') return listing.status === 'pending';
    if (activeTab === 'expired') return listing.status === 'expired';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-seller/5 to-transparent">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">My Listings</h1>
            <p className="text-muted-foreground">Manage and track your business listings</p>
          </div>
          <Button
            className="mode-toggle-seller border-0"
            onClick={() => navigate('/seller/listings/new')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Listing
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="live">
              Live ({mockListings.filter((l) => l.status === 'live' || l.status === 'paused').length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({mockListings.filter((l) => l.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired ({mockListings.filter((l) => l.status === 'expired').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid gap-4">
              {filteredListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-card rounded-xl border border-border/50 p-4 md:p-5 flex flex-col md:flex-row gap-4"
                >
                  {/* Image */}
                  <div className="w-full md:w-40 aspect-[4/3] md:aspect-square rounded-lg overflow-hidden shrink-0">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                          {listing.isBoosted && (
                            <Badge variant="secondary" className="bg-seller/10 text-seller">
                              <Rocket className="h-3 w-3 mr-1" />
                              Boosted
                            </Badge>
                          )}
                        </div>
                        <Badge variant="secondary" className={statusConfig[listing.status].className}>
                          {statusConfig[listing.status].label}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Listing
                          </DropdownMenuItem>
                          {listing.status === 'live' && (
                            <DropdownMenuItem>
                              <Pause className="h-4 w-4 mr-2" />
                              Pause Listing
                            </DropdownMenuItem>
                          )}
                          {listing.status === 'paused' && (
                            <DropdownMenuItem>
                              <Play className="h-4 w-4 mr-2" />
                              Resume Listing
                            </DropdownMenuItem>
                          )}
                          {listing.status === 'expired' && (
                            <DropdownMenuItem>
                              <Clock className="h-4 w-4 mr-2" />
                              Renew Listing
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-seller">
                            <Rocket className="h-4 w-4 mr-2" />
                            Boost Listing
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {listing.views.toLocaleString()} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {listing.leads} leads
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="text-xs text-muted-foreground">
                      Created: {listing.createdAt}
                      {listing.expiresAt && ` • Expires: ${listing.expiresAt}`}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2 md:justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 md:flex-none"
                      onClick={() => navigate(`/seller/listings/${listing.id}/edit`)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 md:flex-none mode-toggle-seller border-0"
                    >
                      <Rocket className="h-4 w-4 mr-2" />
                      Boost
                    </Button>
                  </div>
                </div>
              ))}

              {filteredListings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No listings found</p>
                  <Button onClick={() => navigate('/seller/listings/new')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Listing
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
