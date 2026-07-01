import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, User, ChevronDown, Menu, X, LogIn } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { mode, setMode, location, user, isAuthenticated } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleModeToggle = (newMode: 'consumer' | 'seller') => {
    setMode(newMode);
    if (newMode === 'seller') {
      navigate('/seller');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to={mode === 'seller' ? '/seller' : '/'} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">L</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">LocalMart</span>
          </Link>

          {/* Mode Toggle */}
          <div className="hidden md:flex items-center bg-secondary rounded-full p-1">
            <button
              onClick={() => handleModeToggle('consumer')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                mode === 'consumer'
                  ? 'mode-toggle-consumer text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Consumer
            </button>
            <button
              onClick={() => handleModeToggle('seller')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                mode === 'seller'
                  ? 'mode-toggle-seller text-seller-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Seller
            </button>
          </div>

          {/* Location Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="max-w-32 truncate">{location.area}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                Detect my location
              </DropdownMenuItem>
              <DropdownMenuItem>Andheri West, Mumbai</DropdownMenuItem>
              <DropdownMenuItem>Bandra, Mumbai</DropdownMenuItem>
              <DropdownMenuItem>Powai, Mumbai</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Menu */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex"
                onClick={() => navigate('/profile')}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-up">
            <div className="flex flex-col gap-4">
              {/* Mobile Mode Toggle */}
              <div className="flex items-center bg-secondary rounded-full p-1">
                <button
                  onClick={() => {
                    handleModeToggle('consumer');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    mode === 'consumer'
                      ? 'mode-toggle-consumer text-primary-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  Consumer
                </button>
                <button
                  onClick={() => {
                    handleModeToggle('seller');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    mode === 'seller'
                      ? 'mode-toggle-seller text-seller-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  Seller
                </button>
              </div>

              {/* Mobile Location */}
              <Button variant="ghost" className="justify-start">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                {location.area}, {location.city}
              </Button>

              {!isAuthenticated && (
                <Button onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login / Sign Up
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
