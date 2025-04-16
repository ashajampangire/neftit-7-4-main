import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Award,
  Flame,
  Activity,
  Trophy,
  UserCircle,
  Settings,
  LogOut,
  Info,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useWallet } from "@/components/wallet/WalletProvider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Award, label: "Discover", path: "/discover" },
  { icon: Flame, label: "Burn", path: "/burn" },
  { icon: Activity, label: "Activity", path: "/activity" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: UserCircle, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: Info, label: "How NEFTIT Works", path: "/how-it-works" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { disconnect } = useWallet();

  const handleLogout = () => {
    disconnect();
    localStorage.setItem("isAuthenticated", "false");
    toast.success("Disconnected wallet successfully");
    navigate("/");
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "w-20 md:w-64 h-screen fixed left-0 overflow-y-auto",
        "bg-background-card/50 backdrop-blur-xl",
        "border-r border-border",
        "flex flex-col"
      )}
    >
      {/* Logo */}
      <div className="flex justify-center md:justify-start items-center h-20 px-6 border-b border-border">
        <div className="font-bold text-xl md:block hidden">
          <span className="text-2xl font-bold font-space-grotesk text-text-primary">
            NEFT<span className="text-[#36F9F6]">IT</span>
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-8">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.li
                key={item.path}
                whileHover={{ x: 4 }}
                className="relative"
              >
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-xl",
                    "transition-all duration-300 group",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 md:mr-4",
                      "transition-transform duration-300",
                      "group-hover:scale-110"
                    )}
                  />
                  <span className="hidden md:block font-manrope">
                    {item.label}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute right-4 hidden md:flex items-center"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Logout */}
      <div className="px-4 pb-6">
        <motion.button
          onClick={handleLogout}
          whileHover={{ x: 4 }}
          className={cn(
            "flex items-center w-full px-4 py-3 rounded-xl",
            "text-[#FF2E63] hover:bg-[#FF2E63]/10",
            "transition-all duration-300 group"
          )}
        >
          <LogOut
            className={cn(
              "h-5 w-5 md:mr-4",
              "transition-transform duration-300",
              "group-hover:scale-110"
            )}
          />
          <span className="hidden md:block font-manrope">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
