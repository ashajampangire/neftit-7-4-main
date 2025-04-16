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
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import {
  topUsers,
  neftLeaderboard,
  nftLeaderboard,
  currentUser,
} from "@/data/leaderboardData";
import TopUserCard from "@/components/leaderboard/TopUserCard";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState<"allTime" | "thisMonth">(
    "allTime"
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    <Layout className="bg-gradient-to-b from-[#0A0A0F] to-[#1A1A1F] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
      {/* Header */}
      <div className="container max-w-6xl mx-auto px-4 pt-6 pb-12 relative z-10">
        <div className="relative w-full mb-8">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-2xl font-semibold text-white">
              <Crown className="inline-block w-6 h-6 mr-2 mb-1 text-yellow-500" />
              Leaderboard
            </h1>
            <p className="text-sm text-white/60">
              Compete with the best in the NEFTIT ecosystem
            </p>
          </div>
        </div>

        {/* Controls and filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/20 p-4 rounded-lg border border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-black/40 border-white/10 hover:bg-purple-500/20 text-sm font-medium"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>

            <div className="flex p-1 bg-black/40 rounded-lg border border-white/10">
              <button
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  timeFilter === "allTime"
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white"
                }`}
                onClick={() => handleTimeFilterChange("allTime")}
              >
                All Time
              </button>
              <button
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  timeFilter === "thisMonth"
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white"
                }`}
                onClick={() => handleTimeFilterChange("thisMonth")}
              >
                This Month
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("twitter")}
              className="bg-black/40 border-white/10 hover:bg-purple-500/20 text-sm font-medium"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("discord")}
              className="bg-black/40 border-white/10 hover:bg-purple-500/20 text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Discord
            </Button>
            <Button
              onClick={handleBoostRank}
              size="sm"
              className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium"
            >
              <Award className="w-4 h-4 mr-2" />
              Boost Rank
            </Button>
          </div>
        </div>

        {/* Leaderboard tabs */}
        <Tabs defaultValue="neft" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/40 border border-white/10">
            <TabsTrigger
              value="neft"
              className="text-sm font-medium data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              NEFT Token Holders
            </TabsTrigger>
            <TabsTrigger
              value="nft"
              className="text-sm font-medium data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              NFT Holders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="neft" className="mt-0">
            <LeaderboardTable
              users={neftLeaderboard}
              displayType="neft"
              currentUser={currentUser}
            />
          </TabsContent>

          <TabsContent value="nft" className="mt-0">
            <LeaderboardTable
              users={nftLeaderboard}
              displayType="nft"
              currentUser={currentUser}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Leaderboard;
