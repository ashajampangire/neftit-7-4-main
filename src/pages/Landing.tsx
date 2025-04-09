import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MainNav } from "@/components/layout/MainNav";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  Shield, 
  Trophy, 
  Users, 
  Sparkles, 
  Rocket,
  Star,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import "@/styles/fonts.css";

// Features data with enhanced gradients
const features = [
  {
    title: "Daily Rewards",
    description: "Complete daily quests and earn exclusive rewards instantly",
    icon: Sparkles,
    gradient: "from-[#FF3BFF] via-[#ECBFBF] to-[#5C24FF]"
  },
  {
    title: "Fast Earnings",
    description: "Quick completion bonuses and instant reward distribution",
    icon: Zap,
    gradient: "from-[#36F9F6] via-[#E99FFF] to-[#3B3BFF]"
  },
  {
    title: "Secure Platform",
    description: "Advanced security measures to protect your digital assets",
    icon: Shield,
    gradient: "from-[#5C24FF] via-[#FF3BFF] to-[#36F9F6]"
  },
  {
    title: "Global Community",
    description: "Join thousands of collectors from around the world",
    icon: Users,
    gradient: "from-[#3B3BFF] via-[#36F9F6] to-[#FF3BFF]"
  }
];

// NFT data with enhanced metadata
const nfts = [
  {
    id: 1,
    name: "Fierce Euphoria",
    description: "Bold Energy, Dopamine Rush, Unmatched Spark",
    image: "/images/cybernetic-gorilla-fierce-futuristic-illustration_477639-6715.avif",
    gradient: "from-[#FF3BFF] to-[#5C24FF]"
  },
  {
    id: 2,
    name: "Digital Apex",
    description: "Supreme Power, Digital Dominance, Future Elite",
    image: "/images/crypto-bear-boss-cool-teddy-with-bling_1173476-4666.jpg",
    gradient: "from-[#36F9F6] to-[#3B3BFF]"
  },
  {
    id: 3,
    name: "Cosmic Flow",
    description: "Celestial Energy, Infinite Potential, Star Power",
    image: "/images/gradient-galaxy-background_52683-140335.avif",
    gradient: "from-[#5C24FF] to-[#FF3BFF]"
  },
  {
    id: 4,
    name: "Neon Dynasty",
    description: "Electric Aura, Cyber Supremacy, Digital Legacy",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611030.avif",
    gradient: "from-[#3B3BFF] to-[#36F9F6]"
  },
  {
    id: 5,
    name: "Meta Sovereign",
    description: "Virtual Royalty, Web3 Pioneer, Digital Immortality",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149622024.avif",
    gradient: "from-[#FF3BFF] to-[#3B3BFF]"
  }
];

// Lovable features with enhanced gradients
const lovableFeatures = [
  {
    title: "Free to Join",
    description: "No hidden fees, just complete quests and earn rewards",
    icon: Rocket,
    gradient: "from-[#FF3BFF] via-[#ECBFBF] to-[#5C24FF]"
  },
  {
    title: "Fun & Interactive",
    description: "Engage with Web3 in a fresh, exciting way",
    icon: Sparkles,
    gradient: "from-[#36F9F6] via-[#E99FFF] to-[#3B3BFF]"
  },
  {
    title: "Upgrade System",
    description: "Keep progressing and leveling up your collection",
    icon: Trophy,
    gradient: "from-[#5C24FF] via-[#FF3BFF] to-[#36F9F6]"
  },
  {
    title: "Anti-Bot Protection",
    description: "We ensure a fair system for all users",
    icon: Shield,
    gradient: "from-[#3B3BFF] via-[#36F9F6] to-[#FF3BFF]"
  },
  {
    title: "Global Access",
    description: "Anyone can participate, anytime, anywhere",
    icon: Users,
    gradient: "from-[#FF3BFF] via-[#5C24FF] to-[#36F9F6]"
  },
  {
    title: "Verified Projects",
    description: "Only authentic Web3 projects in our ecosystem",
    icon: Star,
    gradient: "from-[#36F9F6] via-[#3B3BFF] to-[#FF3BFF]"
  }
];

const howItWorks = [
  {
    step: 1,
    title: "Complete Quests & Challenges",
    description: "Participate in social & interactive quests",
    bullets: [
      "Engage with the community",
      "Complete interactive tasks",
      "Solve exciting puzzles"
    ],
    icon: "🎯"
  },
  {
    step: 2,
    title: "Earn & Collect NFTs",
    description: "Every completed quest rewards you with a unique NFT",
    bullets: [
      "Earn unique NFTs",
      "Build your collection",
      "Get guaranteed rewards"
    ],
    icon: "🏆"
  },
  {
    step: 3,
    title: "Upgrade Your NFTs",
    description: "Start with Common NFTs and burn them to upgrade",
    bullets: [
      "5 Commons → 1 Platinum",
      "5 Platinum → 1 Silver",
      "5 Silver → 1 Gold"
    ],
    icon: "⭐"
  },
  {
    step: 4,
    title: "Showcase, Trade & Hold",
    description: "Trade your NFTs on leading marketplaces",
    bullets: [
      "Trade on marketplaces",
      "Display your collection",
      "Access exclusive perks"
    ],
    icon: "💎"
  }
];

const nftTiers = [
  {
    symbol: "C",
    tier: "Common",
    description: "Start your journey with Common NFTs",
    detail: "Complete quests to earn Common NFTs",
    gradient: "from-slate-400 to-zinc-400"
  },
  {
    symbol: "P",
    tier: "Platinum & Silver",
    description: "Burn & upgrade to higher tiers",
    detail: "5 Commons → 1 Platinum, 5 Platinum → 1 Silver",
    gradient: "from-purple-400 to-blue-400"
  },
  {
    symbol: "G",
    tier: "Gold",
    description: "Reach the exclusive Gold tier",
    detail: "5 Silver → 1 Gold (Super rare & exclusive)",
    gradient: "from-yellow-400 to-amber-400"
  }
];

const Landing: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === nfts.length - 1 ? 0 : prevIndex + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF3BFF]/5 via-[#36F9F6]/5 to-[#5C24FF]/5 backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

        <MainNav />

          {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto relative">
            {/* Decorative Elements */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-full h-32"
            >
              <div className="absolute left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#FF3BFF]/20 to-transparent" />
              <div className="absolute left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#36F9F6]/20 to-transparent" />
              <div className="absolute left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#5C24FF]/20 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-space-grotesk">
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent">
                  Collect, Upgrade,
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF]/20 via-[#36F9F6]/20 to-[#5C24FF]/20 blur-2xl"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                      </span>
                      <br />
                  <span className="relative inline-block mt-2">
                    <span className="relative z-10 bg-gradient-to-r from-[#5C24FF] via-[#FF3BFF] to-[#36F9F6] bg-clip-text text-transparent">
                  Earn Rewards
                      </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#5C24FF]/20 via-[#FF3BFF]/20 to-[#36F9F6]/20 blur-2xl"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1
                      }}
                    />
                  </span>
                </h1>
              </motion.div>

              <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-text-secondary font-dm-sans max-w-2xl mx-auto leading-relaxed"
              >
                Join the next generation of NFT collectors. Complete engaging quests, earn unique NFTs, and build your digital portfolio through our gamified platform.
              </motion.p>

                  <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center justify-center gap-4 pt-8"
              >
                <Link to="/auth">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                  <Button 
                    size="lg"
                      className={cn(
                        "relative overflow-hidden",
                        "bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]",
                        "text-white font-medium px-8 py-6 text-lg rounded-full",
                        "transition-all duration-300",
                        "hover:shadow-lg hover:shadow-[#FF3BFF]/20",
                        "group"
                      )}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                    Start Collecting
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#5C24FF] via-[#FF3BFF] to-[#36F9F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Button>
                  </motion.div>
                </Link>
                <Link to="/explore">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                  <Button 
                    variant="outline"
                    size="lg"
                      className={cn(
                        "relative overflow-hidden",
                        "border-[#FF3BFF]/20 text-white",
                        "font-medium px-8 py-6 text-lg rounded-full",
                        "transition-all duration-300",
                        "hover:border-[#FF3BFF]/40",
                        "hover:bg-gradient-to-r hover:from-[#FF3BFF]/5 hover:via-[#36F9F6]/5 hover:to-[#5C24FF]/5",
                        "group"
                      )}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                    Explore More
                        <motion.div
                          animate={{
                            x: [0, 4, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </span>
                  </Button>
                  </motion.div>
                </Link>
                  </motion.div>
            </div>

            {/* Bottom Curve */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute -bottom-48 left-0 right-0"
            >
              <div className="w-full h-48 bg-gradient-to-b from-transparent to-[#FF3BFF]/10 rounded-[100%] blur-3xl" />
            </motion.div>
          </div>
        </div>
            </div>

      {/* Features Section */}
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space-grotesk">
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent">
                Why Choose Us?
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF]/20 via-[#36F9F6]/20 to-[#5C24FF]/20 blur-2xl"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </span>
              </h2>
              <p className="text-xl text-text-secondary font-dm-sans max-w-3xl mx-auto">
                Experience the most innovative and rewarding NFT platform, designed for collectors of all levels.
              </p>
              </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  className={cn(
                    "group relative",
                    "rounded-2xl overflow-hidden",
                    "bg-background-card/30 backdrop-blur-xl",
                    "border border-border/50",
                    "transition-all duration-500",
                    "hover:border-[#FF3BFF]/20",
                    "hover:shadow-lg hover:shadow-[#FF3BFF]/5"
                  )}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    animate={{
                      background: [
                        `linear-gradient(to right, ${feature.gradient})`,
                        `linear-gradient(to left, ${feature.gradient})`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-background-card/80 backdrop-blur-sm" />

                  {/* Content */}
                  <div className="relative p-8 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={cn(
                        "w-14 h-14 rounded-xl mb-6",
                        "bg-gradient-to-r",
                        feature.gradient,
                        "p-3 shadow-lg",
                        "relative overflow-hidden"
                      )}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <feature.icon className="w-full h-full text-white relative z-10" />
                    </motion.div>

                    <h3 className={cn(
                      "text-2xl font-semibold mb-4",
                      "font-space-grotesk",
                      "bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                    )}>
                      {feature.title}
                    </h3>

                    <p className="text-text-secondary font-dm-sans leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  </motion.div>
                ))}
              </div>
            </div>
        </div>
            </div>

      {/* NFT Showcase Section */}
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space-grotesk">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent">
              Featured Collections
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF]/20 via-[#36F9F6]/20 to-[#5C24FF]/20 blur-2xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </span>
            </h2>
            <p className="text-xl text-text-secondary font-dm-sans max-w-3xl mx-auto">
              Discover our most exclusive and sought-after NFT collections.
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex justify-center items-center gap-8">
              <motion.button
                onClick={() => {
                  setCurrentIndex(currentIndex === 0 ? nfts.length - 1 : currentIndex - 1);
                  setIsAutoPlaying(false);
                }}
                className={cn(
                  "w-12 h-12 rounded-full",
                  "bg-background-card/30 backdrop-blur-xl",
                  "border border-border/50",
                  "flex items-center justify-center",
                  "text-white transition-all duration-300",
                  "hover:border-[#FF3BFF]/20",
                  "hover:shadow-lg hover:shadow-[#FF3BFF]/5"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <div className="relative h-[500px] w-full max-w-[1400px] overflow-hidden">
                <AnimatePresence mode="wait">
                {nfts.map((nft, index) => {
                  const isActive = index === currentIndex;
                  const offset = index - currentIndex;

                  return (
                    <motion.div
                      key={nft.id}
                        className={cn(
                          "absolute top-0 w-[320px] cursor-pointer",
                          "rounded-2xl overflow-hidden",
                          "bg-background-card/30 backdrop-blur-xl",
                          "border border-border/50",
                          "transition-all duration-500",
                          isActive && "hover:border-[#FF3BFF]/20 hover:shadow-lg hover:shadow-[#FF3BFF]/5"
                        )}
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : 0.85,
                        opacity: isActive ? 1 : Math.abs(offset) <= 2 ? 0.6 : 0,
                        zIndex: isActive ? 30 : 10 - Math.abs(offset),
                        x: `calc(-50% + ${offset * 220}px)`,
                      }}
                      style={{
                        left: '50%',
                        willChange: 'transform',
                        position: 'absolute'
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 30,
                        mass: 0.5
                      }}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsAutoPlaying(false);
                      }}
                      whileHover={isActive ? {
                        scale: 1.05,
                        transition: { 
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }
                      } : {}}
                    >
                        <div className="relative aspect-[2/3]">
                          <motion.img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full h-full object-cover"
                            initial={false}
                            animate={{ scale: isActive ? 1 : 1.1 }}
                  transition={{ duration: 0.6 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
                          
                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                            <motion.h3 
                              className={cn(
                                "text-xl font-bold mb-2",
                                "font-space-grotesk",
                                "bg-gradient-to-r",
                                nft.gradient,
                                "bg-clip-text text-transparent"
                              )}
                              initial={false}
                              animate={{ 
                                opacity: isActive ? 1 : 0.7,
                                y: isActive ? 0 : 10
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {nft.name}
                            </motion.h3>
                <motion.p
                              className="text-sm text-text-secondary font-dm-sans"
                              initial={false}
                              animate={{ 
                                opacity: isActive ? 1 : 0.7,
                                y: isActive ? 0 : 10
                              }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              {nft.description}
                </motion.p>
                      </div>
                      </div>
                  </motion.div>
                  );
                })}
                </AnimatePresence>
            </div>

              <motion.button
                onClick={() => {
                  setCurrentIndex(currentIndex === nfts.length - 1 ? 0 : currentIndex + 1);
                  setIsAutoPlaying(false);
                }}
                className={cn(
                  "w-12 h-12 rounded-full",
                  "bg-background-card/30 backdrop-blur-xl",
                  "border border-border/50",
                  "flex items-center justify-center",
                  "text-white transition-all duration-300",
                  "hover:border-[#FF3BFF]/20",
                  "hover:shadow-lg hover:shadow-[#FF3BFF]/5"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-8">
                {nfts.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                      index === currentIndex 
                      ? "w-8 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]"
                      : "w-2 bg-white/20 hover:bg-white/30"
                  )}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Users Love NEFTIT Section */}
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space-grotesk">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent">
              Why Users Love NEFTIT
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF]/20 via-[#36F9F6]/20 to-[#5C24FF]/20 blur-2xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </span>
            </h2>
            <p className="text-xl text-text-secondary font-dm-sans max-w-3xl mx-auto">
              Join thousands of users already collecting and upgrading NFTs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lovableFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card Background */}
                <div className={cn(
                  "relative p-8 rounded-3xl",
                  "bg-background-card/30 backdrop-blur-xl",
                  "border border-border/50",
                  "transition-all duration-500",
                  "hover:border-[#FF3BFF]/20",
                  "hover:shadow-lg hover:shadow-[#FF3BFF]/5",
                  "overflow-hidden"
                )}>
                  {/* Animated Gradient Background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    animate={{
                      background: [
                        `linear-gradient(to right, ${feature.gradient})`,
                        `linear-gradient(to left, ${feature.gradient})`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-background-card/80 backdrop-blur-sm" />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={cn(
                        "w-16 h-16 rounded-2xl",
                        "bg-gradient-to-r",
                        feature.gradient,
                        "p-4 shadow-lg mb-6",
                        "relative overflow-hidden"
                      )}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <feature.icon className="w-full h-full text-white relative z-10" />
                    </motion.div>

                    <h3 className={cn(
                      "text-2xl font-semibold mb-4",
                      "font-space-grotesk",
                      "bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                    )}>
                    {feature.title}
                  </h3>

                    <p className="text-text-secondary font-dm-sans">
                    {feature.description}
                  </p>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space-grotesk">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent">
              How It Works
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF]/20 via-[#36F9F6]/20 to-[#5C24FF]/20 blur-2xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </span>
            </h2>
            <p className="text-xl text-text-secondary font-dm-sans max-w-3xl mx-auto">
              Your journey to rare NFTs in four simple steps
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 hidden lg:block">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF3BFF]/20 via-[#36F9F6]/20 to-[#5C24FF]/20"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative"
                >
                  {/* Card Background */}
                  <div className={cn(
                    "relative p-8 rounded-3xl",
                    "bg-background-card/30 backdrop-blur-xl",
                    "border border-border/50",
                    "transition-all duration-500",
                    "hover:border-[#FF3BFF]/20",
                    "hover:shadow-lg hover:shadow-[#FF3BFF]/5",
                    "overflow-hidden"
                  )}>
                    {/* Animated Gradient Background */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                      animate={{
                        background: [
                          "linear-gradient(to right, rgba(255,59,255,0.05), rgba(54,249,246,0.05))",
                          "linear-gradient(to left, rgba(255,59,255,0.05), rgba(54,249,246,0.05))",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />

                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-background-card/80 backdrop-blur-sm" />

                    {/* Content */}
                    <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <motion.span 
                          className="text-6xl opacity-50"
                          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {step.icon}
                        </motion.span>
                        <motion.span 
                          className={cn(
                            "text-5xl font-bold",
                            "font-space-grotesk",
                            "bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]",
                            "bg-clip-text text-transparent"
                          )}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                        {step.step}
                        </motion.span>
                    </div>

                      <h3 className={cn(
                        "text-2xl font-semibold mb-4",
                        "font-space-grotesk",
                        "bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                      )}>
                      {step.title}
                    </h3>

                      <p className="text-text-secondary font-dm-sans mb-6">
                      {step.description}
                    </p>

                    <ul className="space-y-3">
                      {step.bullets.map((bullet, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                          transition={{ delay: 0.5 + (i * 0.1) }}
                            className="flex items-center text-text-secondary font-dm-sans group/bullet"
                          >
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF3BFF] to-[#36F9F6] mr-3"
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="group-hover/bullet:text-white transition-colors">
                          {bullet}
                            </span>
                        </motion.li>
                      ))}
                    </ul>

                      {/* Hover Effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Get Your Favorite Web3 Projects Section */}
      <div className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-5xl lg:text-6xl font-bold font-space-grotesk leading-tight">
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent">
                  Get Your Favorite Web3 Projects NFTs
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF]/20 via-[#36F9F6]/20 to-[#5C24FF]/20 blur-2xl"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </span>
                </h2>
                <p className="text-xl text-text-secondary font-dm-sans leading-relaxed">
                  Collect, trade, and showcase exclusive NFTs from the most innovative Web3 projects in the ecosystem.
                </p>
                <div className="pt-4">
                  <Link to="/explore">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                    <Button 
                      size="lg"
                        className={cn(
                          "relative overflow-hidden",
                          "bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]",
                          "text-white font-medium px-8 py-6 text-lg rounded-full",
                          "transition-all duration-300",
                          "hover:shadow-lg hover:shadow-[#FF3BFF]/20",
                          "group"
                        )}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                      Explore NFTs
                          <motion.div
                            animate={{
                              x: [0, 4, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5C24FF] via-[#FF3BFF] to-[#36F9F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className={cn(
                  "relative rounded-3xl overflow-hidden aspect-square",
                  "bg-background-card/30 backdrop-blur-xl",
                  "border border-border/50",
                  "transition-all duration-500",
                  "hover:border-[#FF3BFF]/20",
                  "hover:shadow-lg hover:shadow-[#FF3BFF]/5",
                  "group"
                )}>
                  <motion.img 
                    src="/images/cybernetic-gorilla-fierce-futuristic-illustration_477639-6715.avif"
                    alt="Featured NFT"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl"
                    animate={{
                      background: [
                        "rgba(255,59,255,0.3)",
                        "rgba(54,249,246,0.3)",
                        "rgba(92,36,255,0.3)",
                        "rgba(255,59,255,0.3)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl"
                    animate={{
                      background: [
                        "rgba(54,249,246,0.3)",
                        "rgba(92,36,255,0.3)",
                        "rgba(255,59,255,0.3)",
                        "rgba(54,249,246,0.3)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-20 h-20 rounded-xl overflow-hidden"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                      background: [
                        "linear-gradient(to right, #FF3BFF, #36F9F6)",
                        "linear-gradient(to right, #36F9F6, #5C24FF)",
                        "linear-gradient(to right, #5C24FF, #FF3BFF)",
                        "linear-gradient(to right, #FF3BFF, #36F9F6)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* The NEFTIT NFT System Section */}
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space-grotesk">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent">
              The NEFTIT NFT System
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF]/20 via-[#36F9F6]/20 to-[#5C24FF]/20 blur-2xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </span>
            </h2>
            <p className="text-xl text-text-secondary font-dm-sans max-w-3xl mx-auto">
              Upgrade your NFTs for maximum rarity & exclusivity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {nftTiers.map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                {/* Card Background */}
                <div className={cn(
                  "relative p-8 rounded-3xl",
                  "bg-background-card/30 backdrop-blur-xl",
                  "border border-border/50",
                  "transition-all duration-500",
                  "hover:border-[#FF3BFF]/20",
                  "hover:shadow-lg hover:shadow-[#FF3BFF]/5",
                  "overflow-hidden"
                )}>
                  {/* Animated Gradient Background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    animate={{
                      background: [
                        `linear-gradient(to right, ${tier.gradient}, rgba(54,249,246,0.05))`,
                        `linear-gradient(to left, ${tier.gradient}, rgba(255,59,255,0.05))`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-background-card/80 backdrop-blur-sm" />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={cn(
                        "w-20 h-20 rounded-2xl mb-6 mx-auto",
                        "bg-gradient-to-r",
                        tier.gradient,
                        "flex items-center justify-center",
                        "shadow-lg relative overflow-hidden",
                        "group/icon"
                      )}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                      <motion.span 
                        className="text-3xl font-bold text-white relative z-10"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [1, 0.8, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {tier.symbol}
                      </motion.span>
                    </motion.div>

                    <h3 className={cn(
                      "text-2xl font-semibold mb-4 text-center",
                      "font-space-grotesk",
                      "bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                    )}>
                    {tier.tier}
                  </h3>

                    <p className="text-text-secondary font-dm-sans text-center mb-4">
                    {tier.description}
                  </p>

                    <div className="relative">
                      <motion.div
                        className="h-px w-full bg-gradient-to-r from-transparent via-[#FF3BFF]/20 to-transparent mb-4"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                      />
                      <p className="text-sm text-text-secondary/80 font-dm-sans text-center">
                    {tier.detail}
                  </p>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Start Your NFT Journey Section */}
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={cn(
                "relative p-12 rounded-3xl text-center",
                "bg-background-card/30 backdrop-blur-xl",
                "border border-border/50",
                "transition-all duration-500",
                "hover:border-[#FF3BFF]/20",
                "hover:shadow-lg hover:shadow-[#FF3BFF]/5",
                "overflow-hidden"
              )}
            >
              {/* Animated Gradient Background */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
                animate={{
                  background: [
                    "linear-gradient(to right, rgba(255,59,255,0.1), rgba(54,249,246,0.1))",
                    "linear-gradient(to left, rgba(255,59,255,0.1), rgba(54,249,246,0.1))",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Grid Pattern */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
              
              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-background-card/80 backdrop-blur-sm" />
              
              {/* Content */}
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space-grotesk">
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent">
                  Start Your NFT Journey Today
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF]/20 via-[#36F9F6]/20 to-[#5C24FF]/20 blur-2xl"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </span>
                </h2>

                <p className="text-xl text-text-secondary font-dm-sans">
                  Engage. Collect. Upgrade. Be Part of the Future of NFTs!
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                <Link to="/auth">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                  <Button
                    size="lg"
                        className={cn(
                          "relative overflow-hidden",
                          "bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]",
                          "text-white font-medium px-12 py-6 text-xl rounded-full",
                          "transition-all duration-300",
                          "hover:shadow-lg hover:shadow-[#FF3BFF]/20",
                          "group"
                        )}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                    Join Now
                          <motion.div
                            animate={{
                              x: [0, 4, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5C24FF] via-[#FF3BFF] to-[#36F9F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Button>
                    </motion.div>
                </Link>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl"
                  animate={{
                    background: [
                      "rgba(255,59,255,0.1)",
                      "rgba(54,249,246,0.1)",
                      "rgba(92,36,255,0.1)",
                      "rgba(255,59,255,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl"
                  animate={{
                    background: [
                      "rgba(54,249,246,0.1)",
                      "rgba(92,36,255,0.1)",
                      "rgba(255,59,255,0.1)",
                      "rgba(54,249,246,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
                </motion.div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default Landing;