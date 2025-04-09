import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, 
  Wallet, 
  Award, 
  Flame, 
  Zap, 
  Coins, 
  Users, 
  Ban, 
  Check,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import { MainNav } from "@/components/layout/MainNav";
import { FooterNew } from "@/components/footer/FooterNew";
import MatrixBackground from "@/components/MatrixBackground";
import StepCard from "@/components/StepCard";
import BenefitCard from "@/components/BenefitCard";
import NftCard from "@/components/NftCard";
import RewardBar from "@/components/RewardBar";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StarryBackground from "@/components/layout/StarryBackground";
import { 
  FlameIcon, 
  Gift, 
  Trophy, 
  BadgeCheck, 
  Sparkles, 
  Share2, 
  Rocket, 
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Burn Mechanics",
    description: "Combine multiple NFTs to upgrade or create new higher-tier collectibles",
    icon: <FlameIcon className="h-6 w-6 text-orange-400" />,
    details: "Our advanced burn system allows you to sacrifice lower-tier NFTs to create rarer and more valuable ones. This helps reduce supply and increase scarcity in the ecosystem.",
    colorClass: "from-orange-500/10 to-red-600/10 hover:from-orange-500/20 hover:to-red-600/20",
    image: "/images/crypto-currency-token-like-bitcoin-visual-design-artwork_796368-21708.avif"
  },
  {
    title: "Staking",
    description: "Earn rewards by staking your NFTs and NEFT tokens",
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    details: "Stake your NFTs to earn passive income with our dynamic rewards system. Higher rarity NFTs earn higher APR, incentivizing long-term holding and ecosystem participation.",
    colorClass: "from-blue-500/10 to-indigo-600/10 hover:from-blue-500/20 hover:to-indigo-600/20",
    image: "/images/hidden-mining-concept-illustration_114360-29618.avif"
  },
  {
    title: "Achievements",
    description: "Complete challenges to earn special rewards and badges",
    icon: <Trophy className="h-6 w-6 text-purple-400" />,
    details: "Our gamified achievement system rewards active community members. Complete various tasks to earn exclusive rewards, unique badges, and special access to events.",
    colorClass: "from-purple-500/10 to-violet-600/10 hover:from-purple-500/20 hover:to-violet-600/20",
    image: "/images/3d-rendering-holographic-layering_23-2150491112.avif"
  },
  {
    title: "Referrals",
    description: "Invite friends and earn rewards for growing the community",
    icon: <Users className="h-6 w-6 text-green-400" />,
    details: "Spread the word about NEFTIT and be rewarded. Our referral program gives you and your referred friends bonuses when they join and participate in the ecosystem.",
    colorClass: "from-green-500/10 to-emerald-600/10 hover:from-green-500/20 hover:to-emerald-600/20",
    image: "/images/cybernetic-gorilla-fierce-futuristic-illustration_477639-6715.avif"
  },
  {
    title: "Daily Rewards",
    description: "Log in daily to claim rewards and maintain your streak",
    icon: <Clock className="h-6 w-6 text-amber-400" />,
    details: "Consistency pays off at NEFTIT. Maintain your login streak to receive progressively better rewards. Daily engagement keeps you connected to our vibrant community.",
    colorClass: "from-amber-500/10 to-yellow-600/10 hover:from-amber-500/20 hover:to-yellow-600/20",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611030.avif"
  },
  {
    title: "Leaderboards",
    description: "Compete with others and earn exclusive rewards for top rankings",
    icon: <Award className="h-6 w-6 text-rose-400" />,
    details: "Our leaderboard system tracks the most active and successful community members. Reach the top spots to earn exclusive rewards and recognition within the ecosystem.",
    colorClass: "from-rose-500/10 to-pink-600/10 hover:from-rose-500/20 hover:to-pink-600/20",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611036.avif"
  }
];

const faqItems = [
  {
    question: "What is NEFTIT?",
    answer: "NEFTIT is a decentralized platform that combines NFT technology with gamification elements. It allows users to stake, burn, and upgrade NFTs while earning rewards through various activities."
  },
  {
    question: "How do I start earning rewards?",
    answer: "You can start earning rewards by staking your NFTs or NEFT tokens, completing achievements, referring friends, maintaining daily login streaks, or participating in community events."
  },
  {
    question: "What makes NFT burning beneficial?",
    answer: "NFT burning reduces the supply of lower-tier NFTs, creating scarcity. It rewards users with higher-tier, more valuable NFTs and additional platform benefits, creating a sustainable ecosystem."
  },
  {
    question: "How does staking work?",
    answer: "When you stake NFTs, they're locked for a period while generating rewards. The rarity and tier of your NFT determines the APR (Annual Percentage Rate) of rewards you receive."
  },
  {
    question: "Can I withdraw my staked NFTs at any time?",
    answer: "Yes, you can unstake your NFTs at any time, but there might be a small fee or cooling period depending on how long they've been staked. Some special staking events may have lock periods."
  }
];

const HowItWorks = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeFaq, setActiveFaq] = useState(-1);
  const [activeTab, setActiveTab] = useState("features");
  
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.add("opacity-100");
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".initially-hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <Layout className="bg-background">
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              How NEFTIT Works
            </motion.h1>
            <motion.p 
              className="text-zinc-400 text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              A comprehensive guide to our ecosystem, features, and rewards system
            </motion.p>
          </motion.div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="features" className="space-y-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto h-12">
              <TabsTrigger
                value="features"
                className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/10 data-[state=active]:to-purple-500/10"
              >
                Core Features
              </TabsTrigger>
              <TabsTrigger
                value="rewards"
                className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-teal-500/10"
              >
                Rewards System
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/10 data-[state=active]:to-red-500/10"
              >
                FAQ
              </TabsTrigger>
            </TabsList>
            
            {/* Features Tab */}
            <TabsContent value="features">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="border backdrop-blur-xl group hover:border-white/20 transition-all duration-300 bg-card/50 border-white/10 overflow-hidden relative h-full">
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity", 
                        feature.colorClass
                      )} />
                      
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                            {feature.icon}
                          </div>
                          <CardTitle className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                            {feature.title}
                          </CardTitle>
            </div>
                        <CardDescription className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors pt-2">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="relative overflow-hidden rounded-lg h-32">
                          <img 
                            src={feature.image} 
                            alt={feature.title}
                            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                          />
          </div>
          
                        <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                          {feature.details}
                        </p>
                        
                        <div className="flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 hover:bg-white/5"
                          >
                            Learn more
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                className="max-w-3xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Card className="border backdrop-blur-xl border-white/10 bg-card/50 overflow-hidden relative p-6">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Ready to Start Your Journey?</h3>
                  <p className="text-zinc-400 mb-6">
                    Join our community and start earning rewards with NEFTIT's innovative platform.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Rocket className="mr-2 h-4 w-4" />
                      Get Started
                    </Button>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      <Share2 className="mr-2 h-4 w-4" />
                      Join Discord
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <motion.div
                className="max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div 
                  className="mb-8 text-center"
                  variants={itemVariants}
                >
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Rewards Ecosystem
                  </h2>
                  <p className="text-zinc-400 max-w-2xl mx-auto">
                    Our multi-layered rewards system incentivizes participation and long-term engagement
                  </p>
                </motion.div>
                
                {/* Rewards Cards */}
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" variants={containerVariants}>
                  <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="border backdrop-blur-xl group hover:border-white/20 transition-all duration-300 bg-card/50 border-white/10 overflow-hidden relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                            <Zap className="h-6 w-6 text-green-400" />
                          </div>
                          <CardTitle className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                            Staking Rewards
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-zinc-300">Common NFT</span>
                  </div>
                          <span className="font-bold text-green-400">5% APR</span>
                </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-zinc-300">Rare NFT</span>
                  </div>
                          <span className="font-bold text-green-400">10% APR</span>
                </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-zinc-300">Legendary NFT</span>
                  </div>
                          <span className="font-bold text-green-400">25% APR</span>
                </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="border backdrop-blur-xl group hover:border-white/20 transition-all duration-300 bg-card/50 border-white/10 overflow-hidden relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                            <Trophy className="h-6 w-6 text-blue-400" />
              </div>
                          <CardTitle className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                            Achievement Rewards
                          </CardTitle>
            </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-zinc-300">Beginner Tasks</span>
          </div>
                          <span className="font-bold text-blue-400">50-100 XP</span>
        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-zinc-300">Advanced Tasks</span>
          </div>
                          <span className="font-bold text-blue-400">100-500 XP</span>
                </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-zinc-300">Special Events</span>
                </div>
                          <span className="font-bold text-blue-400">NFT Rewards</span>
              </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="border backdrop-blur-xl group hover:border-white/20 transition-all duration-300 bg-card/50 border-white/10 overflow-hidden relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                            <FlameIcon className="h-6 w-6 text-orange-400" />
                          </div>
                          <CardTitle className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                            Burn Rewards
                          </CardTitle>
                </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-zinc-300">5x Common NFTs</span>
                </div>
                          <span className="font-bold text-orange-400">1 Rare NFT</span>
              </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-zinc-300">3x Rare NFTs</span>
                </div>
                          <span className="font-bold text-orange-400">1 Epic NFT</span>
                </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-zinc-300">3x Epic NFTs</span>
              </div>
                          <span className="font-bold text-orange-400">1 Legendary NFT</span>
            </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
                
                {/* Progress Path */}
                <motion.div 
                  className="mt-12 mb-16"
                  variants={itemVariants}
                >
                  <Card className="border backdrop-blur-xl border-white/10 bg-card/50 overflow-hidden relative p-6">
                    <h3 className="text-2xl font-bold mb-6 text-center">Your NEFTIT Journey</h3>
                    <div className="relative">
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 transform -translate-y-1/2" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center mb-3 border-2 border-purple-500">
                            <Users className="h-5 w-5 text-purple-400" />
                          </div>
                          <h4 className="font-medium text-white text-center">Join Community</h4>
                          <p className="text-xs text-zinc-400 text-center">Create your account</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center mb-3 border-2 border-blue-500">
                            <Gift className="h-5 w-5 text-blue-400" />
                          </div>
                          <h4 className="font-medium text-white text-center">Claim NFTs</h4>
                          <p className="text-xs text-zinc-400 text-center">Get your first NFTs</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center mb-3 border-2 border-green-500">
                            <Zap className="h-5 w-5 text-green-400" />
                          </div>
                          <h4 className="font-medium text-white text-center">Start Staking</h4>
                          <p className="text-xs text-zinc-400 text-center">Earn passive rewards</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-orange-500/30 flex items-center justify-center mb-3 border-2 border-orange-500">
                            <FlameIcon className="h-5 w-5 text-orange-400" />
                          </div>
                          <h4 className="font-medium text-white text-center">Burn NFTs</h4>
                          <p className="text-xs text-zinc-400 text-center">Upgrade your collection</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-amber-500/30 flex items-center justify-center mb-3 border-2 border-amber-500">
                            <Trophy className="h-5 w-5 text-amber-400" />
                          </div>
                          <h4 className="font-medium text-white text-center">Rank Up</h4>
                          <p className="text-xs text-zinc-400 text-center">Achieve top positions</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
            
            {/* FAQ Tab */}
            <TabsContent value="faq">
              <motion.div
                className="max-w-3xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div 
                  className="mb-8 text-center"
                  variants={itemVariants}
                >
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-zinc-400 max-w-2xl mx-auto">
                    Everything you need to know about NEFTIT platform
                  </p>
                </motion.div>
                
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                >
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                    >
                      <Card className="border backdrop-blur-xl hover:border-white/20 transition-all duration-300 bg-card/50 border-white/10 overflow-hidden">
                        <CardContent className="p-0">
                          <div 
                            className={cn(
                              "p-4 cursor-pointer flex justify-between items-center",
                              activeFaq === index ? "border-b border-white/10" : ""
                            )}
                            onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                          >
                            <h3 className="font-semibold text-white">
                              {item.question}
              </h3>
                            <ChevronDown 
                              className={cn(
                                "h-5 w-5 text-zinc-400 transition-transform duration-200",
                                activeFaq === index ? "transform rotate-180" : ""
                              )} 
                />
              </div>
                          {activeFaq === index && (
                            <motion.div 
                              className="p-4 text-zinc-300 text-sm bg-white/5"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.answer}
                            </motion.div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div
                  className="mt-12 text-center"
                  variants={itemVariants}
                >
                  <Card className="border backdrop-blur-xl border-white/10 bg-card/50 overflow-hidden relative p-6">
                    <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                    <p className="text-zinc-400 mb-4">
                      Our community is here to help
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                        Join Discord
                      </Button>
                      <Button variant="outline" className="border-white/10 hover:bg-white/5">
                        Read Documentation
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
          </div>
    </Layout>
  );
};

export default HowItWorks;
