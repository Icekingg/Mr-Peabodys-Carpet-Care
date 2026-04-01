import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionConfig, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { BookingModalProvider, useBookingModal } from "@/hooks/use-booking-modal";
import Home from "@/pages/Home";
import SteamCleaning from "@/pages/SteamCleaning";
import PetTreatment from "@/pages/PetTreatment";
import Upholstery from "@/pages/Upholstery";
import AreaRugs from "@/pages/AreaRugs";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import Projects from "@/pages/Projects";
import BookEstimate from "@/pages/BookEstimate";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { X } from "lucide-react";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/steam-cleaning" component={SteamCleaning} />
      <Route path="/pet-treatment" component={PetTreatment} />
      <Route path="/upholstery" component={Upholstery} />
      <Route path="/area-rugs" component={AreaRugs} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/projects" component={Projects} />
      <Route path="/book" component={BookEstimate} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-20 left-0 right-0 z-40 bg-accent text-accent-foreground"
      data-testid="banner-announcement"
    >
      <div className="mx-auto px-2 sm:px-4 py-2 sm:py-2.5 lg:py-3 xl:py-3.5 flex items-center relative">
        <button
          onClick={() => setVisible(false)}
          className="absolute left-2 sm:left-4 p-1 hover:opacity-70 transition-opacity flex-shrink-0"
          aria-label="Close announcement"
          data-testid="button-close-banner"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
        </button>
        <p className="text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-semibold tracking-wide text-center w-full pl-6 sm:pl-8">We rebranded! New style, same premium carpet care!</p>
      </div>
    </motion.div>
  );
}

function AppContent() {
  const { open, setOpen } = useBookingModal();

  return (
    <div className="min-h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      <Navigation />
      <AnnouncementBanner />
      <ScrollToTop />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
      <BookingModal open={open} onOpenChange={setOpen} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MotionConfig reducedMotion="user">
          <BookingModalProvider>
            <AppContent />
            <Toaster />
          </BookingModalProvider>
        </MotionConfig>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
