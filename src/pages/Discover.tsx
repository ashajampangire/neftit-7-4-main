import React, { useState } from "react";
import { MainNav } from "@/components/layout/MainNav";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Sparkles,
  Clock,
  Trophy,
  Coins,
  Users,
  ChevronRight,
  ArrowRight,
  Star,
  Timer,
  Flame,
  TrendingUp,
  Zap,
  Grid,
  List,
  SlidersHorizontal,
  Sliders,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import styles from "./Discover.module.css";

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  const handleProjectClick = (projectId: number) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate(`/project/${projectId}`);
    } else {
      navigate(`/discover/${projectId}`);
    }
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
      category: "featured",
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
      category: "high-rewards",
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
      category: "ending-soon",
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
      category: "featured",
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
      category: "ending-soon",
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
      category: "high-rewards",
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
      category: "featured",
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
      category: "all",
    },
  ];

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  const categories = [
    { id: "all", label: "All Projects", icon: Sparkles },
    { id: "ending-soon", label: "Ending Soon", icon: Timer },
    { id: "high-rewards", label: "High Rewards", icon: Flame },
    { id: "featured", label: "Featured", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-[#0F1114] font-sora">
      {/* Dark Background */}
      <div className="fixed inset-0 bg-[#0F1114]" />

      <MainNav />

      <main className="container relative mx-auto px-4 pt-0 mt-0 pb-10 md:pb-16 space-y-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="border-b border-[#2D3748]/50 pb-4 md:pb-6 mt-0 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-0 pt-0">
                  Discover Projects
                </h1>
                <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mt-1">
                  Explore the latest NFT projects and campaigns
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

          <div className="py-4 md:py-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6 md:mb-8">
              {[
                { icon: Users, label: "Active Projects", value: "50+" },
                { icon: Clock, label: "Ending Soon", value: "12" },
                { icon: Trophy, label: "Total XP", value: "25,000" },
                { icon: Coins, label: "NEFT Rewards", value: "100,000" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-2 sm:p-3 md:p-4 rounded-lg bg-[#171923] border border-[#2D3748]/50 flex items-center gap-2 sm:gap-3"
                >
                  <div className="p-1.5 sm:p-2 rounded-lg bg-[#1A202C] flex-shrink-0">
                    <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38B2AC]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm text-[#A0AEC0] font-sora truncate">
                      {stat.label}
                    </div>
                    <div className="text-sm sm:text-base md:text-xl font-bold text-white font-sora truncate">
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters and Search */}
            <div className="mb-6 md:mb-8 bg-[#171923] rounded-lg md:rounded-xl border border-[#2D3748]/50 p-3 md:p-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <div className="relative rounded-lg">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#94A3B8]" />
                    <input
                      type="text"
                      placeholder="Search projects by name, category, or chain..."
                      className="w-full bg-[#1A202C] py-2 sm:py-3 pl-9 sm:pl-12 pr-3 sm:pr-4 rounded-lg text-sm sm:text-base text-white placeholder-[#718096] font-sora focus:outline-none focus:ring-1 focus:ring-[#38B2AC]"
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
                        Project Type
                      </label>
                      <select className="w-full bg-[#1A202C] border border-[#2D3748]/50 rounded-lg p-2 sm:p-2.5 text-sm sm:text-base text-white font-sora focus:outline-none focus:ring-1 focus:ring-[#38B2AC]">
                        <option>All Types</option>
                        <option>Quests</option>
                        <option>Collectibles</option>
                        <option>Staking</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#94A3B8] mb-1 sm:mb-2">
                        Blockchain
                      </label>
                      <select className="w-full bg-[#1A202C] border border-[#2D3748]/50 rounded-lg p-2 sm:p-2.5 text-sm sm:text-base text-white font-sora focus:outline-none focus:ring-1 focus:ring-[#38B2AC]">
                        <option>All Chains</option>
                        <option>Ethereum</option>
                        <option>Solana</option>
                        <option>Polygon</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#94A3B8] mb-1 sm:mb-2">
                        Price Range
                      </label>
                      <select className="w-full bg-[#1A202C] border border-[#2D3748]/50 rounded-lg p-2 sm:p-2.5 text-sm sm:text-base text-white font-sora focus:outline-none focus:ring-1 focus:ring-[#38B2AC]">
                        <option>All Prices</option>
                        <option>Under 50 NEFT</option>
                        <option>50-100 NEFT</option>
                        <option>100+ NEFT</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 md:mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-sora transition-colors duration-200 text-xs sm:text-sm",
                    activeCategory === category.id
                      ? "bg-[#38B2AC] text-white"
                      : "bg-[#171923] text-[#94A3B8] border border-[#2D3748]/50 hover:border-[#4A5568]"
                  )}
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <category.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {category.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Project Results Count */}
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Showing{" "}
                <span className="text-white font-medium">
                  {filteredProjects.length}
                </span>{" "}
                projects
              </p>
            </div>

            {/* Projects Grid */}
            <div
              className={
                viewMode === "grid"
                  ? `${styles.discoverGrid}`
                  : "flex flex-col gap-3 md:gap-4"
              }
            >
              {filteredProjects.map((project) =>
                viewMode === "grid" ? (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project.id)}
                    className={styles.card + " group rounded-xl bg-[#171923] border border-[#2D3748]/50 hover:border-[#38B2AC]/50 hover:shadow-lg hover:shadow-[#38B2AC]/10 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col"}
                  >
                    {/* Project Image Container */}
                    <div className={styles.cardImageContainer}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className={styles.cardImage}
                        loading="lazy"
                      />
                      {/* Badge Example */}
                      {project.category === "featured" && (
                        <span className={styles.badge}>Featured</span>
                      )}
                      {project.category === "ending-soon" && (
                        <span className={`${styles.badge} ${styles.endingSoon}`}>Ending Soon</span>
                      )}
                    </div>
                    {/* Content Section */}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col">
                      <div className="mb-3">
                        <h3 className="text-base sm:text-lg font-bold font-sora text-white mb-1 truncate">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-sora text-[#94A3B8] truncate">
                          {project.collection}
                        </p>
                      </div>
                      <div className="mt-auto space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-[#38B2AC]/20 flex items-center justify-center">
                              <Coins className="w-3.5 h-3.5 text-[#38B2AC]" />
                            </div>
                            <span className="text-sm font-medium text-white">
                              {project.reward}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-[#805AD5]/20 flex items-center justify-center">
                              <Zap className="w-3.5 h-3.5 text-[#805AD5]" />
                            </div>
                            <span className="text-sm font-medium text-white">
                              {project.xp}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-[#2D3748]/50">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-[#94A3B8]" />
                            <span className="text-xs text-[#94A3B8]">
                              {project.spots}
                            </span>
                          </div>
                          <div className="text-xs text-[#38B2AC] font-medium">
                            Explore
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project.id)}
                    className="flex flex-col sm:flex-row rounded-xl bg-[#171923] border border-[#2D3748]/50 hover:border-[#38B2AC]/50 hover:shadow-lg hover:shadow-[#38B2AC]/10 transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    {/* Project Image */}
                    <div className="relative sm:w-48 md:w-60 flex-shrink-0">
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          loading="lazy"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-3 left-3">
                            <div className="text-xs md:text-sm font-semibold text-white bg-[#38B2AC] rounded-full px-3 py-1 inline-flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              View Project
                            </div>
                          </div>
                        </div>
                        {/* Timer Badge */}
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-[#F56565]" />
                            <span className="text-xs font-medium text-white">
                              2d 5h
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                      <div className="flex-1">
                        {/* Project Info */}
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-base sm:text-lg font-bold font-sora text-white">
                              {project.title}
                            </h3>
                            <p className="text-xs sm:text-sm font-sora text-[#94A3B8]">
                              {project.collection}
                            </p>
                          </div>
                          <div className="text-sm text-[#38B2AC] font-medium hidden sm:block">
                            Explore →
                          </div>
                        </div>

                        {/* Project Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#38B2AC]/20 flex items-center justify-center flex-shrink-0">
                              <Coins className="w-4 h-4 text-[#38B2AC]" />
                            </div>
                            <div>
                              <span className="text-xs text-[#94A3B8] block">
                                Reward
                              </span>
                              <span className="text-sm font-medium text-white">
                                {project.reward}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#805AD5]/20 flex items-center justify-center flex-shrink-0">
                              <Zap className="w-4 h-4 text-[#805AD5]" />
                            </div>
                            <div>
                              <span className="text-xs text-[#94A3B8] block">
                                Experience
                              </span>
                              <span className="text-sm font-medium text-white">
                                {project.xp}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#F6AD55]/20 flex items-center justify-center flex-shrink-0">
                              <Users className="w-4 h-4 text-[#F6AD55]" />
                            </div>
                            <div>
                              <span className="text-xs text-[#94A3B8] block">
                                Spots
                              </span>
                              <span className="text-sm font-medium text-white">
                                {project.spots}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#F56565]/20 flex items-center justify-center flex-shrink-0">
                              <Clock className="w-4 h-4 text-[#F56565]" />
                            </div>
                            <div>
                              <span className="text-xs text-[#94A3B8] block">
                                Time Left
                              </span>
                              <span className="text-sm font-medium text-white">
                                2d 5h
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Discover;
