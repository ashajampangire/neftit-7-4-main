import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Gift, Flame, Filter, ChevronRight, Clock, Award, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "@/styles/fonts.css";
import StarryBackground from "@/components/layout/StarryBackground";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// Types for our activity data
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
  // State for selected activity and modal
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Static activity data for demonstration
  const allActivities: ActivityItem[] = [
    {
      id: 1,
      type: "task",
      username: "You",
      item: "Completed 'Social Media Quest'",
      timestamp: "2 hours ago",
      details: "You shared NEFTIT on Twitter and completed the Social Media Quest. This helps grow our community!",
      reward: "50 XP, 1 Common NFT",
      status: "completed"
    },
    {
      id: 2,
      type: "claim",
      username: "You",
      item: "Claimed Platinum NFT",
      timestamp: "Yesterday",
      details: "You successfully claimed a Platinum NFT from the marketplace. This NFT has special properties and increased staking rewards.",
      reward: "Platinum NFT #4531",
      status: "completed"
    },
    {
      id: 3,
      type: "burn",
      username: "You",
      item: "Burned 5 Common NFTs for 1 Rare NFT",
      timestamp: "3 days ago",
      details: "You burned 5 Common NFTs in exchange for 1 Rare NFT. This is a great way to upgrade your collection!",
      reward: "1 Rare NFT, 200 XP",
      status: "completed"
    },
    {
      id: 4,
      type: "task",
      username: "You",
      item: "Completed 'Twitter Share Quest'",
      timestamp: "1 week ago",
      details: "You shared your NFT collection on Twitter and earned rewards. Community engagement helps NEFTIT grow!",
      reward: "25 XP, 50 NEFT tokens",
      status: "completed"
    },
    {
      id: 5,
      type: "claim",
      username: "You",
      item: "Claimed Silver NFT",
      timestamp: "2 weeks ago",
      details: "You claimed a Silver NFT from the rewards pool. This NFT has medium rarity and good staking benefits.",
      reward: "Silver NFT #2156",
      status: "completed"
    },
    {
      id: 6,
      type: "burn",
      username: "You",
      item: "Burned 3 Common NFTs for 500 points",
      timestamp: "3 weeks ago",
      details: "You burned 3 Common NFTs in exchange for 500 platform points. These points can be used for various rewards and upgrades.",
      reward: "500 Platform Points",
      status: "completed"
    },
    {
      id: 7,
      type: "task",
      username: "You",
      item: "Completed 'Daily Login Streak'",
      timestamp: "1 month ago",
      details: "You maintained a 7-day login streak and earned bonus rewards. Consistency pays off!",
      reward: "100 XP, 25 NEFT tokens",
      status: "completed"
    },
    {
      id: 8,
      type: "claim",
      username: "You",
      item: "Claimed Gold NFT",
      timestamp: "1 month ago",
      details: "You claimed a Gold NFT from the special event. This NFT has high rarity and excellent staking rewards.",
      reward: "Gold NFT #876",
      status: "completed"
    },
  ];

  // State for filter
  const [filter, setFilter] = useState<ActivityType | "all">("all");

  // Filter activities based on selected filter
  const filteredActivities = filter === "all" 
    ? allActivities 
    : allActivities.filter(activity => activity.type === filter);

  // Count activities by type
  const taskCount = allActivities.filter(a => a.type === "task").length;
  const claimCount = allActivities.filter(a => a.type === "claim").length;
  const burnCount = allActivities.filter(a => a.type === "burn").length;

  // Get icon for activity type
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "task":
        return <Trophy className="h-5 w-5 text-purple-400" />;
      case "claim":
        return <Gift className="h-5 w-5 text-blue-400" />;
      case "burn":
        return <Flame className="h-5 w-5 text-orange-400" />;
      default:
        return <ChevronRight className="h-5 w-5 text-white" />;
    }
  };

  // Get background color class for activity type
  const getActivityBgClass = (type: ActivityType) => {
    switch (type) {
      case "task":
        return "from-purple-500/20 to-purple-700/20 hover:from-purple-500/30 hover:to-purple-700/30";
      case "claim":
        return "from-blue-500/20 to-blue-700/20 hover:from-blue-500/30 hover:to-blue-700/30";
      case "burn":
        return "from-orange-500/20 to-red-700/20 hover:from-orange-500/30 hover:to-red-700/30";
      default:
        return "from-gray-500/20 to-gray-700/20";
    }
  };

  // Handle view details click
  const handleViewDetails = (activity: ActivityItem) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

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

  return (
    <Layout className="bg-background">
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>
      <div className="h-full flex flex-col relative z-10">
        <div className="container max-w-4xl mx-auto px-4 flex flex-col h-full">
          {/* Header */}
          <motion.div 
            className="flex flex-col items-start mb-6 py-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Activity Log
            </motion.h1>
            <motion.p 
              className="text-zinc-400 text-lg mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Track your journey in the NEFTIT ecosystem
            </motion.p>

            {/* Quick Stats */}
            <motion.div 
              className="flex flex-wrap items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-zinc-400 text-sm">{taskCount} Tasks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-zinc-400 text-sm">{claimCount} Claims</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-zinc-400 text-sm">{burnCount} Burns</span>
              </div>
            </motion.div>
          </motion.div>

          <ScrollArea className="flex-1 pr-4 -mr-4">
            <motion.div 
              className="space-y-6 pb-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {/* Activity Stats Summary */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={itemVariants}
              >
                <StatCard 
                  icon={<Trophy className="h-6 w-6 text-purple-400" />}
                  title="Tasks Completed"
                  value={taskCount.toString()}
                  description="Quests and challenges completed"
                  colorClass="from-purple-500/10 to-purple-700/10 hover:from-purple-500/20 hover:to-purple-700/20"
                />
                <StatCard 
                  icon={<Gift className="h-6 w-6 text-blue-400" />}
                  title="NFTs Claimed"
                  value={claimCount.toString()}
                  description="Unique NFTs in your collection"
                  colorClass="from-blue-500/10 to-blue-700/10 hover:from-blue-500/20 hover:to-blue-700/20"
                />
                <StatCard 
                  icon={<Flame className="h-6 w-6 text-orange-400" />}
                  title="NFTs Burned"
                  value={burnCount.toString()}
                  description="NFTs burned for upgrades"
                  colorClass="from-orange-500/10 to-red-700/10 hover:from-orange-500/20 hover:to-red-700/20"
                />
              </motion.div>

              {/* Filter Buttons */}
              <motion.div 
                className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm"
                variants={itemVariants}
              >
                <div className="flex items-center mr-2">
                  <Filter className="h-4 w-4 text-zinc-400 mr-2" />
                  <span className="text-sm font-medium text-zinc-300">Filter by:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <FilterButton 
                    active={filter === "all"} 
                    onClick={() => setFilter("all")}
                  >
                    All Activities
                  </FilterButton>
                  <FilterButton 
                    active={filter === "task"} 
                    onClick={() => setFilter("task")}
                    icon={<Trophy className="h-4 w-4" />}
                    colorClass="from-purple-500/30 to-purple-700/30"
                  >
                    Tasks
                  </FilterButton>
                  <FilterButton 
                    active={filter === "claim"} 
                    onClick={() => setFilter("claim")}
                    icon={<Gift className="h-4 w-4" />}
                    colorClass="from-blue-500/30 to-blue-700/30"
                  >
                    Claims
                  </FilterButton>
                  <FilterButton 
                    active={filter === "burn"} 
                    onClick={() => setFilter("burn")}
                    icon={<Flame className="h-4 w-4" />}
                    colorClass="from-orange-500/30 to-red-700/30"
                  >
                    Burns
                  </FilterButton>
                </div>
              </motion.div>

              {/* Activity List */}
              <motion.div 
                className="space-y-3"
                variants={containerVariants}
              >
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <motion.div
                    key={activity.id}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border border-white/10 transition-all",
                        "bg-gradient-to-r bg-card/50 backdrop-blur-sm group cursor-pointer",
                        "hover:border-white/20"
                      )}
                      onClick={() => handleViewDetails(activity)}
                  >
                    <div className={cn(
                      "flex-shrink-0 p-2 rounded-full transition-colors",
                        "bg-gradient-to-br",
                        getActivityBgClass(activity.type)
                    )}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-white truncate group-hover:text-white/90 transition-colors">
                        {activity.item}
                      </p>
                        <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        {activity.timestamp}
                      </p>
                    </div>
                      <motion.div 
                        className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-300 transition-colors"
                        whileHover={{ x: 3 }}
                      >
                        <span className="text-sm hidden sm:inline">View Details</span>
                      <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center justify-center py-12 px-4 text-center bg-card/50 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <div className="w-16 h-16 rounded-full bg-zinc-800/80 flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-zinc-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No Activities Yet</h3>
                    <p className="text-zinc-400 max-w-sm">
                      Complete tasks, claim rewards or burn NFTs to see your activity history here.
                    </p>
                    <Button
                      className="mt-6 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                      onClick={() => setFilter("all")}
                    >
                      Explore Tasks
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </ScrollArea>
        </div>
      </div>

      {/* Activity Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-card/90 backdrop-blur-xl border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Activity Details
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-zinc-400 hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          {selectedActivity && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "flex-shrink-0 p-3 rounded-full",
                  "bg-gradient-to-br",
                  getActivityBgClass(selectedActivity.type)
                )}>
                  {getActivityIcon(selectedActivity.type)}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {selectedActivity.item}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {selectedActivity.timestamp}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-black/40 rounded-lg border border-white/10">
                  <p className="text-zinc-300">
                    {selectedActivity.details}
                  </p>
                </div>
                
                {selectedActivity.reward && (
                  <div className="flex justify-between items-center p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-emerald-400" />
                      <span className="font-medium">Reward</span>
                    </div>
                    <span className="text-emerald-300">{selectedActivity.reward}</span>
                  </div>
                )}
                
                {selectedActivity.status && (
                  <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-400" />
                      <span className="font-medium">Status</span>
                    </div>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      selectedActivity.status === "completed" ? "bg-green-500/20 text-green-300" : 
                      selectedActivity.status === "pending" ? "bg-amber-500/20 text-amber-300" :
                      "bg-red-500/20 text-red-300"
                    )}>
                      {selectedActivity.status.charAt(0).toUpperCase() + selectedActivity.status.slice(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

// Stat card component
const StatCard = ({ 
  icon, 
  title, 
  value,
  description,
  colorClass
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string;
  description: string;
  colorClass?: string;
}) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="border backdrop-blur-xl group hover:border-white/20 transition-all duration-300 bg-card/50 border-white/10 overflow-hidden relative h-full">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity", 
          colorClass || "from-white/10 to-white/5"
        )} />
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
          <div className="flex-shrink-0 p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
            {icon}
          </div>
            <span className="text-3xl font-bold text-white">{value}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <h3 className="font-semibold text-white mb-1 group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
            {description}
          </p>
      </CardContent>
    </Card>
    </motion.div>
  );
};

// Filter button component
const FilterButton = ({ 
  children, 
  active, 
  onClick,
  icon,
  colorClass
}: { 
  children: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
  icon?: React.ReactNode;
  colorClass?: string;
}) => {
  const getColorClasses = () => {
    if (active) {
      return colorClass || "bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white";
    }
    return "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white";
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
        variant="ghost"
        size="sm"
      onClick={onClick}
        className={cn(
          "rounded-full border-none transition-all duration-300",
          getColorClasses()
        )}
    >
        {icon && <span className="mr-1">{icon}</span>}
      {children}
    </Button>
    </motion.div>
  );
};

export default Activity;
