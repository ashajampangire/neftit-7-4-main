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

  const projects: Project[] = [
    {
      id: 1,
      title: "Quantum Nexus",
      collection: "Cyber Collective",
      image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=400&h=300&fit=crop",
      reward: "50 NEFT",
      xp: "+75 XP",
      spots: "1000 spots",
      deadline: "2024-04-15T00:00:00Z",
      category: "featured"
    },
    {
      id: 2,
      title: "Neo Protocol",
      collection: "Digital Frontiers",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
      reward: "35 NEFT",
      xp: "+45 XP",
      spots: "800 spots",
      deadline: "2024-04-10T00:00:00Z",
      category: "high-rewards"
    },
    {
      id: 3,
      title: "Cyber Sentinel",
      collection: "MetaGuardians",
      image: "https://images.unsplash.com/photo-1515378960530-7c0da6231311?w=400&h=300&fit=crop",
      reward: "40 NEFT",
      xp: "+60 XP",
      spots: "500 spots",
      deadline: "2024-04-05T00:00:00Z",
      category: "ending-soon"
    },
    {
      id: 4,
      title: "Digital Horizon",
      collection: "Future Realms",
      image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=300&fit=crop",
      reward: "45 NEFT",
      xp: "+55 XP",
      spots: "750 spots",
      deadline: "2024-04-20T00:00:00Z",
      category: "featured"
    },
    {
      id: 5,
      title: "MetaVerse Pioneer",
      collection: "Virtual Frontiers",
      image: "https://images.unsplash.com/photo-1614729939124-123d0b8ae4b8?w=400&h=300&fit=crop",
      reward: "60 NEFT",
      xp: "+80 XP",
      spots: "300 spots",
      deadline: "2024-04-08T00:00:00Z",
      category: "ending-soon"
    },
    {
      id: 6,
      title: "Blockchain Genesis",
      collection: "CryptoVanguard",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      reward: "55 NEFT",
      xp: "+70 XP",
      spots: "600 spots",
      deadline: "2024-04-25T00:00:00Z",
      category: "high-rewards"
    },
    {
      id: 7,
      title: "Neural Network",
      collection: "AI Collective",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
      reward: "42 NEFT",
      xp: "+65 XP",
      spots: "400 spots",
      deadline: "2024-04-12T00:00:00Z",
      category: "featured"
    },
    {
      id: 8,
      title: "Quantum Leap",
      collection: "Tech Innovators",
      image: "https://images.unsplash.com/photo-1511376777868-611b54f68947?w=400&h=300&fit=crop",
      reward: "38 NEFT",
      xp: "+50 XP",
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
              className="group bg-[#1A1B1F] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#00E5FF] transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden cursor-pointer" onClick={() => handleProjectClick(project.id)}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                {project.category === "featured" && (
                  <div className="absolute top-3 right-3 bg-[#00E5FF] text-black text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} />
                    Featured
                  </div>
                )}
                {project.category === "ending-soon" && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <Timer size={12} />
                    Ending Soon
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <div className="flex items-center gap-2 bg-black/60 rounded-lg px-2 py-1">
                    <Users size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-300">{project.spots}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/60 rounded-lg px-2 py-1">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-300">
                      {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-base font-semibold group-hover:text-[#00E5FF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400">{project.collection}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="text-[#00E5FF] text-sm font-medium">{project.reward}</div>
                    <div className="text-gray-400 text-xs">•</div>
                    <div className="text-gray-300 text-sm">{project.xp}</div>
                  </div>
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
