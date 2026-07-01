import { useNavigate } from 'react-router-dom';
import { 
  Store, 
  Wrench, 
  PartyPopper, 
  MapPinned, 
  Briefcase, 
  Home 
} from 'lucide-react';

const categories = [
  {
    id: 'shops',
    name: 'Shops',
    description: 'Local stores & retailers',
    icon: Store,
    color: 'bg-orange-500/10 text-orange-600',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Home & professional services',
    icon: Wrench,
    color: 'bg-blue-500/10 text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Events, clubs & activities',
    icon: PartyPopper,
    color: 'bg-purple-500/10 text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'tourism',
    name: 'Tourism',
    description: 'Explore local attractions',
    icon: MapPinned,
    color: 'bg-green-500/10 text-green-600',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'jobs',
    name: 'Jobs',
    description: 'Local job opportunities',
    icon: Briefcase,
    color: 'bg-indigo-500/10 text-indigo-600',
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    id: 'rentals',
    name: 'Rentals',
    description: 'Property & item rentals',
    icon: Home,
    color: 'bg-rose-500/10 text-rose-600',
    gradient: 'from-rose-500 to-red-500',
  },
];

export function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Browse by Category</h2>
          <p className="text-muted-foreground">Find exactly what you need in your area</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => navigate(`/search?category=${category.id}`)}
                className="category-card group text-left"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
