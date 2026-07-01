import { Shield, BadgeCheck, Users, Star } from 'lucide-react';

const trustItems = [
  {
    icon: BadgeCheck,
    title: 'Verified Businesses',
    description: 'All sellers go through our verification process',
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Your data and payments are always protected',
  },
  {
    icon: Star,
    title: 'Genuine Reviews',
    description: 'Real reviews from verified customers',
  },
  {
    icon: Users,
    title: '50,000+ Users',
    description: 'Trusted by thousands in your city',
  },
];

export function TrustSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Why Choose LocalMart</h2>
          <p className="text-muted-foreground">Your trusted local marketplace</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
