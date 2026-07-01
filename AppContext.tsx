import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppMode = 'consumer' | 'seller';

interface Location {
  city: string;
  area: string;
  coordinates?: { lat: number; lng: number };
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
}

interface AppContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  location: Location;
  setLocation: (location: Location) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultLocation: Location = {
  city: 'Mumbai',
  area: 'Andheri West',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('consumer');
  const [location, setLocation] = useState<Location>(defaultLocation);
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = user !== null && user.isLoggedIn;

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        location,
        setLocation,
        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
