import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Flame, 
  ArrowRight,
  Check,
  Crown,
  Filter,
  X,
  ChevronDown,
  AlertCircle,
  Sparkles,
  Star,
  TrendingUp,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import "@/styles/fonts.css";
import { MainNav } from "@/components/layout/MainNav";

// Enhanced types
interface NFTStats {
  power: number;
  rarity: number;
  level: number;
}

interface NFT {
  id: string;
  name: string;
  image: string;
  rarity: string;
  tier: number;
  collection: string;
  stats: NFTStats;
  burnValue: number;
  claimed?: boolean;
}

// Define a BurnStep type to use for the state
type BurnStep = 'select' | 'confirm' | 'burning' | 'success' | 'complete';

interface BurnRule {
  minRarity: string;
  maxRarity: string;
  requiredAmount: number;
  tier: string;
  resultingNFT: {
    rarity: string;
    tier: string;
    image: string;
    name: string;
  };
}

// Updated burn rules to match the tier system
const burnRules: BurnRule[] = [
  { 
    minRarity: "Common",
    maxRarity: "Common", 
    requiredAmount: 5,
    tier: "1",
    resultingNFT: {
      rarity: "Rare",
      tier: "2",
      image: "/images/crypto-bear-boss-cool-teddy-with-bling_1173476-4666.jpg",
      name: "Rare NFT"
    }
  },
  { 
    minRarity: "Rare",
    maxRarity: "Rare", 
    requiredAmount: 3,
    tier: "2",
    resultingNFT: {
      rarity: "Epic",
      tier: "3",
      image: "/images/3d-rendering-holographic-layering_23-2150491112.avif",
      name: "Epic NFT"
    }
  },
  { 
    minRarity: "Epic",
    maxRarity: "Epic", 
    requiredAmount: 3,
    tier: "3",
    resultingNFT: {
      rarity: "Legendary",
      tier: "4",
      image: "/images/crypto-currency-token-like-bitcoin-visual-design-artwork_796368-21708.avif",
      name: "Legendary NFT"
    }
  },
  { 
    minRarity: "Legendary",
    maxRarity: "Legendary", 
    requiredAmount: 3,
    tier: "4",
    resultingNFT: {
      rarity: "Mythic",
      tier: "5",
      image: "/images/hidden-mining-concept-illustration_114360-29618.avif",
      name: "Mythic NFT"
    }
  },
  { 
    minRarity: "Mythic",
    maxRarity: "Mythic", 
    requiredAmount: 3,
    tier: "5",
    resultingNFT: {
      rarity: "Transcendent",
      tier: "6",
      image: "/images/3d-rendering-holographic-layering_23-2150491112.avif",
      name: "Transcendent NFT"
    }
  },
  { 
    minRarity: "Transcendent",
    maxRarity: "Transcendent", 
    requiredAmount: 3,
    tier: "6",
    resultingNFT: {
      rarity: "Divine",
      tier: "7",
      image: "/images/crypto-currency-token-like-bitcoin-visual-design-artwork_796368-21708.avif",
      name: "Divine NFT"
    }
  }
];

// Enhanced mock NFTs with max stats
const mockNFTs: NFT[] = [
  { 
    id: "1", 
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611030.avif", 
    name: "Common NFT #1", 
    rarity: 'Common', 
    tier: 1, 
    collection: 'Project', 
    stats: { 
      power: 50, rarity: 50, level: 50,
    }, 
    burnValue: 50 
  },
  { id: "2", image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611036.avif", name: "Common NFT #2", rarity: 'Common', tier: 1, collection: 'Project', stats: { power: 50, rarity: 50, level: 50 }, burnValue: 50 },
  { id: "3", image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611054.avif", name: "Common NFT #3", rarity: 'Common', tier: 1, collection: 'Project', stats: { power: 50, rarity: 50, level: 50 }, burnValue: 50 },
  { id: "4", image: "/images/hand-drawn-nft-style-ape-illustration_23-2149619505.avif", name: "Common NFT #4", rarity: 'Common', tier: 1, collection: 'Project', stats: { power: 50, rarity: 50, level: 50 }, burnValue: 50 },
  { id: "5", image: "/images/hand-drawn-nft-style-ape-illustration_23-2149622021.avif", name: "Common NFT #5", rarity: 'Common', tier: 1, collection: 'Project', stats: { power: 50, rarity: 50, level: 50 }, burnValue: 50 },
  { id: "6", image: "/images/crypto-bear-boss-cool-teddy-with-bling_1173476-4666.jpg", name: "Rare NFT #1", rarity: 'Rare', tier: 2, collection: 'Project', stats: { power: 70, rarity: 70, level: 70 }, burnValue: 70 },
  { id: "7", image: "/images/cybernetic-gorilla-fierce-futuristic-illustration_477639-6715.avif", name: "Rare NFT #2", rarity: 'Rare', tier: 2, collection: 'Project', stats: { power: 70, rarity: 70, level: 70 }, burnValue: 70 },
  { id: "8", image: "/images/monkey-monster-cartoon-hat_545023-627.avif", name: "Rare NFT #3", rarity: 'Rare', tier: 2, collection: 'Project', stats: { power: 70, rarity: 70, level: 70 }, burnValue: 70 },
  { id: "9", image: "/images/hand-drawn-nft-style-ape-illustration_23-2149622024.avif", name: "Rare NFT #4", rarity: 'Rare', tier: 2, collection: 'Project', stats: { power: 70, rarity: 70, level: 70 }, burnValue: 70 },
  { id: "10", image: "/images/3d-rendering-holographic-layering_23-2150491112.avif", name: "Legendary NFT #1", rarity: 'Legendary', tier: 3, collection: 'Project', stats: { power: 90, rarity: 90, level: 90 }, burnValue: 90 },
  { id: "11", image: "/images/crypto-currency-token-like-bitcoin-visual-design-artwork_796368-21708.avif", name: "Legendary NFT #2", rarity: 'Legendary', tier: 3, collection: 'Project', stats: { power: 90, rarity: 90, level: 90 }, burnValue: 90 },
  { id: "12", image: "/images/hidden-mining-concept-illustration_114360-29618.avif", name: "Legendary NFT #3", rarity: 'Legendary', tier: 3, collection: 'Project', stats: { power: 90, rarity: 90, level: 90 }, burnValue: 90 },
];

const BurnPage = () => {
  const [selectedNFTs, setSelectedNFTs] = useState<NFT[]>([]);
  const [burnStep, setBurnStep] = useState<BurnStep>('select');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [burnProgress, setBurnProgress] = useState(0);
  const controls = useAnimation();
  const [burnChance, setBurnChance] = useState(100);
  const [showStatsPreview, setShowStatsPreview] = useState(false);

  // Enhanced burning animation with particle effects
  const animateBurning = async () => {
    setBurnStep('burning');
    for (let i = 0; i <= 100; i += 10) {
      setBurnProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    setBurnStep('success');
  };

  // Calculate burn success chance
  const calculateBurnChance = (nfts: NFT[]) => {
    if (nfts.length === 0) return 100;
    // Hard-coded success rates for now, can be updated with actual rates from rules
    return 100; // All burns have 100% success rate for now
  };

  // Enhanced NFT selection handler with updated rules
  const handleSelectNFT = (nft: NFT) => {
    setSelectedNFTs(prev => {
      const isSelected = prev.find(selected => selected.id === nft.id);
      if (isSelected) {
        return prev.filter(selected => selected.id !== nft.id);
      }

      // Get the burn rule for the NFT
      const rule = getRuleForNFT(nft);
      if (!rule) {
        toast.error("This NFT cannot be burned");
        return prev;
      }

      // Check if NFTs are of the same type (rarity and tier)
      if (prev.length > 0) {
        if (prev[0].rarity !== nft.rarity || prev[0].tier !== nft.tier) {
          toast.error("You can only burn NFTs of the same type and tier");
          return prev;
        }
      }

      // Check if we've reached the required amount
      if (prev.length >= rule.requiredAmount) {
        toast.error(`You can only select ${rule.requiredAmount} NFTs of this type`);
        return prev;
      }

      return [...prev, nft];
    });
  };

  // Calculate total burn value with bonus
  const getTotalBurnValue = () => {
    if (selectedNFTs.length === 0) return 0;
    const baseValue = selectedNFTs.reduce((total, nft) => total + nft.burnValue, 0);
    // Add bonus for burning complete sets
    const rule = getRuleForNFT(selectedNFTs[0]);
    if (rule && selectedNFTs.length === rule.requiredAmount) {
      return baseValue * 1.5; // 50% bonus for complete sets
    }
    return baseValue;
  };

  // Enhanced burn handler with updated logic
  const handleBurn = async () => {
    if (!canBurn()) return;
    
    await animateBurning();
    
    // Show success message with enhanced rewards
    const resultNFT = getResultNFT();
    toast.success("NFTs burned successfully!", {
      description: `You received a Tier ${resultNFT?.tier} ${selectedNFTs[0]?.rarity} NFT and ${Math.floor(getTotalBurnValue())} burn points!`
    });
  };

  // Enhanced burn validation with updated rules
  const canBurn = () => {
    if (selectedNFTs.length === 0) return false;
    const rule = getRuleForNFT(selectedNFTs[0]);
    if (!rule) return false;
    
    return selectedNFTs.length === rule.requiredAmount && 
           selectedNFTs.every(nft => 
             nft.rarity === selectedNFTs[0].rarity && 
             nft.tier === selectedNFTs[0].tier
           );
  };

  // Get result NFT based on updated rules
  const getResultNFT = () => {
    if (selectedNFTs.length === 0) return null;
    const nft = selectedNFTs[0];
    const rule = getRuleForNFT(nft);
    if (!rule) return null;
    
    return {
      rarity: rule.resultingNFT.rarity,
      tier: rule.resultingNFT.tier
    };
  };

  // Enhanced rule lookup
  const getRuleForNFT = (nft: NFT): BurnRule | null => {
    // Find the rule that matches this NFT's rarity and tier
    return burnRules.find(rule => 
      rule.minRarity === nft.rarity && 
      rule.maxRarity === nft.rarity && 
      rule.tier === String(nft.tier)
    ) || null;
  };

  // Filter NFTs based on selection and claimed status
  const filteredNFTs = mockNFTs.filter(nft => {
    if (nft.claimed) return false;
    if (selectedFilter === 'All') return true;
    if (['Common', 'Rare', 'Legendary'].includes(selectedFilter)) {
      return nft.rarity === selectedFilter;
    }
    // For tier-based filters
    return nft.tier === parseInt(selectedFilter);
  });

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.h1 
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              NFT Burning System
            </motion.h1>
            <motion.p 
              className="text-zinc-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Combine and burn your NFTs to receive exclusive higher-tier NFTs
            </motion.p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="rounded-lg border bg-card/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Burn Value</CardTitle>
                <p className="text-2xl font-bold">{getTotalBurnValue()} Points</p>
              </CardHeader>
            </Card>
            <Card className="rounded-lg border bg-card/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <CardTitle className="text-sm font-medium">Selected NFTs</CardTitle>
                <p className="text-2xl font-bold">{selectedNFTs.length} NFTs</p>
              </CardHeader>
            </Card>
            <Card className="rounded-lg border bg-card/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <CardTitle className="text-sm font-medium">Burn Chance</CardTitle>
                <p className="text-2xl font-bold">{calculateBurnChance(selectedNFTs)}%</p>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Filter Bar */}
          {burnStep === 'select' && (
            <div className="mb-8">
              <Card>
                <CardContent className="p-4">
                  <Tabs defaultValue="All" className="w-full" onValueChange={(value) => setSelectedFilter(value)}>
                    <TabsList className="w-full grid grid-cols-7 gap-1">
                      <TabsTrigger value="All">All</TabsTrigger>
                      <TabsTrigger value="Common">Common</TabsTrigger>
                      <TabsTrigger value="Rare">Rare</TabsTrigger>
                      <TabsTrigger value="Legendary">Legendary</TabsTrigger>
                      <TabsTrigger value="Platinum">Platinum</TabsTrigger>
                      <TabsTrigger value="Silver">Silver</TabsTrigger>
                      <TabsTrigger value="Gold">Gold</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {/* NFT Grid */}
          {burnStep === 'select' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNFTs.map((nft, index) => (
                <Card
                  key={nft.id}
                  className={cn(
                    "group relative overflow-hidden",
                    selectedNFTs.find(selected => selected.id === nft.id) && "border-primary"
                  )}
                  onClick={() => handleSelectNFT(nft)}
                >
                  <div className="aspect-square relative">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* NFT Stats */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <Progress value={nft.stats.power} className="h-1.5" />
                        <span className="text-xs">{nft.stats.power}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary" />
                        <Progress value={nft.stats.rarity} className="h-1.5" />
                        <span className="text-xs">{nft.stats.rarity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-primary" />
                        <Progress value={nft.stats.level} className="h-1.5" />
                        <span className="text-xs">{nft.stats.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold">
                          {nft.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Tier {nft.tier}
                        </p>
                      </div>
                      <Badge>
                        {nft.rarity}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Burn Value</span>
                      <span className="font-medium">{nft.burnValue} Points</span>
                    </div>

                    {selectedNFTs.find(selected => selected.id === nft.id) && (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <div className="p-2 rounded-full bg-primary">
                          <Check className="w-6 h-6 text-background" />
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Burning Animation */}
          {burnStep === 'burning' && (
            <div className="text-center space-y-8 py-16">
              <div className="w-32 h-32 mx-auto">
                <Flame className="w-full h-full text-primary" />
              </div>
              
              <div className="max-w-xs mx-auto">
                <Progress value={burnProgress} className="h-2" />
                <p className="mt-4 text-muted-foreground">Burning NFTs... {burnProgress}%</p>
              </div>
            </div>
          )}

          {/* Success State */}
          {burnStep === 'success' && (
            <div className="text-center space-y-8 py-16">
              <div className="w-32 h-32 mx-auto rounded-full bg-primary p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold">
                  Congratulations!
                </h2>
                <p className="text-muted-foreground">
                  You have successfully received:
                </p>
                <div className="flex flex-col items-center gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-lg font-medium">
                        <Crown className="w-6 h-6 text-primary" />
                        1 Tier {Math.min(...selectedNFTs.map(nft => nft.tier)) + 1} {selectedNFTs[0]?.rarity} NFT
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-lg font-medium">
                        <Flame className="w-6 h-6 text-primary" />
                        {getTotalBurnValue()} Burn Points
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Button
                onClick={() => {
                  setBurnStep('select');
                  setSelectedNFTs([]);
                }}
              >
                Burn More NFTs
              </Button>
            </div>
          )}

          {/* Burn Button */}
          {burnStep === 'select' && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setShowStatsPreview(!showStatsPreview)}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Burn Details
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="lg"
                    disabled={!canBurn()}
                  >
                    <Flame className="w-6 h-6 mr-2" />
                    Burn {selectedNFTs.length} NFTs
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent variant="glass" className="p-6">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Confirm NFT Burn
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You're about to burn {selectedNFTs.length} {selectedNFTs[0]?.rarity} NFTs to receive:
                      <div className="mt-4 space-y-4">
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 text-lg font-medium">
                              <Crown className="w-6 h-6 text-primary" />
                              1 Tier {Math.min(...selectedNFTs.map(nft => nft.tier)) + 1} {selectedNFTs[0]?.rarity} NFT
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 text-lg font-medium">
                              <Flame className="w-6 h-6 text-primary" />
                              {getTotalBurnValue()} Burn Points
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleBurn}
                    >
                      Confirm Burn
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BurnPage;
