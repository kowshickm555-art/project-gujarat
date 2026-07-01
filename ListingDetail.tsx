import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  BadgeCheck,
  Clock,
  Globe,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockListing = {
  id: '1',
  title: 'Green Leaf Organic Store',
  category: 'Shops',
  description:
    'Your neighborhood destination for fresh, organic produce and sustainable products. We source directly from local farms to bring you the freshest fruits, vegetables, and organic groceries.',
  rating: 4.8,
  reviews: 234,
  location: 'Shop 12, Crystal Plaza, Andheri West, Mumbai 400053',
  distance: '0.5 km',
  phone: '+91 98765 43210',
  website: 'www.greenleaforganic.com',
  hours: 'Open now • Closes at 9 PM',
  images: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
  ],
  isVerified: true,
  tags: ['Organic', 'Fresh Produce', 'Local Sourced', 'Eco-Friendly'],
  highlights: [
    'Farm-fresh produce delivered daily',
    'Wide range of organic groceries',
    'Free home delivery above ₹500',
    'Loyalty rewards program',
  ],
  sellerName: 'Priya Sharma',
  sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  memberSince: 'Jan 2022',
  responseTime: 'Usually responds within 1 hour',
};

const similarListings = [
  {
    id: '2',
    title: 'Nature\'s Basket',
    rating: 4.6,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=200&h=150&fit=crop',
  },
  {
    id: '3',
    title: 'Organic India Store',
    rating: 4.7,
    distance: '2.0 km',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=200&h=150&fit=crop',
  },
];

const reviews = [
  {
    id: '1',
    name: 'Rahul M.',
    rating: 5,
    date: '2 days ago',
    text: 'Amazing quality produce! The vegetables are always fresh and organic. Staff is very helpful.',
  },
  {
    id: '2',
    name: 'Sneha P.',
    rating: 4,
    date: '1 week ago',
    text: 'Good selection of organic products. Prices are slightly higher but worth it for the quality.',
  },
];

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Image Carousel */}
      <div className="relative">
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img
            src={mockListing.images[0]}
            alt={mockListing.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 rounded-full bg-card/90 backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-card/90 backdrop-blur-sm"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-card/90 backdrop-blur-sm"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {mockListing.images.map((img, i) => (
            <div
              key={i}
              className={`w-16 h-12 rounded-lg overflow-hidden border-2 ${
                i === 0 ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {mockListing.category}
                  </Badge>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    {mockListing.title}
                    {mockListing.isVerified && (
                      <BadgeCheck className="h-6 w-6 text-accent" />
                    )}
                  </h1>
                </div>
              </div>

              {/* Rating & Location */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold">{mockListing.rating}</span>
                  <span className="text-muted-foreground">
                    ({mockListing.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {mockListing.distance} away
                </div>
                <div className="flex items-center gap-1 text-success">
                  <Clock className="h-4 w-4" />
                  {mockListing.hours}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {mockListing.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* AI Highlights */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-5 border border-primary/10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">AI-Generated Highlights</h3>
              </div>
              <ul className="space-y-2">
                {mockListing.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-3">About</h3>
              <p className="text-muted-foreground leading-relaxed">
                {mockListing.description}
              </p>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Location</h3>
              <div className="bg-secondary rounded-xl p-4 flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{mockListing.location}</p>
                  <Button variant="link" className="p-0 h-auto text-sm text-primary">
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Reviews</h3>
                <Button variant="ghost" size="sm">
                  See All
                </Button>
              </div>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-card rounded-xl p-4 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{review.name}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Listings */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Similar Near You</h3>
              <div className="grid grid-cols-2 gap-4">
                {similarListings.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/listing/${item.id}`)}
                    className="listing-card cursor-pointer"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        {item.rating} • {item.distance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Seller Card */}
              <div className="bg-card rounded-2xl p-5 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={mockListing.sellerAvatar}
                    alt={mockListing.sellerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold flex items-center gap-1">
                      {mockListing.sellerName}
                      <BadgeCheck className="h-4 w-4 text-accent" />
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Member since {mockListing.memberSince}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {mockListing.responseTime}
                </p>
                <div className="space-y-2">
                  <Button className="w-full btn-primary-glow">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-card rounded-2xl p-5 border border-border/50 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{mockListing.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="h-4 w-4 text-primary" />
                  <a href="#" className="text-primary hover:underline">
                    {mockListing.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed CTA (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 p-4 lg:hidden">
        <div className="flex gap-3">
          <Button className="flex-1 btn-primary-glow">
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
          <Button variant="outline" className="flex-1">
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
