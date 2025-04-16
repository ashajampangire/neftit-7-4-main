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
    <div className="min-h-screen bg-background">
      <StarryBackground />
      <Layout>
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="container relative mx-auto px-4 pb-16"
        >
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="border-b border-border/50 pb-4 md:pb-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
                <div>
                  <h1 className="font-site-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Activity Log
                  </h1>
                  <p className="font-site-body text-sm sm:text-base text-muted-foreground max-w-2xl mt-1">
                    Track your journey, achievements, and rewards in the NEFTIT
                    ecosystem
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3"
            >
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
                <Card key={index} className="glass-card p-2 sm:p-3 md:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-background/60">
                      <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm text-muted-foreground truncate">
                        {stat.label}
                      </div>
                      <div className="text-sm sm:text-base md:text-xl font-bold text-foreground truncate">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-3 md:p-4"
            >
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <div className="flex-1 relative">
                  <div className="relative rounded-lg">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search activities..."
                      className="w-full bg-background/60 py-2 sm:py-3 pl-9 sm:pl-12 pr-3 sm:pr-4 rounded-lg text-sm sm:text-base text-foreground placeholder:text-muted-foreground font-site-body focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-1.5 sm:gap-2"
            >
              {[
                { id: "all", label: "All Activities" },
                { id: "task", label: "Tasks", icon: Trophy },
                { id: "claim", label: "Claims", icon: Gift },
                { id: "burn", label: "Burns", icon: Flame },
              ].map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setFilter(category.id as ActivityType | "all")}
                  variant={filter === category.id ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "font-site-body text-xs sm:text-sm flex items-center gap-2",
                    filter === category.id &&
                      "bg-primary text-primary-foreground"
                  )}
                >
                  {category.icon && (
                    <category.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                  {category.label}
                </Button>
              ))}
            </motion.div>

            {/* Activities List */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    whileHover={{ scale: 1.005 }}
                    onClick={() => handleViewDetails(activity)}
                    className="glass-card p-4 hover:border-primary/50 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-background/60">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-site-heading text-base sm:text-lg font-bold text-foreground mb-1 truncate">
                          {activity.item}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{activity.timestamp}</span>
                          {activity.status && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-border"></span>
                              <span
                                className={cn(
                                  "px-2 py-0.5 rounded-full text-xs",
                                  activity.status === "completed"
                                    ? "bg-primary/20 text-primary"
                                    : activity.status === "pending"
                                      ? "bg-yellow-500/20 text-yellow-500"
                                      : "bg-destructive/20 text-destructive"
                                )}
                              >
                                {activity.status}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card text-center py-12"
                >
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-site-heading text-lg font-bold text-foreground mb-2">
                    No Activities Found
                  </h3>
                  <p className="font-site-body text-muted-foreground">
                    Complete tasks, claim rewards or burn NFTs to see your
                    activity history here.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.main>

        {/* Activity Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="glass-card max-w-md">
            <DialogHeader>
              <DialogTitle className="font-site-heading text-xl">
                Activity Details
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>

            {selectedActivity && (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-background/60">
                    {getActivityIcon(selectedActivity.type)}
                  </div>
                  <div>
                    <h3 className="font-site-heading text-lg font-bold text-foreground mb-1">
                      {selectedActivity.item}
                    </h3>
                    <p className="font-site-body text-sm text-muted-foreground">
                      {selectedActivity.timestamp}
                    </p>
                  </div>
                </div>

                {selectedActivity.details && (
                  <div className="glass-card p-4">
                    <p className="font-site-body text-muted-foreground">
                      {selectedActivity.details}
                    </p>
                  </div>
                )}

                {selectedActivity.reward && (
                  <div className="glass-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">
                        Reward
                      </span>
                    </div>
                    <span className="text-primary">
                      {selectedActivity.reward}
                    </span>
                  </div>
                )}

                {selectedActivity.status && (
                  <div className="glass-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">
                        Status
                      </span>
                    </div>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        selectedActivity.status === "completed"
                          ? "bg-primary/20 text-primary"
                          : selectedActivity.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-destructive/20 text-destructive"
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
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
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
