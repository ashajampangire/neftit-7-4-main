import { useState, useEffect } from "react";
import { MainNav } from "@/components/layout/MainNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Gift, 
  Calendar, 
  Clock, 
  Trophy, 
  Flame,
  Star,
  Plus,
  ArrowRight,
  CheckCircle2,
  LockIcon,
  BadgeCheck,
  Search,
  Grid,
  List,
  SlidersHorizontal,
  Sliders
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import "@/styles/fonts.css";

// Types
type RewardTier = {
  day: number;
  name: string;
  description: string;
  reward: string;
  icon: JSX.Element;
  color: string;
  isSpecial?: boolean;
}

// Mock data
const rewardTiers: RewardTier[] = [
  {
    day: 1,
    name: "Daily Starter",
    description: "Your first daily login reward",
    reward: "100 NEFT Points",
    icon: <Gift className="h-5 w-5" />,
    color: "from-blue-600 to-blue-400"
  },
  {
    day: 2,
    name: "Commitment Bonus",
    description: "Two days in a row!",
    reward: "150 NEFT Points",
    icon: <Calendar className="h-5 w-5" />,
    color: "from-teal-600 to-teal-400"
  },
  {
    day: 3,
    name: "Persistence Reward",
    description: "Your streak is building",
    reward: "200 NEFT Points",
    icon: <Clock className="h-5 w-5" />,
    color: "from-indigo-600 to-indigo-400"
  },
  {
    day: 5,
    name: "Dedication Prize",
    description: "You're becoming a regular!",
    reward: "300 NEFT Points",
    icon: <Trophy className="h-5 w-5" />,
    color: "from-purple-600 to-purple-400"
  },
  {
    day: 7,
    name: "Weekly Champion",
    description: "A full week of engagement!",
    reward: "Common NFT + 500 NEFT Points",
    icon: <Star className="h-5 w-5" />,
    color: "from-amber-600 to-amber-400",
    isSpecial: true
  },
  {
    day: 14,
    name: "Fortnight Milestone",
    description: "Two weeks of dedication",
    reward: "Rare NFT + 1000 NEFT Points",
    icon: <BadgeCheck className="h-5 w-5" />,
    color: "from-orange-600 to-orange-400",
    isSpecial: true
  },
  {
    day: 30,
    name: "Monthly Master",
    description: "A month of consistent engagement!",
    reward: "Epic NFT + 2500 NEFT Points",
    icon: <Flame className="h-5 w-5" />,
    color: "from-red-600 to-red-400",
    isSpecial: true
  }
];

// Streak history - mock data
const mockStreakHistory = [
  { date: "2023-07-01", claimed: true },
  { date: "2023-07-02", claimed: true },
  { date: "2023-07-03", claimed: true },
  { date: "2023-07-04", claimed: true },
  { date: "2023-07-05", claimed: true },
  { date: "2023-07-06", claimed: false },
  { date: "2023-07-07", claimed: true },
  { date: "2023-07-08", claimed: true },
  { date: "2023-07-09", claimed: true },
];

const DailyClaim = () => {
  const [currentStreak, setCurrentStreak] = useState(3);
  const [longestStreak, setLongestStreak] = useState(5);
  const [totalClaims, setTotalClaims] = useState(12);
  const [nextReward, setNextReward] = useState<RewardTier | null>(null);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [showClaimDialog, setShowClaimDialog] = useState(false);
  const [claimedReward, setClaimedReward] = useState<RewardTier | null>(null);
  const [activeTab, setActiveTab] = useState("rewards");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Find the next reward tier based on current streak
  useEffect(() => {
    const next = rewardTiers.find(tier => tier.day > currentStreak);
    setNextReward(next || null);
  }, [currentStreak]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Handle claim button click
  const handleClaim = () => {
    if (hasClaimed) return;
    
    // Find the current day's reward
    const today = new Date();
    const currentReward = rewardTiers.find(tier => tier.day === currentStreak + 1) || rewardTiers[0];
    
    setClaimedReward(currentReward);
    setShowClaimDialog(true);
  };

  // Confirm claim
  const confirmClaim = () => {
    setHasClaimed(true);
    setCurrentStreak(prev => prev + 1);
    setTotalClaims(prev => prev + 1);
    
    if (currentStreak + 1 > longestStreak) {
      setLongestStreak(currentStreak + 1);
    }
    
    setShowClaimDialog(false);
  };

  // Get progress to next reward
  const getProgressToNextReward = () => {
    if (!nextReward) return 100;
    
    const prevDay = rewardTiers.filter(tier => tier.day < nextReward.day)
      .reduce((max, tier) => Math.max(max, tier.day), 0);
      
    const progress = ((currentStreak - prevDay) / (nextReward.day - prevDay)) * 100;
    return Math.max(0, Math.min(progress, 100));
  };

  return (
    <div className="min-h-screen bg-[#0F1114] font-sora">
      {/* Dark Background */}
      <div className="fixed inset-0 bg-[#0F1114]" />

      <MainNav />
      
      <main className="container relative mx-auto px-3 sm:px-4 md:px-6 pt-6 pb-10 md:pb-16 space-y-4 md:space-y-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="border-b border-[#2D3748]/50 pb-4 md:pb-6 mt-3 md:mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-sora tracking-tight text-white">
                  Daily Rewards
                </h1>
                <p className="text-sm sm:text-base font-sora text-[#94A3B8] max-w-2xl mt-1">
                  Claim your daily rewards and build your streak to earn bigger prizes.
                </p>
      </div>
              
              {/* View Toggles */}
              <div className="flex gap-2 items-center self-end sm:self-auto mt-2 sm:mt-0">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md",
                    viewMode === "grid" 
                      ? "bg-[#38B2AC] text-white" 
                      : "bg-[#171923] text-[#94A3B8] hover:bg-[#1A202C]"
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md",
                    viewMode === "list" 
                      ? "bg-[#38B2AC] text-white" 
                      : "bg-[#171923] text-[#94A3B8] hover:bg-[#1A202C]"
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                    </div>
                  </div>
                  </div>

          <div className="py-4 md:py-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3 mb-6 md:mb-8">
              <div className="p-2 sm:p-3 md:p-4 rounded-lg bg-[#171923] border border-[#2D3748]/50 flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-[#1A202C] flex-shrink-0">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38B2AC]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-[#A0AEC0] font-sora truncate">Current Streak</div>
                  <div className="text-sm sm:text-base md:text-xl font-bold text-white font-sora truncate">{currentStreak} Days</div>
                </div>
              </div>
              <div className="p-2 sm:p-3 md:p-4 rounded-lg bg-[#171923] border border-[#2D3748]/50 flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-[#1A202C] flex-shrink-0">
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38B2AC]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-[#A0AEC0] font-sora truncate">Longest Streak</div>
                  <div className="text-sm sm:text-base md:text-xl font-bold text-white font-sora truncate">{longestStreak} Days</div>
                    </div>
                  </div>
              <div className="p-2 sm:p-3 md:p-4 rounded-lg bg-[#171923] border border-[#2D3748]/50 flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-[#1A202C] flex-shrink-0">
                  <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38B2AC]" />
                  </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-[#A0AEC0] font-sora truncate">Total Claims</div>
                  <div className="text-sm sm:text-base md:text-xl font-bold text-white font-sora truncate">{totalClaims}</div>
                    </div>
                  </div>
                  </div>

            {/* Next Reward Progress */}
            <div className="mb-6 md:mb-8 bg-[#171923] rounded-lg md:rounded-xl border border-[#2D3748]/50 p-3 md:p-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-white">Progress to Next Reward</h3>
                  {nextReward && (
                    <p className="text-xs sm:text-sm text-[#94A3B8]">
                      {nextReward.day - currentStreak} more day{nextReward.day - currentStreak !== 1 ? 's' : ''} to claim {nextReward.name}
                    </p>
                  )}
                        </div>
                          
                <div className="sm:text-right">
                  <p className="text-xs sm:text-sm text-[#94A3B8]">Daily status</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-medium text-white">
                      {hasClaimed ? "Claimed" : "Not Claimed"}
                    </span>
                    {hasClaimed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#38B2AC]" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#F56565]" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 md:mt-4">
                <Progress 
                  value={getProgressToNextReward()} 
                  className="h-2 bg-[#1A202C]" 
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 md:mb-8">
              <Tabs 
                defaultValue="rewards" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="inline-flex bg-[#171923] border border-[#2D3748]/50 p-1 rounded-lg mb-4 md:mb-6">
              <TabsTrigger
                value="rewards"
                    className={cn(
                      "rounded-md text-sm py-2 px-3",
                      activeTab === "rewards" 
                        ? "bg-[#38B2AC] text-white" 
                        : "bg-transparent text-[#94A3B8] hover:text-white hover:bg-[#1A202C]"
                    )}
              >
                Reward Tiers
              </TabsTrigger>
              <TabsTrigger
                value="history"
                    className={cn(
                      "rounded-md text-sm py-2 px-3",
                      activeTab === "history" 
                        ? "bg-[#38B2AC] text-white" 
                        : "bg-transparent text-[#94A3B8] hover:text-white hover:bg-[#1A202C]"
                    )}
                  >
                    Streak History
              </TabsTrigger>
            </TabsList>
            
                <TabsContent value="rewards" className="mt-0">
                  <div className={cn(
                    viewMode === "grid" 
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6" 
                      : "flex flex-col gap-3 md:gap-4"
                  )}>
                    {rewardTiers.map((tier) => (
                      viewMode === "grid" ? (
                        <Card 
                          key={tier.day}
                          className={cn(
                            "rounded-lg bg-[#171923] border transition-all duration-200 overflow-hidden",
                        tier.day <= currentStreak 
                              ? "border-[#38B2AC] shadow-md shadow-[#38B2AC]/10"
                              : "border-[#2D3748]/50",
                            tier.isSpecial && "ring-2 ring-[#F6AD55]/30"
                          )}
                        >
                          <CardContent className="p-3 sm:p-4 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-3">
                          <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center",
                                `bg-gradient-to-r ${tier.color}`
                          )}>
                            {tier.icon}
                          </div>

                              <div className="text-[#94A3B8] text-xs font-medium">
                              Day {tier.day}
                          </div>
                        </div>

                            <h3 className="text-white font-bold text-base">{tier.name}</h3>
                            <p className="text-xs text-[#94A3B8] mb-2">{tier.description}</p>

                            <div className="border-t border-[#2D3748]/50 my-2"></div>

                            <div className="flex items-center gap-2 mt-auto">
                              <div className="p-1.5 rounded-md bg-[#1A202C]">
                                <Gift className="w-4 h-4 text-[#38B2AC]" />
                              </div>
                              <div className="text-sm font-medium text-white">{tier.reward}</div>
                            </div>

                            {tier.day <= currentStreak && (
                              <div className="absolute top-3 right-3">
                                <CheckCircle2 className="w-5 h-5 text-[#38B2AC]" />
                        </div>
                            )}
                      </CardContent>
                    </Card>
                      ) : (
                        <div 
                          key={tier.day}
                          className={cn(
                            "flex flex-col sm:flex-row rounded-lg bg-[#171923] border transition-all duration-200 overflow-hidden p-3 sm:p-4",
                            tier.day <= currentStreak
                              ? "border-[#38B2AC] shadow-md shadow-[#38B2AC]/10"
                              : "border-[#2D3748]/50",
                            tier.isSpecial && "ring-2 ring-[#F6AD55]/30"
                          )}
                        >
                          <div className="flex items-center gap-3 sm:w-1/3">
                            <div className={cn(
                              "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0",
                              `bg-gradient-to-r ${tier.color}`
                            )}>
                              {tier.icon}
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-base">{tier.name}</h3>
                              <p className="text-xs text-[#94A3B8]">Day {tier.day}</p>
                            </div>
                          </div>
                          
                          <div className="flex-1 sm:border-l sm:border-[#2D3748]/50 sm:pl-4 mt-2 sm:mt-0">
                            <p className="text-sm text-[#94A3B8] mb-2">{tier.description}</p>
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-md bg-[#1A202C]">
                                <Gift className="w-4 h-4 text-[#38B2AC]" />
                              </div>
                              <div className="text-sm font-medium text-white">{tier.reward}</div>
                            </div>
                          </div>

                          <div className="sm:w-20 flex justify-end items-center">
                            {tier.day <= currentStreak ? (
                              <CheckCircle2 className="w-5 h-5 text-[#38B2AC]" />
                            ) : (
                              <LockIcon className="w-5 h-5 text-[#94A3B8]" />
                            )}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <div className="bg-[#171923] rounded-lg border border-[#2D3748]/50 p-4">
                    <h3 className="text-white font-bold text-lg mb-4">Your Streak History</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {mockStreakHistory.map((day, index) => (
                        <div 
                          key={index}
                          className={cn(
                            "aspect-square rounded-md flex items-center justify-center p-2",
                            day.claimed 
                              ? "bg-[#38B2AC]/20 border border-[#38B2AC]/50" 
                              : "bg-[#1A202C] border border-[#2D3748]/50"
                          )}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-[#94A3B8]">
                              {new Date(day.date).getDate()}
                            </span>
                            {day.claimed ? (
                              <CheckCircle2 className="w-4 h-4 text-[#38B2AC] mt-1" />
                            ) : (
                              <LockIcon className="w-4 h-4 text-[#94A3B8] mt-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
            </TabsContent>
          </Tabs>
            </div>

            {/* Daily Claim Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleClaim}
                disabled={hasClaimed}
                className={cn(
                  "px-8 py-6 rounded-lg font-semibold flex items-center gap-2 text-base",
                  !hasClaimed
                    ? "bg-[#38B2AC] hover:bg-[#319795] text-white"
                    : "bg-[#1A202C] text-[#4A5568] cursor-not-allowed"
                )}
              >
                <Gift className="w-5 h-5" />
                {hasClaimed ? "Already Claimed Today" : "Claim Daily Reward"}
              </Button>
            </div>
        </div>
      </div>
      </main>

      {/* Claim Dialog */}
      <AlertDialog open={showClaimDialog} onOpenChange={setShowClaimDialog}>
        <AlertDialogContent className="bg-[#171923] border border-[#2D3748]/50 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">Claim Your Daily Reward</AlertDialogTitle>
            <AlertDialogDescription className="text-[#94A3B8]">
              {claimedReward && `You're about to claim your Day ${currentStreak + 1} reward!`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {claimedReward && (
            <div className="py-4">
              <div className="bg-[#1A202C] rounded-lg p-4 flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  `bg-gradient-to-r ${claimedReward.color}`
                )}>
                  {claimedReward.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold">{claimedReward.name}</h3>
                  <p className="text-sm text-[#94A3B8]">{claimedReward.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Gift className="w-4 h-4 text-[#38B2AC]" />
                    <span className="text-white font-medium">{claimedReward.reward}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="bg-transparent border border-[#2D3748] hover:bg-[#1A202C] text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmClaim} 
              className="bg-[#38B2AC] hover:bg-[#319795] text-white"
            >
              Claim Reward
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DailyClaim; 