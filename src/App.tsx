import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./components/auth/AuthPage";
import { WalletProvider, useWallet } from "./components/wallet/WalletProvider";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Streaks from "./pages/Streaks";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";
import SavedNFTs from "./pages/SavedNFTs";
import Activity from "./pages/Activity";
import Settings from "./pages/Settings";
import BurnPage from "./pages/Burn";
import Landing from "./pages/Landing";
import Achievements from "./pages/Achievements";
import Leaderboard from "./pages/Leaderboard";
import HowItWorks from "./pages/HowItWorks";
import DailyClaim from "./pages/DailyClaim";
import QuestRewardsNew from "./pages/QuestRewardsNew";
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import StakingPage from "./pages/Staking";

const queryClient = new QueryClient();

if (typeof window !== "undefined") {
  if (!localStorage.getItem("isAuthenticated")) {
    localStorage.setItem("isAuthenticated", "false");
  }
}

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isConnected } = useWallet();
  const localAuth = localStorage.getItem("isAuthenticated") === "true";
  const auth = isAuthenticated || isConnected || localAuth;

  useEffect(() => {
    console.log("Auth state in PrivateRoute:", auth);
  }, [auth]);

  return auth ? children : <Navigate to="/auth" />;
};

// AppRoutes component that can access the wallet context
const AppRoutes = () => {
  // Inject Sora font with high priority
  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    // Set its content to apply Sora font to all elements
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
      
      *, *::before, *::after, body, html, #root, div, p, h1, h2, h3, h4, h5, h6, 
      span, a, button, input, textarea, select, option {
        font-family: 'Sora', sans-serif !important;
      }
    `;
    // Append it to the head of the document
    document.head.appendChild(style);

    // Clean up function
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <MainLayout>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/:id" element={<ProjectDetails />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/quests" element={<QuestRewardsNew />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected pages */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Index />
            </PrivateRoute>
          }
        />
        <Route
          path="/burn"
          element={
            <PrivateRoute>
              <BurnPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/staking"
          element={
            <PrivateRoute>
              <StakingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/daily-claim"
          element={
            <PrivateRoute>
              <DailyClaim />
            </PrivateRoute>
          }
        />
        <Route
          path="/project/:id"
          element={
            <PrivateRoute>
              <ProjectDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/streaks"
          element={
            <PrivateRoute>
              <Streaks />
            </PrivateRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <PrivateRoute>
              <SavedNFTs />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <PrivateRoute>
              <Activity />
            </PrivateRoute>
          }
        />
        <Route
          path="/achievements"
          element={
            <PrivateRoute>
              <Achievements />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
};

export default App;
