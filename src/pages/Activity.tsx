import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Trophy,
  Gift,
  Flame,
  Filter,
  ChevronRight,
  Clock,
  Zap,
  X,
  Search,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import StarryBackground from "@/components/layout/StarryBackground";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type ActivityType = "task" | "claim" | "burn";

interface ActivityItem {
  id: number;
  type: ActivityType;
  username: string;
  item: string;
  timestamp: string;
  details?: string;
  reward?: string;
  status?: "completed" | "pending" | "failed";
}

const Activity = () => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<ActivityType | "all">("all");

  // Static activity data remains the same
  const allActivities: ActivityItem[] = [
    {
      id: 1,
      type: "task",
      username: "You",
      item: "Completed 'Social Media Quest'",
      timestamp: "2 hours ago",
      details:
        "You shared NEFTIT on Twitter and completed the Social Media Quest. This helps grow our community!",
      reward: "50 XP, 1 Common NFT",
      status: "completed",
    },
    {
      id: 2,
      type: "claim",
      username: "You",
      item: "Claimed Platinum NFT",
      timestamp: "Yesterday",
      details:
        "You successfully claimed a Platinum NFT from the marketplace. This NFT has special properties and increased staking rewards.",
      reward: "Platinum NFT #4531",
      status: "completed",
    },
    {
      id: 3,
      type: "burn",
      username: "You",
      item: "Burned 5 Common NFTs for 1 Rare NFT",
      timestamp: "3 days ago",
      details:
        "You burned 5 Common NFTs in exchange for 1 Rare NFT. This is a great way to upgrade your collection!",
      reward: "1 Rare NFT, 200 XP",
      status: "completed",
    },
    {
      id: 4,
      type: "task",
      username: "You",
      item: "Completed 'Twitter Share Quest'",
      timestamp: "1 week ago",
      details:
        "You shared your NFT collection on Twitter and earned rewards. Community engagement helps NEFTIT grow!",
      reward: "25 XP, 50 NEFT tokens",
      status: "completed",
    },
    {
      id: 5,
      type: "claim",
      username: "You",
      item: "Claimed Silver NFT",
      timestamp: "2 weeks ago",
      details:
        "You claimed a Silver NFT from the rewards pool. This NFT has medium rarity and good staking benefits.",
      reward: "Silver NFT #2156",
      status: "completed",
    },
    {
      id: 6,
      type: "burn",
      username: "You",
      item: "Burned 3 Common NFTs for 500 points",
      timestamp: "3 weeks ago",
      details:
        "You burned 3 Common NFTs in exchange for 500 platform points. These points can be used for various rewards and upgrades.",
      reward: "500 Platform Points",
      status: "completed",
    },
    {
      id: 7,
      type: "task",
      username: "You",
      item: "Completed 'Daily Login Streak'",
      timestamp: "1 month ago",
      details:
        "You maintained a 7-day login streak and earned bonus rewards. Consistency pays off!",
      reward: "100 XP, 25 NEFT tokens",
      status: "completed",
    },
    {
      id: 8,
      type: "claim",
      username: "You",
      item: "Claimed Gold NFT",
      timestamp: "1 month ago",
      details:
        "You claimed a Gold NFT from the special event. This NFT has high rarity and excellent staking rewards.",
      reward: "Gold NFT #876",
      status: "completed",
    },
  ];

  const filteredActivities =
    filter === "all"
      ? allActivities
      : allActivities.filter((activity) => activity.type === filter);

  const taskCount = allActivities.filter((a) => a.type === "task").length;
  const claimCount = allActivities.filter((a) => a.type === "claim").length;
  const burnCount = allActivities.filter((a) => a.type === "burn").length;

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "task":
        return <Trophy className="h-5 w-5 text-[#38B2AC]" />;
      case "claim":
        return <Gift className="h-5 w-5 text-[#38B2AC]" />;
      case "burn":
        return <Flame className="h-5 w-5 text-[#38B2AC]" />;
    }
  };

  const getActivityBgClass = (type: ActivityType) => {
    switch (type) {
      case "task":
        return "from-[#38B2AC]/20 to-[#38B2AC]/10";
      case "claim":
        return "from-[#38B2AC]/20 to-[#38B2AC]/10";
      case "burn":
        return "from-[#38B2AC]/20 to-[#38B2AC]/10";
    }
  };

  const handleViewDetails = (activity: ActivityItem) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0F1114]">
      <StarryBackground />
      <Layout>
        <main className="container relative mx-auto px-4 pb-16">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="border-b border-[#2D3748]/50 pb-4 md:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-sora tracking-tight text-white">
                    Activity Log
                  </h1>
                  <p className="text-sm sm:text-base font-sora text-[#94A3B8] max-w-2xl mt-1">
                    Track your journey, achievements, and rewards in the NEFTIT
                    ecosystem
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              {[
                { icon: Trophy, label: "Tasks Completed", value: taskCount },
                { icon: Gift, label: "NFTs Claimed", value: claimCount },
                { icon: Flame, label: "NFTs Burned", value: burnCount },
                {
                  icon: Clock,
                  label: "Last 30 Days",
                  value: allActivities.length,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-2 sm:p-3 md:p-4 rounded-lg bg-[#171923] border border-[#2D3748]/50 flex items-center gap-2 sm:gap-3"
                >
                  <div className="p-1.5 sm:p-2 rounded-lg bg-[#1A202C]">
                    <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38B2AC]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm text-[#94A3B8] truncate">
                      {stat.label}
                    </div>
                    <div className="text-sm sm:text-base md:text-xl font-bold text-white truncate">
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search and Filters */}
            <div className="bg-[#171923] rounded-lg md:rounded-xl border border-[#2D3748]/50 p-3 md:p-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <div className="flex-1 relative">
                  <div className="relative rounded-lg">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#94A3B8]" />
                    <input
                      type="text"
                      placeholder="Search activities..."
                      className="w-full bg-[#1A202C] py-2 sm:py-3 pl-9 sm:pl-12 pr-3 sm:pr-4 rounded-lg text-sm sm:text-base text-white placeholder-[#718096] font-sora focus:outline-none focus:ring-1 focus:ring-[#38B2AC]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                { id: "all", label: "All Activities" },
                { id: "task", label: "Tasks", icon: Trophy },
                { id: "claim", label: "Claims", icon: Gift },
                { id: "burn", label: "Burns", icon: Flame },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id as ActivityType | "all")}
                  className={cn(
                    "px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-sora transition-colors duration-200 text-xs sm:text-sm flex items-center gap-2",
                    filter === category.id
                      ? "bg-[#38B2AC] text-white"
                      : "bg-[#171923] text-[#94A3B8] border border-[#2D3748]/50 hover:border-[#4A5568]"
                  )}
                >
                  {category.icon && (
                    <category.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                  {category.label}
                </button>
              ))}
            </div>

            {/* Activities List */}
            <div className="space-y-3">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    onClick={() => handleViewDetails(activity)}
                    className="rounded-xl bg-[#171923] border border-[#2D3748]/50 hover:border-[#38B2AC]/50 hover:shadow-lg hover:shadow-[#38B2AC]/10 transition-all duration-200 cursor-pointer p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-[#1A202C]">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold font-sora text-white mb-1 truncate">
                          {activity.item}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                          <span>{activity.timestamp}</span>
                          {activity.status && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-[#2D3748]"></span>
                              <span
                                className={cn(
                                  "px-2 py-0.5 rounded-full text-xs",
                                  activity.status === "completed"
                                    ? "bg-[#38B2AC]/20 text-[#38B2AC]"
                                    : activity.status === "pending"
                                    ? "bg-[#F6AD55]/20 text-[#F6AD55]"
                                    : "bg-[#F56565]/20 text-[#F56565]"
                                )}
                              >
                                {activity.status}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#94A3B8]" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-[#171923] rounded-xl border border-[#2D3748]/50">
                  <Clock className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    No Activities Found
                  </h3>
                  <p className="text-[#94A3B8]">
                    Complete tasks, claim rewards or burn NFTs to see your
                    activity history here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Activity Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-[#171923] border-[#2D3748]/50 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold font-sora">
                Activity Details
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 text-[#94A3B8] hover:text-white"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>

            {selectedActivity && (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#1A202C]">
                    {getActivityIcon(selectedActivity.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-sora text-white mb-1">
                      {selectedActivity.item}
                    </h3>
                    <p className="text-sm text-[#94A3B8]">
                      {selectedActivity.timestamp}
                    </p>
                  </div>
                </div>

                {selectedActivity.details && (
                  <div className="p-4 rounded-lg bg-[#1A202C] border border-[#2D3748]/50">
                    <p className="text-[#94A3B8]">{selectedActivity.details}</p>
                  </div>
                )}

                {selectedActivity.reward && (
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A202C] border border-[#2D3748]/50">
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-[#38B2AC]" />
                      <span className="font-medium text-white">Reward</span>
                    </div>
                    <span className="text-[#38B2AC]">
                      {selectedActivity.reward}
                    </span>
                  </div>
                )}

                {selectedActivity.status && (
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A202C] border border-[#2D3748]/50">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-[#38B2AC]" />
                      <span className="font-medium text-white">Status</span>
                    </div>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        selectedActivity.status === "completed"
                          ? "bg-[#38B2AC]/20 text-[#38B2AC]"
                          : selectedActivity.status === "pending"
                          ? "bg-[#F6AD55]/20 text-[#F6AD55]"
                          : "bg-[#F56565]/20 text-[#F56565]"
                      )}
                    >
                      {selectedActivity.status}
                    </span>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button
                className="w-full bg-[#38B2AC] hover:bg-[#319795] text-white font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Layout>
    </div>
  );
};

export default Activity;
