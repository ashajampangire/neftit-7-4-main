import React from 'react';
import { CheckCircle, Gift, Flame } from 'lucide-react';
import { ActivityType } from './Activity';

interface StatCardProps {
  type: ActivityType;
  count: number;
  title: string;
  description: string;
}

const StatCard = ({ type, count, title, description }: StatCardProps) => {
  const icons = {
    task: <CheckCircle className="h-5 w-5 text-[#39D98A]" />,
    claim: <Gift className="h-5 w-5 text-[#3E9FFE]" />,
    burn: <Flame className="h-5 w-5 text-red-500" />
  };

  return (
    <div className="bg-[#0A0B0F] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-black/40">
          {icons[type]}
        </div>
        <h3 className="text-white/60 text-sm">{title}</h3>
      </div>
      <div>
        <span className="text-4xl font-bold text-white">{count}</span>
        <p className="text-white/40 text-xs mt-1">{description}</p>
      </div>
    </div>
  );
};

export default StatCard; 