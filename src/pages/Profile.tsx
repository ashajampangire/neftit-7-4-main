import React, { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Share2, Edit, BadgeCheck, Trophy, Flame, User, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MyNFTs from "@/components/profile/MyNFTs";
import CompletedQuests from "@/components/profile/CompletedQuests";
import Stats from "@/components/profile/Stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("nfts");
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
    // Force refresh profile data on mount
    const refreshProfileData = () => {
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

    // Run refresh immediately
    refreshProfileData();

    const handleStorageChange = () => {
      refreshProfileData();
    };

    // Handle custom profileUpdate event from EditProfile
    const handleProfileUpdate = (event: any) => {
      console.log("Profile update event received:", event.detail);
      const { username, avatar, walletAddress } = event.detail;
      
      // Update the profile data state
      setProfileData(prevState => {
        const newState = {
          ...prevState,
          username: username || prevState.username,
          avatar: avatar || prevState.avatar,
          walletAddress: walletAddress || prevState.walletAddress
        };
        console.log("Updated profile data:", newState);
        return newState;
      });
    };

    // Add event listeners for both storage and custom profileUpdate events
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileUpdate', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdate', handleProfileUpdate);
    };
  }, []);

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
    <Layout className="bg-black">
      <div className="container mx-auto px-4 pt-0 mt-0 pb-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
            {/* Profile Content */}
            <div className="p-6">
              <div className="flex items-center gap-5">
                {/* Avatar Section */}
                <div className="relative">
                  <Avatar className="h-20 w-20 border-2 border-white/20">
                    <AvatarImage src={profileData.avatar} alt={profileData.username} className="object-cover" />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl">
                      {profileData.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                    <BadgeCheck className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                {/* User Info */}
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-white">
                        {profileData.username}
                      </h1>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Wallet className="h-3 w-3" />
                        <span>{profileData.walletAddress}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div>
          <Tabs defaultValue="nfts" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="h-12 w-full justify-start mb-6 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl overflow-x-auto">
              {[
                { value: "nfts", label: "My NFTs", icon: <Flame className="h-4 w-4" /> },
                { value: "stats", label: "Statistics", icon: <Trophy className="h-4 w-4" /> },
                { value: "quests", label: "Quests", icon: <User className="h-4 w-4" /> }
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={cn(
                    "flex items-center gap-2 px-4 py-2",
                    "data-[state=active]:bg-white/10",
                    "data-[state=active]:text-white",
                    "data-[state=inactive]:text-gray-400",
                  )}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            <div>
              <TabsContent value="nfts" className="mt-0">
                <MyNFTs />
              </TabsContent>
              
              <TabsContent value="stats" className="mt-0">
                <Stats />
              </TabsContent>
              
              <TabsContent value="quests" className="mt-0">
                <CompletedQuests />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
