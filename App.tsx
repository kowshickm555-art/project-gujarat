import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import ConsumerHome from "./pages/ConsumerHome";
import SellerDashboard from "./pages/SellerDashboard";
import SearchResults from "./pages/SearchResults";
import ListingDetail from "./pages/ListingDetail";
import SellerListings from "./pages/SellerListings";
import AddListing from "./pages/AddListing";
import SellerLeads from "./pages/SellerLeads";
import Subscription from "./pages/Subscription";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppShell>
            <Routes>
              {/* Consumer Routes */}
              <Route path="/" element={<ConsumerHome />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/listing/:id" element={<ListingDetail />} />

              {/* Seller Routes */}
              <Route path="/seller" element={<SellerDashboard />} />
              <Route path="/seller/listings" element={<SellerListings />} />
              <Route path="/seller/listings/new" element={<AddListing />} />
              <Route path="/seller/listings/:id/edit" element={<AddListing />} />
              <Route path="/seller/leads" element={<SellerLeads />} />
              <Route path="/seller/subscription" element={<Subscription />} />

              {/* Shared Routes */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Profile />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
