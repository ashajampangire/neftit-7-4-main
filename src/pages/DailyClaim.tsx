import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StarryBackground from "@/components/layout/StarryBackground";
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
  BadgeCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

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
    <Layout className="bg-background">
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Daily Rewards
            </motion.h1>
            <motion.p 
              className="text-zinc-400 text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Log in daily to claim rewards and maintain your streak
            </motion.p>
          </motion.div>

          {/* Streak Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Current Streak */}
            <motion.div variants={itemVariants}>
              <Card className="border backdrop-blur-xl group hover:border-white/20 transition-all duration-300 bg-card/50 border-white/10 overflow-hidden relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                      <Flame className="h-6 w-6 text-amber-400" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                      Current Streak
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      {currentStreak}
                    </span>
                    <span className="text-zinc-400 mb-1">days</span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Keep your streak going by claiming your reward every day!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Longest Streak */}
            <motion.div variants={itemVariants}>
              <Card className="border backdrop-blur-xl group hover:border-white/20 transition-all duration-300 bg-card/50 border-white/10 overflow-hidden relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                      <Trophy className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                      Longest Streak
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
                      {longestStreak}
                    </span>
                    <span className="text-zinc-400 mb-1">days</span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Your dedication has been consistent for {longestStreak} consecutive days!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Total Claims */}
            <motion.div variants={itemVariants}>
              <Card className="border backdrop-blur-xl group hover:border-white/20 transition-all duration-300 bg-card/50 border-white/10 overflow-hidden relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                      <Calendar className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                      Total Claims
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                      {totalClaims}
                    </span>
                    <span className="text-zinc-400 mb-1">rewards</span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    You've claimed a total of {totalClaims} daily rewards so far!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Daily Claim Button & Next Reward */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="border backdrop-blur-xl border-white/10 bg-card/50 overflow-hidden relative">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="max-w-md">
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      {hasClaimed ? "Already Claimed Today" : "Claim Your Daily Reward"}
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      {hasClaimed
                        ? "You've already claimed your reward today. Come back tomorrow to continue your streak!"
                        : "Maintain your login streak and earn increasingly valuable rewards. Don't miss a day!"}
                    </p>
                    
                    {nextReward && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Progress to next milestone:</span>
                          <span className="text-amber-400 font-medium">
                            {currentStreak} / {nextReward.day} days
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-500" 
                            style={{ width: `${getProgressToNextReward()}%` }}
                          />
                        </div>
                          
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-zinc-500">Next reward:</span>
                          <span className="text-xs text-zinc-300 font-medium">{nextReward.name}</span>
                          <ArrowRight className="h-3 w-3 text-zinc-500" />
                          <span className="text-xs text-zinc-300 font-medium">{nextReward.reward}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    className={cn(
                      "min-w-[180px] h-14 text-base font-semibold rounded-lg relative overflow-hidden group",
                      hasClaimed
                        ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                    )}
                    onClick={handleClaim}
                    disabled={hasClaimed}
                  >
                    {!hasClaimed && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-white/10" />
                        <Gift className="h-5 w-5 mr-2" />
                        <span>Claim Now</span>
                      </div>
                    )}
                    <div className={cn(
                      "flex items-center justify-center",
                      !hasClaimed && "group-hover:opacity-0 transition-opacity duration-300"
                    )}>
                      {hasClaimed ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 mr-2" />
                          <span>Already Claimed</span>
                        </>
                      ) : (
                        <>
                          <Gift className="h-5 w-5 mr-2" />
                          <span>Claim Daily Reward</span>
                        </>
                      )}
                    </div>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tabs for Rewards and History */}
          <Tabs defaultValue="rewards" className="space-y-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto h-12">
              <TabsTrigger
                value="rewards"
                className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/10 data-[state=active]:to-orange-500/10"
              >
                Reward Tiers
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-purple-500/10"
              >
                Claim History
              </TabsTrigger>
            </TabsList>
            
            {/* Reward Tiers Tab */}
            <TabsContent value="rewards">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {rewardTiers.map((tier, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className={cn(
                      "border backdrop-blur-xl group transition-all duration-300 bg-card/50 overflow-hidden relative h-full",
                      tier.day <= currentStreak 
                        ? "border-white/20 bg-white/5" 
                        : "border-white/10",
                      tier.isSpecial && "ring-1 ring-amber-500/30"
                    )}>
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity",
                        tier.day <= currentStreak 
                          ? "from-green-500/10 to-emerald-600/10" 
                          : "from-zinc-500/5 to-zinc-600/5"
                      )} />
                      
                      <div className="absolute top-0 right-0 p-2">
                        {tier.day <= currentStreak ? (
                          <div className="rounded-full bg-green-500/20 p-1">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                          </div>
                        ) : (
                          <div className="rounded-full bg-zinc-800/50 p-1">
                            <LockIcon className="h-4 w-4 text-zinc-400" />
                          </div>
                        )}
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-lg",
                            `bg-gradient-to-r ${tier.color}`,
                            tier.day > currentStreak && "opacity-50"
                          )}>
                            {tier.icon}
                          </div>
                          <div>
                            <CardTitle className={cn(
                              "text-lg font-semibold",
                              tier.day <= currentStreak 
                                ? "text-white" 
                                : "text-white/70"
                            )}>
                              Day {tier.day}
                            </CardTitle>
                            <CardDescription className={cn(
                              tier.day <= currentStreak 
                                ? "text-zinc-300" 
                                : "text-zinc-500"
                            )}>
                              {tier.name}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className={cn(
                          "text-sm",
                          tier.day <= currentStreak 
                            ? "text-zinc-400" 
                            : "text-zinc-600"
                        )}>
                          {tier.description}
                        </p>
                        
                        <div className={cn(
                          "flex items-center gap-2 p-3 rounded-lg",
                          tier.day <= currentStreak 
                            ? "bg-white/10" 
                            : "bg-white/5"
                        )}>
                          <Gift className={cn(
                            "h-5 w-5",
                            tier.day <= currentStreak 
                              ? "text-amber-400" 
                              : "text-zinc-500"
                          )} />
                          <span className={cn(
                            "font-medium",
                            tier.day <= currentStreak 
                              ? "text-white" 
                              : "text-zinc-500"
                          )}>
                            {tier.reward}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            {/* History Tab */}
            <TabsContent value="history">
              <Card className="border backdrop-blur-xl border-white/10 bg-card/50 overflow-hidden">
                <CardHeader>
                  <CardTitle>Your Claim History</CardTitle>
                  <CardDescription>Track your daily reward claims</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockStreakHistory.map((item, index) => {
                      const date = new Date(item.date);
                      return (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              item.claimed 
                                ? "bg-green-500/20" 
                                : "bg-red-500/20"
                            )}>
                              {item.claimed ? (
                                <CheckCircle2 className="h-5 w-5 text-green-400" />
                              ) : (
                                <Clock className="h-5 w-5 text-red-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-white">
                                {date.toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                              <p className="text-sm text-zinc-400">
                                {item.claimed 
                                  ? "Reward claimed successfully" 
                                  : "Missed claim opportunity"}
                              </p>
                            </div>
                          </div>
                          
                          {item.claimed && (
                            <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                              Claimed
                            </div>
                          )}
                          
                          {!item.claimed && (
                            <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
                              Missed
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Claim Reward Dialog */}
      <AlertDialog open={showClaimDialog} onOpenChange={setShowClaimDialog}>
        <AlertDialogContent className="glass-card p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-center">
              Daily Reward Claimed!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-2">
                  <Gift className="h-10 w-10 text-white" />
                </div>
                
                {claimedReward && (
                  <>
                    <h3 className="text-lg font-semibold text-white">
                      {claimedReward.name}
                    </h3>
                    <div className="bg-white/10 px-4 py-2 rounded-lg font-medium text-amber-400">
                      {claimedReward.reward}
                    </div>
                    <p className="text-zinc-400 max-w-sm">
                      You've successfully claimed your day {currentStreak + 1} reward! Your new streak is {currentStreak + 1} days.
                    </p>
                  </>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={confirmClaim} 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              Awesome!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default DailyClaim; 