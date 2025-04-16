import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Settings,
  LogOut,
  Clock,
  Award,
  Gift,
  Trophy,
  Info,
  ChevronRight,
  Flame,
} from "lucide-react";
import { useReferral } from "@/hooks/useReferral";
import ReferralModal from "@/components/referral/ReferralModal";
import { Toaster } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useWallet } from "@/components/wallet/WalletProvider";
import { toast } from "sonner";

export interface NavigationItemType {
  name: string;
  icon: React.ReactElement;
  path?: string;
  onClick?: () => void;
  badge?: string | number;
  description?: string;
  color?: string;
}

export const navigationItems: NavigationItemType[] = [
  {
    name: "Activity",
    icon: <Clock size={20} />,
    path: "/activity",
    description: "View your recent actions",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    name: "Achievements",
    icon: <Award size={20} />,
    path: "/achievements",
    description: "Track your progress",
    badge: "3",
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    name: "Refer and Earn",
    icon: <Gift size={20} />,
    description: "Invite friends, earn rewards",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    name: "Leaderboard",
    icon: <Trophy size={20} />,
    path: "/leaderboard",
    description: "See top performers",
    color: "from-yellow-500/20 to-amber-600/20",
  },
  {
    name: "How NEFTIT Works",
    icon: <Info size={20} />,
    path: "/how-it-works",
    description: "Learn about the platform",
    color: "from-emerald-500/20 to-teal-600/20",
  },
];

export const bottomNavigationItems: NavigationItemType[] = [
  {
    name: "Edit Profile",
    icon: <Settings size={20} />,
    path: "/edit-profile",
    description: "Update your profile details",
    color: "from-blue-500/20 to-blue-600/20",
  },
];

interface NavigationItemsProps {
  items: NavigationItemType[];
}

export function NavigationItems({ items }: NavigationItemsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { disconnect } = useWallet();
  const { referralData, isModalOpen, toggleModal, copyReferralLink } =
    useReferral();

  const handleLogout = () => {
    disconnect();
    localStorage.setItem("isAuthenticated", "false");
    toast.success("Wallet disconnected successfully");
    navigate("/");
  };

  const navItemsWithHandlers = navigationItems.map((item) => {
    if (item.name === "Refer and Earn") {
      return {
        ...item,
        onClick: toggleModal,
      };
    }
    return item;
  });

  const bottomItemsWithHandlers = bottomNavigationItems;

  const renderNavigationItem = (item: NavigationItemType) => (
    <div key={item.name} className="relative group">
      {item.badge && (
        <div className="absolute -right-1 -top-1 z-10">
          <Badge
            variant="default"
            className="h-5 w-5 flex items-center justify-center p-0 bg-orange-500 text-white border-none shadow-lg shadow-orange-500/20"
          >
            {item.badge}
          </Badge>
        </div>
      )}
      {item.path ? (
        <Link to={item.path} className="block">
          <Button
            variant="ghost"
            className="w-full justify-between text-left hover:bg-white/5 transition-all duration-200 rounded-lg overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="text-white/70">{item.icon}</div>
              <div className="text-left">
                <div className="font-medium text-sm text-white">
                  {item.name}
                </div>
                <div className="text-xs text-gray-400">{item.description}</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Button>
        </Link>
      ) : (
        <Button
          onClick={item.onClick}
          variant="ghost"
          className="w-full justify-between text-left hover:bg-white/5 transition-all duration-200 rounded-lg overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <div className="text-white/70">{item.icon}</div>
            <div className="text-left">
              <div className="font-medium text-sm text-white">{item.name}</div>
              <div className="text-xs text-gray-400">{item.description}</div>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </Button>
      )}
    </div>
  );

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-5rem)]">
      <div className="flex-1 space-y-1 px-2">
        {navItemsWithHandlers.map(renderNavigationItem)}
      </div>

      <div className="space-y-1 border-t border-white/10 pt-3 pb-3 px-2 mt-4 bg-[#0A0A0F]">
        {bottomItemsWithHandlers.map(renderNavigationItem)}

        {/* Logout Button */}
        <div className="mt-1">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full text-left hover:bg-white/5 transition-all duration-200 rounded-lg overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="text-red-500">
                <LogOut size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium text-sm text-red-500">Logout</div>
              </div>
            </div>
          </Button>
        </div>
      </div>

      <ReferralModal
        isOpen={isModalOpen}
        referralData={referralData}
        onToggle={toggleModal}
        onCopyLink={copyReferralLink}
      />

      <Toaster />
    </div>
  );
}
