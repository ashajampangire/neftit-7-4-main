import React, { useState } from 'react';
import { Activity as ActivityIcon, CheckCircle, Gift, Flame, Filter } from 'lucide-react';
import { cn } from "@/lib/utils";
import ActivityItem, { ActivityType } from '@/components/Activity';

const allActivities = [
  { id: 1, title: "Completed 'Social Media Quest'", timestamp: "2 hours ago", type: "task" as ActivityType },
  { id: 2, title: "Claimed Platinum NFT", timestamp: "Yesterday", type: "claim" as ActivityType },
  { id: 3, title: "Burned 5 Common NFTs for 1 Rare NFT", timestamp: "3 days ago", type: "burn" as ActivityType },
  { id: 4, title: "Completed 'Twitter Share Quest'", timestamp: "1 week ago", type: "task" as ActivityType },
  { id: 5, title: "Claimed Silver NFT", timestamp: "2 weeks ago", type: "claim" as ActivityType },
  { id: 6, title: "Burned 3 Common NFTs for 500 points", timestamp: "3 weeks ago", type: "burn" as ActivityType },
  { id: 7, title: "Completed 'Daily Login Streak'", timestamp: "1 month ago", type: "task" as ActivityType },
  { id: 8, title: "Claimed Gold NFT", timestamp: "1 month ago", type: "claim" as ActivityType }
];

const ActivityLog = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | ActivityType>('all');

  const filteredActivities = activeFilter === 'all' 
    ? allActivities 
    : allActivities.filter(activity => activity.type === activeFilter);

  const stats = {
    tasks: allActivities.filter(a => a.type === 'task').length,
    claims: allActivities.filter(a => a.type === 'claim').length,
    burns: allActivities.filter(a => a.type === 'burn').length
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-[800px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Activity Log</h1>
          <p className="text-white/60">Track your journey in the NEFTIT ecosystem</p>
          
          {/* Stats Summary */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-sm">{stats.tasks} Tasks</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-sm">{stats.claims} Claims</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-sm">{stats.burns} Burns</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0A0B0F] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-black/40">
                <CheckCircle className="h-4 w-4 text-[#39D98A]" />
              </div>
              <h3 className="text-white/60 text-sm">Tasks Completed</h3>
            </div>
            <div>
              <span className="text-3xl font-bold text-white">{stats.tasks}</span>
              <p className="text-white/40 text-xs mt-1">Quests and challenges completed</p>
            </div>
          </div>

          <div className="bg-[#0A0B0F] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-black/40">
                <Gift className="h-4 w-4 text-[#3E9FFE]" />
              </div>
              <h3 className="text-white/60 text-sm">NFTs Claimed</h3>
            </div>
            <div>
              <span className="text-3xl font-bold text-white">{stats.claims}</span>
              <p className="text-white/40 text-xs mt-1">Unique NFTs in your collection</p>
            </div>
          </div>

          <div className="bg-[#0A0B0F] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-black/40">
                <Flame className="h-4 w-4 text-red-500" />
              </div>
              <h3 className="text-white/60 text-sm">NFTs Burned</h3>
            </div>
            <div>
              <span className="text-3xl font-bold text-white">{stats.burns}</span>
              <p className="text-white/40 text-xs mt-1">NFTs burned for upgrades</p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 mb-6 bg-[#0A0B0F] p-3 rounded-lg">
          <div className="flex items-center gap-2 text-white/60">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filter by:</span>
          </div>
          
          <button
            onClick={() => setActiveFilter('all')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm transition-colors",
              activeFilter === 'all'
                ? "bg-[#3E9FFE] text-white"
                : "text-white/60 hover:text-white"
            )}
          >
            All Activities
          </button>
          
          <button
            onClick={() => setActiveFilter('task')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm transition-colors",
              activeFilter === 'task'
                ? "bg-[#39D98A] text-white"
                : "text-white/60 hover:text-white"
            )}
          >
            Tasks
          </button>
          
          <button
            onClick={() => setActiveFilter('claim')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm transition-colors",
              activeFilter === 'claim'
                ? "bg-[#3E9FFE] text-white"
                : "text-white/60 hover:text-white"
            )}
          >
            Claims
          </button>
          
          <button
            onClick={() => setActiveFilter('burn')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm transition-colors",
              activeFilter === 'burn'
                ? "bg-red-500 text-white"
                : "text-white/60 hover:text-white"
            )}
          >
            Burns
          </button>
        </div>

        {/* Activity List */}
        <div className="space-y-2">
          {filteredActivities.map(activity => (
            <ActivityItem
              key={activity.id}
              type={activity.type}
              title={activity.title}
              timestamp={activity.timestamp}
            />
          ))}
          {filteredActivities.length === 0 && (
            <div className="bg-[#0A0B0F] rounded-xl p-12 text-center">
              <p className="text-white/40">No activities found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog; 