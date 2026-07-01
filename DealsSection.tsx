import { useNavigate } from 'react-router-dom';
import { Clock, Percent, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const deals = [
  {
    id: '1',
    title: '50% Off First Haircut',
    business: 'Style Studio Salon',
    validUntil: '2 days left',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=200&fit=crop',
    discount: '50%',
  },
  {
    id: '2',
    title: 'Free Delivery on Orders Above ₹500',
    business: 'Fresh Mart Grocery',
    validUntil: 'This week',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400&h=200&fit=crop',
    discount: 'Free',
  },
  {
    id: '3',
    title: '20% Off Weekend Brunch',
    business: 'The Garden Restaurant',
    validUntil: 'Weekends only',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=200&fit=crop',
    discount: '20%',
  },
];

export function DealsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Percent className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Local Deals & Offers</h2>
              <p className="text-muted-foreground">Limited-time offers from local businesses</p>
            </div>
          </div>
          <Button variant="ghost" className="hidden sm:flex">
            View All Deals
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => navigate(`/listing/${deal.id}`)}
              className="group cursor-pointer relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[2/1] overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 premium-badge">
                  {deal.discount} OFF
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-card">
                  <h3 className="font-bold text-lg mb-1">{deal.title}</h3>
                  <p className="text-card/80 text-sm">{deal.business}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {deal.validUntil}
                </div>
                <Button size="sm" variant="secondary">
                  Claim Deal
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" className="sm:hidden w-full mt-4">
          View All Deals
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </section>
  );
}
