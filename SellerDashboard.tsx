import { Eye, Users, Package, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '@/components/seller/StatCard';
import { QuickActions } from '@/components/seller/QuickActions';
import { AITipsPanel } from '@/components/seller/AITipsPanel';

export default function SellerDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Views',
      value: '2,847',
      change: 12,
      icon: <Eye className="h-6 w-6 text-seller" />,
      path: '/seller/analytics',
    },
    {
      title: 'New Leads',
      value: '48',
      change: 8,
      icon: <Users className="h-6 w-6 text-seller" />,
      path: '/seller/leads',
    },
    {
      title: 'Active Listings',
      value: '6',
      change: 0,
      icon: <Package className="h-6 w-6 text-seller" />,
      path: '/seller/listings',
    },
    {
      title: 'Earnings',
      value: '₹12,450',
      change: 24,
      icon: <IndianRupee className="h-6 w-6 text-seller" />,
      path: '/seller/earnings',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-seller/5 to-transparent">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-muted-foreground">Here's how your business is performing today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              onClick={() => navigate(stat.path)}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <QuickActions />
        </div>

        {/* AI Tips Panel */}
        <div>
          <AITipsPanel />
        </div>
      </div>
    </div>
  );
}
