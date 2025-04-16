import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterTabs } from "@/components/FilterTabs";
import { AchievementGrid } from "@/components/AchievementGrid";
import { HistoryModal } from "@/components/HistoryModal";
import { mockAchievements, getAchievementCount } from "@/lib/achievements";
import { Award, ChevronDown, Trophy, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { MainNav } from "@/components/layout/MainNav";
import { Progress } from "@/components/ui/progress";

const Achievements = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [achievements, setAchievements] = useState(mockAchievements);
  const { toast } = useToast();

  // Stats about achievements
  const { total, completed, inProgress } = getAchievementCount(achievements);
  const completionPercentage = Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen bg-[#0F1114] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-[#0F1114] to-[#0F1114]"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      <MainNav />
      <div className="container relative mx-auto px-4 py-12 max-w-6xl pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-0"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#38B2AC]/20">
                  <Award className="w-8 h-8 text-[#38B2AC]" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white font-sora">
                    Achievements
                  </h1>
                  <p className="text-[#94A3B8] mt-1 font-sora">
                    Complete tasks and earn exclusive NEFT rewards
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="text-sm text-[#94A3B8]">
                      <span className="text-[#38B2AC] font-medium">250</span>{" "}
                      Points
                    </div>
                    <div className="text-sm text-[#94A3B8]">
                      <span className="text-[#38B2AC] font-medium">Silver</span>{" "}
                      Rank
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#38B2AC]" />
                  <p className="text-2xl font-bold text-white font-sora">
                    {completed}
                    <span className="text-[#94A3B8] text-lg font-sora">
                      {" "}
                      / {total}
                    </span>
                  </p>
                </div>
                <div className="mt-2">
                  <Progress
                    value={completionPercentage}
                    className="h-2 w-32 [&>div]:bg-[#38B2AC] bg-white/5"
                  />
                </div>
              </div>
              <HistoryModal achievements={achievements} />
            </div>
          </div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
          >
            <div className="relative group">
              <div className="relative bg-[#171923] backdrop-blur-xl p-6 rounded-xl border border-[#2D3748]/50 hover:border-[#38B2AC]/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-[#38B2AC]/20">
                    <Trophy className="w-6 h-6 text-[#38B2AC]" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white font-sora">
                      {total}
                    </p>
                    <p className="text-[#94A3B8] font-sora">
                      Total Achievements
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-[#171923] backdrop-blur-xl p-6 rounded-xl border border-[#2D3748]/50 hover:border-[#38B2AC]/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-[#38B2AC]/20">
                    <Sparkles className="w-6 h-6 text-[#38B2AC]" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white font-sora">
                      {completed}
                    </p>
                    <p className="text-[#94A3B8] font-sora">Completed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative bg-[#171923] backdrop-blur-xl p-6 rounded-xl border border-[#2D3748]/50 hover:border-[#38B2AC]/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-[#38B2AC]/20">
                    <Target className="w-6 h-6 text-[#38B2AC]" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white font-sora">
                      {inProgress}
                    </p>
                    <p className="text-[#94A3B8] font-sora">In Progress</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <Separator className="my-8 opacity-20" />

          {/* Filter Tabs */}
          <FilterTabs
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Achievements Grid */}
          <AnimatePresence mode="wait">
            <AchievementGrid
              key={activeCategory}
              achievements={achievements}
              activeCategory={activeCategory}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Achievements;
