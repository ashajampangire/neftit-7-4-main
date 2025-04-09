import { createBrowserRouter } from "react-router-dom";
import { Index } from "@/pages/Index";
import { ConfigPage } from "@/pages/Config";
import { Discover } from "@/pages/Discover";
import { WithdrawPage } from "@/pages/Withdraw";
import { Burn } from "@/pages/Burn";
import { Staking } from "@/pages/Staking";
import { HowItWorks } from "@/pages/HowItWorks";
import { ActivityPage } from "@/pages/Activity";
import DailyClaim from "@/pages/DailyClaim";
import Profile from "@/pages/Profile";
import EditProfile from "@/pages/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/discover",
    element: <Discover />,
  },
  {
    path: "/config",
    element: <ConfigPage />,
  },
  {
    path: "/withdraw",
    element: <WithdrawPage />,
  },
  {
    path: "/burn",
    element: <Burn />,
  },
  {
    path: "/staking",
    element: <Staking />,
  },
  {
    path: "/activity",
    element: <ActivityPage />,
  },
  {
    path: "/daily-claim",
    element: <DailyClaim />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/how-it-works",
    element: <HowItWorks />,
  },
]);

export default router; 