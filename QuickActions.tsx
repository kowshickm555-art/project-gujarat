import { useNavigate } from 'react-router-dom';
import { Plus, Rocket, MessageSquare, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const actions = [
  {
    id: 'add-listing',
    title: 'Add Listing',
    description: 'Create a new listing',
    icon: Plus,
    path: '/seller/listings/new',
    variant: 'default' as const,
  },
  {
    id: 'boost-listing',
    title: 'Boost Listing',
    description: 'Increase visibility',
    icon: Rocket,
    path: '/seller/listings?action=boost',
    variant: 'outline' as const,
  },
  {
    id: 'view-leads',
    title: 'View Leads',
    description: 'Check inquiries',
    icon: MessageSquare,
    path: '/seller/leads',
    variant: 'outline' as const,
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'View performance',
    icon: BarChart3,
    path: '/seller/analytics',
    variant: 'outline' as const,
  },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.id}
            variant={action.variant}
            onClick={() => navigate(action.path)}
            className={`h-auto py-6 flex-col gap-3 ${
              action.variant === 'default' ? 'mode-toggle-seller border-0' : ''
            }`}
          >
            <Icon className="h-6 w-6" />
            <div className="text-center">
              <div className="font-semibold">{action.title}</div>
              <div className="text-xs opacity-80">{action.description}</div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
