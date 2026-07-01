import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const suggestions = [
    'Find a plumber near me',
    'Best restaurants for dinner',
    'Home cleaning services',
    'Gym membership deals',
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <div className="mb-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            AI-Powered Local Search
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Discover the Best
            <span className="gradient-text block">Near You</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Find local shops, services, entertainment, jobs, and more with AI-powered search
          </p>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div
              className={`relative transition-all duration-300 ${
                isFocused ? 'scale-[1.02]' : ''
              }`}
            >
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Try 'Find a salon for haircut tomorrow'..."
                className="search-input-hero w-full pl-14 pr-24"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  type="submit"
                  className="btn-primary-glow h-9 px-4 rounded-xl"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          {/* Quick Suggestions */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                }}
                className="px-4 py-2 rounded-full bg-card border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
