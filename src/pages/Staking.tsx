import { useState, useEffect } from "react";
import { MainNav } from "@/components/layout/MainNav";
import StarryBackground from "@/components/layout/StarryBackground";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/components/wallet/WalletProvider";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { NFTRarity } from "@/types/nft";
import { useToast } from "@/hooks/use-toast";
import { InfoIcon, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types
interface NFT {
  id: string;
  name: string;
  image: string;
  rarity: NFTRarity;
  staked: boolean;
}

interface StakingHistory {
  id: string;
  type: "stake" | "unstake" | "claim";
  amount?: number;
  nftId?: string;
  nftName?: string;
  timestamp: Date;
}

// NFT Staking Modal Component
const StakeNFTModal = ({
  open,
  onClose,
  onStake,
  availableNFTs,
}: {
  open: boolean;
  onClose: () => void;
  onStake: (selectedNFTs: string[]) => void;
  availableNFTs: NFT[];
}) => {
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setSelectedNFTs([]);
    }
  }, [open]);

  const toggleNFT = (id: string) => {
    setSelectedNFTs((prev) =>
      prev.includes(id) ? prev.filter((nftId) => nftId !== id) : [...prev, id]
    );
  };

  const handleStake = () => {
    onStake(selectedNFTs);
    setSelectedNFTs([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-gray-800 text-white sm:max-w-[500px]">
        <DialogTitle>Stake NFTs</DialogTitle>
        <DialogDescription className="text-gray-400">
          Select NFTs you want to stake
        </DialogDescription>

        <div className="grid grid-cols-2 gap-4 py-4 max-h-[400px] overflow-y-auto">
          {availableNFTs.length > 0 ? (
            availableNFTs.map((nft) => (
              <div
                key={nft.id}
                className={`relative border rounded-lg p-3 ${
                  selectedNFTs.includes(nft.id)
                    ? "border-blue-500 bg-blue-900/20"
                    : "border-gray-700 hover:border-gray-500"
                } cursor-pointer transition-all`}
                onClick={() => toggleNFT(nft.id)}
              >
                <div className="absolute top-2 right-2">
                  <Checkbox
                    checked={selectedNFTs.includes(nft.id)}
                    onCheckedChange={() => toggleNFT(nft.id)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full aspect-square object-cover rounded-md mb-2"
                />
                <p className="font-medium truncate">{nft.name}</p>
                <div className="flex items-center mt-1">
                  <Badge
                    className={
                      nft.rarity === "Platinum"
                        ? "bg-purple-500/20 text-purple-300"
                        : nft.rarity === "Gold"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-blue-500/20 text-blue-300"
                    }
                  >
                    {nft.rarity}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-10 text-gray-400">
              No NFTs available to stake
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-700 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStake}
            disabled={selectedNFTs.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Confirm Stake
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Unstake NFT Modal Component
const UnstakeNFTModal = ({
  open,
  onClose,
  onUnstake,
  stakedNFTs,
}: {
  open: boolean;
  onClose: () => void;
  onUnstake: (selectedNFTs: string[]) => void;
  stakedNFTs: NFT[];
}) => {
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setSelectedNFTs([]);
    }
  }, [open]);

  const toggleNFT = (id: string) => {
    setSelectedNFTs((prev) =>
      prev.includes(id) ? prev.filter((nftId) => nftId !== id) : [...prev, id]
    );
  };

  const handleUnstake = () => {
    onUnstake(selectedNFTs);
    setSelectedNFTs([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-gray-800 text-white sm:max-w-[500px]">
        <DialogTitle>Unstake NFTs</DialogTitle>
        <DialogDescription className="text-gray-400">
          Select NFTs you want to unstake
        </DialogDescription>

        <div className="grid grid-cols-2 gap-4 py-4 max-h-[400px] overflow-y-auto">
          {stakedNFTs.length > 0 ? (
            stakedNFTs.map((nft) => (
              <div
                key={nft.id}
                className={`relative border rounded-lg p-3 ${
                  selectedNFTs.includes(nft.id)
                    ? "border-red-500 bg-red-900/20"
                    : "border-gray-700 hover:border-gray-500"
                } cursor-pointer transition-all`}
                onClick={() => toggleNFT(nft.id)}
              >
                <div className="absolute top-2 right-2">
                  <Checkbox
                    checked={selectedNFTs.includes(nft.id)}
                    onCheckedChange={() => toggleNFT(nft.id)}
                    className="data-[state=checked]:bg-red-600"
                  />
                </div>
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full aspect-square object-cover rounded-md mb-2"
                />
                <p className="font-medium truncate">{nft.name}</p>
                <div className="flex items-center mt-1">
                  <Badge
                    className={
                      nft.rarity === "Platinum"
                        ? "bg-purple-500/20 text-purple-300"
                        : nft.rarity === "Gold"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-blue-500/20 text-blue-300"
                    }
                  >
                    {nft.rarity}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-10 text-gray-400">
              No staked NFTs to unstake
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-700 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUnstake}
            disabled={selectedNFTs.length === 0}
            className="bg-red-600 hover:bg-red-700"
          >
            Confirm Unstake
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Token Staking Modal Component
const StakeTokenModal = ({
  open,
  onClose,
  onStake,
  maxAmount,
  apr,
}: {
  open: boolean;
  onClose: () => void;
  onStake: (amount: number) => void;
  maxAmount: number;
  apr: number;
}) => {
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (open) {
      setAmount("");
    }
  }, [open]);

  const handleStake = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    onStake(parseFloat(amount));
    setAmount("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-gray-800 text-white sm:max-w-[400px]">
        <DialogTitle>Stake NEFT Tokens</DialogTitle>
        <DialogDescription className="text-gray-400">
          Enter the amount of NEFT tokens you want to stake
        </DialogDescription>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Amount</label>
            <div className="relative">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-900 border-gray-700 focus:border-blue-500"
                placeholder="0.00"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 text-xs"
                onClick={() => setAmount(maxAmount.toString())}
              >
                Max
              </Button>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Balance: {maxAmount} NEFT</span>
              {parseFloat(amount) > maxAmount && (
                <span className="text-red-400">Insufficient balance</span>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-gray-900 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">APR</span>
              <span>{apr}%</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-400">Estimated daily rewards</span>
              <span>
                {(((parseFloat(amount) || 0) * apr) / 365 / 100).toFixed(4)}{" "}
                NEFT
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-700 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStake}
            disabled={
              !amount ||
              parseFloat(amount) <= 0 ||
              parseFloat(amount) > maxAmount
            }
            className="bg-blue-600 hover:bg-blue-700"
          >
            Confirm Stake
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Token Unstaking Modal Component
const UnstakeTokenModal = ({
  open,
  onClose,
  onUnstake,
  stakedAmount,
  lockupPeriod = false,
}: {
  open: boolean;
  onClose: () => void;
  onUnstake: (amount: number) => void;
  stakedAmount: number;
  lockupPeriod?: boolean;
}) => {
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (open) {
      setAmount("");
    }
  }, [open]);

  const handleUnstake = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    onUnstake(parseFloat(amount));
    setAmount("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-gray-800 text-white sm:max-w-[400px]">
        <DialogTitle>Unstake NEFT Tokens</DialogTitle>
        <DialogDescription className="text-gray-400">
          Enter the amount of NEFT tokens you want to unstake
        </DialogDescription>

        <div className="py-4 space-y-4">
          {lockupPeriod && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-900/20 border border-amber-900/50">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-300">
                Your tokens are in a 7-day lockup period. Unstaking now will
                result in a 5% penalty.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Amount</label>
            <div className="relative">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-900 border-gray-700 focus:border-blue-500"
                placeholder="0.00"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 text-xs"
                onClick={() => setAmount(stakedAmount.toString())}
              >
                Max
              </Button>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Staked: {stakedAmount} NEFT</span>
              {parseFloat(amount) > stakedAmount && (
                <span className="text-red-400">Exceeds staked amount</span>
              )}
            </div>
          </div>

          {lockupPeriod && (
            <div className="rounded-lg bg-gray-900 p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Unstaking Fee</span>
                <span>5%</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-400">You will receive</span>
                <span>
                  {((parseFloat(amount) || 0) * 0.95).toFixed(4)} NEFT
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-700 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUnstake}
            disabled={
              !amount ||
              parseFloat(amount) <= 0 ||
              parseFloat(amount) > stakedAmount
            }
            className="bg-red-600 hover:bg-red-700"
          >
            Confirm Unstake
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main Staking Page Component
const StakingPage = () => {
  const {
    isConnected,
    address,
    balance,
    stakedAmount,
    updateBalance,
    updateStakedAmount,
  } = useWallet();
  const [activeTab, setActiveTab] = useState("nfts");
  const [nftModalOpen, setNftModalOpen] = useState(false);
  const [unstakeNftModalOpen, setUnstakeNftModalOpen] = useState(false);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [unstakeTokenModalOpen, setUnstakeTokenModalOpen] = useState(false);
  const { toast } = useToast();

  // Mock data for illustration
  const [walletBalance, setWalletBalance] = useState(balance);
  const [tokenStaked, setTokenStaked] = useState(stakedAmount);
  const [earnedRewards, setEarnedRewards] = useState(0);
  const [stakingHistory, setStakingHistory] = useState<StakingHistory[]>([]);
  const [apr] = useState(20); // Fixed APR for this example

  // NFT staking data - MOVED THIS BEFORE IT'S USED
  const [nfts, setNfts] = useState<NFT[]>([
    {
      id: "1",
      name: "Cosmic Explorer #123",
      image: "https://picsum.photos/200/200?1",
      rarity: "Platinum",
      staked: false,
    },
    {
      id: "2",
      name: "Galactic Pioneer #456",
      image: "https://picsum.photos/200/200?2",
      rarity: "Silver",
      staked: false,
    },
    {
      id: "3",
      name: "Star Voyager #789",
      image: "https://picsum.photos/200/200?3",
      rarity: "Gold",
      staked: false,
    },
    {
      id: "4",
      name: "Celestial Guardian #101",
      image: "https://picsum.photos/200/200?4",
      rarity: "Platinum",
      staked: false,
    },
    {
      id: "5",
      name: "Nebula Warden #202",
      image: "https://picsum.photos/200/200?5",
      rarity: "Silver",
      staked: false,
    },
  ]);

  // NFT staking counters
  const stakedNFTs = {
    Platinum: nfts.filter((nft) => nft.staked && nft.rarity === "Platinum")
      .length,
    Silver: nfts.filter((nft) => nft.staked && nft.rarity === "Silver").length,
    Gold: nfts.filter((nft) => nft.staked && nft.rarity === "Gold").length,
  };

  // Available NFTs for staking
  const availableNFTs = nfts.filter((nft) => !nft.staked);

  // Staked NFTs for unstaking
  const stakedNFTList = nfts.filter((nft) => nft.staked);

  // Update balance when wallet provider balance changes
  useEffect(() => {
    setWalletBalance(balance);
  }, [balance]);

  // Update staked amount when wallet provider staked amount changes
  useEffect(() => {
    setTokenStaked(stakedAmount);
  }, [stakedAmount]);

  // Simulate earning rewards
  useEffect(() => {
    if (tokenStaked > 0 || nfts.some((nft) => nft.staked)) {
      const intervalId = setInterval(() => {
        // Calculate NFT staking rewards
        let nftReward = 0;
        nfts.forEach((nft) => {
          if (nft.staked) {
            nftReward += getRewardRate(nft.rarity);
          }
        });

        // Calculate token staking rewards (daily rate / 24 hours * 10 for faster simulation)
        const tokenReward = ((tokenStaked * apr) / 365 / 100 / 24) * 10;

        setEarnedRewards((prev) => prev + nftReward + tokenReward);
      }, 60000); // Every minute for demo purposes

      return () => clearInterval(intervalId);
    }
  }, [tokenStaked, nfts, apr]);

  // Handle NFT staking
  const handleStakeNFTs = (selectedNFTs: string[]) => {
    // Update NFT staking status
    const updatedNFTs = nfts.map((nft) =>
      selectedNFTs.includes(nft.id) ? { ...nft, staked: true } : nft
    );
    setNfts(updatedNFTs);

    // Add to history
    const newHistory = selectedNFTs.map((id) => {
      const nft = nfts.find((n) => n.id === id);
      return {
        id: `hist-${Date.now()}-${id}`,
        type: "stake" as const,
        nftId: id,
        nftName: nft?.name,
        timestamp: new Date(),
      };
    });

    setStakingHistory((prev) => [...newHistory, ...prev]);

    toast({
      title: "NFTs Staked",
      description: `Successfully staked ${selectedNFTs.length} NFTs`,
    });
  };

  // Handle NFT unstaking
  const handleUnstakeNFTs = (selectedNFTs: string[]) => {
    // Update NFT staking status
    const updatedNFTs = nfts.map((nft) =>
      selectedNFTs.includes(nft.id) ? { ...nft, staked: false } : nft
    );
    setNfts(updatedNFTs);

    // Add to history
    const newHistory = selectedNFTs.map((id) => {
      const nft = nfts.find((n) => n.id === id);
      return {
        id: `hist-unstake-${Date.now()}-${id}`,
        type: "unstake" as const,
        nftId: id,
        nftName: nft?.name,
        timestamp: new Date(),
      };
    });

    setStakingHistory((prev) => [...newHistory, ...prev]);

    toast({
      title: "NFTs Unstaked",
      description: `Successfully unstaked ${selectedNFTs.length} NFTs`,
    });
  };

  // Handle token staking
  const handleStakeTokens = (amount: number) => {
    const newWalletBalance = walletBalance - amount;
    const newStakedAmount = tokenStaked + amount;

    setWalletBalance(newWalletBalance);
    setTokenStaked(newStakedAmount);

    // Update wallet provider state
    updateBalance(newWalletBalance);
    updateStakedAmount(newStakedAmount);

    // Add to history
    setStakingHistory((prev) => [
      {
        id: `hist-token-${Date.now()}`,
        type: "stake",
        amount,
        timestamp: new Date(),
      },
      ...prev,
    ]);

    toast({
      title: "Tokens Staked",
      description: `Successfully staked ${amount} NEFT`,
    });
  };

  // Handle token unstaking
  const handleUnstakeTokens = (amount: number) => {
    const newWalletBalance = walletBalance + amount;
    const newStakedAmount = tokenStaked - amount;

    setWalletBalance(newWalletBalance);
    setTokenStaked(newStakedAmount);

    // Update wallet provider state
    updateBalance(newWalletBalance);
    updateStakedAmount(newStakedAmount);

    // Add to history
    setStakingHistory((prev) => [
      {
        id: `hist-unstake-token-${Date.now()}`,
        type: "unstake",
        amount,
        timestamp: new Date(),
      },
      ...prev,
    ]);

    toast({
      title: "Tokens Unstaked",
      description: `Successfully unstaked ${amount} NEFT`,
    });
  };

  // Handle claiming rewards
  const handleClaimRewards = () => {
    if (earnedRewards <= 0) return;

    setWalletBalance((prev) => prev + earnedRewards);
    updateBalance(walletBalance + earnedRewards);
    setEarnedRewards(0);

    // Add to history
    setStakingHistory((prev) => [
      {
        id: `hist-claim-${Date.now()}`,
        type: "claim",
        amount: earnedRewards,
        timestamp: new Date(),
      },
      ...prev,
    ]);

    toast({
      title: "Rewards Claimed",
      description: `Successfully claimed ${earnedRewards.toFixed(4)} NEFT`,
    });
  };

  // Get reward rate by NFT rarity
  const getRewardRate = (rarity: NFTRarity) => {
    switch (rarity) {
      case "Platinum":
        return 0.0007; // ~1 per day (1/1440)
      case "Silver":
        return 0.0017; // ~2.5 per day (2.5/1440)
      case "Gold":
        return 0.0042; // ~6 per day (6/1440)
      default:
        return 0;
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Get NFT icon by rarity
  const getNFTIcon = (rarity: NFTRarity) => {
    switch (rarity) {
      case "Platinum":
        return (
          <div className="w-10 h-10 rounded-md bg-purple-900/30 flex items-center justify-center">
            <div className="w-6 h-6 bg-purple-500 rounded-md transform rotate-45"></div>
          </div>
        );
      case "Silver":
        return (
          <div className="w-10 h-10 rounded-md bg-blue-900/30 flex items-center justify-center">
            <div className="w-6 h-6 bg-blue-500 rounded-md transform rotate-45"></div>
          </div>
        );
      case "Gold":
        return (
          <div className="w-10 h-10 rounded-md bg-yellow-900/30 flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-500 rounded-md transform rotate-45"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
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
                    NFT Staking Station
                  </h1>
                  <p className="text-sm sm:text-base font-sora text-[#94A3B8] max-w-2xl mt-1">
                    Earn passive rewards by staking your NFTs and NEFT tokens
                  </p>
                </div>
              </div>
            </div>

            {isConnected ? (
              <>
                <Tabs
                  defaultValue="nfts"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="w-full sm:w-auto grid grid-cols-2 bg-[#171923] border border-[#2D3748]/50 rounded-xl p-1 mb-6">
                    <TabsTrigger
                      value="nfts"
                      className="rounded-lg data-[state=active]:bg-[#38B2AC] data-[state=active]:text-white px-8"
                    >
                      Stake NFTs
                    </TabsTrigger>
                    <TabsTrigger
                      value="tokens"
                      className="rounded-lg data-[state=active]:bg-[#38B2AC] data-[state=active]:text-white px-8"
                    >
                      Stake Tokens
                    </TabsTrigger>
                  </TabsList>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1 md:col-span-2">
                      <TabsContent value="nfts" className="mt-0">
                        <Card className="bg-[#171923] border-[#2D3748]/50 rounded-xl p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">NFT Staking</h2>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="border-gray-700 bg-gray-800/50 hover:bg-gray-700 text-sm"
                                onClick={() => setUnstakeNftModalOpen(true)}
                                disabled={
                                  !isConnected || stakedNFTList.length === 0
                                }
                              >
                                Unstake NFT
                              </Button>
                              <Button
                                className="bg-blue-600 hover:bg-blue-700 text-sm"
                                onClick={() => setNftModalOpen(true)}
                                disabled={availableNFTs.length === 0}
                              >
                                Stake NFT
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="p-4 bg-black/50 rounded-xl border border-gray-800 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {getNFTIcon("Platinum")}
                                <div>
                                  <h3 className="font-semibold">
                                    Platinum NFT
                                  </h3>
                                  <p className="text-sm text-gray-400">
                                    {stakedNFTs.Platinum} staked
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-xl">1 NEFT</p>
                                <p className="text-sm text-gray-400">
                                  Daily reward
                                </p>
                              </div>
                            </div>

                            <div className="p-4 bg-black/50 rounded-xl border border-gray-800 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {getNFTIcon("Silver")}
                                <div>
                                  <h3 className="font-semibold">Silver NFT</h3>
                                  <p className="text-sm text-gray-400">
                                    {stakedNFTs.Silver} staked
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-xl">
                                  2.5 NEFT
                                </p>
                                <p className="text-sm text-gray-400">
                                  Daily reward
                                </p>
                              </div>
                            </div>

                            <div className="p-4 bg-black/50 rounded-xl border border-gray-800 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {getNFTIcon("Gold")}
                                <div>
                                  <h3 className="font-semibold">Gold NFT</h3>
                                  <p className="text-sm text-gray-400">
                                    {stakedNFTs.Gold} staked
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-xl">6 NEFT</p>
                                <p className="text-sm text-gray-400">
                                  Daily reward
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 pt-8 border-t border-gray-800">
                            <div className="flex items-center justify-between mb-4">
                              <h2 className="text-xl font-bold">
                                Your Staked NFTs
                              </h2>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="cursor-help">
                                    <InfoIcon className="h-5 w-5 text-gray-500" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-800 text-white border-gray-700 max-w-xs">
                                  <p>
                                    Staking NFTs will earn you daily rewards
                                    based on their rarity. Rewards accumulate in
                                    real-time.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>

                            {stakedNFTList.length > 0 ? (
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {stakedNFTList.map((nft) => (
                                  <div
                                    key={nft.id}
                                    className="p-3 border border-gray-800 rounded-lg"
                                  >
                                    <img
                                      src={nft.image}
                                      alt={nft.name}
                                      className="w-full aspect-square object-cover rounded-md mb-2"
                                    />
                                    <p className="text-sm font-medium truncate">
                                      {nft.name}
                                    </p>
                                    <div className="flex items-center mt-1 justify-between">
                                      <Badge
                                        className={
                                          nft.rarity === "Platinum"
                                            ? "bg-purple-500/20 text-purple-300"
                                            : nft.rarity === "Gold"
                                            ? "bg-yellow-500/20 text-yellow-300"
                                            : "bg-blue-500/20 text-blue-300"
                                        }
                                      >
                                        {nft.rarity}
                                      </Badge>
                                      <span className="text-xs text-gray-400">
                                        {nft.rarity === "Platinum"
                                          ? "1"
                                          : nft.rarity === "Silver"
                                          ? "2.5"
                                          : "6"}{" "}
                                        NEFT/day
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-6 text-center bg-black/50 rounded-xl border border-gray-800">
                                <p className="text-gray-400">
                                  You don't have any staked NFTs yet
                                </p>
                                <Button
                                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                                  onClick={() => setNftModalOpen(true)}
                                  disabled={availableNFTs.length === 0}
                                >
                                  Stake NFT
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card>
                      </TabsContent>

                      <TabsContent value="tokens" className="mt-0">
                        <Card className="bg-[#171923] border-[#2D3748]/50 rounded-xl p-6">
                          <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                              Token Staking
                            </h2>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="border-gray-700 bg-gray-800/50 hover:bg-gray-700 text-sm"
                                onClick={() => setUnstakeTokenModalOpen(true)}
                                disabled={!isConnected || tokenStaked <= 0}
                              >
                                Unstake NEFT
                              </Button>
                              <Button
                                className="bg-blue-600 hover:bg-blue-700 text-sm"
                                onClick={() => setTokenModalOpen(true)}
                                disabled={walletBalance <= 0}
                              >
                                Stake NEFT
                              </Button>
                            </div>
                          </div>

                          <div className="p-4 bg-black/50 rounded-xl border border-gray-800 mb-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold">APR</h3>
                                <p className="text-3xl font-bold text-blue-400">
                                  {apr}%
                                </p>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-right">
                                  Total Staked
                                </h3>
                                <p className="text-3xl font-bold text-right">
                                  {tokenStaked.toFixed(2)}{" "}
                                  <span className="text-sm text-gray-400">
                                    NEFT
                                  </span>
                                </p>
                              </div>
                            </div>

                            <div className="rounded-lg border border-gray-800 bg-black/30 p-4">
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium">
                                      Available in Wallet
                                    </h4>
                                    <span>{walletBalance.toFixed(2)} NEFT</span>
                                  </div>
                                  <p className="text-sm text-gray-400">
                                    Tokens you can stake
                                  </p>
                                </div>
                              </div>

                              <div className="my-3 border-t border-gray-800"></div>

                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium">Reward Rate</h4>
                                    <span>
                                      {(
                                        (tokenStaked * apr) /
                                        365 /
                                        100
                                      ).toFixed(4)}{" "}
                                      NEFT/day
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-400">
                                    Current daily rewards
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-bold">
                                Your Staking Stats
                              </h3>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="cursor-help">
                                    <InfoIcon className="h-5 w-5 text-gray-500" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-800 text-white border-gray-700">
                                  <p>
                                    Statistics about your staked tokens and
                                    rewards
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="p-4 bg-black/50 rounded-xl border border-gray-800">
                                <div className="text-gray-400 mb-1">
                                  Total Staked
                                </div>
                                <div className="text-xl font-semibold">
                                  {tokenStaked.toFixed(2)} NEFT
                                </div>
                              </div>

                              <div className="p-4 bg-black/50 rounded-xl border border-gray-800">
                                <div className="text-gray-400 mb-1">
                                  Daily Rewards
                                </div>
                                <div className="text-xl font-semibold">
                                  {((tokenStaked * apr) / 365 / 100).toFixed(4)}{" "}
                                  NEFT
                                </div>
                              </div>

                              <div className="p-4 bg-black/50 rounded-xl border border-gray-800">
                                <div className="text-gray-400 mb-1">
                                  Monthly Estimate
                                </div>
                                <div className="text-xl font-semibold">
                                  {((tokenStaked * apr) / 12 / 100).toFixed(2)}{" "}
                                  NEFT
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </TabsContent>
                    </div>

                    <div className="col-span-1">
                      <Card className="bg-[#171923] border-[#2D3748]/50 rounded-xl p-6 h-full">
                        <h2 className="text-2xl font-bold mb-4">
                          Rewards & History
                        </h2>

                        <div className="p-4 bg-black/50 rounded-xl border border-gray-800 mb-6">
                          <h3 className="text-gray-400 mb-2">Earned Rewards</h3>
                          <div className="text-4xl font-bold">
                            {earnedRewards.toFixed(4)} NEFT
                          </div>

                          <Button
                            className="w-full mt-4 bg-green-600 hover:bg-green-700 transition-colors"
                            disabled={earnedRewards <= 0}
                            onClick={handleClaimRewards}
                          >
                            Claim Rewards
                          </Button>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Token Balance</h3>
                          </div>

                          <div className="mt-2 p-4 bg-black/50 rounded-xl border border-gray-800 flex items-center justify-between">
                            <div>
                              <div className="text-sm text-gray-400">
                                Available
                              </div>
                              <div className="text-xl font-bold">
                                {walletBalance.toFixed(2)} NEFT
                              </div>
                            </div>
                            <Button
                              className="bg-blue-600 hover:bg-blue-700 transition-colors"
                              onClick={() => setTokenModalOpen(true)}
                              disabled={walletBalance <= 0}
                            >
                              Stake
                            </Button>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold mt-8 mb-4">
                          Staking History
                        </h3>
                        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                          {stakingHistory.length > 0 ? (
                            stakingHistory.map((item) => (
                              <div
                                key={item.id}
                                className="p-3 bg-black/50 rounded-lg border border-gray-800 flex justify-between items-center"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      className={`${
                                        item.type === "stake"
                                          ? "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                                          : item.type === "unstake"
                                          ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                                          : "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                                      }`}
                                    >
                                      {item.type === "stake"
                                        ? "Staked"
                                        : item.type === "unstake"
                                        ? "Unstaked"
                                        : "Claimed"}
                                    </Badge>
                                    {item.nftName ? (
                                      <span className="text-sm truncate max-w-[120px]">
                                        {item.nftName}
                                      </span>
                                    ) : (
                                      <span className="text-sm">
                                        {item.amount?.toFixed(2)} NEFT
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-400 mt-1">
                                    {formatTime(item.timestamp)}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-gray-500 py-4">
                              No staking history yet
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  </div>
                </Tabs>

                {/* NFT Staking Modal */}
                <StakeNFTModal
                  open={nftModalOpen}
                  onClose={() => setNftModalOpen(false)}
                  onStake={handleStakeNFTs}
                  availableNFTs={availableNFTs}
                />

                {/* NFT Unstaking Modal */}
                <UnstakeNFTModal
                  open={unstakeNftModalOpen}
                  onClose={() => setUnstakeNftModalOpen(false)}
                  onUnstake={handleUnstakeNFTs}
                  stakedNFTs={stakedNFTList}
                />

                {/* Token Staking Modal */}
                <StakeTokenModal
                  open={tokenModalOpen}
                  onClose={() => setTokenModalOpen(false)}
                  onStake={handleStakeTokens}
                  maxAmount={walletBalance}
                  apr={apr}
                />

                {/* Token Unstaking Modal */}
                <UnstakeTokenModal
                  open={unstakeTokenModalOpen}
                  onClose={() => setUnstakeTokenModalOpen(false)}
                  onUnstake={handleUnstakeTokens}
                  stakedAmount={tokenStaked}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <Card className="w-full max-w-md bg-[#171923] border-[#2D3748]/50 rounded-xl text-center p-8">
                  <h2 className="text-2xl font-bold mb-4 text-white">
                    Connect Wallet to Stake
                  </h2>
                  <p className="text-[#94A3B8] mb-8">
                    Connect your wallet to start staking your NFTs and NEFT
                    tokens
                  </p>
                  <WalletConnect />
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default StakingPage;
