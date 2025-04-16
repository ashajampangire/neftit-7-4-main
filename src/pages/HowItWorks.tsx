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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Burn Mechanics",
    description:
      "Combine multiple NFTs to upgrade or create new higher-tier collectibles",
    icon: <Flame className="h-6 w-6 text-orange-400" />,
    details:
      "Our advanced burn system allows you to sacrifice lower-tier NFTs to create rarer and more valuable ones. This helps reduce supply and increase scarcity in the ecosystem.",
    colorClass:
      "from-orange-500/10 to-red-600/10 hover:from-orange-500/20 hover:to-red-600/20",
    image:
      "/images/crypto-currency-token-like-bitcoin-visual-design-artwork_796368-21708.avif",
  },
  {
    title: "Staking",
    description: "Earn rewards by staking your NFTs and NEFT tokens",
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    details:
      "Stake your NFTs to earn passive income with our dynamic rewards system. Higher rarity NFTs earn higher APR, incentivizing long-term holding and ecosystem participation.",
    colorClass:
      "from-blue-500/10 to-indigo-600/10 hover:from-blue-500/20 hover:to-indigo-600/20",
    image: "/images/hidden-mining-concept-illustration_114360-29618.avif",
  },
  {
    title: "Achievements",
    description: "Complete challenges to earn special rewards and badges",
    icon: <Award className="h-6 w-6 text-purple-400" />,
    details:
      "Our gamified achievement system rewards active community members. Complete various tasks to earn exclusive rewards, unique badges, and special access to events.",
    colorClass:
      "from-purple-500/10 to-violet-600/10 hover:from-purple-500/20 hover:to-violet-600/20",
    image: "/images/3d-rendering-holographic-layering_23-2150491112.avif",
  },
  {
    title: "Referrals",
    description: "Invite friends and earn rewards for growing the community",
    icon: <Users className="h-6 w-6 text-green-400" />,
    details:
      "Spread the word about NEFTIT and be rewarded. Our referral program gives you and your referred friends bonuses when they join and participate in the ecosystem.",
    colorClass:
      "from-green-500/10 to-emerald-600/10 hover:from-green-500/20 hover:to-emerald-600/20",
    image:
      "/images/cybernetic-gorilla-fierce-futuristic-illustration_477639-6715.avif",
  },
  {
    title: "Daily Rewards",
    description: "Log in daily to claim rewards and maintain your streak",
    icon: <Clock className="h-6 w-6 text-amber-400" />,
    details:
      "Consistency pays off at NEFTIT. Maintain your login streak to receive progressively better rewards. Daily engagement keeps you connected to our vibrant community.",
    colorClass:
      "from-amber-500/10 to-yellow-600/10 hover:from-amber-500/20 hover:to-yellow-600/20",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611030.avif",
  },
  {
    title: "Leaderboards",
    description:
      "Compete with others and earn exclusive rewards for top rankings",
    icon: <Award className="h-6 w-6 text-rose-400" />,
    details:
      "Our leaderboard system tracks the most active and successful community members. Reach the top spots to earn exclusive rewards and recognition within the ecosystem.",
    colorClass:
      "from-rose-500/10 to-pink-600/10 hover:from-rose-500/20 hover:to-pink-600/20",
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
      <div className="container mx-auto px-4 py-6">
        {/* Simple Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">
            How It Works
          </h1>
          <p className="text-zinc-400">
            Learn about platform features and rewards
          </p>
        </div>

        {/* Activity Style List */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-background">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {feature.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {feature.details}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-muted-foreground hover:text-white"
                  >
                    Learn more
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple FAQ Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <Card key={index} className="border border-border">
                <CardHeader
                  className="p-4 cursor-pointer"
                  onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                >
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium">
                      {item.question}
                    </CardTitle>
                    <span className="text-muted-foreground">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </div>
                  {activeFaq === index && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.answer}
                    </p>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Simple CTA */}
        <Card className="mt-8 border border-border">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-medium text-white mb-2">
              Ready to start?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join our community and start earning rewards
            </p>
            <div className="flex justify-center gap-4">
              <Button>Get Started</Button>
              <Button variant="outline">Join Discord</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HowItWorks;
