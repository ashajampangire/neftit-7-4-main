import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Zap,
  Shield,
  Trophy,
  Users,
  Sparkles,
  Rocket,
  Star,
} from "lucide-react";
import "@/styles/fonts.css";
import WalletConnectionModal from "@/components/wallet/WalletConnectionModal";
import { NFTShowcase } from "@/components/showcase/NFTShowcase";
import { useWallet } from "@/components/wallet/WalletProvider";
import { MainNav } from "@/components/layout/MainNav";

// Features data
const features = [
  {
    title: "Daily Rewards",
    description: "Complete daily quests and earn exclusive rewards instantly",
    icon: Sparkles,
  },
  {
    title: "Fast Earnings",
    description: "Quick completion bonuses and instant reward distribution",
    icon: Zap,
  },
  {
    title: "Secure Platform",
    description: "Advanced security measures to protect your digital assets",
    icon: Shield,
  },
  {
    title: "Global Community",
    description: "Join thousands of collectors from around the world",
    icon: Users,
  },
];

// Lovable features
const lovableFeatures = [
  {
    title: "Free to Join",
    description: "No hidden fees, just complete quests and earn rewards",
    icon: Rocket,
  },
  {
    title: "Fun & Interactive",
    description: "Engage with Web3 in a fresh, exciting way",
    icon: Sparkles,
  },
  {
    title: "Upgrade System",
    description: "Keep progressing and leveling up your collection",
    icon: Trophy,
  },
  {
    title: "Anti-Bot Protection",
    description: "We ensure a fair system for all users",
    icon: Shield,
  },
  {
    title: "Global Access",
    description: "Anyone can participate, anytime, anywhere",
    icon: Users,
  },
  {
    title: "Verified Projects",
    description: "Only authentic Web3 projects in our ecosystem",
    icon: Star,
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Complete Quests & Challenges",
    description: "Participate in social & interactive quests",
    bullets: [
      "Engage with the community",
      "Complete interactive tasks",
      "Solve exciting puzzles",
    ],
    icon: "🎯",
  },
  {
    step: 2,
    title: "Earn & Collect NFTs",
    description: "Every completed quest rewards you with a unique NFT",
    bullets: [
      "Earn unique NFTs",
      "Build your collection",
      "Get guaranteed rewards",
    ],
    icon: "🏆",
  },
  {
    step: 3,
    title: "Upgrade Your NFTs",
    description: "Start with Common NFTs and burn them to upgrade",
    bullets: [
      "5 Commons → 1 Platinum",
      "5 Platinum → 1 Silver",
      "5 Silver → 1 Gold",
    ],
    icon: "⭐",
  },
  {
    step: 4,
    title: "Showcase, Trade & Hold",
    description: "Trade your NFTs on leading marketplaces",
    bullets: [
      "Trade on marketplaces",
      "Display your collection",
      "Access exclusive perks",
    ],
    icon: "💎",
  },
];

const nftTiers = [
  {
    symbol: "C",
    tier: "Common",
    description: "Start your journey with Common NFTs",
    detail: "Complete quests to earn Common NFTs",
  },
  {
    symbol: "P",
    tier: "Platinum & Silver",
    description: "Burn & upgrade to higher tiers",
    detail: "5 Commons → 1 Platinum, 5 Platinum → 1 Silver",
  },
  {
    symbol: "G",
    tier: "Gold",
    description: "Reach the exclusive Gold tier",
    detail: "5 Silver → 1 Gold (Super rare & exclusive)",
  },
];

const Landing: React.FC = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { isAuthenticated, isConnected } = useWallet();

  return (
    <div className="min-h-screen bg-[#0F1114] font-sora relative overflow-hidden">
      {/* Gradient Background Effects */}
      <div className="fixed inset-0 bg-[#0F1114]">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#36F9F6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <MainNav setExternalWalletModalOpen={setIsWalletModalOpen} />

      <main className="container relative mx-auto px-4 pt-0 mt-0 py-8 space-y-16">
        {/* Hero Section */}
        <section className="py-16 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-up">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sora bg-clip-text text-transparent bg-gradient-to-r from-[#36F9F6] to-[#8B5CF6]">
                Collect, Upgrade, Earn Rewards
              </h1>
              <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-8 font-sora">
                Join the next generation of NFT collectors. Complete engaging
                quests, earn unique NFTs, and build your digital portfolio.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {!isAuthenticated && !isConnected ? (
                  <Button
                    onClick={() => setIsWalletModalOpen(true)}
                    className="glass-card bg-[#38B2AC]/20 hover:bg-[#38B2AC]/30 text-white font-sora px-8 py-3 text-lg transform hover:-translate-y-1 transition-all duration-300 border border-[#38B2AC]/30"
                  >
                    Start Collecting
                  </Button>
                ) : (
                  <Link to="/discover">
                    <Button className="glass-card bg-[#38B2AC]/20 hover:bg-[#38B2AC]/30 text-white font-sora px-8 py-3 text-lg transform hover:-translate-y-1 transition-all duration-300 border border-[#38B2AC]/30">
                      Continue Collecting
                    </Button>
                  </Link>
                )}
                <Link to="/discover">
                  <Button
                    variant="outline"
                    className="glass-card bg-transparent hover:bg-white/5 text-white font-sora px-8 py-3 text-lg border-[#2D3748] transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Explore More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* NFT Showcase Section */}
        <NFTShowcase />

        {/* Features Section */}
        <section className="relative">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#36F9F6] to-[#8B5CF6]">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card hover:scale-[1.02] transition-all duration-300 p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#38B2AC]/20 to-[#8B5CF6]/20 flex items-center justify-center mb-4 group-hover:shadow-glow">
                  <feature.icon className="w-6 h-6 text-[#36F9F6]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-sora">
                  {feature.title}
                </h3>
                <p className="text-[#94A3B8] font-sora">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Lovable Features Section */}
        <section className="relative">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#36F9F6]">
            Why Users Love NEFTIT
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lovableFeatures.map((feature) => (
              <div
                key={feature.title}
                className="glass-card hover:scale-[1.02] transition-all duration-300 p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#8B5CF6]/20 to-[#36F9F6]/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-sora">
                  {feature.title}
                </h3>
                <p className="text-[#94A3B8] font-sora">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#36F9F6] to-[#8B5CF6]">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div
                key={step.step}
                className="glass-card hover:scale-[1.02] transition-all duration-300 p-6 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#36F9F6]/5 to-[#8B5CF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl filter drop-shadow-glow">
                      {step.icon}
                    </span>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#36F9F6] to-[#8B5CF6] font-sora">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-sora">
                    {step.title}
                  </h3>
                  <p className="text-[#94A3B8] mb-4 font-sora">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.bullets.map((bullet, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-[#94A3B8] group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#36F9F6] to-[#8B5CF6] group-hover/item:scale-110 transition-transform duration-300"></div>
                        <span className="font-sora group-hover/item:text-white transition-colors duration-300">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NFT Tiers Section */}
        <section className="relative">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#36F9F6]">
            The NEFTIT NFT System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {nftTiers.map((tier) => (
              <div
                key={tier.tier}
                className="glass-card hover:scale-[1.02] transition-all duration-300 p-6 text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#36F9F6]/5 to-[#8B5CF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#36F9F6]/20 to-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#36F9F6] to-[#8B5CF6] font-sora">
                      {tier.symbol}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-sora">
                    {tier.tier}
                  </h3>
                  <p className="text-[#94A3B8] mb-4 font-sora">
                    {tier.description}
                  </p>
                  <div className="border-t border-[#2D3748] pt-4">
                    <p className="text-sm text-[#94A3B8] font-sora group-hover:text-white/80 transition-colors duration-300">
                      {tier.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="max-w-3xl mx-auto glass-card p-8 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#36F9F6]/5 to-[#8B5CF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#36F9F6] to-[#8B5CF6] font-sora">
                Start Your NFT Journey Today
              </h2>
              <p className="text-[#94A3B8] mb-6 font-sora">
                Engage. Collect. Upgrade. Be Part of the Future of NFTs!
              </p>
              <Link to="/auth">
                <Button className="glass-card bg-gradient-to-r from-[#36F9F6]/20 to-[#8B5CF6]/20 hover:from-[#36F9F6]/30 hover:to-[#8B5CF6]/30 text-white px-8 py-3 text-lg font-sora transform hover:-translate-y-1 transition-all duration-300 border border-white/10">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Wallet Connection Modal */}
      <WalletConnectionModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
};

export default Landing;
