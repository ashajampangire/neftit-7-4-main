import { motion } from "framer-motion";
import { Trophy, Zap, Lock, Coins } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Achievement, filterAchievements } from "@/lib/achievements";

interface AchievementGridProps {
  achievements: Achievement[];
  activeCategory: string;
}

export const AchievementGrid = ({
  achievements,
  activeCategory,
}: AchievementGridProps) => {
  const filteredAchievements = filterAchievements(achievements, activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {filteredAchievements.map((achievement) => (
        <motion.div
          key={achievement.id}
          layout
          className="group relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className={cn(
              "relative bg-[#171923] backdrop-blur-xl rounded-xl border transition-all duration-300",
              achievement.status === "completed"
                ? "border-[#38B2AC]/50 hover:border-[#38B2AC]"
                : achievement.status === "in-progress"
                ? "border-[#2D3748]/50 hover:border-[#38B2AC]/50"
                : "border-[#2D3748]/50 opacity-80"
            )}
          >
            {/* Achievement Image */}
            <div className="relative aspect-square rounded-t-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              <img
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {achievement.status === "locked" && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white/80" />
                </div>
              )}

              {/* Status Badge */}
              <div
                className={cn(
                  "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md",
                  achievement.status === "completed" &&
                    "bg-[#38B2AC]/20 text-[#38B2AC] border border-[#38B2AC]/30",
                  achievement.status === "in-progress" &&
                    "bg-[#F6AD55]/20 text-[#F6AD55] border border-[#F6AD55]/30",
                  achievement.status === "locked" &&
                    "bg-white/10 text-white/70 border border-white/20"
                )}
              >
                {achievement.status === "completed"
                  ? "Completed"
                  : achievement.status === "in-progress"
                  ? "In Progress"
                  : "Locked"}
              </div>

              {/* Achievement Tier Badge */}
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-md bg-black/40 border border-white/10 text-white/90">
                Tier {achievement.tier}
              </div>
            </div>

            {/* Achievement Info */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1 font-sora group-hover:text-[#38B2AC] transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-sm text-[#94A3B8]">
                  {achievement.description}
                </p>
              </div>

              {/* Progress Bar */}
              {achievement.status === "in-progress" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Progress</span>
                    <span className="text-white font-medium">
                      {achievement.currentValue}/{achievement.targetValue}
                    </span>
                  </div>
                  <Progress
                    value={
                      (achievement.currentValue / achievement.targetValue) * 100
                    }
                    className="h-2 [&>div]:bg-[#38B2AC] bg-white/5"
                  />
                </div>
              )}

              {/* Rewards */}
              <div className="flex items-center justify-between pt-4 border-t border-[#2D3748]/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#38B2AC]/20 flex items-center justify-center">
                      <Coins className="w-4 h-4 text-[#38B2AC]" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {achievement.neftReward} NEFT
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#805AD5]/20 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-[#805AD5]" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      +{achievement.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {filteredAchievements.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full text-center py-12"
        >
          <Trophy className="w-12 h-12 text-[#38B2AC]/40 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">
            No Achievements Found
          </h3>
          <p className="text-[#94A3B8]">
            No achievements match your current filter selection
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
