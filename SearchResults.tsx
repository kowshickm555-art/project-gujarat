import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Map, 
  List, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  BadgeCheck,
  Heart,
  X
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

interface Listing {
  id: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  price?: string;
  image: string;
  isVerified: boolean;
  tags: string[];
}

const allListings: Listing[] = [
  {
    id: '1',
    title: 'Green Leaf Organic Store',
    category: 'Shops',
    rating: 4.8,
    reviews: 234,
    location: 'Andheri West',
    distance: '0.5 km',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
    isVerified: true,
    tags: ['Organic', 'Fresh Produce'],
  },
  {
    id: '2',
    title: 'Quick Fix Plumbing Services',
    category: 'Services',
    rating: 4.9,
    reviews: 156,
    location: 'Bandra',
    distance: '1.2 km',
    price: '₹500/hr',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    isVerified: true,
    tags: ['24/7', 'Emergency'],
  },
  {
    id: '3',
    title: 'The Cozy Cafe',
    category: 'Entertainment',
    rating: 4.7,
    reviews: 412,
    location: 'Powai',
    distance: '2.1 km',
    price: '₹₹',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
    isVerified: true,
    tags: ['WiFi', 'Pet Friendly'],
  },
  {
    id: '4',
    title: 'Elite Home Cleaning',
    category: 'Services',
    rating: 4.6,
    reviews: 89,
    location: 'Andheri East',
    distance: '1.8 km',
    price: '₹800/session',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    isVerified: true,
    tags: ['Deep Clean', 'Eco-Friendly'],
  },
  {
    id: '5',
    title: 'Fitness First Gym',
    category: 'Entertainment',
    rating: 4.5,
    reviews: 312,
    location: 'Bandra West',
    distance: '2.5 km',
    price: '₹2,500/mo',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    isVerified: true,
    tags: ['Personal Training', 'Pool'],
  },
  {
    id: '6',
    title: 'Fresh Bakes Bakery',
    category: 'Shops',
    rating: 4.9,
    reviews: 567,
    location: 'Juhu',
    distance: '3.0 km',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    isVerified: true,
    tags: ['Fresh Daily', 'Custom Cakes'],
  },
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  const filteredListings = useMemo(() => {
    let filtered = [...allListings];

    if (category) {
      filtered = filtered.filter((l) => l.category.toLowerCase() === category);
    }

    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter((l) => l.rating >= minRating);
    }

    return filtered;
  }, [category, ratingFilter]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Search & Filters */}
      <div className="sticky top-16 z-40 bg-card/95 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              defaultValue={query}
              placeholder="Search for anything..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {(query || category) && (
              <Badge variant="secondary" className="absolute right-4 top-1/2 -translate-y-1/2">
                {category || query}
                <button
                  onClick={() => navigate('/search')}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-32 shrink-0">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Budget</SelectItem>
                <SelectItem value="mid">Mid-Range</SelectItem>
                <SelectItem value="high">Premium</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-32 shrink-0">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>

            <div className="flex-1" />

            <div className="flex items-center bg-secondary rounded-lg p-1 shrink-0">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredListings.length} results found
        </div>

        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => navigate(`/listing/${listing.id}`)}
                className="listing-card cursor-pointer group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(listing.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full bg-card/90 backdrop-blur-sm transition-all ${
                      wishlist.includes(listing.id)
                        ? 'text-destructive'
                        : 'text-muted-foreground hover:text-destructive'
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${wishlist.includes(listing.id) ? 'fill-current' : ''}`}
                    />
                  </button>
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm">
                    {listing.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                      {listing.title}
                    </h3>
                    {listing.isVerified && (
                      <BadgeCheck className="h-5 w-5 text-accent shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-medium text-sm">{listing.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      ({listing.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-3 w-3" />
                    {listing.location} • {listing.distance}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {listing.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-secondary rounded-full text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    {listing.price && (
                      <span className="font-semibold text-primary">{listing.price}</span>
                    )}
                    <div className="flex gap-2 ml-auto">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="aspect-video bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground">
            <Map className="h-12 w-12 mr-4" />
            Map View Coming Soon
          </div>
        )}
      </div>
    </div>
  );
}
