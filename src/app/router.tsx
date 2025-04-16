import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Discover from "@/pages/Discover";
import BurnPage from "@/pages/Burn";
import Staking from "@/pages/Staking";
import HowItWorks from "@/pages/HowItWorks";
import Activity from "@/pages/Activity";
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
    path: "/burn",
    element: <BurnPage />,
  },
  {
    path: "/staking",
    element: <Staking />,
  },
  {
    path: "/how-it-works",
    element: <HowItWorks />,
  },
  {
    path: "/activity",
    element: <Activity />,
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
]);

export default router;
