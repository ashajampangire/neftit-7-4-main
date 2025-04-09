import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Crown, Medal, Star, Trophy, Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  progress: number;
  maxProgress: number;
  reward: {
    xp: number;
    coins?: number;
    nft?: string;
  };
  unlockedAt: string | null;
}

const rarityConfig = {
  Common: {
    color: 'text-[#36F9F6]',
    bgColor: 'bg-[#36F9F6]',
    icon: Trophy
  },
  Rare: {
    color: 'text-[#9D9BF3]',
    bgColor: 'bg-[#9D9BF3]',
    icon: Medal
  },
  Epic: {
    color: 'text-[#FF2E63]',
    bgColor: 'bg-[#FF2E63]',
    icon: Crown
  },
  Legendary: {
    color: 'text-[#FFD700]',
    bgColor: 'bg-[#FFD700]',
    icon: Star
  }
};

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Early Adopter',
    description: 'Join during the platform launch period',
    icon: Trophy,
    rarity: 'Legendary',
    progress: 1,
    maxProgress: 1,
    reward: {
      xp: 1000,
      nft: 'Genesis Badge'
    },
    unlockedAt: '2024-03-15'
  },
  {
    id: 2,
    title: 'NFT Collector',
    description: 'Collect 10 unique NFTs',
    icon: Award,
    rarity: 'Epic',
    progress: 7,
    maxProgress: 10,
    reward: {
      xp: 500,
      coins: 100
    },
    unlockedAt: null
  },
  {
    id: 3,
    title: 'Quest Master',
    description: 'Complete 50 quests',
    icon: Crown,
    rarity: 'Rare',
    progress: 48,
    maxProgress: 50,
    reward: {
      xp: 300,
      coins: 50
    },
    unlockedAt: null
  },
  {
    id: 4,
    title: 'Social Butterfly',
    description: 'Connect all social media accounts',
    icon: Medal,
    rarity: 'Common',
    progress: 2,
    maxProgress: 3,
    reward: {
      xp: 100
    },
    unlockedAt: null
  }
];

const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
  const rarity = rarityConfig[achievement.rarity];
  const Icon = achievement.icon;
  const isUnlocked = achievement.unlockedAt !== null;
  const progress = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6",
        isUnlocked 
          ? "bg-primary/5 border border-primary/20" 
          : "bg-background-card border border-border hover:border-border-hover",
        "transition-all duration-300 group"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            rarity.color.replace('text-', 'bg-') + '/10'
          )}>
            <Icon className={cn("w-6 h-6", rarity.color)} />
          </div>
          
          <div className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium font-manrope",
            rarity.color.replace('text-', 'bg-') + '/10',
            rarity.color
          )}>
            {achievement.rarity}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-text-primary font-space-grotesk mb-1 group-hover:text-primary transition-colors">
          {achievement.title}
        </h3>
        
        <p className="text-sm text-text-secondary font-dm-sans mb-4">
          {achievement.description}
        </p>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm font-manrope">
            <span className="text-text-secondary">Progress</span>
            <span className={cn(
              "font-medium",
              isUnlocked ? "text-primary" : "text-text-primary"
            )}>
              {achievement.progress}/{achievement.maxProgress}
            </span>
          </div>
          
          <div className="h-2 rounded-full bg-background overflow-hidden">
            <motion.div 
              className={cn(
                "h-full rounded-full",
                isUnlocked ? "bg-primary" : rarity.color.replace('text-', 'bg-') + '/50'
              )}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Rewards */}
        <div className="space-y-2">
          <span className="text-sm text-text-secondary font-manrope">Rewards</span>
          <div className="flex flex-wrap gap-2">
            <div className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-medium font-manrope",
              "bg-[#36F9F6]/10 text-[#36F9F6]"
            )}>
              +{achievement.reward.xp} XP
            </div>
            
            {achievement.reward.coins && (
              <div className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-medium font-manrope",
                "bg-[#FF2E63]/10 text-[#FF2E63]"
              )}>
                +{achievement.reward.coins} Coins
              </div>
            )}
            
            {achievement.reward.nft && (
              <div className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-medium font-manrope",
                "bg-[#9D9BF3]/10 text-[#9D9BF3]"
              )}>
                NFT: {achievement.reward.nft}
              </div>
            )}
          </div>
        </div>

        {isUnlocked && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-text-secondary font-manrope">
              <Trophy className="w-4 h-4 text-primary" />
              <span>Unlocked on {new Date(achievement.unlockedAt!).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRarity = !selectedRarity || achievement.rarity === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  const unlockedCount = achievements.filter(a => a.unlockedAt !== null).length;
  const totalXP = achievements.reduce((sum, a) => sum + (a.unlockedAt ? a.reward.xp : 0), 0);

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary font-space-grotesk mb-1">
            Achievements
          </h2>
          <div className="flex items-center gap-4">
            <p className="text-sm text-text-secondary font-dm-sans">
              {unlockedCount} of {achievements.length} unlocked
            </p>
            <div className="w-px h-4 bg-border" />
            <p className="text-sm font-medium text-primary font-manrope">
              {totalXP.toLocaleString()} XP Earned
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-64 px-4 py-2 rounded-lg text-sm font-medium transition-colors font-manrope",
                "bg-background-card border border-border focus:border-primary",
                "text-text-primary placeholder:text-text-secondary",
                "focus:outline-none focus:ring-1 focus:ring-primary"
              )}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors font-manrope",
                "border border-border hover:border-border-hover",
                "flex items-center gap-2",
                isFilterOpen ? "bg-primary/10 text-primary" : "text-text-secondary hover:text-text-primary"
              )}
            >
              Rarity
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform",
                isFilterOpen && "transform rotate-180"
              )} />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-40 py-1 rounded-lg border border-border bg-background-card shadow-lg z-10"
                >
                  {Object.keys(rarityConfig).map((rarity) => (
                    <button
                      key={rarity}
                      onClick={() => {
                        setSelectedRarity(selectedRarity === rarity ? null : rarity);
                        setIsFilterOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-sm font-medium text-left transition-colors font-manrope",
                        selectedRarity === rarity
                          ? `${rarityConfig[rarity as keyof typeof rarityConfig].color} ${rarityConfig[rarity as keyof typeof rarityConfig].color.replace('text-', 'bg-')}/10`
                          : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                      )}
                    >
                      {rarity}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AchievementCard achievement={achievement} />
          </motion.div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-10 text-center bg-background-card backdrop-blur-xl border border-border"
        >
          <Trophy className="h-16 w-16 text-primary/40 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-text-primary font-space-grotesk mb-2">
            No Achievements Found
          </h3>
          <p className="text-text-secondary font-dm-sans">
            Try adjusting your search or filters
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Achievements; 