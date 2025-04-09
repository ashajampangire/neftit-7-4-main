import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfileBoxProps {
  username?: string;
  level?: number;
  avatar?: string;
}

export function ProfileBox({ username = "neftit ranger", level = 24, avatar }: ProfileBoxProps) {
  return (
    <Link to="/profile">
      <motion.div 
        whileHover={{ y: -2 }}
        className={cn(
          "relative p-4 mb-6 rounded-xl",
          "bg-background-card/50 backdrop-blur-md",
          "border border-border hover:border-border-hover",
          "transition-all duration-300 group"
        )}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Content */}
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#36F9F6] to-[#FF2E63] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <Avatar className={cn(
              "h-12 w-12 ring-2",
              "ring-border group-hover:ring-border-hover",
              "transition-all duration-300 relative"
            )}>
              <AvatarImage 
                alt="Profile" 
                src={avatar || "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?fit=max&w=350"} 
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <AvatarFallback>NR</AvatarFallback>
            </Avatar>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-gradient-to-r from-[#36F9F6] to-[#FF2E63] text-black text-xs font-bold px-2 py-0.5 rounded-full"
            >
              <Trophy className="w-3 h-3" />
              {level}
            </motion.div>
          </div>

          <div className="flex items-center justify-between flex-grow">
            <div className="space-y-1">
              <h4 className="font-medium text-base text-text-primary font-space-grotesk group-hover:text-primary transition-colors">
                {username}
              </h4>
              <p className="text-xs text-text-secondary font-manrope">
                View Profile
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-text-secondary group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}