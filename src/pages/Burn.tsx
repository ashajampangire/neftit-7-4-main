import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
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
  Zap,
  Grid,
  List,
  SlidersHorizontal,
  Sliders,
  Search,
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
type BurnStep = "select" | "confirm" | "burning" | "success" | "complete";

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
      name: "Rare NFT",
    },
  },
  {
    minRarity: "Rare",
    maxRarity: "Rare",
    requiredAmount: 3,
    tier: "2",
    resultingNFT: {
      rarity: "Legendary",
      tier: "4",
      image:
        "/images/crypto-currency-token-like-bitcoin-visual-design-artwork_796368-21708.avif",
      name: "Legendary NFT",
    },
  },
  {
    minRarity: "Legendary",
    maxRarity: "Legendary",
    requiredAmount: 3,
    tier: "4",
    resultingNFT: {
      rarity: "Silver",
      tier: "6",
      image: "/images/3d-rendering-holographic-layering_23-2150491112.avif",
      name: "Silver NFT",
    },
  },
  {
    minRarity: "Silver",
    maxRarity: "Silver",
    requiredAmount: 3,
    tier: "6",
    resultingNFT: {
      rarity: "Gold",
      tier: "7",
      image:
        "/images/crypto-currency-token-like-bitcoin-visual-design-artwork_796368-21708.avif",
      name: "Gold NFT",
    },
  },
];

// Enhanced mock NFTs with max stats
const mockNFTs: NFT[] = [
  {
    id: "1",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611030.avif",
    name: "Common NFT #1",
    rarity: "Common",
    tier: 1,
    collection: "Project",
    stats: {
      power: 50,
      rarity: 50,
      level: 50,
    },
    burnValue: 50,
  },
  {
    id: "2",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611036.avif",
    name: "Common NFT #2",
    rarity: "Common",
    tier: 1,
    collection: "Project",
    stats: { power: 50, rarity: 50, level: 50 },
    burnValue: 50,
  },
  {
    id: "3",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149611054.avif",
    name: "Common NFT #3",
    rarity: "Common",
    tier: 1,
    collection: "Project",
    stats: { power: 50, rarity: 50, level: 50 },
    burnValue: 50,
  },
  {
    id: "4",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149619505.avif",
    name: "Common NFT #4",
    rarity: "Common",
    tier: 1,
    collection: "Project",
    stats: { power: 50, rarity: 50, level: 50 },
    burnValue: 50,
  },
  {
    id: "5",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149622021.avif",
    name: "Common NFT #5",
    rarity: "Common",
    tier: 1,
    collection: "Project",
    stats: { power: 50, rarity: 50, level: 50 },
    burnValue: 50,
  },
  {
    id: "6",
    image: "/images/crypto-bear-boss-cool-teddy-with-bling_1173476-4666.jpg",
    name: "Rare NFT #1",
    rarity: "Rare",
    tier: 2,
    collection: "Project",
    stats: { power: 70, rarity: 70, level: 70 },
    burnValue: 70,
  },
  {
    id: "7",
    image:
      "/images/cybernetic-gorilla-fierce-futuristic-illustration_477639-6715.avif",
    name: "Rare NFT #2",
    rarity: "Rare",
    tier: 2,
    collection: "Project",
    stats: { power: 70, rarity: 70, level: 70 },
    burnValue: 70,
  },
  {
    id: "8",
    image: "/images/monkey-monster-cartoon-hat_545023-627.avif",
    name: "Rare NFT #3",
    rarity: "Rare",
    tier: 2,
    collection: "Project",
    stats: { power: 70, rarity: 70, level: 70 },
    burnValue: 70,
  },
  {
    id: "9",
    image: "/images/hand-drawn-nft-style-ape-illustration_23-2149622024.avif",
    name: "Rare NFT #4",
    rarity: "Rare",
    tier: 2,
    collection: "Project",
    stats: { power: 70, rarity: 70, level: 70 },
    burnValue: 70,
  },
  {
    id: "10",
    image: "/images/3d-rendering-holographic-layering_23-2150491112.avif",
    name: "Legendary NFT #1",
    rarity: "Legendary",
    tier: 3,
    collection: "Project",
    stats: { power: 90, rarity: 90, level: 90 },
    burnValue: 90,
  },
  {
    id: "11",
    image:
      "/images/crypto-currency-token-like-bitcoin-visual-design-artwork_796368-21708.avif",
    name: "Legendary NFT #2",
    rarity: "Legendary",
    tier: 3,
    collection: "Project",
    stats: { power: 90, rarity: 90, level: 90 },
    burnValue: 90,
  },
  {
    id: "12",
    image: "/images/hidden-mining-concept-illustration_114360-29618.avif",
    name: "Legendary NFT #3",
    rarity: "Legendary",
    tier: 3,
    collection: "Project",
    stats: { power: 90, rarity: 90, level: 90 },
    burnValue: 90,
  },
];

const BurnPage = () => {
  const [selectedNFTs, setSelectedNFTs] = useState<NFT[]>([]);
  const [burnStep, setBurnStep] = useState<BurnStep>("select");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [burnProgress, setBurnProgress] = useState(0);
  const controls = useAnimation();
  const [burnChance, setBurnChance] = useState(100);
  const [showStatsPreview, setShowStatsPreview] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Enhanced burning animation with particle effects
  const animateBurning = async () => {
    setBurnStep("burning");
    for (let i = 0; i <= 100; i += 10) {
      setBurnProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    setBurnStep("success");
  };

  // Calculate burn success chance
  const calculateBurnChance = (nfts: NFT[]) => {
    if (nfts.length === 0) return 100;
    // Hard-coded success rates for now, can be updated with actual rates from rules
    return 100; // All burns have 100% success rate for now
  };

  // Effect to update burn chance when selected NFTs change
  useEffect(() => {
    setBurnChance(calculateBurnChance(selectedNFTs));
  }, [selectedNFTs]);

  // Enhanced filtered NFTs function to include search
  const getFilteredNFTs = () => {
    let filtered = mockNFTs;

    // Apply rarity filter
    if (selectedFilter !== "All") {
      filtered = filtered.filter((nft) => nft.rarity === selectedFilter);
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (nft) =>
          nft.name.toLowerCase().includes(query) ||
          nft.rarity.toLowerCase().includes(query) ||
          nft.collection.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  // Handler for selecting an NFT
  const handleSelectNFT = (nft: NFT) => {
    // Check if this NFT is already selected
    const isSelected = selectedNFTs.some((selected) => selected.id === nft.id);

    if (isSelected) {
      // Remove from selection
      setSelectedNFTs(
        selectedNFTs.filter((selected) => selected.id !== nft.id)
      );
    } else {
      // Check we're not exceeding 5 NFTs and they are of the same rarity
      if (selectedNFTs.length < 5) {
        if (
          selectedNFTs.length === 0 ||
          selectedNFTs[0].rarity === nft.rarity
        ) {
          setSelectedNFTs([...selectedNFTs, nft]);
        } else {
          toast.error("You can only select NFTs of the same rarity");
        }
      } else {
        toast.error("You can select up to 5 NFTs");
      }
    }
  };

  // Calculate total burn value
  const getTotalBurnValue = () => {
    if (selectedNFTs.length === 0) return 0;
    return selectedNFTs.reduce((total, nft) => total + nft.burnValue, 0);
  };

  // Get the rule that would apply to the selected NFTs
  const getApplicableRule = () => {
    if (selectedNFTs.length === 0) return null;
    const rarity = selectedNFTs[0].rarity;
    return burnRules.find(
      (rule) => rule.minRarity === rarity && rule.maxRarity === rarity
    );
  };

  // Get the resulting NFT based on the burn rule
  const getResultNFT = () => {
    const rule = getApplicableRule();
    if (!rule) return null;
    return rule.resultingNFT;
  };

  // Handle the burn action
  const handleBurn = async () => {
    setBurnStep("confirm");
  };

  // Confirm the burn and start animation
  const confirmBurn = async () => {
    await animateBurning();
  };

  // Check if burn is possible
  const canBurn = () => {
    const rule = getApplicableRule();
    if (!rule) return false;
    return selectedNFTs.length >= rule.requiredAmount;
  };

  // Get styling based on rarity
  const getRarityStyles = (rarity: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> =
      {
        Common: {
          bg: "bg-gray-800",
          text: "text-text-secondary",
          border: "border-gray-700",
        },
        Rare: {
          bg: "bg-blue-900/20",
          text: "text-blue-400",
          border: "border-blue-800",
        },
        Legendary: {
          bg: "bg-orange-900/20",
          text: "text-orange-400",
          border: "border-orange-800",
        },
        Silver: {
          bg: "bg-emerald-900/20",
          text: "text-emerald-400",
          border: "border-emerald-800",
        },
        Gold: {
          bg: "bg-yellow-900/20",
          text: "text-yellow-400",
          border: "border-yellow-800",
        },
      };

    return (
      colors[rarity] || {
        bg: "bg-gray-800",
        text: "text-text-secondary",
        border: "border-gray-700",
      }
    );
  };

  // Get the applicable rule for an NFT
  const getRuleForNFT = (nft: NFT): BurnRule | null => {
    return (
      burnRules.find(
        (rule) => rule.minRarity === nft.rarity && rule.maxRarity === nft.rarity
      ) || null
    );
  };

  // Get how many more NFTs are needed to burn
  const getMoreNeeded = () => {
    const rule = getApplicableRule();
    if (!rule) return 0;
    return Math.max(0, rule.requiredAmount - selectedNFTs.length);
  };

  // Check if step is active
  const isStepActive = (step: BurnStep) => {
    return burnStep === step;
  };

  return (
    <div className="min-h-screen bg-[#0F1114] font-sora">
      {/* Dark Background */}
      <div className="fixed inset-0 bg-[#0F1114]" />

      <MainNav />

      <main className="container relative mx-auto px-3 sm:px-4 md:px-6 pt-6 pb-10 md:pb-16 space-y-4 md:space-y-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="border-b border-[#2D3748]/50 pb-4 md:pb-6 mt-3 md:mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-sora tracking-tight text-white">
                  NFT Burning Station
                </h1>
                <p className="text-sm sm:text-base font-sora text-[#94A3B8] max-w-2xl mt-1">
                  Burn your NFTs to receive more powerful ones. Select NFTs of
                  the same rarity to burn them together.
                </p>
              </div>

              {/* View Toggles */}
              <div className="flex gap-2 items-center self-end sm:self-auto mt-2 sm:mt-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md",
                    viewMode === "grid"
                      ? "bg-[#38B2AC] text-white"
                      : "bg-[#171923] text-[#94A3B8] hover:bg-[#1A202C]"
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md",
                    viewMode === "list"
                      ? "bg-[#38B2AC] text-white"
                      : "bg-[#171923] text-[#94A3B8] hover:bg-[#1A202C]"
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="py-4 md:py-6">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-4 max-w-2xl mx-auto">
                {["select", "confirm", "burning", "success"].map(
                  (step, index) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-semibold",
                          isStepActive(step as BurnStep)
                            ? "bg-[#38B2AC] text-white"
                            : "bg-[#1A202C] text-[#94A3B8] border border-[#2D3748]"
                        )}
                      >
                        {index + 1}
                      </div>
                      <span className="text-xs mt-1 font-medium text-[#94A3B8] capitalize">
                        {step}
                      </span>
                    </div>
                  )
                )}
              </div>
              {burnStep === "burning" && (
                <div className="max-w-md mx-auto mt-4">
                  <Progress
                    value={burnProgress}
                    className="h-2 [&>[role=progressbar]]:bg-[#38B2AC] bg-[#1A202C]"
                  />
                </div>
              )}
            </div>

            {/* Filters and Search */}
            {burnStep === "select" && (
              <div className="mb-6 md:mb-8 bg-[#171923] rounded-lg md:rounded-xl border border-[#2D3748]/50 p-3 md:p-4">
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <div className="relative rounded-lg">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#94A3B8]" />
                      <input
                        type="text"
                        placeholder="Search NFTs by name, rarity, collection..."
                        className="w-full bg-[#1A202C] py-2 sm:py-3 pl-9 sm:pl-12 pr-3 sm:pr-4 rounded-lg text-sm sm:text-base text-white placeholder-[#718096] font-sora focus:outline-none focus:ring-1 focus:ring-[#38B2AC]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Filter Toggles */}
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={cn(
                        "px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-lg border transition-colors duration-200 font-sora text-sm sm:text-base text-white flex items-center gap-2",
                        showFilters
                          ? "bg-[#38B2AC] border-[#38B2AC]"
                          : "bg-[#1A202C] border-[#2D3748]/50 hover:bg-[#1F2937]"
                      )}
                    >
                      <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden xs:inline">Filters</span>
                    </button>
                    <button className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-lg bg-[#1A202C] border border-[#2D3748]/50 hover:bg-[#1F2937] transition-colors duration-200 font-sora text-sm sm:text-base text-white flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden xs:inline">Sort</span>
                    </button>
                  </div>
                </div>

                {/* Filter Options - Conditionally Show */}
                {showFilters && (
                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#2D3748]/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#94A3B8] mb-1 sm:mb-2">
                          Rarity
                        </label>
                        <select
                          className="w-full bg-[#1A202C] border border-[#2D3748]/50 rounded-lg p-2 sm:p-2.5 text-sm sm:text-base text-white font-sora focus:outline-none focus:ring-1 focus:ring-[#38B2AC]"
                          value={selectedFilter}
                          onChange={(e) => setSelectedFilter(e.target.value)}
                        >
                          <option value="All">All Rarities</option>
                          <option value="Common">Common</option>
                          <option value="Rare">Rare</option>
                          <option value="Legendary">Legendary</option>
                          <option value="Silver">Silver</option>
                          <option value="Gold">Gold</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#94A3B8] mb-1 sm:mb-2">
                          Collection
                        </label>
                        <select className="w-full bg-[#1A202C] border border-[#2D3748]/50 rounded-lg p-2 sm:p-2.5 text-sm sm:text-base text-white font-sora focus:outline-none focus:ring-1 focus:ring-[#38B2AC]">
                          <option>All Collections</option>
                          <option>Project</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#94A3B8] mb-1 sm:mb-2">
                          Sort By
                        </label>
                        <select className="w-full bg-[#1A202C] border border-[#2D3748]/50 rounded-lg p-2 sm:p-2.5 text-sm sm:text-base text-white font-sora focus:outline-none focus:ring-1 focus:ring-[#38B2AC]">
                          <option>Newest First</option>
                          <option>Oldest First</option>
                          <option>Highest Burn Value</option>
                          <option>Lowest Burn Value</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Rarity Filters */}
            {burnStep === "select" && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 md:mb-8">
                {["All", "Common", "Rare", "Legendary", "Silver", "Gold"].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={cn(
                        "px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-sora transition-colors duration-200 text-xs sm:text-sm",
                        selectedFilter === filter
                          ? "bg-[#38B2AC] text-white"
                          : "bg-[#171923] text-[#94A3B8] border border-[#2D3748]/50 hover:border-[#4A5568]"
                      )}
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        {filter === "All" && (
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                        {filter === "Common" && (
                          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                        {filter === "Rare" && (
                          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                        {filter === "Legendary" && (
                          <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                        {filter === "Silver" && (
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                        {filter === "Gold" && (
                          <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                        {filter}
                      </span>
                    </button>
                  )
                )}
              </div>
            )}

            {/* NFT Results Count & Selection Info */}
            {burnStep === "select" && (
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <p className="text-xs sm:text-sm text-[#94A3B8]">
                  Showing{" "}
                  <span className="text-white font-medium">
                    {getFilteredNFTs().length}
                  </span>{" "}
                  NFTs
                </p>
                <p className="text-xs sm:text-sm text-[#94A3B8]">
                  Selected:{" "}
                  <span className="text-white font-medium">
                    {selectedNFTs.length}
                  </span>
                  {getApplicableRule() && (
                    <span> / {getApplicableRule()?.requiredAmount}</span>
                  )}
                </p>
              </div>
            )}

            {/* Select NFTs */}
            {burnStep === "select" && (
              <div>
                <div
                  className={cn(
                    viewMode === "grid"
                      ? "grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
                      : "flex flex-col gap-3 md:gap-4"
                  )}
                >
                  {getFilteredNFTs().map((nft) =>
                    viewMode === "grid" ? (
                      <div
                        key={nft.id}
                        onClick={() => handleSelectNFT(nft)}
                        className={cn(
                          "rounded-lg bg-[#171923] border transition-all duration-200 cursor-pointer overflow-hidden",
                          selectedNFTs.some(
                            (selected) => selected.id === nft.id
                          )
                            ? "border-[#38B2AC] shadow-md shadow-[#38B2AC]/20"
                            : "border-[#2D3748]/50 hover:border-[#4A5568]"
                        )}
                      >
                        {/* NFT Image */}
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                          />
                          {selectedNFTs.some(
                            (selected) => selected.id === nft.id
                          ) && (
                            <div className="absolute top-2 right-2 bg-[#38B2AC] rounded-full p-1">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="p-3 text-center">
                          {/* NFT Name Only */}
                          <h3 className="text-base font-bold font-sora text-white truncate">
                            {nft.name}
                          </h3>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <div
                        key={nft.id}
                        onClick={() => handleSelectNFT(nft)}
                        className={cn(
                          "flex items-center rounded-lg bg-[#171923] border transition-all duration-200 cursor-pointer overflow-hidden",
                          selectedNFTs.some(
                            (selected) => selected.id === nft.id
                          )
                            ? "border-[#38B2AC] shadow-md shadow-[#38B2AC]/20"
                            : "border-[#2D3748]/50 hover:border-[#4A5568]"
                        )}
                      >
                        {/* NFT Image */}
                        <div className="w-16 sm:w-24 h-16 sm:h-24 overflow-hidden relative flex-shrink-0">
                          <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full h-full object-cover"
                          />
                          {selectedNFTs.some(
                            (selected) => selected.id === nft.id
                          ) && (
                            <div className="absolute top-2 right-2 bg-[#38B2AC] rounded-full p-1">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="p-3 sm:p-4 flex-1">
                          {/* NFT Name Only */}
                          <h3 className="text-base sm:text-lg font-bold font-sora text-white">
                            {nft.name}
                          </h3>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* No items message */}
                {getFilteredNFTs().length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="w-12 h-12 text-[#94A3B8] mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      No NFTs Found
                    </h3>
                    <p className="text-[#94A3B8] text-sm max-w-md">
                      There are no NFTs matching your current filters. Try
                      changing your search or filter settings.
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={() => setBurnStep("confirm")}
                    disabled={!canBurn()}
                    className={cn(
                      "px-8 py-6 rounded-lg font-semibold flex items-center gap-2 text-base",
                      canBurn()
                        ? "bg-[#38B2AC] hover:bg-[#319795] text-white"
                        : "bg-[#1A202C] text-[#4A5568] cursor-not-allowed"
                    )}
                  >
                    <Flame className="w-5 h-5" />
                    {canBurn()
                      ? "Continue to Burn"
                      : `Select ${getMoreNeeded()} more NFT${
                          getMoreNeeded() !== 1 ? "s" : ""
                        }`}
                  </Button>
                </div>
              </div>
            )}

            {/* Confirm Screen */}
            {burnStep === "confirm" && (
              <div className="bg-[#171923] rounded-lg border border-[#2D3748]/50 p-4 sm:p-6 max-w-2xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Confirm Burn
                </h2>

                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#1A202C] rounded-lg mb-4">
                    <div>
                      <p className="text-[#94A3B8] text-sm">
                        You're about to burn
                      </p>
                      <p className="text-white text-lg font-semibold">
                        {selectedNFTs.length} {selectedNFTs[0]?.rarity} NFTs
                      </p>
                    </div>
                    <div>
                      <p className="text-[#94A3B8] text-sm">Total Burn Value</p>
                      <p className="text-white text-lg font-semibold">
                        {getTotalBurnValue()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#1A202C] rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[#94A3B8] text-sm">
                        Success Chance
                      </span>
                      <span className="text-white font-semibold">
                        {burnChance}%
                      </span>
                    </div>
                    <Progress
                      value={burnChance}
                      className="h-2 [&>[role=progressbar]]:bg-[#38B2AC] bg-[#0F1114]"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    You'll Receive
                  </h3>
                  {getResultNFT() && (
                    <div className="flex gap-4 p-4 bg-[#1A202C] rounded-lg">
                      <div className="w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
                        <img
                          src={getResultNFT()?.image}
                          alt={getResultNFT()?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">
                          {getResultNFT()?.name}
                        </h4>
                        <Badge
                          className={cn(
                            "mt-1 text-xs font-medium py-0.5 px-2 mb-2",
                            getRarityStyles(getResultNFT()?.rarity || "")
                          )}
                        >
                          {getResultNFT()?.rarity}
                        </Badge>
                        <p className="text-[#94A3B8] text-sm">
                          This NFT will be stronger than your current ones.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex sm:justify-end gap-3">
                  <Button
                    onClick={() => setBurnStep("select")}
                    variant="outline"
                    className="flex-1 sm:flex-none px-4 py-2 border-[#2D3748] bg-transparent text-white hover:bg-[#1A202C] rounded-lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={confirmBurn}
                    className="flex-1 sm:flex-none px-4 py-2 bg-[#38B2AC] hover:bg-[#319795] text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <Flame className="w-4 h-4" />
                    Burn NFTs
                  </Button>
                </div>
              </div>
            )}

            {/* Success Screen */}
            {burnStep === "success" && (
              <div className="bg-[#171923] rounded-lg border border-[#2D3748]/50 p-4 sm:p-6 max-w-2xl mx-auto text-center">
                <div className="w-20 h-20 mx-auto bg-[#38B2AC]/20 rounded-full flex items-center justify-center mb-6">
                  <Flame className="w-10 h-10 text-[#38B2AC]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Burn Successful!
                </h2>
                <p className="text-[#94A3B8] mb-8 max-w-md mx-auto">
                  Your NFTs have been successfully burned and a new, more
                  powerful NFT has been added to your collection.
                </p>

                {getResultNFT() && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 max-w-xs mx-auto"
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-[#38B2AC] to-[#805AD5] opacity-50 blur-xl rounded-xl animate-pulse-slow" />
                      <div className="relative bg-[#1A202C] p-4 rounded-lg overflow-hidden">
                        <img
                          src={getResultNFT()?.image}
                          alt={getResultNFT()?.name}
                          className="w-full h-64 object-cover rounded-lg mb-3"
                        />
                        <h3 className="text-white font-bold text-xl">
                          {getResultNFT()?.name}
                        </h3>
                        <Badge
                          className={cn(
                            "mt-1 text-sm font-medium py-1 px-3",
                            getRarityStyles(getResultNFT()?.rarity || "")
                          )}
                        >
                          {getResultNFT()?.rarity}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                )}

                <Button
                  onClick={() => {
                    setSelectedNFTs([]);
                    setBurnStep("select");
                  }}
                  className="px-6 py-3 bg-[#38B2AC] hover:bg-[#319795] text-white rounded-lg font-semibold"
                >
                  Burn More NFTs
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BurnPage;
