import { useParams, useNavigate } from "react-router-dom";
import { MainNav } from "@/components/layout/MainNav";
import StarryBackground from "@/components/layout/StarryBackground";
import { NFTProject } from "@/types/nft";
import { ArrowLeft, Globe, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { NFTInfo } from "@/components/nft/NFTInfo";
import { NFTTaskList } from "@/components/nft/NFTTaskList";
import { featuredProjects } from "@/data/nftProjects";
import { motion } from "framer-motion";
import { FooterNew } from "@/components/footer/FooterNew";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonProps } from 'react-loading-skeleton';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<NFTProject | null>(null);
  const [loading, setLoading] = useState(true);

  // Custom skeleton animation styles
  const skeletonBaseProps: Partial<SkeletonProps> = {
    baseColor: "#2A2B2F",
    highlightColor: "#3A3B3F",
    direction: "ltr",
  };

  // Function to add delay to skeleton items based on their position
  const getSkeletonDelay = (index: number): { className: string } => ({
    className: `animate-pulse-delayed-${index}`
  });

  // Add custom CSS for delayed animations
  useEffect(() => {
    const style = document.createElement('style');
    const animations = Array(20).fill(0).map((_, i) => `
      @keyframes pulse-delayed-${i} {
        0% { opacity: 0.6; }
        ${i * 5}% { opacity: 0.6; }
        ${i * 5 + 50}% { opacity: 1; }
        100% { opacity: 0.6; }
      }
      .animate-pulse-delayed-${i} {
        animation: pulse-delayed-${i} 2s infinite;
      }
    `).join('\n');
    
    style.textContent = animations;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const foundProject = featuredProjects.find(p => p.id === id);
    console.log("Found project:", foundProject);
    
    if (foundProject) {
      setProject(foundProject);
    }
    setLoading(false);
  }, [id]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black"></div>
        <div className="absolute inset-0 bg-[url('/dots.png')] opacity-20"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/30 rounded-full filter blur-[100px]"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full filter blur-[100px]"></div>
        <div className="relative">
          <MainNav />
          <main className="container mx-auto px-4 pt-24 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  className="border-white/10 hover:bg-white/5 text-white opacity-50 cursor-not-allowed"
                  disabled
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Discover
                </Button>
              </div>

              {/* Project Header */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className={getSkeletonDelay(0).className}>
                    <Skeleton 
                      height={40} 
                      width={300} 
                      {...skeletonBaseProps}
                    />
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className={getSkeletonDelay(i + 1).className}>
                        <Skeleton 
                          height={20} 
                          {...skeletonBaseProps}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {[1, 2].map((_, i) => (
                      <div key={i} className={getSkeletonDelay(i + 4).className}>
                        <Skeleton 
                          width={120} 
                          height={40} 
                          {...skeletonBaseProps}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:text-right space-y-4">
                  <div className={getSkeletonDelay(6).className}>
                    <Skeleton 
                      height={200} 
                      {...skeletonBaseProps}
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="space-y-4">
                    <div className={getSkeletonDelay(7).className}>
                      <Skeleton 
                        height={30} 
                        width={200} 
                        {...skeletonBaseProps}
                      />
                    </div>
                    <div className="space-y-2">
                      {Array(5).fill(0).map((_, i) => (
                        <div key={i} className={getSkeletonDelay(i + 8).className}>
                          <Skeleton 
                            height={60} 
                            {...skeletonBaseProps}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className={getSkeletonDelay(13).className}>
                    <Skeleton 
                      height={30} 
                      width={150} 
                      {...skeletonBaseProps}
                    />
                  </div>
                  <div className="space-y-4">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className={getSkeletonDelay(i + 14).className}>
                        <Skeleton 
                          height={80} 
                          {...skeletonBaseProps}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="relative min-h-screen bg-[#0A0A0F]">
        <StarryBackground />
        <MainNav />
        <main className="container relative mx-auto px-4 pt-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="space-y-4 text-center">
              <div className="text-4xl text-gray-400">😢</div>
              <div className="text-2xl font-bold text-white">Project Not Found</div>
              <div className="text-gray-400">The project you're looking for doesn't exist or has been removed.</div>
              <Button
                variant="outline"
                onClick={() => navigate('/discover')}
                className="mt-4 border-white/10 hover:bg-white/5 text-white"
              >
                Back to Discover
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black"></div>
      <div className="absolute inset-0 bg-[url('/dots.png')] opacity-20"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/30 rounded-full filter blur-[100px]"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full filter blur-[100px]"></div>
      <div className="relative">
        <MainNav />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5 text-white"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Discover
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/10 hover:bg-white/5 text-white"
                  onClick={() => window.open(project.website, '_blank')}
                >
                  <Globe className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/10 hover:bg-white/5 text-white"
                  onClick={() => window.open(project.twitter, '_blank')}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/10 hover:bg-white/5 text-white"
                  onClick={() => window.open(project.discord, '_blank')}
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Project Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side - NFT Image */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-4"
              >
                <div className="sticky top-24 space-y-6">
                  <div className="relative group">
                    <img 
                      src={project.image} 
                      alt={project.nftName}
                      className="w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl relative transition-transform duration-300 group-hover:scale-[1.02]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e";
                      }}
                    />
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">Campaign Status</div>
                      <div className="px-3 py-1 rounded-full bg-white/10 text-white text-sm">
                        Active
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Right Side - Project Info */}
              <div className="lg:col-span-8">
                <NFTInfo
                  projectName={project.projectName}
                  nftName={project.nftName}
                  xpReward={project.xpReward}
                  neftReward={project.neftReward}
                  startTime={project.startTime}
                  endTime={project.endTime}
                  description={project.description}
                  rarityDistribution={project.rarityDistribution}
                />
              </div>
            </div>

            {/* Tasks and Rewards Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
                <div className="max-w-4xl mx-auto">
                  <NFTTaskList tasks={project.tasks} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
        <FooterNew />
      </div>
    </div>
  );
};

export default ProjectDetails;
