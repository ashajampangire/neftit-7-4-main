import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import StarryBackground from "@/components/layout/StarryBackground";
import { MainNav } from "@/components/layout/MainNav";
import { NewFooter } from "@/components/home/NewFooter";
import { motion } from "framer-motion";
import Section from '@/components/Section';
import Button from '@/components/Button';
import ProcessStep from '@/components/ProcessStep';
import TierCard from '@/components/TierCard';
import FeatureCard from '@/components/FeatureCard';
import AnimatedImage from '@/components/AnimatedImage';
import { 
  Star, 
  Gem, 
  ArrowUpRight, 
  Handshake, 
  User, 
  CheckCheck, 
  Lock, 
  Globe, 
  Monitor, 
  Rocket, 
  BadgeCheck, 
  RefreshCcw, 
  Heart,
  Sparkles
} from 'lucide-react';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for hero section interactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-element', 'slide-normal');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const elements = document.querySelectorAll('.hidden-element');
    
    elements.forEach((el) => observer.observe(el));
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>NEFTIT - Complete Quests, Earn & Upgrade NFTs</title>
        <meta 
          name="description" 
          content="Join NEFTIT to complete exciting quests, earn unique NFTs, and upgrade them to unlock rarer assets. Start your NFT collection journey today!" 
        />
        <meta name="keywords" content="NFT quests, NFT rewards, NFT upgrades, Web3 engagement, NFT collection" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NEFTIT - Complete Quests, Earn & Upgrade NFTs" />
        <meta property="og:description" content="Join NEFTIT to complete exciting quests, earn unique NFTs, and upgrade them to unlock rarer assets." />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-[#000000] relative overflow-hidden">
        {/* Enhanced Background with Starry Effect */}
        <StarryBackground />
        
        {/* Background Grid and Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF3BFF]/5 via-[#36F9F6]/5 to-[#5C24FF]/5 backdrop-blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="fixed -top-24 -right-24 w-64 h-64 rounded-full blur-3xl"
          animate={{
            background: [
              "rgba(255,59,255,0.15)",
              "rgba(54,249,246,0.15)",
              "rgba(92,36,255,0.15)",
              "rgba(255,59,255,0.15)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="fixed -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl"
          animate={{
            background: [
              "rgba(54,249,246,0.15)",
              "rgba(92,36,255,0.15)",
              "rgba(255,59,255,0.15)",
              "rgba(54,249,246,0.15)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <MainNav />
        <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-24 md:space-y-32 pb-20"
          >
            {/* Hero Section with Enhanced Styling */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
              <div className="container-custom relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-20">
                  <motion.div 
                    className="mb-3"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 mb-4">
                      <Sparkles size={14} className="inline-block mr-2 text-[#36F9F6]" />
                      <span className="text-white/80 text-sm font-medium">Web3 NFT Platform</span>
                    </div>
                  </motion.div>
                  
                  <motion.h1 
                    className="text-5xl md:text-6xl font-bold mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <span className="bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent">
                      Complete Quests. 
                      <span className="block mt-2">Earn Unique NFTs.</span>
                    </span>
                    <span className="text-[#FF3BFF] block mt-2">Upgrade & Trade.</span>
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg text-white/70 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Engage in exciting quests, collect exclusive NFTs, and level them up to unlock even rarer assets.
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Button href="#join-now" size="lg" className="bg-gradient-to-r from-[#36F9F6] to-[#FF3BFF] text-white border-none shadow-lg shadow-[#FF3BFF]/20 hover:shadow-[#FF3BFF]/30 hover:scale-105 transition-all duration-300">
                      <Rocket size={18} className="mr-2" />
                      Start Collecting NFTs
                    </Button>
                    <Button href="#how-it-works" variant="secondary" size="lg" className="backdrop-blur-md bg-white/5 border-white/10 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300">
                      Explore Live Quests
                    </Button>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
                  {[
                    { icon: <CheckCheck className="text-[#36F9F6]" size={28} />, title: "Complete Quests", delay: 0.4 },
                    { icon: <Gem className="text-[#FF3BFF]" size={28} />, title: "Earn NFTs", delay: 0.5 },
                    { icon: <ArrowUpRight className="text-[#5C24FF]" size={28} />, title: "Upgrade Rarities", delay: 0.6 },
                    { icon: <Handshake className="text-[#FF61D3]" size={28} />, title: "Trade & Showcase", delay: 0.7 }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: item.delay }}
                      className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-5 text-center hover:bg-black/30 hover:border-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="mx-auto mb-3 flex justify-center">{item.icon}</div>
                      <h3 className="text-lg font-medium bg-gradient-to-r from-[#36F9F6] to-[#FF3BFF] bg-clip-text text-transparent">{item.title}</h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Web3 Projects Section with Glass Morphism */}
            <Section id="web3-projects" animate="fade">
              <div className="container-custom">
                <motion.div 
                  className="flex flex-col md:flex-row gap-12 items-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="w-full md:w-1/2">
                    <motion.h2 
                      className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#36F9F6] via-[#5C24FF] to-[#FF3BFF] bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Get Your Favorite Web3 Projects NFTs
                    </motion.h2>
                    <motion.p 
                      className="text-lg text-white/70 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      Collect, trade, and showcase exclusive NFTs from the most innovative Web3 projects in the ecosystem.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Button href="/discover" className="bg-gradient-to-r from-[#36F9F6] to-[#FF3BFF] text-white border-none shadow-lg shadow-[#FF3BFF]/20 hover:shadow-[#FF3BFF]/30 hover:scale-105 transition-all duration-300">
                        Explore NFTs
                      </Button>
                    </motion.div>
                  </div>
                  <div className="w-full md:w-1/2 relative">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <AnimatedImage 
                        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80" 
                        alt="Web3 Character" 
                        className="w-full rounded-2xl shadow-xl border border-white/10 z-20"
                        animate="right"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#36F9F6]/20 to-[#FF3BFF]/20 rounded-2xl blur-xl -z-10 scale-95 translate-y-4"></div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </Section>
            
            {/* How It Works Section with Enhanced Styling */}
            <Section id="how-it-works" className="py-12" animate="none">
              <div className="container-custom">
                <motion.div 
                  className="text-center max-w-3xl mx-auto mb-16"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 mb-4">
                    <User size={14} className="inline-block mr-2 text-[#36F9F6]" />
                    <span className="text-white/80 text-sm font-medium">How It Works</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#36F9F6] to-[#FF3BFF] bg-clip-text text-transparent">
                    Your journey to rare NFTs in four simple steps
                  </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { 
                      number: "1", 
                      title: "Complete Quests & Challenges", 
                      description: "Participate in social & interactive quests. Follow, retweet, join Discord, solve puzzles, and more!",
                      features: [
                        "Engage with the community",
                        "Complete interactive tasks",
                        "Solve exciting puzzles"
                      ],
                      delay: 0.2
                    },
                    { 
                      number: "2", 
                      title: "Earn & Collect NFTs", 
                      description: "Every completed quest rewards you with a unique NFT. Our NFTs are visually stunning, highly collectible, and valuable.",
                      features: [
                        "Earn unique NFTs",
                        "Build your collection",
                        "Get guaranteed rewards"
                      ],
                      delay: 0.3
                    },
                    { 
                      number: "3", 
                      title: "Upgrade Your NFTs", 
                      description: "Start with Common NFTs and burn them to upgrade to higher tiers. Follow the upgrade path to reach the exclusive Gold tier!",
                      features: [
                        "5 Commons → 1 Platinum",
                        "5 Platinum → 1 Silver",
                        "5 Silver → 1 Gold"
                      ],
                      delay: 0.4
                    },
                    { 
                      number: "4", 
                      title: "Showcase, Trade & Hold", 
                      description: "Trade your NFTs on leading marketplaces, showcase your collection, and hold for exclusive future perks.",
                      features: [
                        "Trade on marketplaces",
                        "Show off your collection",
                        "Access exclusive benefits"
                      ],
                      delay: 0.5
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: step.delay }}
                      viewport={{ once: true }}
                      className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-white/20 transition-all duration-300"
                    >
                      <ProcessStep 
                        number={step.number} 
                        title={step.title} 
                        description={step.description}
                        features={step.features}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>
            
            {/* NFT System Section */}
            <Section id="nft-system" animate="fade">
              <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="title text-gradient mb-4">The NEFTIT NFT System</h2>
                  <p className="body-large text-muted-foreground">
                    Upgrade your NFTs for maximum rarity & exclusivity
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="hidden-element slide-from-bottom delay-1">
                    <TierCard 
                      title="Common" 
                      description="Start your journey with Common NFTs" 
                      details="Complete quests to earn Common NFTs"
                      colorClass="bg-neftit-common"
                    />
                  </div>
                  
                  <div className="hidden-element slide-from-bottom delay-2">
                    <TierCard 
                      title="Platinum & Silver" 
                      description="Burn & upgrade to higher tiers" 
                      details="5 Commons → 1 Platinum, 5 Platinum → 1 Silver"
                      colorClass="bg-gradient-to-r from-neftit-platinum to-neftit-silver"
                    />
                  </div>
                  
                  <div className="hidden-element slide-from-bottom delay-3">
                    <TierCard 
                      title="Gold" 
                      description="Reach the exclusive Gold tier" 
                      details="5 Silver → 1 Gold (Super rare & exclusive)"
                      colorClass="bg-neftit-gold"
                    />
                  </div>
                </div>
              </div>
            </Section>
            
            {/* Benefits Section */}
            <Section id="benefits" animate="fade">
              <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="title text-gradient mb-4">Why Users Love NEFTIT</h2>
                  <p className="body-large text-muted-foreground">
                    Join thousands of users already collecting and upgrading NFTs
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="hidden-element slide-from-bottom delay-1">
                    <FeatureCard 
                      icon={Star} 
                      title="Free to Join" 
                      description="No hidden fees, just complete quests and earn rewards"
                    />
                  </div>
                  
                  <div className="hidden-element slide-from-bottom delay-2">
                    <FeatureCard 
                      icon={Heart} 
                      title="Fun & Interactive" 
                      description="Engage with Web3 in a fresh, exciting way"
                    />
                  </div>
                  
                  <div className="hidden-element slide-from-bottom delay-3">
                    <FeatureCard 
                      icon={RefreshCcw} 
                      title="Upgrade System" 
                      description="Keep progressing and leveling up your collection"
                    />
                  </div>
                  
                  <div className="hidden-element slide-from-bottom delay-4">
                    <FeatureCard 
                      icon={Lock} 
                      title="Anti-Bot Protection" 
                      description="We ensure a fair system for all users"
                    />
                  </div>
                  
                  <div className="hidden-element slide-from-bottom delay-5">
                    <FeatureCard 
                      icon={Globe} 
                      title="Global Access" 
                      description="Anyone can participate, anytime, anywhere"
                    />
                  </div>
                  
                  <div className="hidden-element slide-from-bottom delay-6">
                    <FeatureCard 
                      icon={BadgeCheck} 
                      title="Verified Projects" 
                      description="Only authentic Web3 projects in our ecosystem"
                    />
                  </div>
                </div>
              </div>
            </Section>
            
            {/* Track Progress Section */}
            <Section id="track-progress" animate="fade">
              <div className="container-custom">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2">
                    <div className="inline-block benefit-chip mb-4">
                      <Monitor size={14} className="mr-1" />
                      Track Your Progress
                    </div>
                    <h2 className="title text-gradient mb-6">Monitor your NFT collection and upgrade progress in one place</h2>
                    
                    <div className="space-y-6 mb-8">
                      <div className="flex items-start glass-card p-4">
                        <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                          <Gem size={24} className="text-neftit-purple" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1 text-gradient">NFT Collection Overview</h3>
                          <p className="text-muted-foreground text-sm">
                            View all earned NFTs in one place, track upgrade eligibility, and monitor collection growth.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start glass-card p-4">
                        <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                          <BadgeCheck size={24} className="text-neftit-blue" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1 text-gradient">Live Analytics</h3>
                          <p className="text-muted-foreground text-sm">
                            Check rarity stats, compare with other collectors, and track leaderboard position.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <AnimatedImage 
                      src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000&auto=format&fit=crop" 
                      alt="Dashboard Analytics" 
                      className="w-full rounded-2xl shadow-xl"
                      animate="right"
                    />
                  </div>
                </div>
              </div>
            </Section>
            
            {/* CTA Section */}
            <Section id="join-now" className="bg-gradient-to-b from-background to-indigo-900/10 py-20" animate="fade">
              <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto">
                  <div className="hidden-element glass-card p-10 rounded-3xl border border-white/10 shadow-lg backdrop-blur-lg">
                    <h2 className="title text-gradient mb-6 text-4xl md:text-5xl font-bold">Start Your NFT Journey Today</h2>
                    <p className="body-large text-muted-foreground mb-10 text-xl">
                      Engage. Collect. Upgrade. Be Part of the Future of NFTs!
                    </p>
                    <Button href="/auth" size="lg" className="px-8 py-4 bg-gradient-to-r from-neftit-blue to-neftit-purple border-none text-lg font-medium shadow-[0_0_20px_rgba(68,98,237,0.3)] hover:shadow-[0_0_30px_rgba(68,98,237,0.5)] transition-all duration-300">
                      <Rocket size={20} className="mr-2" />
                      Join Now
                    </Button>
                  </div>
                </div>
              </div>
            </Section>
          </motion.div>
        </main>

        <NewFooter />
      </div>
    </>
  );
};

export default Index;
