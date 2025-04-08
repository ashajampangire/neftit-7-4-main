import React, { useState } from "react";
import { MainNav } from "@/components/layout/MainNav";
import { motion } from "framer-motion";
import { Search, Filter, Sparkles, Clock, Trophy, Coins, Users, ChevronRight, ArrowRight, Star, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  collection: string;
  image: string;
  reward: string;
  xp: string;
  spots: string;
  deadline: string;
  category: "featured" | "ending-soon" | "high-rewards" | "all";
}

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleProjectClick = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  const projectImg = "/images/system-activation.png";

  const projects: Project[] = [
    {
      id: 1,
      title: "System Activation Protocol",
      collection: "NEFTIT Genesis",
      image: projectImg,
      reward: "100 NEFT",
      xp: "+150 XP",
      spots: "1000 spots",
      deadline: "2024-04-15T00:00:00Z",
      category: "featured"
    },
    {
      id: 2,
      title: "Neo Protocol Initiative",
      collection: "Digital Frontiers",
      image: projectImg,
      reward: "85 NEFT",
      xp: "+120 XP",
      spots: "800 spots",
      deadline: "2024-04-10T00:00:00Z",
      category: "high-rewards"
    },
    {
      id: 3,
      title: "Cyber Sentinel Program",
      collection: "MetaGuardians",
      image: projectImg,
      reward: "90 NEFT",
      xp: "+130 XP",
      spots: "500 spots",
      deadline: "2024-04-05T00:00:00Z",
      category: "ending-soon"
    },
    {
      id: 4,
      title: "Digital Horizon Protocol",
      collection: "Future Realms",
      image: projectImg,
      reward: "95 NEFT",
      xp: "+140 XP",
      spots: "750 spots",
      deadline: "2024-04-20T00:00:00Z",
      category: "featured"
    },
    {
      id: 5,
      title: "MetaVerse Initialization",
      collection: "Virtual Frontiers",
      image: projectImg,
      reward: "110 NEFT",
      xp: "+160 XP",
      spots: "300 spots",
      deadline: "2024-04-08T00:00:00Z",
      category: "ending-soon"
    },
    {
      id: 6,
      title: "Blockchain Genesis Protocol",
      collection: "CryptoVanguard",
      image: projectImg,
      reward: "105 NEFT",
      xp: "+155 XP",
      spots: "600 spots",
      deadline: "2024-04-25T00:00:00Z",
      category: "high-rewards"
    },
    {
      id: 7,
      title: "Neural Network Activation",
      collection: "AI Collective",
      image: projectImg,
      reward: "92 NEFT",
      xp: "+135 XP",
      spots: "400 spots",
      deadline: "2024-04-12T00:00:00Z",
      category: "featured"
    },
    {
      id: 8,
      title: "Quantum Protocol",
      collection: "Tech Innovators",
      image: projectImg,
      reward: "88 NEFT",
      xp: "+125 XP",
      spots: "900 spots",
      deadline: "2024-04-18T00:00:00Z",
      category: "all"
    }
  ];

  const filteredProjects = projects.filter(project => 
    activeCategory === "all" || project.category === activeCategory
  );

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "ending-soon", label: "Ending Soon" },
    { id: "high-rewards", label: "High Rewards" },
    { id: "featured", label: "Featured" }
  ];
  return (
    <div className="min-h-screen bg-[#030407] relative overflow-hidden">
       <MainNav />
   
      <main className="container relative mx-auto px-4 pt-8 pb-12 space-y-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 mt-8" 
          >
            {/* Header */}
            <div className="pt-16 pb-8 text-center space-y-4 max-w-2xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl font-bold text-white font-maat"
              >
                Discover Web3 Projects
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-white/70"
              >
                Explore and engage with the most innovative Web3 projects. Complete tasks, earn rewards, and build your NFT collection.
              </motion.p>
            </div>


        <div className="grid grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: "Active Projects", value: "50+", subtext: "Live quests available" },
            { icon: Clock, label: "Ending Soon", value: "12", subtext: "Limited time opportunities" },
            { icon: Trophy, label: "Total XP Available", value: "25,000", subtext: "Experience points to earn" },
            { icon: Coins, label: "Total NEFT Rewards", value: "100,000", subtext: "Tokens available to claim" }
          ].map((stat, index) => (
            <div key={index} className="bg-[#1A1B1F] rounded-2xl p-6 border border-gray-800 hover:border-[#00E5FF] transition-colors">
              <stat.icon className="w-8 h-8 text-[#00E5FF] mb-4" />
              <div className="text-2xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.subtext}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects by name, category, or chain..."
              className="w-full bg-[#1A1B1F] border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 bg-[#1A1B1F] border ${showFilters ? "border-[#00E5FF]" : "border-gray-800"} rounded-xl px-4 py-3`}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-[#00E5FF] text-black font-medium" 
                  : "bg-[#1A1B1F] text-gray-400 hover:bg-[#2A2B2F]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`group bg-[#1A1B1F] rounded-2xl overflow-hidden border ${project.category === "featured" ? "border-[#00E5FF]" : "border-[#1db35b]"} transition-all duration-300`}
            >
              <div className="relative overflow-hidden cursor-pointer" onClick={() => handleProjectClick(project.id)}>
                <div className="relative w-full h-[180px] bg-[#0A0B0F]">
                  {/* Main system activation image */}
                  <img 
                    src={projectImg} 
                    alt={project.title} 
                    className="w-full h-full object-contain" 
                  />

                  {/* Green border glow */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-[#1db35b]/50" />
                  <div className="absolute inset-x-0 bottom-0 h-[1px] bg-[#1db35b]/50" />
                  <div className="absolute inset-y-0 left-0 w-[1px] bg-[#1db35b]/50" />
                  <div className="absolute inset-y-0 right-0 w-[1px] bg-[#1db35b]/50" />

                  {project.category === "featured" && (
                    <div className="absolute top-4 right-4 bg-[#00E5FF] text-black text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <Star size={12} />
                      Featured
                    </div>
                  )}
                  {project.category === "ending-soon" && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <Timer size={12} />
                      Ending Soon
                    </div>
                  )}
                </div>

                {/* Stats container below image */}
                <div className="flex justify-between items-center px-4 py-2 bg-[#1A1B1F]">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-300">{project.spots}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-300">
                      {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="text-base font-medium text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{project.collection}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-[#00E5FF] text-sm font-medium">{project.reward}</div>
                  <div className="text-gray-500 text-xs">•</div>
                  <div className="text-gray-300 text-sm">{project.xp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Discover;
