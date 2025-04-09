import React, { useState } from "react";
import { MainNav } from "@/components/layout/MainNav";
import { motion } from "framer-motion";
import { Search, Filter, Sparkles, Clock, Trophy, Coins, Users, ChevronRight, ArrowRight, Star, Timer, Flame, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

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
    { id: "all", label: "All Projects", icon: Sparkles },
    { id: "ending-soon", label: "Ending Soon", icon: Timer },
    { id: "high-rewards", label: "High Rewards", icon: Flame },
    { id: "featured", label: "Featured", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF3BFF]/5 via-[#36F9F6]/5 to-[#5C24FF]/5 backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="fixed -top-24 -right-24 w-48 h-48 rounded-full blur-3xl"
        animate={{
          background: [
            "rgba(255,59,255,0.1)",
            "rgba(54,249,246,0.1)",
            "rgba(92,36,255,0.1)",
            "rgba(255,59,255,0.1)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="fixed -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl"
        animate={{
          background: [
            "rgba(54,249,246,0.1)",
            "rgba(92,36,255,0.1)",
            "rgba(255,59,255,0.1)",
            "rgba(54,249,246,0.1)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

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
            <div className="pt-16 pb-8 text-center space-y-4 max-w-3xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-6xl font-bold font-space-grotesk"
              >
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent">
                Discover Web3 Projects
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF]/20 via-[#36F9F6]/20 to-[#5C24FF]/20 blur-2xl"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-text-secondary font-dm-sans"
              >
                Explore and engage with the most innovative Web3 projects. Complete tasks, earn rewards, and build your NFT collection.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Users, label: "Active Projects", value: "50+", subtext: "Live quests available", gradient: "from-[#FF3BFF] to-[#36F9F6]" },
                { icon: Clock, label: "Ending Soon", value: "12", subtext: "Limited time opportunities", gradient: "from-[#36F9F6] to-[#5C24FF]" },
                { icon: Trophy, label: "Total XP Available", value: "25,000", subtext: "Experience points to earn", gradient: "from-[#5C24FF] to-[#FF3BFF]" },
                { icon: Coins, label: "Total NEFT Rewards", value: "100,000", subtext: "Tokens available to claim", gradient: "from-[#FF3BFF] to-[#5C24FF]" }
          ].map((stat, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  key={index}
                  className={cn(
                    "relative p-6 rounded-3xl",
                    "bg-background-card/30 backdrop-blur-xl",
                    "border border-border/50",
                    "transition-all duration-500",
                    "hover:border-[#FF3BFF]/20",
                    "hover:shadow-lg hover:shadow-[#FF3BFF]/5",
                    "group overflow-hidden"
                  )}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    animate={{
                      background: [
                        `linear-gradient(to right, ${stat.gradient})`,
                        `linear-gradient(to left, ${stat.gradient})`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-background-card/80 backdrop-blur-sm" />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#FF3BFF] to-[#36F9F6] flex items-center justify-center mb-4"
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <h3 className="text-3xl font-bold font-space-grotesk mb-2">
                      <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                    </h3>

                    <p className="text-text-secondary/80 font-dm-sans text-sm">
                      {stat.subtext}
                    </p>
            </div>

                  {/* Bottom Gradient Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
          ))}
        </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative group">
                <div className={cn(
                  "relative p-1 rounded-2xl",
                  "bg-background-card/30 backdrop-blur-xl",
                  "border border-border/50",
                  "transition-all duration-500",
                  "group-hover:border-[#FF3BFF]/20",
                  "group-hover:shadow-lg group-hover:shadow-[#FF3BFF]/5",
                  "overflow-hidden"
                )}>
                  {/* Animated Gradient Background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    animate={{
                      background: [
                        "linear-gradient(to right, rgba(255,59,255,0.05), rgba(54,249,246,0.05))",
                        "linear-gradient(to left, rgba(255,59,255,0.05), rgba(54,249,246,0.05))",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-background-card/80 backdrop-blur-sm" />

                  {/* Search Input */}
                  <div className="relative z-10 flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-text-secondary transition-colors group-hover:text-text-primary" />
            <input
              type="text"
              placeholder="Search projects by name, category, or chain..."
                      className={cn(
                        "w-full bg-transparent",
                        "py-3.5 pl-12 pr-4",
                        "text-text-primary placeholder-text-secondary/50",
                        "font-dm-sans",
                        "focus:outline-none",
                        "transition-all"
                      )}
            />
          </div>
                </div>
              </div>

              <motion.button 
            onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative px-6 py-3.5 rounded-2xl",
                  "bg-background-card/30 backdrop-blur-xl",
                  "border border-border/50",
                  "transition-all duration-500",
                  "hover:border-[#FF3BFF]/20",
                  "hover:shadow-lg hover:shadow-[#FF3BFF]/5",
                  "overflow-hidden",
                  "group",
                  showFilters && "border-[#FF3BFF]/40"
                )}
              >
                {/* Animated Gradient Background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                  animate={{
                    background: [
                      "linear-gradient(to right, rgba(255,59,255,0.05), rgba(54,249,246,0.05))",
                      "linear-gradient(to left, rgba(255,59,255,0.05), rgba(54,249,246,0.05))",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-background-card/80 backdrop-blur-sm" />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-2 font-dm-sans">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
                </div>

                {/* Bottom Gradient Line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: showFilters ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
        </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "relative px-6 py-2.5 rounded-full",
                    "transition-all duration-300",
                    "font-space-grotesk",
                    "overflow-hidden group",
                activeCategory === category.id
                      ? "bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] text-white shadow-lg shadow-[#FF3BFF]/20"
                      : "bg-background-card/30 backdrop-blur-xl border border-border/50 text-text-secondary hover:text-text-primary"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
              {category.label}
                  </span>
                  
                  {/* Hover Gradient */}
                  {activeCategory !== category.id && (
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#FF3BFF]/10 via-[#36F9F6]/10 to-[#5C24FF]/10"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
          ))}
        </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
              key={project.id} 
                  onClick={() => handleProjectClick(project.id)}
                  className={cn(
                    "relative p-6 rounded-3xl cursor-pointer",
                    "bg-background-card/30 backdrop-blur-xl",
                    "border border-border/50",
                    "transition-all duration-500",
                    "hover:border-[#FF3BFF]/20",
                    "hover:shadow-lg hover:shadow-[#FF3BFF]/5",
                    "group overflow-hidden"
                  )}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    animate={{
                      background: [
                        "linear-gradient(to right, rgba(255,59,255,0.05), rgba(54,249,246,0.05))",
                        "linear-gradient(to left, rgba(255,59,255,0.05), rgba(54,249,246,0.05))",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-background-card/80 backdrop-blur-sm" />

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    {/* Project Image */}
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
                    {/* Project Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-space-grotesk text-text-primary group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                      <p className="text-sm font-dm-sans text-text-secondary">
                        {project.collection}
                      </p>
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Reward", value: project.reward, icon: Coins },
                        { label: "XP", value: project.xp, icon: Zap },
                        { label: "Spots", value: project.spots, icon: Users },
                        { label: "Time Left", value: "2d 5h", icon: Clock }
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <stat.icon className="w-4 h-4 text-text-secondary" />
                          <span className="text-sm font-dm-sans text-text-secondary">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                </div>
                
                    {/* Action Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium font-dm-sans text-text-secondary group-hover:text-text-primary transition-colors">
                        View Details
                      </span>
                      <ArrowRight className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors group-hover:translate-x-1 duration-300" />
                    </motion.div>
                  </div>

                  {/* Bottom Gradient Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
        </div>
        </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Discover;
