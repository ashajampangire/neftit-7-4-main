import { useState, useEffect } from 'react';
import { MainNav } from "@/components/layout/MainNav";
import StarryBackground from "@/components/layout/StarryBackground";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from "@/components/ui/input";
import { AlertCircle, InfoIcon, Flame } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useWallet } from "@/components/wallet/WalletProvider";
import { WalletConnect } from "@/components/wallet/WalletConnect";

// Types
interface NFT {
  id: string;
  name: string;
  image: string;
  rarity: 'Platinum' | 'Gold' | 'Silver';
  staked?: boolean;
}

interface StakingHistory {
  id: string;
  type: 'stake' | 'unstake' | 'claim';
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
  availableNFTs
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
    <Dialog open={open} onOpenChange={onClose}>
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
  open, 
  onClose, 
  onUnstake,
  stakedNFTs
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
    <Dialog open={open} onOpenChange={onClose}>
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
  open, 
  onClose, 
  onStake,
  maxAmount,
  apr
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
              <span>{((parseFloat(amount) || 0) * apr / 365 / 100).toFixed(4)} NEFT</span>
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
            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount}
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
  lockupPeriod = false
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
                <span className="text-red-400">Insufficient staked amount</span>
              )}
            </div>
          </div>
          
          {lockupPeriod && (
            <div className="rounded-lg bg-red-900/20 border border-red-500/50 p-3 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-red-300">
                Your tokens are still in the lockup period. Unstaking now will result in a penalty on rewards.
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
            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > stakedAmount}
            className="bg-red-600 hover:bg-red-700"
          >
            {lockupPeriod ? "Unstake Early" : "Confirm Unstake"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main Staking Page Component
const StakingPage = () => {
  const { isConnected } = useWallet();
  
  // NFT Staking State
  const [availableNFTs, setAvailableNFTs] = useState<NFT[]>([]);
  const [stakedNFTs, setStakedNFTs] = useState<NFT[]>([]);
  const [isStakeNFTModalOpen, setIsStakeNFTModalOpen] = useState(false);
  const [isUnstakeNFTModalOpen, setIsUnstakeNFTModalOpen] = useState(false);
  
  // Token Staking State
  const [tokenBalance, setTokenBalance] = useState(1000); // Example balance
  const [stakedTokens, setStakedTokens] = useState(500); // Example staked amount
  const [isStakeTokenModalOpen, setIsStakeTokenModalOpen] = useState(false);
  const [isUnstakeTokenModalOpen, setIsUnstakeTokenModalOpen] = useState(false);
  const [apr] = useState(12); // Example APR
  const [rewards, setRewards] = useState(25.5); // Example rewards
  
  // History
  const [stakingHistory, setStakingHistory] = useState<StakingHistory[]>([]);
  
  // Example NFT data with placeholder images
  useEffect(() => {
    setAvailableNFTs([
      { 
        id: '1', 
        name: 'NEFT #1', 
        image: 'https://placehold.co/400x400/1a1a1a/ffffff?text=NEFT+%231', 
        rarity: 'Platinum' 
      },
      { 
        id: '2', 
        name: 'NEFT #2', 
        image: 'https://placehold.co/400x400/1a1a1a/ffffff?text=NEFT+%232', 
        rarity: 'Gold' 
      },
      { 
        id: '3', 
        name: 'NEFT #3', 
        image: 'https://placehold.co/400x400/1a1a1a/ffffff?text=NEFT+%233', 
        rarity: 'Silver' 
      },
    ]);
    
    setStakedNFTs([
      { 
        id: '4', 
        name: 'NEFT #4', 
        image: 'https://placehold.co/400x400/1a1a1a/ffffff?text=NEFT+%234', 
        rarity: 'Platinum', 
        staked: true 
      },
      { 
        id: '5', 
        name: 'NEFT #5', 
        image: 'https://placehold.co/400x400/1a1a1a/ffffff?text=NEFT+%235', 
        rarity: 'Gold', 
        staked: true 
      },
    ]);
    
    setStakingHistory([
      { id: '1', type: 'stake', nftId: '4', nftName: 'NEFT #4', timestamp: new Date(Date.now() - 86400000) },
      { id: '2', type: 'stake', amount: 500, timestamp: new Date(Date.now() - 172800000) },
      { id: '3', type: 'claim', amount: 25, timestamp: new Date(Date.now() - 259200000) },
    ]);
  }, []);
  
  // Handlers
  const handleStakeNFTs = (selectedNFTs: string[]) => {
    // Implement staking logic
    console.log('Staking NFTs:', selectedNFTs);
  };
  
  const handleUnstakeNFTs = (selectedNFTs: string[]) => {
    // Implement unstaking logic
    console.log('Unstaking NFTs:', selectedNFTs);
  };
  
  const handleStakeTokens = (amount: number) => {
    // Implement token staking logic
    console.log('Staking tokens:', amount);
  };
  
  const handleUnstakeTokens = (amount: number) => {
    // Implement token unstaking logic
    console.log('Unstaking tokens:', amount);
  };
  
  const handleClaimRewards = () => {
    // Implement rewards claiming logic
    console.log('Claiming rewards');
  };
  
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-black text-white relative">
        <StarryBackground />
        <MainNav />
        
        <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center py-20">
              <h1 className="text-3xl font-bold mb-8">Connect Wallet to Start Staking</h1>
              <WalletConnect />
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <Card className="flex-1 bg-gray-900/50 border-gray-800">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Total Value Locked</h2>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Combined value of staked NFTs and tokens
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="text-3xl font-bold">$125,000</div>
                    <div className="text-sm text-gray-400 mt-1">+5.2% from last week</div>
                  </div>
                </Card>
                
                <Card className="flex-1 bg-gray-900/50 border-gray-800">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Your Rewards</h2>
                      <Button 
                        size="sm"
                        onClick={handleClaimRewards}
                        disabled={rewards <= 0}
                        className="bg-gradient-to-r from-yellow-600 to-yellow-500"
                      >
                        <Flame className="w-4 h-4 mr-2" />
                        Claim {rewards} NEFT
                      </Button>
                    </div>
                    <div className="text-3xl font-bold">${(rewards * 2).toFixed(2)}</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Earning ~{((stakedTokens * apr / 365 / 100) + (stakedNFTs.length * 0.1)).toFixed(2)} NEFT per day
                    </div>
                  </div>
                </Card>
              </div>
              
              <Tabs defaultValue="nfts" className="space-y-6">
                <TabsList className="bg-gray-900/50 border-gray-800">
                  <TabsTrigger value="nfts">NFT Staking</TabsTrigger>
                  <TabsTrigger value="tokens">Token Staking</TabsTrigger>
                </TabsList>
                
                <TabsContent value="nfts" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-gray-900/50 border-gray-800">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Available NFTs</h3>
                          <Button
                            onClick={() => setIsStakeNFTModalOpen(true)}
                            disabled={availableNFTs.length === 0}
                          >
                            Stake NFTs
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {availableNFTs.map(nft => (
                            <div key={nft.id} className="border border-gray-800 rounded-lg p-3">
                              <img 
                                src={nft.image} 
                                alt={nft.name}
                                className="w-full aspect-square object-cover rounded-md mb-2" 
                              />
                              <p className="font-medium truncate">{nft.name}</p>
                              <Badge className={
                                nft.rarity === 'Platinum' ? 'bg-purple-500/20 text-purple-300' : 
                                nft.rarity === 'Gold' ? 'bg-yellow-500/20 text-yellow-300' : 
                                'bg-blue-500/20 text-blue-300'
                              }>
                                {nft.rarity}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="bg-gray-900/50 border-gray-800">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Staked NFTs</h3>
                          <Button
                            onClick={() => setIsUnstakeNFTModalOpen(true)}
                            disabled={stakedNFTs.length === 0}
                            variant="destructive"
                          >
                            Unstake NFTs
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {stakedNFTs.map(nft => (
                            <div key={nft.id} className="border border-gray-800 rounded-lg p-3">
                              <img 
                                src={nft.image} 
                                alt={nft.name}
                                className="w-full aspect-square object-cover rounded-md mb-2" 
                              />
                              <p className="font-medium truncate">{nft.name}</p>
                              <Badge className={
                                nft.rarity === 'Platinum' ? 'bg-purple-500/20 text-purple-300' : 
                                nft.rarity === 'Gold' ? 'bg-yellow-500/20 text-yellow-300' : 
                                'bg-blue-500/20 text-blue-300'
                              }>
                                {nft.rarity}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="tokens" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-gray-900/50 border-gray-800">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Token Staking</h3>
                  <div className="flex items-center gap-2">
                            <Button
                              onClick={() => setIsUnstakeTokenModalOpen(true)}
                              disabled={stakedTokens <= 0}
                              variant="destructive"
                            >
                              Unstake
                            </Button>
                            <Button
                              onClick={() => setIsStakeTokenModalOpen(true)}
                              disabled={tokenBalance <= 0}
                            >
                              Stake
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                            <div>
                              <div className="text-sm text-gray-400">Available Balance</div>
                              <div className="text-xl font-semibold">{tokenBalance} NEFT</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-400">Staked Amount</div>
                              <div className="text-xl font-semibold">{stakedTokens} NEFT</div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-800/50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <div className="text-sm text-gray-400">Current APR</div>
                              <div className="text-lg font-semibold text-green-400">{apr}%</div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-400">Daily Rewards</div>
                              <div className="text-lg font-semibold">
                                {(stakedTokens * apr / 365 / 100).toFixed(4)} NEFT
                              </div>
                            </div>
                          </div>
                  </div>
                </div>
              </Card>
                    
                    <Card className="bg-gray-900/50 border-gray-800">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Staking History</h3>
                        <div className="space-y-3">
                          {stakingHistory.map(history => (
                            <div 
                              key={history.id}
                              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                            >
                              <div>
                                <div className="font-medium">
                                  {history.type === 'stake' ? 'Staked' : 
                                   history.type === 'unstake' ? 'Unstaked' : 
                                   'Claimed Rewards'}
                                </div>
                                <div className="text-sm text-gray-400">
                                  {history.nftName ? history.nftName :
                                   `${history.amount} NEFT`}
                                </div>
                              </div>
                              <div className="text-sm text-gray-400">
                                {new Date(history.timestamp).toLocaleDateString()}
                              </div>
                            </div>
            ))}
          </div>
        </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
      </main>
    </div>
      
      <StakeNFTModal
        open={isStakeNFTModalOpen}
        onClose={() => setIsStakeNFTModalOpen(false)}
        onStake={handleStakeNFTs}
        availableNFTs={availableNFTs}
      />
      
      <UnstakeNFTModal
        open={isUnstakeNFTModalOpen}
        onClose={() => setIsUnstakeNFTModalOpen(false)}
        onUnstake={handleUnstakeNFTs}
        stakedNFTs={stakedNFTs}
      />
      
      <StakeTokenModal
        open={isStakeTokenModalOpen}
        onClose={() => setIsStakeTokenModalOpen(false)}
        onStake={handleStakeTokens}
        maxAmount={tokenBalance}
        apr={apr}
      />
      
      <UnstakeTokenModal
        open={isUnstakeTokenModalOpen}
        onClose={() => setIsUnstakeTokenModalOpen(false)}
        onUnstake={handleUnstakeTokens}
        stakedAmount={stakedTokens}
      />
    </TooltipProvider>
  );
};

export default StakingPage;
