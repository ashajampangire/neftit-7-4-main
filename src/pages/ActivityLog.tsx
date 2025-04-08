import React, { useState } from 'react';
import { Activity as ActivityIcon, CheckCircle, Gift, Flame, Filter, Clock, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import ActivityItem, { ActivityType } from '@/components/Activity';
import { MainNav } from '@/components/layout/MainNav';

const allActivities = [
  { id: 1, title: "Completed 'Social Media Quest'", timestamp: "2 hours ago", type: "task" as ActivityType, points: 100 },
  { id: 2, title: "Claimed Platinum NFT", timestamp: "Yesterday", type: "claim" as ActivityType, points: 500 },
  { id: 3, title: "Burned 5 Common NFTs for 1 Rare NFT", timestamp: "3 days ago", type: "burn" as ActivityType, points: 250 },
  { id: 4, title: "Completed 'Twitter Share Quest'", timestamp: "1 week ago", type: "task" as ActivityType, points: 50 },
  { id: 5, title: "Claimed Silver NFT", timestamp: "2 weeks ago", type: "claim" as ActivityType, points: 200 },
  { id: 6, title: "Burned 3 Common NFTs for 500 points", timestamp: "3 weeks ago", type: "burn" as ActivityType, points: 300 },
  { id: 7, title: "Completed 'Daily Login Streak'", timestamp: "1 month ago", type: "task" as ActivityType, points: 75 },
  { id: 8, title: "Claimed Gold NFT", timestamp: "1 month ago", type: "claim" as ActivityType, points: 350 }
];

const ActivityLog = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | ActivityType>('all');

  const filteredActivities = activeFilter === 'all' 
    ? allActivities 
    : allActivities.filter(activity => activity.type === activeFilter);

  const stats = {
    tasks: allActivities.filter(a => a.type === 'task').length,
    claims: allActivities.filter(a => a.type === 'claim').length,
    burns: allActivities.filter(a => a.type === 'burn').length,
    totalPoints: allActivities.reduce((sum, activity) => sum + activity.points, 0)
  };

  return (
    <MainNav>
      <div className="relative min-h-screen bg-[#0A0B0F]">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/system-activation.png')] bg-cover bg-center opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B0F] via-black/90 to-[#0A0B0F]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
          
          {/* Animated Glow Effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse delay-500" />
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse delay-700" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
          {/* Header with Glass Effect */}
          <div className="mb-8 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-2">
                  Activity Log
                </h1>
                <p className="text-white/60">Track your journey in the NEFTIT ecosystem</p>
              </div>
              
              {/* Stats Summary */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg">
                  <div className="p-2 rounded-full bg-purple-500/20">
                    <Zap className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Total Points</div>
                    <div className="text-lg font-bold text-white">{stats.totalPoints}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg">
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">NFTs</div>
                    <div className="text-lg font-bold text-white">{stats.claims}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg">
                  <div className="p-2 rounded-full bg-red-500/20">
                    <Clock className="h-4 w-4 text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Burns</div>
                    <div className="text-lg font-bold text-white">{stats.burns}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Stats Cards - Left Column */}
            <div className="xl:col-span-4 grid grid-cols-1 gap-4">
              <div className="group relative bg-gradient-to-br from-[#39D98A]/20 to-transparent p-[1px] rounded-xl transition-all duration-300 hover:from-[#39D98A]/30">
                <div className="bg-[#0A0B0F]/90 rounded-xl p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-[#39D98A]/10 group-hover:bg-[#39D98A]/20 transition-colors">
                      <CheckCircle className="h-5 w-5 text-[#39D98A]" />
                    </div>
                    <div>
                      <h3 className="text-white/90 font-medium">Tasks Completed</h3>
                      <p className="text-white/40 text-sm">Quests and challenges</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-4xl font-bold text-white">{stats.tasks}</span>
                    <div className="text-[#39D98A] text-sm font-medium px-2 py-1 rounded-md bg-[#39D98A]/10">
                      +3 Today
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-[#3E9FFE]/20 to-transparent p-[1px] rounded-xl transition-all duration-300 hover:from-[#3E9FFE]/30">
                <div className="bg-[#0A0B0F]/90 rounded-xl p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-[#3E9FFE]/10 group-hover:bg-[#3E9FFE]/20 transition-colors">
                      <Gift className="h-5 w-5 text-[#3E9FFE]" />
                    </div>
                    <div>
                      <h3 className="text-white/90 font-medium">NFTs Claimed</h3>
                      <p className="text-white/40 text-sm">Your collection</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-4xl font-bold text-white">{stats.claims}</span>
                    <div className="text-[#3E9FFE] text-sm font-medium px-2 py-1 rounded-md bg-[#3E9FFE]/10">
                      +1 Today
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-red-500/20 to-transparent p-[1px] rounded-xl transition-all duration-300 hover:from-red-500/30">
                <div className="bg-[#0A0B0F]/90 rounded-xl p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                      <Flame className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-white/90 font-medium">NFTs Burned</h3>
                      <p className="text-white/40 text-sm">For upgrades</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-4xl font-bold text-white">{stats.burns}</span>
                    <div className="text-red-500 text-sm font-medium px-2 py-1 rounded-md bg-red-500/10">
                      +2 Today
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity List and Filters - Right Column */}
            <div className="xl:col-span-8 space-y-6">
              {/* Filter Bar */}
              <div className="bg-white/5 p-4 rounded-xl backdrop-blur-xl border border-white/10">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-white/60">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Filter by:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                        activeFilter === 'all'
                          ? "bg-gradient-to-r from-[#3E9FFE] to-purple-500 text-white shadow-lg shadow-[#3E9FFE]/20"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      All Activities
                    </button>
                    
                    <button
                      onClick={() => setActiveFilter('task')}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                        activeFilter === 'task'
                          ? "bg-gradient-to-r from-[#39D98A] to-emerald-500 text-white shadow-lg shadow-[#39D98A]/20"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      Tasks
                    </button>
                    
                    <button
                      onClick={() => setActiveFilter('claim')}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                        activeFilter === 'claim'
                          ? "bg-gradient-to-r from-[#3E9FFE] to-blue-500 text-white shadow-lg shadow-[#3E9FFE]/20"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      Claims
                    </button>
                    
                    <button
                      onClick={() => setActiveFilter('burn')}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                        activeFilter === 'burn'
                          ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/20"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      Burns
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity List */}
              <div className="space-y-3 h-[calc(100vh-20rem)] overflow-y-auto pr-2 custom-scrollbar">
                {filteredActivities.map(activity => (
                  <ActivityItem
                    key={activity.id}
                    type={activity.type}
                    title={activity.title}
                    timestamp={activity.timestamp}
                    points={activity.points}
                  />
                ))}
                {filteredActivities.length === 0 && (
                  <div className="bg-white/5 rounded-xl p-8 text-center backdrop-blur-xl border border-white/10">
                    <p className="text-white/40">No activities found for the selected filter.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainNav>
  );
};

export default ActivityLog; 