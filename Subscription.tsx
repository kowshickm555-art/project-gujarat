import { useState } from 'react';
import { Check, Rocket, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Up to 2 listings',
      'Basic analytics',
      'Email support',
      'Standard visibility',
    ],
    cta: 'Current Plan',
    isActive: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹499',
    period: '/month',
    description: 'Best for growing businesses',
    features: [
      'Up to 10 listings',
      'Advanced analytics',
      'Priority support',
      'Enhanced visibility',
      '2 free boosts/month',
      'Lead management tools',
    ],
    cta: 'Upgrade to Pro',
    isPopular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: '₹1,499',
    period: '/month',
    description: 'For established businesses',
    features: [
      'Unlimited listings',
      'Premium analytics & reports',
      '24/7 phone support',
      'Top visibility',
      '5 free boosts/month',
      'Advanced lead management',
      'Custom branding',
      'API access',
    ],
    cta: 'Upgrade to Business',
  },
];

const boostPackages = [
  {
    id: 'basic',
    name: '3-Day Boost',
    price: '₹99',
    description: '2x visibility for 3 days',
  },
  {
    id: 'standard',
    name: '7-Day Boost',
    price: '₹199',
    description: '3x visibility for 7 days',
    isPopular: true,
  },
  {
    id: 'premium',
    name: '30-Day Boost',
    price: '₹599',
    description: '5x visibility for 30 days',
  },
];

export default function Subscription() {
  const [selectedBoost, setSelectedBoost] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-seller/5 to-transparent">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-seller/10 text-seller">
            <Crown className="h-3 w-3 mr-1" />
            Subscription Plans
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Grow Your Business with LocalMart
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose the plan that fits your needs and start reaching more customers today
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-card rounded-2xl border-2 p-6 transition-all ${
                plan.isPopular
                  ? 'border-seller shadow-lg scale-[1.02]'
                  : 'border-border/50 hover:border-seller/50'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-seller text-seller-foreground">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-success shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.isActive
                    ? 'bg-secondary text-secondary-foreground'
                    : plan.isPopular
                    ? 'mode-toggle-seller border-0'
                    : ''
                }`}
                variant={plan.isActive ? 'secondary' : plan.isPopular ? 'default' : 'outline'}
                disabled={plan.isActive}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Boost Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-seller/10 text-seller text-sm font-medium mb-4">
              <Rocket className="h-4 w-4" />
              Boost Your Listings
            </div>
            <h2 className="text-2xl font-bold mb-2">Get More Visibility</h2>
            <p className="text-muted-foreground">
              Boost any listing to reach more potential customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {boostPackages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedBoost(pkg.id)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                  selectedBoost === pkg.id
                    ? 'border-seller bg-seller/5'
                    : 'border-border hover:border-seller/50'
                }`}
              >
                {pkg.isPopular && (
                  <Badge className="absolute -top-2 right-4 bg-seller text-seller-foreground text-xs">
                    Best Value
                  </Badge>
                )}
                <h4 className="font-semibold mb-1">{pkg.name}</h4>
                <p className="text-2xl font-bold text-seller mb-1">{pkg.price}</p>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button
              className="mode-toggle-seller border-0"
              disabled={!selectedBoost}
            >
              <Rocket className="h-4 w-4 mr-2" />
              Purchase Boost
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
