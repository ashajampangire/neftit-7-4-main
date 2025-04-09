import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MainNav } from "@/components/layout/MainNav";
import StarryBackground from "@/components/layout/StarryBackground";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { InfoIcon, AlertCircle, Sparkles, Flame, TrendingUp, Check, Star, Crown, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// Types
type NFTRarity = 'Common' | 'Rare' | 'Legendary' | 'Platinum' | 'Gold' | 'Silver';

// Helper function to generate unique IDs
const generateUniqueId = () => `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

interface NFT {
  id: string;
  name: string;
  image: string;
  rarity: NFTRarity;
  staked: boolean;
  apr?: number;
  stakedAt?: Date;
}

interface StakingHistory {
  id: string;
  type: 'stake' | 'unstake' | 'claim';
  amount?: number;
  nftId?: string;
  nftName?: string;
  timestamp: Date;
  nft?: NFT;
  date?: Date; // For backward compatibility
}

// Calculate APR based on NFT rarity
const calculateAPR = (rarity: NFTRarity): number => {
  switch (rarity) {
    case "Common": return 5;
    case "Rare": return 10;
    case "Legendary": return 25;
    case "Platinum": return 40;
    case "Gold": return 20;
    case "Silver": return 15;
    default: return 5;
  }
};

// Calculate rewards based on staking time and APR
const calculateRewards = (nft: NFT): number => {
  if (!nft.stakedAt) return 0;
  
  const daysSinceStaked = Math.floor((new Date().getTime() - nft.stakedAt.getTime()) / (1000 * 60 * 60 * 24));
  const dailyReward = (nft.apr || calculateAPR(nft.rarity)) / 365;
  
  return parseFloat((dailyReward * daysSinceStaked).toFixed(2));
};

// Mock NFT data for development
const mockNFTs: NFT[] = [
  {
    id: "1",
    name: "Cyber Ape #1234",
    image: "https://picsum.photos/200/300?random=1",
    rarity: "Common",
    staked: false
  },
  {
    id: "2",
    name: "Digital Punk #5678",
    image: "https://picsum.photos/200/300?random=2",
    rarity: "Rare",
    staked: false
  },
  {
    id: "3",
    name: "Meta Guardian #9012",
    image: "https://picsum.photos/200/300?random=3",
    rarity: "Legendary",
    staked: false
  },
  {
    id: "4",
    name: "Quantum Cat #3456",
    image: "https://picsum.photos/200/300?random=4",
    rarity: "Gold",
    staked: true,
    stakedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Staked 7 days ago
  },
  {
    id: "5",
    name: "Neon Dragon #7890",
    image: "https://picsum.photos/200/300?random=5",
    rarity: "Platinum",
    staked: true,
    stakedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // Staked 14 days ago
  },
];

// NFT Staking Modal Component
const StakeNFTModal = ({ 
  isOpen, 
  onClose, 
  onStake,
  availableNFTs,
  selectedNFTs,
  setSelectedNFTs
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onStake: (selectedNFTs: string[]) => void;
  availableNFTs: NFT[];
  selectedNFTs: string[];
  setSelectedNFTs: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  useEffect(() => {
    if (isOpen) {
      setSelectedNFTs([]);
    }
  }, [isOpen]);

  const toggleNFT = (id: string) => {
    setSelectedNFTs(prev => 
      prev.includes(id) 
        ? prev.filter(nftId => nftId !== id)
        : [...prev, id]
    );
  };

  const handleStake = () => {
    onStake(selectedNFTs);
    setSelectedNFTs([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-gray-800 text-white sm:max-w-[500px]">
        <DialogTitle>Stake NFTs</DialogTitle>
        <DialogDescription className="text-gray-400">
          Select NFTs you want to stake
        </DialogDescription>
        
        <div className="grid grid-cols-2 gap-4 py-4 max-h-[400px] overflow-y-auto">
          {availableNFTs.length > 0 ? (
            availableNFTs.map(nft => (
              <div 
                key={nft.id}
                className={`relative border rounded-lg p-3 ${
                  selectedNFTs.includes(nft.id) 
                    ? 'border-blue-500 bg-blue-900/20' 
                    : 'border-gray-700 hover:border-gray-500'
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
                  <Badge className={
                    nft.rarity === 'Platinum' ? 'bg-purple-500/20 text-purple-300' : 
                    nft.rarity === 'Gold' ? 'bg-yellow-500/20 text-yellow-300' : 
                    'bg-blue-500/20 text-blue-300'
                  }>
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
  isOpen, 
  onClose, 
  onUnstake,
  stakedNFTs
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onUnstake: (selectedNFTs: string[]) => void;
  stakedNFTs: NFT[];
}) => {
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedNFTs([]);
    }
  }, [isOpen]);

  const toggleNFT = (id: string) => {
    setSelectedNFTs(prev => 
      prev.includes(id) 
        ? prev.filter(nftId => nftId !== id)
        : [...prev, id]
    );
  };

  const handleUnstake = () => {
    onUnstake(selectedNFTs);
    setSelectedNFTs([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-gray-800 text-white sm:max-w-[500px]">
        <DialogTitle>Unstake NFTs</DialogTitle>
        <DialogDescription className="text-gray-400">
          Select NFTs you want to unstake
        </DialogDescription>
        
        <div className="grid grid-cols-2 gap-4 py-4 max-h-[400px] overflow-y-auto">
          {stakedNFTs.length > 0 ? (
            stakedNFTs.map(nft => (
              <div 
                key={nft.id}
                className={`relative border rounded-lg p-3 ${
                  selectedNFTs.includes(nft.id) 
                    ? 'border-red-500 bg-red-900/20' 
                    : 'border-gray-700 hover:border-gray-500'
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
                  <Badge className={
                    nft.rarity === 'Platinum' ? 'bg-purple-500/20 text-purple-300' : 
                    nft.rarity === 'Gold' ? 'bg-yellow-500/20 text-yellow-300' : 
                    'bg-blue-500/20 text-blue-300'
                  }>
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
  isOpen, 
  onClose, 
  walletBalance,
  amount,
  setAmount,
  onStake
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  walletBalance: number;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  onStake: (amount: number) => void;
}) => {
  useEffect(() => {
    if (isOpen) {
      setAmount("");
    }
  }, [isOpen]);
  
  const handleStake = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    onStake(parseFloat(amount));
    setAmount("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                onClick={() => setAmount(walletBalance.toString())}
              >
                Max
              </Button>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Balance: {walletBalance} NEFT</span>
              {parseFloat(amount) > walletBalance && (
                <span className="text-red-400">Insufficient balance</span>
              )}
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-900 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Estimated daily rewards</span>
              <span>{((parseFloat(amount) || 0) * 12 / 365 / 100).toFixed(4)} NEFT</span>
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
            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > walletBalance}
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
  isOpen, 
  onClose, 
  tokenStaked,
  onUnstake
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  tokenStaked: number;
  onUnstake: (amount: number) => void;
}) => {
  const [amount, setAmount] = useState<string>("");
  
  useEffect(() => {
    if (isOpen) {
      setAmount("");
    }
  }, [isOpen]);
  
  const handleUnstake = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    onUnstake(parseFloat(amount));
    setAmount("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-gray-800 text-white sm:max-w-[400px]">
        <DialogTitle>Unstake NEFT Tokens</DialogTitle>
        <DialogDescription className="text-gray-400">
          Enter the amount of NEFT tokens you want to unstake
        </DialogDescription>
        
        <div className="py-4 space-y-4">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-900/20 border border-amber-900/50">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-300">
              Unstaking tokens will incur a 5% fee that will be deducted from your withdrawal amount.
            </p>
          </div>
          
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
                onClick={() => setAmount(tokenStaked.toString())}
              >
                Max
              </Button>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Staked: {tokenStaked} NEFT</span>
              {parseFloat(amount) > tokenStaked && (
                <span className="text-red-400">Exceeds staked amount</span>
              )}
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-900 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Unstaking Fee</span>
              <span>5%</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-400">You will receive</span>
              <span>{((parseFloat(amount) || 0) * 0.95).toFixed(4)} NEFT</span>
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
            onClick={handleUnstake}
            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > tokenStaked}
            className="bg-red-600 hover:bg-red-700"
          >
            Confirm Unstake
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to handle staking errors
const handleStakingError = (action: string, error: unknown, toast: any) => {
  console.error(`Error during ${action}:`, error);
  toast({
    variant: "destructive",
    title: `${action} Failed`,
    description: `There was an error during ${action.toLowerCase()}. Please try again later.`,
  });
};

// Main Staking Page Component
const StakingPage: React.FC = () => {
  const { toast } = useToast();
  
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("nfts");
  const [availableNFTs, setAvailableNFTs] = useState<NFT[]>([]);
  const [stakedNFTs, setStakedNFTs] = useState<NFT[]>([]);
  const [selectedNFTIds, setSelectedNFTIds] = useState<string[]>([]);
  const [nftModalOpen, setNftModalOpen] = useState(false);
  const [unstakeNftModalOpen, setUnstakeNftModalOpen] = useState(false);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [unstakeTokenModalOpen, setUnstakeTokenModalOpen] = useState(false);
  const [claimRewardsOpen, setClaimRewardsOpen] = useState(false);
  const [tokenAmount, setTokenAmount] = useState("0");
  const [tokenStaked, setTokenStaked] = useState(100);
  const [walletBalance, setWalletBalance] = useState(1000); // Mock wallet balance
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [autoCompound, setAutoCompound] = useState(false);
  const [stakingHistory, setStakingHistory] = useState<StakingHistory[]>([]);
  const [averageAPR, setAverageAPR] = useState(0);
  const [tokenEarnings, setTokenEarnings] = useState(0);
  const [apr, setApr] = useState(12); // Fixed APR for token staking

  // Functions to update token balances
  const updateBalance = (newBalance: number) => {
    setWalletBalance(newBalance);
  };

  const updateStakedAmount = (newAmount: number) => {
    setTokenStaked(newAmount);
  };

  // Calculate token earnings
  useEffect(() => {
    // Simple interest calculation for demo
    const earnedAmount = tokenStaked * (apr / 100) * (30 / 365);
    setTokenEarnings(parseFloat(earnedAmount.toFixed(2)));
  }, [tokenStaked, apr]);

  // Load NFTs when the component mounts
  useEffect(() => {
    // Initialize with mock data
    setAvailableNFTs(mockNFTs.filter(nft => !nft.staked));
    setStakedNFTs(mockNFTs.filter(nft => nft.staked));
    
    // Generate mock staking history
    const mockHistory: StakingHistory[] = [
      { 
        id: generateUniqueId(), 
        type: 'stake', 
        nftId: mockNFTs[0].id,
        nftName: mockNFTs[0].name,
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
      },
      { 
        id: generateUniqueId(), 
        type: 'unstake', 
        nftId: mockNFTs[1].id,
        nftName: mockNFTs[1].name,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) 
      },
      { 
        id: generateUniqueId(), 
        type: 'claim', 
        amount: 120, 
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) 
      },
    ];
    setStakingHistory(mockHistory);
    
    // Calculate average APR
    calculateAverageAPR();
  }, []);

  // Handle staking error with proper feedback
  const stakeNFTs = async (nftIds: string[]) => {
    try {
      setIsLoading(true);

      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update available and staked NFTs
      const updatedAvailableNFTs = availableNFTs.filter(nft => !nftIds.includes(nft.id));
      const nftsToStake = availableNFTs.filter(nft => nftIds.includes(nft.id)).map(nft => ({
        ...nft,
        staked: true,
        stakedAt: new Date(),
        apr: calculateAPR(nft.rarity)
      }));
      
      setAvailableNFTs(updatedAvailableNFTs);
      setStakedNFTs([...stakedNFTs, ...nftsToStake]);
      
      // Update staking history
      const newHistoryEntry: StakingHistory = {
        id: Date.now().toString(),
        type: "stake",
        nftId: nftIds[0],
        nftName: nftsToStake.map(nft => nft.name).join(", "),
        amount: null,
        timestamp: new Date()
      };
      setStakingHistory([newHistoryEntry, ...stakingHistory]);
      
      toast({
        title: "NFTs Staked Successfully",
        description: `${nftIds.length} NFT${nftIds.length > 1 ? 's' : ''} staked successfully.`,
      });
      
      // Clear selected NFTs
      setSelectedNFTIds([]);
    } catch (error) {
      handleStakingError("NFT Staking", error, toast);
    } finally {
      setIsLoading(false);
    }
  };

  // Improved unstake function
  const unstakeNFTs = async (nftIds: string[]) => {
    try {
      setIsLoading(true);
      
      // Update NFT staking status
      const updatedStaked = stakedNFTs.filter(nft => !nftIds.includes(nft.id));
      const newlyUnstaked = stakedNFTs.filter(nft => nftIds.includes(nft.id)).map(nft => ({
        ...nft,
        staked: false,
        stakedAt: undefined
      }));
      
      setStakedNFTs(updatedStaked);
      setAvailableNFTs([...availableNFTs, ...newlyUnstaked]);
      
      // Add unstaking event to history
      const unstakedAt = new Date();
      const newEvents = nftIds.map(id => {
        const nft = stakedNFTs.find(n => n.id === id);
        return {
          id: `unstake-${id}-${Date.now()}`,
          type: 'unstake' as const,
          nftId: id,
          nftName: nft?.name || 'Unknown NFT',
          timestamp: unstakedAt
        };
      });
      
      setStakingHistory([...newEvents, ...stakingHistory]);
      
      toast({
        title: "NFTs unstaked successfully",
        description: `You have unstaked ${nftIds.length} NFT${nftIds.length > 1 ? 's' : ''}`,
      });
    } catch (error) {
      handleStakingError('Unstaking', error, toast);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle token staking
  const handleStakeTokens = (amount: number) => {
    try {
      if (amount <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter an amount greater than 0",
          variant: "destructive",
        });
        return;
      }

      if (amount > walletBalance) {
        toast({
          title: "Insufficient balance",
          description: "You don't have enough tokens in your wallet",
          variant: "destructive",
        });
        return;
      }

      const newWalletBalance = walletBalance - amount;
      const newStakedAmount = tokenStaked + amount;
      
      setWalletBalance(newWalletBalance);
      setTokenStaked(newStakedAmount);
      
      // Update wallet provider state
      updateBalance(newWalletBalance);
      updateStakedAmount(newStakedAmount);
      
      // Add to history
      setStakingHistory(prev => [{
        id: `hist-token-${Date.now()}`,
        type: 'stake',
        amount,
        timestamp: new Date()
      }, ...prev]);
      
      toast({
        title: "Tokens Staked",
        description: `Successfully staked ${amount} NEFT`,
      });
    } catch (error) {
      console.error("Error staking tokens:", error);
      toast({
        title: "Staking failed",
        description: "There was an error staking your tokens. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle token unstaking
  const handleUnstakeTokens = (amount: number) => {
    try {
      if (amount <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter an amount greater than 0",
          variant: "destructive",
        });
        return;
      }

      if (amount > tokenStaked) {
        toast({
          title: "Insufficient staked amount",
          description: "You don't have enough staked tokens",
          variant: "destructive",
        });
        return;
      }

      // Apply 5% unstaking fee
      const fee = amount * 0.05;
      const amountAfterFee = amount - fee;
      
      const newWalletBalance = walletBalance + amountAfterFee;
      const newStakedAmount = tokenStaked - amount;
      
      setWalletBalance(newWalletBalance);
      setTokenStaked(newStakedAmount);
      
      // Update wallet provider state
      updateBalance(newWalletBalance);
      updateStakedAmount(newStakedAmount);
      
      // Add to history
      setStakingHistory(prev => [{
        id: `hist-unstake-token-${Date.now()}`,
        type: 'unstake',
        amount,
        timestamp: new Date()
      }, ...prev]);
      
      toast({
        title: "Tokens Unstaked",
        description: `Successfully unstaked ${amount} NEFT (${amountAfterFee.toFixed(2)} NEFT after fee)`,
      });
      
      // Close the modal after successful unstaking
      setUnstakeTokenModalOpen(false);
    } catch (error) {
      console.error("Error unstaking tokens:", error);
      toast({
        title: "Unstaking failed",
        description: "There was an error unstaking your tokens. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Update handleClaimRewards function to include NFT rewards
  const handleClaimRewards = async () => {
    try {
      setIsLoading(true);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update wallet balance with rewards
      setWalletBalance(prev => prev + totalEarnings);
      
      // Reset staking dates for NFTs to restart rewards accumulation
      const refreshedStakedNFTs = stakedNFTs.map(nft => ({
        ...nft,
        stakedAt: new Date()
      }));
      setStakedNFTs(refreshedStakedNFTs);
      
      // Update staking history
      const newHistoryEntry: StakingHistory = {
        id: Date.now().toString(),
        type: "claim",
        nftId: null,
        nftName: null,
        amount: totalEarnings,
        timestamp: new Date()
      };
      setStakingHistory([newHistoryEntry, ...stakingHistory]);
      
      toast({
        title: "Rewards Claimed Successfully",
        description: `${totalEarnings.toFixed(2)} tokens have been added to your wallet.`,
      });
      
      // Reset totalRewards
      setTotalEarnings(0);
    } catch (error) {
      handleStakingError("Claiming Rewards", error, toast);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get NFT icon by rarity
  const getNFTIcon = (rarity: NFTRarity) => {
    switch(rarity) {
      case "Platinum": return (
        <div className="w-10 h-10 rounded-md bg-purple-900/30 flex items-center justify-center">
          <div className="w-6 h-6 bg-purple-500 rounded-md transform rotate-45"></div>
        </div>
      );
      case "Silver": return (
        <div className="w-10 h-10 rounded-md bg-blue-900/30 flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-500 rounded-md transform rotate-45"></div>
        </div>
      );
      case "Gold": return (
        <div className="w-10 h-10 rounded-md bg-yellow-900/30 flex items-center justify-center">
          <div className="w-6 h-6 bg-yellow-500 rounded-md transform rotate-45"></div>
        </div>
      );
      default: return null;
    }
  };
  
  // Add this useEffect to calculate total earnings from staked NFTs
  useEffect(() => {
    if (stakedNFTs.length > 0) {
      // Calculate total earnings from all staked NFTs
      const totalNftEarnings = stakedNFTs.reduce((total, nft) => {
        return total + calculateRewards(nft);
      }, 0);
      
      setTotalEarnings(totalNftEarnings);
      
      // Calculate average APR
      const avgAPR = stakedNFTs.reduce((sum, nft) => sum + (nft.apr || calculateAPR(nft.rarity)), 0) / stakedNFTs.length;
      setAverageAPR(parseFloat(avgAPR.toFixed(2)));
    } else {
      // Reset values when no NFTs are staked
      setTotalEarnings(0);
      setAverageAPR(0);
    }
  }, [stakedNFTs]);

  // Add a function to count NFTs by rarity
  const countNFTsByRarity = (rarity: NFTRarity): number => {
    return stakedNFTs.filter(nft => nft.rarity === rarity).length;
  };

  // Calculate average APR
  const calculateAverageAPR = () => {
    if (stakedNFTs.length > 0) {
      const totalAPR = stakedNFTs.reduce((sum, nft) => sum + (nft.apr || calculateAPR(nft.rarity)), 0);
      const avgAPR = totalAPR / stakedNFTs.length;
      setAverageAPR(parseFloat(avgAPR.toFixed(2)));
    } else {
      setAverageAPR(0);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <StarryBackground />
      <MainNav />
      
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="text-center mb-8 relative z-20 pointer-events-auto">
          <h1 
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 bg-clip-text text-transparent"
          >
            NFT Staking System
          </h1>
          <p 
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            Stake your NFTs and tokens to earn rewards and exclusive benefits
          </p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Tabs defaultValue="nfts" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger
                value="nfts"
                className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/10 data-[state=active]:to-purple-500/10"
              >
                NFT Staking
              </TabsTrigger>
              <TabsTrigger
                value="tokens"
                className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-teal-500/10"
              >
                Token Staking
              </TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1 lg:col-span-2">
                <TabsContent value="nfts" className="mt-0">
                  <Card className="bg-card/50 backdrop-blur-sm border-white/10 rounded-xl">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Your NFT Portfolio</h2>
                        <Button 
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                          onClick={() => setNftModalOpen(true)}
                          disabled={availableNFTs.length === 0}
                        >
                          Stake NFT
                        </Button>
                      </div>

                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Card className="rounded-lg border bg-card/50 backdrop-blur-sm relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <CardHeader>
                            <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
                            <p className="text-2xl font-bold">{stakedNFTs.length} NFTs</p>
                          </CardHeader>
                        </Card>
                        
                        <Card className="rounded-lg border bg-card/50 backdrop-blur-sm relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <CardHeader>
                            <CardTitle className="text-sm font-medium">Average APR</CardTitle>
                            <p className="text-2xl font-bold">{averageAPR.toFixed(2)}%</p>
                          </CardHeader>
                        </Card>
                        
                        <Card className="rounded-lg border bg-card/50 backdrop-blur-sm relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <CardHeader>
                            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
                            <p className="text-2xl font-bold">{totalEarnings.toFixed(4)} NEFT</p>
                          </CardHeader>
                        </Card>
                      </motion.div>
                      
                      {/* NFT Collections section */}
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Your Collections</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <motion.div 
                            className="p-4 rounded-xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-white/10 relative overflow-hidden group"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-4">
                              {getNFTIcon("Platinum")}
                              <div>
                                <h3 className="font-semibold">Platinum NFT</h3>
                                <p className="text-sm text-gray-400">{countNFTsByRarity("Platinum")} staked</p>
                              </div>
                            </div>
                            <div className="text-right mt-2">
                              <p className="font-semibold text-xl">12 NEFT</p>
                              <p className="text-sm text-gray-400">Daily reward</p>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            className="p-4 rounded-xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-white/10 relative overflow-hidden group"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-4">
                              {getNFTIcon("Silver")}
                              <div>
                                <h3 className="font-semibold">Silver NFT</h3>
                                <p className="text-sm text-gray-400">{countNFTsByRarity("Silver")} staked</p>
                              </div>
                            </div>
                            <div className="text-right mt-2">
                              <p className="font-semibold text-xl">4 NEFT</p>
                              <p className="text-sm text-gray-400">Daily reward</p>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            className="p-4 rounded-xl bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border border-white/10 relative overflow-hidden group"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-4">
                              {getNFTIcon("Gold")}
                              <div>
                                <h3 className="font-semibold">Gold NFT</h3>
                                <p className="text-sm text-gray-400">{countNFTsByRarity("Gold")} staked</p>
                              </div>
                            </div>
                            <div className="text-right mt-2">
                              <p className="font-semibold text-xl">6 NEFT</p>
                              <p className="text-sm text-gray-400">Daily reward</p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-8 border-t border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold">Your Staked NFTs</h2>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 bg-gray-800/50 hover:bg-gray-700 text-sm"
                              onClick={() => setUnstakeNftModalOpen(true)}
                              disabled={stakedNFTs.length === 0}
                            >
                              Unstake NFT
                            </Button>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="cursor-help">
                                  <InfoIcon className="h-5 w-5 text-gray-500" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 text-white border-gray-700 max-w-xs">
                                <p>Staking NFTs will earn you daily rewards based on their rarity. Rewards accumulate in real-time.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>

                        {stakedNFTs.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {stakedNFTs.map(nft => (
                              <motion.div 
                                key={nft.id} 
                                className="group relative rounded-lg border border-gray-800 overflow-hidden"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="p-3">
                                  <img
                                    src={nft.image}
                                    alt={nft.name}
                                    className="w-full aspect-square object-cover rounded-md mb-2"
                                  />
                                  <p className="text-sm font-medium truncate">{nft.name}</p>
                                  <div className="flex items-center mt-1 justify-between">
                                    <Badge className={
                                      nft.rarity === 'Platinum' ? 'bg-purple-500/20 text-purple-300' : 
                                      nft.rarity === 'Gold' ? 'bg-yellow-500/20 text-yellow-300' : 
                                      'bg-blue-500/20 text-blue-300'
                                    }>
                                      {nft.rarity}
                                    </Badge>
                                    <span className="text-xs text-gray-400">
                                      {calculateRewards(nft).toFixed(2)} NEFT/day
                                    </span>
                                  </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="border border-white/20 bg-black/50 hover:bg-black/70"
                                    onClick={() => unstakeNFTs([nft.id])}
                                  >
                                    Unstake
                                  </Button>
                                </div>
                              </motion.div>
                            ))
                          }
                        </div>
                        ) : (
                          <div className="p-6 text-center bg-black/50 rounded-xl border border-gray-800">
                            <p className="text-gray-400">You don't have any staked NFTs yet</p>
                            <Button 
                              className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                              onClick={() => setNftModalOpen(true)}
                              disabled={availableNFTs.length === 0}
                            >
                              Stake NFT
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tokens" className="mt-0">
                  <Card className="bg-card/50 backdrop-blur-sm border-white/10 rounded-xl">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Token Staking</h2>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="border-gray-700 bg-gray-800/50 hover:bg-gray-700 text-sm"
                            onClick={() => setUnstakeTokenModalOpen(true)}
                          >
                            Unstake NEFT
                          </Button>
                          <Button 
                            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-sm"
                            onClick={() => setTokenModalOpen(true)}
                            disabled={walletBalance <= 0}
                          >
                            Stake NEFT
                          </Button>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="p-4 bg-black/50 rounded-xl border border-gray-800 backdrop-blur-sm mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">APR</h3>
                            <p className="text-3xl font-bold text-blue-400">{apr}%</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-right">Total Staked</h3>
                            <p className="text-3xl font-bold text-right">{tokenStaked.toFixed(2)} <span className="text-sm text-gray-400">NEFT</span></p>
                          </div>
                        </div>
                        
                        <div className="rounded-lg border border-gray-800 bg-black/30 p-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium">Available in Wallet</h4>
                                <span>{walletBalance.toFixed(2)} NEFT</span>
                              </div>
                              <p className="text-sm text-gray-400">Tokens you can stake</p>
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
                                <span>{(tokenStaked * apr / 365 / 100).toFixed(4)} NEFT/day</span>
                              </div>
                              <p className="text-sm text-gray-400">Current daily rewards</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold">Your Staking Stats</h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="cursor-help">
                                <InfoIcon className="h-5 w-5 text-gray-500" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800 text-white border-gray-700">
                              <p>Statistics about your staked tokens and rewards</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        
                        <motion.div
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ staggerChildren: 0.1 }}
                        >
                          <motion.div 
                            className="p-4 bg-black/50 rounded-xl border border-gray-800 group hover:border-blue-500/30 transition-colors"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="text-gray-400 mb-1">Total Staked</div>
                            <div className="text-xl font-semibold">{tokenStaked.toFixed(2)} NEFT</div>
                          </motion.div>
                          
                          <motion.div 
                            className="p-4 bg-black/50 rounded-xl border border-gray-800 group hover:border-blue-500/30 transition-colors"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <div className="text-gray-400 mb-1">Daily Rewards</div>
                            <div className="text-xl font-semibold">{(tokenStaked * apr / 365 / 100).toFixed(4)} NEFT</div>
                          </motion.div>
                          
                          <motion.div 
                            className="p-4 bg-black/50 rounded-xl border border-gray-800 group hover:border-blue-500/30 transition-colors"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <div className="text-gray-400 mb-1">Monthly Estimate</div>
                            <div className="text-xl font-semibold">{(tokenStaked * apr / 12 / 100).toFixed(2)} NEFT</div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </div>
              
              <div className="col-span-1">
                <Card className="bg-card/50 backdrop-blur-sm border-white/10 rounded-xl h-full">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Rewards & History</h2>
                    
                    <motion.div 
                      className="p-4 bg-black/50 rounded-xl border border-gray-800 mb-6"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-gray-400 mb-2">Earned Rewards</h3>
                      <div className="text-4xl font-bold">{(tokenEarnings + totalEarnings).toFixed(4)} NEFT</div>
                      
                      <Button
                        className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-colors"
                        disabled={tokenEarnings + totalEarnings <= 0}
                        onClick={handleClaimRewards}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Claim Rewards
                      </Button>
                    </motion.div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Token Balance</h3>
                      </div>
                      
                      <motion.div 
                        className="mt-2 p-4 bg-black/50 rounded-xl border border-gray-800 flex items-center justify-between"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div>
                          <div className="text-sm text-gray-400">Available</div>
                          <div className="text-xl font-bold">{walletBalance.toFixed(2)} NEFT</div>
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transition-colors"
                          onClick={() => setTokenModalOpen(true)}
                          disabled={walletBalance <= 0}
                        >
                          Stake
                        </Button>
                      </motion.div>
                    </div>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Staking History</h3>
                    <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                      {stakingHistory.length > 0 ? (
                        stakingHistory.map(item => (
                          <motion.div 
                            key={item.id}
                            className="p-3 bg-black/50 rounded-lg border border-gray-800 flex justify-between items-center"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ x: 5 }}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  className={`${
                                    item.type === 'stake' 
                                      ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' 
                                      : item.type === 'unstake'
                                        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                                        : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                                  }`}
                                >
                                  {item.type === 'stake' ? 'Staked' : item.type === 'unstake' ? 'Unstaked' : 'Claimed'}
                                </Badge>
                                {item.nftName ? (
                                  <span className="text-sm truncate max-w-[120px]">{item.nftName}</span>
                                ) : (
                                  <span className="text-sm">{item.amount?.toFixed(2)} NEFT</span>
                                )}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {formatTime(item.timestamp)}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 py-4">
                          No staking history yet
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Tabs>
        </motion.div>

        {/* NFT Staking Modal */}
        <StakeNFTModal
          isOpen={nftModalOpen}
          onClose={() => setNftModalOpen(false)}
          availableNFTs={availableNFTs}
          selectedNFTs={selectedNFTIds}
          setSelectedNFTs={setSelectedNFTIds}
          onStake={stakeNFTs}
        />
        
        {/* Unstake NFT Modal */}
        <UnstakeNFTModal
          isOpen={unstakeNftModalOpen}
          onClose={() => setUnstakeNftModalOpen(false)}
          stakedNFTs={stakedNFTs}
          onUnstake={unstakeNFTs}
        />
        
        {/* Token Staking Modal */}
        <StakeTokenModal
          isOpen={tokenModalOpen}
          onClose={() => setTokenModalOpen(false)}
          walletBalance={walletBalance}
          amount={tokenAmount}
          setAmount={setTokenAmount}
          onStake={handleStakeTokens}
        />
        
        {/* Unstake Token Modal */}
        <UnstakeTokenModal
          isOpen={unstakeTokenModalOpen}
          onClose={() => setUnstakeTokenModalOpen(false)}
          tokenStaked={tokenStaked}
          onUnstake={handleUnstakeTokens}
        />
        
        {/* Claim Rewards Alert Dialog */}
        <AlertDialog open={claimRewardsOpen} onOpenChange={setClaimRewardsOpen}>
          <AlertDialogContent variant="glass" className="p-6">
            <AlertDialogHeader>
              <AlertDialogTitle>Claim Rewards</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to claim {totalEarnings.toFixed(4)} NEFT rewards.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClaimRewards}>
                Confirm Claim
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default StakingPage;
