import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProfileBoxProps {
  className?: string;
}

export function ProfileBox({ className }: ProfileBoxProps) {
  const [profileData, setProfileData] = useState({
    username: sessionStorage.getItem("username") || localStorage.getItem("username") || "Shreeshaa",
    level: parseInt(sessionStorage.getItem("level") || localStorage.getItem("level") || "24"),
    avatar: sessionStorage.getItem("avatar") || localStorage.getItem("avatar") || 
      "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?fit=max&w=350"
  });

  // Update profile data when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setProfileData({
        username: sessionStorage.getItem("username") || localStorage.getItem("username") || "Shreeshaa",
        level: parseInt(sessionStorage.getItem("level") || localStorage.getItem("level") || "24"),
        avatar: sessionStorage.getItem("avatar") || localStorage.getItem("avatar") || 
          "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?fit=max&w=350"
      });
    };

    // Also listen for custom profileUpdate event
    const handleProfileUpdate = (event: any) => {
      const { username, avatar } = event.detail;
      
      if (username || avatar) {
        setProfileData(prevState => ({
          ...prevState,
          username: username || prevState.username,
          avatar: avatar || prevState.avatar
        }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileUpdate', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdate', handleProfileUpdate);
    };
  }, []);

  return (
    <Link to="/profile">
      <div 
        className={cn(
          "relative p-4 transition-all duration-300",
          "bg-black hover:bg-black/80 cursor-pointer",
          className
        )}
      >
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10 ring-2 ring-pink-500/20 border border-white/20">
              <AvatarImage 
                alt="Profile" 
                src={profileData.avatar} 
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                {profileData.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-black text-white text-xs font-medium px-1.5 py-0.5 rounded-full border border-pink-500/30">
              <Trophy className="w-2.5 h-2.5 text-pink-400" />
              <span className="text-[10px]">{profileData.level}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-medium text-sm text-white">
              {profileData.username}
            </h4>
            <p className="text-xs text-gray-400">
              View Profile
            </p>
          </div>
          
          <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
        </div>
      </div>
    </Link>
  );
}