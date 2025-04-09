import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Share2, Edit, BadgeCheck, Trophy, Flame, Award, ArrowRight, Clock, User, Wallet, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MyNFTs from "@/components/profile/MyNFTs";
import CompletedQuests from "@/components/profile/CompletedQuests";
import Leaderboard from "@/components/profile/Leaderboard";
import Stats from "@/components/profile/Stats";
import Achievements from "@/components/profile/Achievements";
import ActivityLog from "@/components/profile/ActivityLog";
import StarryBackground from "@/components/layout/StarryBackground";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Load profile data from localStorage or sessionStorage
  const [profileData, setProfileData] = useState({
    username: sessionStorage.getItem("username") || localStorage.getItem("username") || "NeftitWarrior",
    walletAddress: sessionStorage.getItem("walletAddress") || localStorage.getItem("walletAddress") || '0x1234...5678',
    xp: parseInt(sessionStorage.getItem("xp") || localStorage.getItem("xp") || "380"),
    coins: parseInt(sessionStorage.getItem("coins") || localStorage.getItem("coins") || "3"),
    level: parseInt(sessionStorage.getItem("level") || localStorage.getItem("level") || "10"),
    nextLevelXp: parseInt(sessionStorage.getItem("nextLevelXp") || localStorage.getItem("nextLevelXp") || "500"),
    avatar: sessionStorage.getItem("avatar") || localStorage.getItem("avatar") || "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?fit=max&w=350"
  });

  // Listen for updates to profile data
  useEffect(() => {
    const handleStorageChange = () => {
      setProfileData({
        username: sessionStorage.getItem("username") || localStorage.getItem("username") || "NeftitWarrior",
        walletAddress: sessionStorage.getItem("walletAddress") || localStorage.getItem("walletAddress") || '0x1234...5678',
        xp: parseInt(sessionStorage.getItem("xp") || localStorage.getItem("xp") || "380"),
        coins: parseInt(sessionStorage.getItem("coins") || localStorage.getItem("coins") || "3"),
        level: parseInt(sessionStorage.getItem("level") || localStorage.getItem("level") || "10"),
        nextLevelXp: parseInt(sessionStorage.getItem("nextLevelXp") || localStorage.getItem("nextLevelXp") || "500"),
        avatar: sessionStorage.getItem("avatar") || localStorage.getItem("avatar") || "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?fit=max&w=350"
      });
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Calculate XP progress percentage
  const xpProgress = Math.round((profileData.xp / profileData.nextLevelXp) * 100);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const staggerItems = [
    { value: profileData.xp, label: "XP Points", icon: <Trophy className="h-5 w-5 text-yellow-400" /> },
    { value: profileData.level, label: "Level", icon: <BadgeCheck className="h-5 w-5 text-blue-400" /> },
    { value: profileData.coins, label: "NEFT Coins", icon: <Flame className="h-5 w-5 text-orange-400" /> },
  ];

  // Handle navigation to edit profile
  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  // Handle share profile
  const handleShareProfile = () => {
    // Generate a shareable link or copy profile URL to clipboard
    const profileUrl = `${window.location.origin}/profile/${profileData.username}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "Profile link copied to clipboard",
        });
      })
      .catch((err) => {
        toast({
          title: "Failed to copy",
          description: "Could not copy profile link",
          variant: "destructive",
        });
      });
  };

  return (
    <Layout className="bg-background">
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="glass" className="overflow-hidden">
              <div className="relative">
                {/* Profile Banner - Animated Gradient */}
                <div className="h-32 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-teal-500/20 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 10,
                      ease: "linear",
                    }}
                  />
                </div>
                
                {/* Profile Content */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 md:-mt-12">
                    {/* Avatar Section */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                      <Avatar className="h-24 w-24 border-4 border-black relative">
                        <AvatarImage src={profileData.avatar} alt={profileData.username} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl">
                          {profileData.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-black">
                        <BadgeCheck className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-grow space-y-3">
                      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-between">
                        <div>
                          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            {profileData.username}
                          </h1>
                          <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <Wallet className="h-3 w-3" />
                            <span>{profileData.walletAddress}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1 border-white/10 hover:bg-white/5 text-white"
                            onClick={handleEditProfile}
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit Profile</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1 border-white/10 hover:bg-white/5 text-white"
                            onClick={handleShareProfile}
                          >
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                          </Button>
                        </div>
                      </div>
                      
                      {/* XP Progress */}
                      <div className="space-y-2 max-w-md">
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Level Progress:</span>
                          <span className="text-white font-medium">
                            {profileData.xp} / {profileData.nextLevelXp} XP
                          </span>
                        </div>
                        <Progress value={xpProgress} className="h-2 bg-white/10" />
                        <div className="text-xs text-zinc-500">
                          {profileData.nextLevelXp - profileData.xp} XP needed for next level
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mt-6 border-t border-white/10 pt-6">
                    {staggerItems.map((item, index) => (
                      <div key={index} className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/5">
                        <div className="flex items-center gap-2 mb-1">
                          {item.icon}
                          <span className="text-lg font-bold text-white">{item.value}</span>
                        </div>
                        <span className="text-xs text-zinc-400">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tabs Section */}
          <div className="space-y-6">
            <Tabs defaultValue="stats" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-center mb-6">
                <TabsList className="h-12 p-1 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl">
                  {[
                    { value: "stats", label: "Statistics", icon: <Trophy className="h-4 w-4" /> },
                    { value: "achievements", label: "Achievements", icon: <Award className="h-4 w-4" /> },
                    { value: "activity", label: "Activity", icon: <Clock className="h-4 w-4" /> },
                    { value: "nfts", label: "My NFTs", icon: <Flame className="h-4 w-4" /> },
                    { value: "quests", label: "Quests", icon: <User className="h-4 w-4" /> },
                    { value: "leaderboard", label: "Leaderboard", icon: <Users className="h-4 w-4" /> }
                  ].map((tab) => (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value} 
                      className={cn(
                        "flex items-center gap-2 px-4 py-2",
                        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-blue-500/20",
                        "data-[state=active]:text-white",
                        "data-[state=inactive]:text-zinc-400",
                      )}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="glass" className="p-6">
                  <TabsContent value="stats" className="m-0">
                    <Stats />
                  </TabsContent>
                  
                  <TabsContent value="achievements" className="m-0">
                    <Achievements />
                  </TabsContent>
                  
                  <TabsContent value="activity" className="m-0">
                    <ActivityLog />
                  </TabsContent>
                  
                  <TabsContent value="nfts" className="m-0">
                    <MyNFTs />
                  </TabsContent>
                  
                  <TabsContent value="quests" className="m-0">
                    <CompletedQuests />
                  </TabsContent>
                  
                  <TabsContent value="leaderboard" className="m-0">
                    <Leaderboard />
                  </TabsContent>
                </Card>
              </motion.div>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
