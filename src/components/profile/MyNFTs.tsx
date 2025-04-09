import React from 'react';
import { Award, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const nftData = [
  {
    id: 1,
    name: 'Cosmic Explorer #032',
    image: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&dpr=1&w=1000',
    rarity: 'Common',
    project: 'Cosmic Explorers'
  },
  {
    id: 2,
    name: 'Stellar Guardian #105',
    image: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?fit=max&w=350',
    rarity: 'Platinum',
    project: 'Stellar Guardians'
  },
  {
    id: 3,
    name: 'Neon Drifter #077',
    image: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oT4ka0eSb-G2v_3q9Hoeq0PypqOV1O1wKQu5J-OMolOS7gBm6Sj1Q-L4GzHbKQ-v8mj3bKHuZYdB4z?auto=format&dpr=1&w=1000',
    rarity: 'Silver',
    project: 'Neon Drifters'
  },
  {
    id: 4,
    name: 'Empty Slot',
    image: '',
    rarity: '',
    project: ''
  }
];

const rarityColors = {
  'Common': 'border-[#36F9F6] bg-[#36F9F6]/10 text-[#36F9F6]',
  'Platinum': 'border-[#FF2E63] bg-[#FF2E63]/10 text-[#FF2E63]',
  'Silver': 'border-[#9D9BF3] bg-[#9D9BF3]/10 text-[#9D9BF3]',
  'Gold': 'border-[#FFD700] bg-[#FFD700]/10 text-[#FFD700]'
};

const NFTCard = ({ nft }: { nft: typeof nftData[0] }) => {
  if (nft.name === 'Empty Slot') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-2xl bg-background-card border border-dashed border-border hover:border-primary/50 transition-all cursor-pointer group backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="h-96 flex flex-col items-center justify-center relative">
          <div className="w-16 h-16 rounded-full bg-background-card flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all border border-border group-hover:border-primary/50">
            <Plus className="w-8 h-8 text-text-secondary group-hover:text-primary transition-all" />
          </div>
          <p className="text-text-secondary group-hover:text-text-primary font-manrope transition-all">Add New NFT</p>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl bg-background-card border border-border hover:border-border-hover transition-all group backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="relative h-64">
        <img 
          src={nft.image} 
          alt={nft.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className={cn(
          'absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium border',
          rarityColors[nft.rarity as keyof typeof rarityColors]
        )}>
          {nft.rarity}
        </div>
      </div>
      <div className="relative p-5 space-y-2">
        <h3 className="text-lg font-bold text-text-primary font-space-grotesk group-hover:text-primary transition-colors">
          {nft.name}
        </h3>
        <p className="text-sm text-text-secondary font-dm-sans">{nft.project}</p>
      </div>
    </motion.div>
  );
};

const MyNFTs = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary font-space-grotesk">
          My NFT Collection
        </h2>
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors font-manrope">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nftData.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NFTCard nft={nft} />
          </motion.div>
        ))}
      </div>
      
      {nftData.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-10 text-center bg-background-card backdrop-blur-xl border border-border"
        >
          <Award className="h-16 w-16 text-primary/40 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-text-primary font-space-grotesk mb-2">
            No NFTs Yet
          </h3>
          <p className="text-text-secondary font-dm-sans">
            Complete quests to earn your first NFT!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MyNFTs;
