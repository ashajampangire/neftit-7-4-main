import React from 'react';
import { CheckCircle, Gift, Flame, ChevronRight, Zap } from 'lucide-react';
import { cn } from "@/lib/utils";

export type ActivityType = 'task' | 'claim' | 'burn';

interface ActivityProps {
  title: string;
  timestamp: string;
  type: ActivityType;
  points: number;
}

const Activity: React.FC<ActivityProps> = ({ title, timestamp, type, points }) => {
  const getIcon = () => {
    switch (type) {
      case 'task':
        return <CheckCircle className="h-5 w-5 text-[#39D98A] transition-transform group-hover:scale-110" />;
      case 'claim':
        return <Gift className="h-5 w-5 text-[#3E9FFE] transition-transform group-hover:scale-110" />;
      case 'burn':
        return <Flame className="h-5 w-5 text-red-500 transition-transform group-hover:scale-110" />;
    }
  };

  const getBorderGradient = () => {
    switch (type) {
      case 'task':
        return 'from-[#39D98A]/20';
      case 'claim':
        return 'from-[#3E9FFE]/20';
      case 'burn':
        return 'from-red-500/20';
    }
  };

  const getGlowEffect = () => {
    switch (type) {
      case 'task':
        return 'group-hover:shadow-[0_0_15px_rgba(57,217,138,0.3)]';
      case 'claim':
        return 'group-hover:shadow-[0_0_15px_rgba(62,159,254,0.3)]';
      case 'burn':
        return 'group-hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]';
    }
  };

  const getPointsColor = () => {
    switch (type) {
      case 'task':
        return 'text-[#39D98A]';
      case 'claim':
        return 'text-[#3E9FFE]';
      case 'burn':
        return 'text-red-500';
    }
  };

  return (
    <div className={cn(
      "group gradient-border bg-gradient-to-br to-transparent transition-all duration-300",
      getBorderGradient()
    )}>
      <div className={cn(
        "relative flex items-center gap-4 bg-[#0A0B0F]/90 rounded-xl p-4 backdrop-blur-xl transition-all duration-300",
        getGlowEffect()
      )}>
        {/* Icon Container */}
        <div className={cn(
          "p-3 rounded-xl transition-colors duration-300",
          type === 'task' && "bg-[#39D98A]/10 group-hover:bg-[#39D98A]/20",
          type === 'claim' && "bg-[#3E9FFE]/10 group-hover:bg-[#3E9FFE]/20",
          type === 'burn' && "bg-red-500/10 group-hover:bg-red-500/20"
        )}>
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white/90 font-medium truncate">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-white/40 text-sm">{timestamp}</p>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-1">
              <Zap className={cn("h-3 w-3", getPointsColor())} />
              <span className={cn("text-sm font-medium", getPointsColor())}>
                +{points} points
              </span>
            </div>
          </div>
        </div>

        {/* View Details Button - Hidden by default, shown on hover */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className={cn(
            "text-sm font-medium",
            type === 'task' && "text-[#39D98A]",
            type === 'claim' && "text-[#3E9FFE]",
            type === 'burn' && "text-red-500"
          )}>
            View Details
          </span>
          <ChevronRight className={cn(
            "h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1",
            type === 'task' && "text-[#39D98A]",
            type === 'claim' && "text-[#3E9FFE]",
            type === 'burn' && "text-red-500"
          )} />
        </div>
      </div>
    </div>
  );
};

export default Activity; 