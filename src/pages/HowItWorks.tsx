import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Wallet,
  Award,
  Flame,
  Zap,
  Coins,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Burn Mechanics",
    description:
      "Combine multiple NFTs to upgrade or create new higher-tier collectibles",
    icon: <Flame className="h-6 w-6 text-orange-400" />,
    details:
      "Our advanced burn system allows you to sacrifice lower-tier NFTs to create rarer and more valuable ones. This helps reduce supply and increase scarcity in the ecosystem.",
    colorClass: "text-orange-400",
    image:
      "/images/crypto-currency-token-like-bitcoin-visual-design-artwork_796368-21708.avif",
  },
  {
    title: "Staking",
    description: "Earn rewards by staking your NFTs and NEFT tokens",
    icon: <Zap className="h-6 w-6 text-[#38B2AC]" />,
    details:
      "Stake your NFTs to earn passive income with our dynamic rewards system. Higher rarity NFTs earn higher APR, incentivizing long-term holding and ecosystem participation.",
    colorClass: "text-[#38B2AC]",
    image: "/images/hidden-mining-concept-illustration_114360-29618.avif",
  },
  {
    title: "Achievements",
    description: "Complete challenges to earn special rewards and badges",
    icon: <Award className="h-6 w-6 text-purple-400" />,
    details:
      "Our gamified achievement system rewards active community members. Complete various tasks to earn exclusive rewards, unique badges, and special access to events.",
    colorClass: "text-purple-400",
    image: "/images/3d-rendering-holographic-layering_23-2150491112.avif",
  },
  {
    title: "Referrals",
    description: "Invite friends and earn rewards for growing the community",
    icon: <Users className="h-6 w-6 text-green-400" />,
    details:
      "Spread the word about NEFTIT and be rewarded. Our referral program gives you and your referred friends bonuses when they join and participate in the ecosystem.",
    colorClass: "text-green-400",
    image:
      "/images/cybernetic-gorilla-fierce-futuristic-illustration_477639-6715.avif",
  },
  {
    title: "Daily Rewards",
    description: "Log in daily to claim rewards and maintain your streak",
    icon: <Clock className="h-6 w-6 text-amber-400" />,
    details:
      "Consistency pays off at NEFTIT. Maintain your login streak to receive progressively better rewards. Daily engagement keeps you connected to our vibrant community.",
    colorClass: "text-amber-400",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611030.avif",
  },
  {
    title: "Leaderboards",
    description:
      "Compete with others and earn exclusive rewards for top rankings",
    icon: <Award className="h-6 w-6 text-rose-400" />,
    details:
      "Our leaderboard system tracks the most active and successful community members. Reach the top spots to earn exclusive rewards and recognition within the ecosystem.",
    colorClass: "text-rose-400",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611036.avif",
  },
];

const faqItems = [
  {
    question: "What is NEFTIT?",
    answer:
      "NEFTIT is a decentralized platform that combines NFT technology with gamification elements. It allows users to stake, burn, and upgrade NFTs while earning rewards through various activities.",
  },
  {
    question: "How do I start earning rewards?",
    answer:
      "You can start earning rewards by staking your NFTs or NEFT tokens, completing achievements, referring friends, maintaining daily login streaks, or participating in community events.",
  },
  {
    question: "What makes NFT burning beneficial?",
    answer:
      "NFT burning reduces the supply of lower-tier NFTs, creating scarcity. It rewards users with higher-tier, more valuable NFTs and additional platform benefits, creating a sustainable ecosystem.",
  },
  {
    question: "How does staking work?",
    answer:
      "When you stake NFTs, they're locked for a period while generating rewards. The rarity and tier of your NFT determines the APR (Annual Percentage Rate) of rewards you receive.",
  },
  {
    question: "Can I withdraw my staked NFTs at any time?",
    answer:
      "Yes, you can unstake your NFTs at any time, but there might be a small fee or cooling period depending on how long they've been staked. Some special staking events may have lock periods.",
  },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("features");
  const [activeFaq, setActiveFaq] = useState(-1);

  return (
    <Layout>
      <main className="container max-w-6xl mx-auto px-4 pt-0 mt-0 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <div className="border-b border-[#2D3748]/50 pb-4 md:pb-6 mb-8 mt-0 pt-0">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-[#38B2AC]/20 text-[#38B2AC] border-[#38B2AC]/30 px-2.5 py-1 text-xs">
                  Platform
                </Badge>
                <Badge className="bg-[#1A202C] text-[#94A3B8] border-[#2D3748]/50 px-2.5 py-1 text-xs">
                  Guide
                </Badge>
              </div>
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight mt-0 pt-0">
                  How It Works
                </h1>
                <p className="text-[#94A3B8] max-w-3xl">
                  Learn about NEFTIT's platform features and how to maximize your rewards in our ecosystem
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-2 mb-4">
                <Button
                  className="bg-[#38B2AC] hover:bg-[#319795] text-white font-medium px-6"
                  onClick={() => window.open("https://docs.neftit.io", "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Full Documentation
                </Button>
              </div>
            </div>
          </div>
          
          {/* Features section */}
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#38B2AC]" />
                Key Features
              </h2>
              <p className="text-[#94A3B8]">
                Explore the powerful features that make NEFTIT unique
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="bg-[#171923] rounded-lg border border-[#2D3748]/50 hover:border-[#38B2AC]/50 p-6 h-full transition-all duration-300 hover:shadow-lg hover:shadow-[#38B2AC]/10 group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-[#1A202C] flex-shrink-0">
                        {feature.icon}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-[#94A3B8]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-[#94A3B8] mb-4">
                      {feature.details}
                    </div>
                    
                    <div className="mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-between border-[#2D3748]/50 bg-[#1A202C] hover:bg-[#2D3748] text-white"
                      >
                        <span>Learn more</span>
                        <ChevronDown className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* FAQ section */}
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Info className="h-5 w-5 text-[#38B2AC]" />
                Frequently Asked Questions
              </h2>
              <p className="text-[#94A3B8]">
                Get answers to common questions about NEFTIT
              </p>
            </div>
            
            <div className="space-y-4">
              <AnimatePresence>
                {faqItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div 
                      className="bg-[#171923] rounded-lg border border-[#2D3748]/50 hover:border-[#38B2AC]/50 overflow-hidden transition-all duration-200"
                    >
                      <div
                        className="p-5 cursor-pointer flex items-center justify-between"
                        onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                      >
                        <h3 className="text-white font-medium text-base sm:text-lg">{item.question}</h3>
                        <div className="bg-[#1A202C] rounded-full p-1">
                          {activeFaq === index ? (
                            <ChevronUp className="h-4 w-4 text-[#94A3B8]" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-[#94A3B8]" />
                          )}
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {activeFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 pt-0 border-t border-[#2D3748]/50 bg-[#1A202C]/50">
                              <p className="text-[#94A3B8] text-sm sm:text-base">{item.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* CTA section */}
          <div className="bg-[#171923] rounded-lg border border-[#2D3748]/50 hover:border-[#38B2AC]/50 p-8 text-center transition-all duration-200 hover:shadow-lg hover:shadow-[#38B2AC]/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to start your journey?
              </h3>
              <p className="text-[#94A3B8] mb-6 max-w-2xl mx-auto">
                Join our community and begin earning rewards through NFT staking, burning, and completing achievements
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-[#38B2AC] hover:bg-[#319795] text-white"
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#2D3748]/50 bg-[#1A202C] hover:bg-[#2D3748] text-white"
                >
                  Join Discord
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-8 px-4 py-4 bg-[#171923] rounded-lg border border-[#2D3748]/50 text-sm text-[#94A3B8]">
            <p>
              The NEFTIT platform is continuously evolving. Features may be updated or changed as we improve the ecosystem. Always refer to the latest documentation for the most current information.
            </p>
          </div>
        </motion.div>
      </main>
    </Layout>
  );
};

export default HowItWorks;
