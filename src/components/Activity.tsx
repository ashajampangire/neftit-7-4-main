import React from 'react';
import { CheckCircle, Gift, Flame, ChevronRight } from 'lucide-react';

export type ActivityType = 'task' | 'claim' | 'burn';

interface ActivityItemProps {
  title: string;
  timestamp: string;
  type: ActivityType;
}

const ActivityItem = ({ type, title, timestamp }: ActivityItemProps) => {
  const icons = {
    task: <CheckCircle className="h-5 w-5 text-[#39D98A]" />,
    claim: <Gift className="h-5 w-5 text-[#3E9FFE]" />,
    burn: <Flame className="h-5 w-5 text-red-500" />
  };

  return (
    <div className="bg-[#0A0B0F] rounded-xl p-4 flex items-center justify-between group hover:bg-[#13131D] transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-full bg-black/40">
          {icons[type]}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-white text-sm font-medium">{title}</span>
          <span className="text-white/40 text-xs">{timestamp}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-white/40 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <span>View Details</span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
};

export default ActivityItem; 