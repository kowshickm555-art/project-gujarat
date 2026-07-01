import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import {
  User,
  Mail,
  Phone,
  Bell,
  Globe,
  Shield,
  ChevronRight,
  LogOut,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Profile() {
  const { mode, isAuthenticated, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to LocalMart</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to manage your profile, save listings, and{' '}
            {mode === 'seller' ? 'grow your business' : 'find local deals'}
          </p>
          <div className="space-y-3">
            <Button
              className="w-full btn-primary-glow"
              onClick={() =>
                setUser({
                  id: '1',
                  name: 'John Doe',
                  email: 'john@example.com',
                  isLoggedIn: true,
                })
              }
            >
              Sign In
            </Button>
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${mode === 'seller' ? 'bg-gradient-to-b from-seller/5 to-transparent' : 'bg-background'}`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-card border border-border shadow-sm hover:bg-secondary transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-muted-foreground">
            {mode === 'seller' ? 'Seller Account' : 'Consumer Account'}
          </p>
        </div>

        {/* Profile Form */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Profile Information</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            {isEditing && (
              <Button className="w-full mt-4">Save Changes</Button>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-2xl border border-border/50 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-6">Settings</h2>

          <div className="space-y-6">
            {/* Language */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred language
                  </p>
                </div>
              </div>
              <Select
                value={profile.language}
                onValueChange={(value) =>
                  setProfile({ ...profile, language: value })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="mr">मराठी</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notifications */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Manage how you receive updates
                  </p>
                </div>
              </div>

              <div className="pl-13 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email notifications</span>
                  <Switch
                    checked={profile.notifications.email}
                    onCheckedChange={(checked) =>
                      setProfile({
                        ...profile,
                        notifications: { ...profile.notifications, email: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push notifications</span>
                  <Switch
                    checked={profile.notifications.push}
                    onCheckedChange={(checked) =>
                      setProfile({
                        ...profile,
                        notifications: { ...profile.notifications, push: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS notifications</span>
                  <Switch
                    checked={profile.notifications.sms}
                    onCheckedChange={(checked) =>
                      setProfile({
                        ...profile,
                        notifications: { ...profile.notifications, sms: checked },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span>Privacy & Security</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="border-t border-border/50" />
          <button
            onClick={() => setUser(null)}
            className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors text-destructive"
          >
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
