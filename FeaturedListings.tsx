import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, MessageCircle, BadgeCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
  isSponsored?: boolean;
  tags: string[];
}

const featuredListings: Listing[] = [
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
    isSponsored: true,
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
    title: '2BHK Furnished Apartment',
    category: 'Rentals',
    rating: 4.6,
    reviews: 23,
    location: 'Juhu',
    distance: '3.5 km',
    price: '₹45,000/mo',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    isVerified: true,
    tags: ['Furnished', 'Sea View'],
  },
];

export function FeaturedListings() {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Listings</h2>
            <p className="text-muted-foreground">Hand-picked recommendations near you</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/search')}>
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing) => (
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
                {listing.isSponsored && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Sponsored
                    </Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                    {listing.category}
                  </Badge>
                </div>
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

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium text-sm">{listing.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({listing.reviews} reviews)
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  {listing.location} • {listing.distance}
                </div>

                {/* Tags */}
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

                {/* Price & Actions */}
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
      </div>
    </section>
  );
}
