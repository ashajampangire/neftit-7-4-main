import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Flame,
  Check,
  X,
  Gift,
  CalendarDays,
  HomeIcon,
  ActivityIcon,
  Sparkles,
  FlameIcon,
  Zap,
  HelpCircle,
  User,
  LogOut,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProfileButton } from "@/components/profile/ProfileButton";
import { ProfileBox } from "@/components/profile/ProfileBox";
import {
  NavigationItems,
  NavigationItemType,
} from "@/components/navigation/NavigationItems";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import confetti from "canvas-confetti";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@/components/wallet/WalletProvider";
import WalletConnectionModal from "@/components/wallet/WalletConnectionModal";
import { toast } from "sonner";

interface MainNavProps {
  // Optional setter for an external wallet modal state
  setExternalWalletModalOpen?: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

export function MainNav({
  setExternalWalletModalOpen,
  children,
}: MainNavProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [currentStreak] = useState(() => {
    const saved = localStorage.getItem("currentStreak");
    return saved ? JSON.parse(saved) : { count: 0, lastClaim: null };
  });

  const [canClaim, setCanClaim] = useState(true);
  // Mock values for NEFT and XP - replace with actual data from your system
  const neftBalance = 1000;
  const xpPoints = 500;

  const { isConnected, isAuthenticated, disconnect } = useWallet();

  const handleLoginClick = () => {
    // If external modal state setter is provided, use it
    if (setExternalWalletModalOpen) {
      setExternalWalletModalOpen(true);
    } else {
      setIsWalletModalOpen(true);
    }
  };

  const handleLogout = () => {
    disconnect();
    localStorage.setItem("isAuthenticated", "false");
    toast.success("Wallet disconnected successfully");
  };

  const launchConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 999999,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleClaim = () => {
    const now = new Date();
    const newStreak = {
      count: currentStreak.count + 1,
      lastClaim: now.toISOString(),
    };
    localStorage.setItem("currentStreak", JSON.stringify(newStreak));
    setCanClaim(false);
    setClaimed(true);
    launchConfetti();
    setTimeout(() => {
      setClaimed(false);
      setIsOpen(false);
    }, 3000);
  };

  const StreakButton = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 text-orange-500 border-orange-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <Flame className="h-4 w-4 mr-2 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
          </div>
          <span className="font-medium">Daily Claim</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card/90 backdrop-blur-xl border-white/10 text-white max-w-md p-0 overflow-hidden">
        <DialogTitle className="sr-only">Daily Streak Rewards</DialogTitle>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors z-10"
        >
          <X className="h-4 w-4" />
        </button>

        <AnimatePresence mode="wait">
          {!claimed ? (
            <motion.div
              key="claim"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6"
            >
              <div className="relative h-32 -mt-6 -mx-6 mb-6 bg-gradient-to-b from-orange-500/20 to-transparent flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="relative"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 backdrop-blur-xl flex items-center justify-center border border-orange-500/30">
                    <Flame className="h-12 w-12 text-orange-500" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 border-none text-white px-3 py-1">
                    {currentStreak.count} Days
                  </Badge>
                </motion.div>
              </div>

              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    {currentStreak.count} Day Streak!
                  </h2>
                  <p className="text-white/60">Keep the momentum going! 🔥</p>
                </div>

                <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                  <CalendarDays className="h-4 w-4" />
                  <span>Last checked in: Today</span>
                </div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-4 flex items-center justify-between backdrop-blur-sm border border-orange-500/20"
                  >
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">Daily Reward</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-500 border-orange-500/30">
                      1 NEFT
                    </Badge>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      onClick={handleClaim}
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-none shadow-lg shadow-orange-500/20"
                      disabled={!canClaim}
                    >
                      <Gift className="h-5 w-5 mr-2" />
                      {canClaim ? "Claim Today's Reward" : "Already Claimed"}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="py-12 px-6 text-center space-y-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent" />

              <motion.div
                initial={{ rotate: 0 }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  times: [0, 0.5, 1],
                }}
                className="relative z-10"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 mx-auto flex items-center justify-center border border-green-500/30">
                  <Gift className="h-12 w-12 text-green-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 space-y-2"
              >
                <h2 className="text-2xl font-bold text-white">
                  Congratulations! 🎉
                </h2>
                <p className="text-white/60">
                  You've claimed your daily reward
                </p>
                <div className="flex justify-center">
                  <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-500 border-green-500/30">
                    +1 NEFT
                  </Badge>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );

  const mainNavItems: NavigationItemType[] = [
    {
      name: "Home",
      icon: <HomeIcon className="h-4 w-4" />,
      path: "/home",
      description: "Go to home page",
    },
    {
      name: "Activity",
      icon: <ActivityIcon className="h-4 w-4" />,
      path: "/activity",
      description: "View your activity",
    },
    {
      name: "Discover",
      icon: <Sparkles className="h-4 w-4" />,
      path: "/discover",
      description: "Explore NFTs",
    },
    {
      name: "Burn",
      icon: <FlameIcon className="h-4 w-4" />,
      path: "/burn",
      description: "Burn NFTs",
    },
    {
      name: "Stake",
      icon: <Zap className="h-4 w-4" />,
      path: "/staking",
      description: "Stake your NFTs",
    },
    {
      name: "Daily Claim",
      icon: <Gift className="h-4 w-4" />,
      path: "/daily-claim",
      description: "Claim daily rewards",
    },
    {
      name: "How It Works",
      icon: <HelpCircle className="h-4 w-4" />,
      path: "/how-it-works",
      description: "Learn how it works",
    },
  ];

  return (
    <div>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={classNames(
          "fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10",
          "transition-colors duration-200"
        )}
      >
        <div className="container h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-light tracking-wider text-white hover:text-white/90 transition-colors"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
              >
                NEFT<span className="text-neon-blue">IT</span>
              </motion.span>
            </Link>

            {!isMobile && (
              <div className="flex items-center gap-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/discover"
                      className="relative text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <span>Discover</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-card/90 backdrop-blur-xl border-white/10">
                    Explore NFT collections
                  </TooltipContent>
                </Tooltip>

                {(isConnected || isAuthenticated) && (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to="/burn"
                          className="relative text-muted-foreground hover:text-foreground transition-colors group"
                        >
                          <span>Burn</span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="bg-card/90 backdrop-blur-xl border-white/10">
                        Burn & upgrade your NFTs
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to="/staking"
                          className="relative text-muted-foreground hover:text-foreground transition-colors group"
                        >
                          <span>Stake</span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="bg-card/90 backdrop-blur-xl border-white/10">
                        Stake NFTs & tokens to earn rewards
                      </TooltipContent>
                    </Tooltip>

                    <StreakButton />
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Combined NEFT and XP counter - only show when connected */}
            {(isConnected || isAuthenticated) && (
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="hidden sm:flex items-center divide-x divide-white/10 rounded-lg bg-gradient-to-r from-white/5 to-white/[0.07] border border-white/10 backdrop-blur-sm shadow-lg shadow-black/20"
              >
                <div className="px-4 py-1.5 flex items-center gap-1.5">
                  <span className="text-sm font-medium bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {neftBalance} NEFT
                  </span>
                </div>
                <div className="px-4 py-1.5 flex items-center gap-1.5">
                  <span className="text-sm font-medium bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {xpPoints} XP
                  </span>
                </div>
              </motion.div>
            )}

            {/* Login button for unauthenticated users */}
            {!isConnected && !isAuthenticated && (
              <Button
                onClick={handleLoginClick}
                className="bg-[#38B2AC] hover:bg-[#319795] text-white"
              >
                Login
              </Button>
            )}

            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-card/90 backdrop-blur-xl border-white/10 p-0 overflow-y-auto"
                >
                  {(isConnected || isAuthenticated) && (
                    <ProfileBox className="border-b border-white/10" />
                  )}
                  <div className="py-2">
                    <NavigationItems items={mainNavItems} />

                    {/* Logout is now handled in NavigationItems component */}
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <>
                {isConnected || isAuthenticated ? (
                  <Sheet>
                    <SheetTrigger asChild>
                      <div className="animate-scale-in">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <ProfileButton />
                        </motion.div>
                      </div>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="w-[300px] bg-card/90 backdrop-blur-xl border-white/10 p-0 overflow-y-auto"
                    >
                      <ProfileBox className="border-b border-white/10" />
                      <div className="py-2">
                        <NavigationItems items={mainNavItems} />

                        {/* Logout is now handled in NavigationItems component */}
                      </div>
                    </SheetContent>
                  </Sheet>
                ) : null}
              </>
            )}
          </div>
        </div>
      </motion.nav>
      <div className="pt-[72px]">{children}</div>

      {/* Wallet Connection Modal */}
      <WalletConnectionModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
}
