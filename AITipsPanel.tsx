import { Lightbulb, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const tips = [
  {
    id: '1',
    title: 'Boost your visibility',
    description: 'Your listing "Fresh Produce Store" hasn\'t been updated in 2 weeks. Update photos to attract more customers.',
    action: 'Update Now',
  },
  {
    id: '2',
    title: 'Respond faster',
    description: 'Businesses that respond within 1 hour get 3x more leads. Your average response time is 4 hours.',
    action: 'View Leads',
  },
  {
    id: '3',
    title: 'Add business hours',
    description: 'Listings with complete business hours get 40% more views. Add your hours now.',
    action: 'Add Hours',
  },
];

export function AITipsPanel() {
  const [dismissedTips, setDismissedTips] = useState<string[]>([]);

  const visibleTips = tips.filter((tip) => !dismissedTips.includes(tip.id));

  if (visibleTips.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-seller/5 to-accent/5 rounded-2xl p-6 border border-seller/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-seller/10 flex items-center justify-center">
          <Lightbulb className="h-5 w-5 text-seller" />
        </div>
        <div>
          <h3 className="font-semibold">AI-Powered Tips</h3>
          <p className="text-sm text-muted-foreground">Personalized suggestions to grow your business</p>
        </div>
      </div>

      <div className="space-y-3">
        {visibleTips.map((tip) => (
          <div
            key={tip.id}
            className="bg-card rounded-xl p-4 border border-border/50 relative group"
          >
            <button
              onClick={() => setDismissedTips([...dismissedTips, tip.id])}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
            <h4 className="font-medium mb-1">{tip.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
            <Button size="sm" variant="secondary">
              {tip.action}
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
