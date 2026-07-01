import { HeroSearch } from '@/components/consumer/HeroSearch';
import { CategoryGrid } from '@/components/consumer/CategoryGrid';
import { FeaturedListings } from '@/components/consumer/FeaturedListings';
import { DealsSection } from '@/components/consumer/DealsSection';
import { TrustSection } from '@/components/consumer/TrustSection';

export default function ConsumerHome() {
  return (
    <div className="animate-fade-in">
      <HeroSearch />
      <CategoryGrid />
      <FeaturedListings />
      <DealsSection />
      <TrustSection />
    </div>
  );
}
