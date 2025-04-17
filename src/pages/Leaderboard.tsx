import React, { useState } from "react";
import {
  Share2,
  Twitter,
  MessageSquare,
  Award,
  RefreshCw,
  Trophy,
  Gift,
  Crown,
  ChevronUp,
  Users,
  Clock,
  Zap,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import {
  neftLeaderboard,
  nftLeaderboard,
  currentUser,
} from "@/data/leaderboardData";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState<"allTime" | "thisMonth">(
    "allTime"
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("neft");

  const handleTimeFilterChange = (value: "allTime" | "thisMonth") => {
    setTimeFilter(value);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success(
        "Leaderboard Updated: The latest rankings have been loaded."
      );
    }, 1000);
  };

  const handleShare = (platform: "twitter" | "discord") => {
    const message = `🏆 Ranked #${currentUser.rank} on NEFTIT! Join the competition and climb the ranks! 🚀`;

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    } else {
      navigator.clipboard.writeText(message);
      toast.success("Message Copied: Share your achievement on Discord!");
    }
  };

  const handleBoostRank = () => {
    toast.success(
      "Boost Your Rank: Buy more NEFT tokens or NFTs to climb up the leaderboard!"
    );
  };

  return (
    <div className="min-h-screen bg-[#0F1114] font-sora relative overflow-hidden">
      {/* Dark Background */}
      <div className="fixed inset-0 bg-[#0F1114]" />
      
      <div className="relative">
        <main className="container max-w-7xl mx-auto px-4 pt-6 mt-4 pb-10 md:pb-16 relative z-10">
          {/* Page Header */}
          <div className="border-b border-[#2D3748]/50 pb-4 md:pb-6 mt-0 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-0 pt-0 flex items-center gap-2">
                  <Crown className="h-7 w-7 text-yellow-500" />
                  Leaderboard
                </h1>
                <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mt-1">
                  Compete with the best in the NEFTIT ecosystem and earn exclusive rewards
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 items-center self-end sm:self-auto mt-2 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="bg-[#171923] border-[#2D3748]/50 hover:bg-[#1A202C] text-white"
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </Button>
                <Button
                  onClick={handleBoostRank}
                  size="sm"
                  className="bg-[#38B2AC] hover:bg-[#319795] text-white"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Boost Rank
                </Button>
              </div>
            </div>
          </div>
        
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-4 md:py-6"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6 md:mb-8">
              {[
                { 
                  icon: <Users className="h-4 h-4 sm:w-5 sm:h-5 text-[#38B2AC]" />,
                  label: "Total Players",
                  value: "1,458",
                },
                { 
                  icon: <Trophy className="h-4 h-4 sm:w-5 sm:h-5 text-[#38B2AC]" />,
                  label: "Rewards Given",
                  value: "24,628 NEFT",
                },
                { 
                  icon: <Clock className="h-4 h-4 sm:w-5 sm:h-5 text-[#38B2AC]" />,
                  label: "Next Reset",
                  value: "23h 45m",
                },
                { 
                  icon: <Shield className="h-4 h-4 sm:w-5 sm:h-5 text-[#38B2AC]" />,
                  label: "Your Position",
                  value: `#${currentUser.rank}`,
                  info: (
                    <div className="text-xs font-medium px-2 py-1 rounded-full bg-[#38B2AC]/20 text-[#38B2AC] flex items-center gap-1">
                      <ChevronUp className="h-3 w-3" />
                      5
                    </div>
                  )
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.1) }}
                  className="p-2 sm:p-3 md:p-4 rounded-lg bg-[#171923] border border-[#2D3748]/50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-[#1A202C] flex-shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-[#A0AEC0]">{stat.label}</div>
                      <div className="text-sm sm:text-base md:text-lg font-bold text-white">{stat.value}</div>
                    </div>
                  </div>
                  {stat.info && (
                    <div>{stat.info}</div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Filters and Tabs */}
            <div className="mb-6 md:mb-8 bg-[#171923] rounded-lg md:rounded-xl border border-[#2D3748]/50 p-3 md:p-4">
              <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-4">
                {/* Time Filter */}
                <div className="flex p-1 bg-[#1A202C] rounded-lg">
                  <button
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                      timeFilter === "allTime"
                        ? "bg-[#38B2AC] text-white"
                        : "text-[#94A3B8] hover:text-white"
                    )}
                    onClick={() => handleTimeFilterChange("allTime")}
                  >
                    All Time
                  </button>
                  <button
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                      timeFilter === "thisMonth"
                        ? "bg-[#38B2AC] text-white"
                        : "text-[#94A3B8] hover:text-white"
                    )}
                    onClick={() => handleTimeFilterChange("thisMonth")}
                  >
                    This Month
                  </button>
                </div>
                
                {/* Social Sharing */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("twitter")}
                    className="bg-[#1A202C] border-[#2D3748]/50 hover:bg-[#2D3748] text-white text-xs"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Share on Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("discord")}
                    className="bg-[#1A202C] border-[#2D3748]/50 hover:bg-[#2D3748] text-white text-xs hidden sm:flex"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Copy for Discord
                  </Button>
                </div>
              </div>
            </div>
  
            {/* Leaderboard tabs */}
            <Tabs 
              defaultValue="neft" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#171923] border border-[#2D3748]/50 p-1 rounded-lg">
                <TabsTrigger
                  value="neft"
                  className="text-sm font-medium rounded-lg data-[state=active]:bg-[#38B2AC] data-[state=active]:text-white"
                >
                  NEFT Token Holders
                </TabsTrigger>
                <TabsTrigger
                  value="nft"
                  className="text-sm font-medium rounded-lg data-[state=active]:bg-[#38B2AC] data-[state=active]:text-white"
                >
                  NFT Holders
                </TabsTrigger>
              </TabsList>
  
              <TabsContent value="neft" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LeaderboardTable
                    users={neftLeaderboard}
                    displayType="neft"
                    currentUser={currentUser}
                    className="bg-[#171923] border-[#2D3748]/50"
                  />
                </motion.div>
              </TabsContent>
  
              <TabsContent value="nft" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LeaderboardTable
                    users={nftLeaderboard}
                    displayType="nft"
                    currentUser={currentUser}
                    className="bg-[#171923] border-[#2D3748]/50"
                  />
                </motion.div>
              </TabsContent>
            </Tabs>
            
            {/* Disclaimer */}
            <div className="mt-8 px-4 py-4 bg-[#171923] rounded-lg border border-[#2D3748]/50 text-sm text-[#94A3B8]">
              <p>
                Leaderboard rankings are updated daily. Complete tasks, stake NFTs, and participate in the ecosystem to climb the ranks. Top players receive exclusive rewards each month.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
