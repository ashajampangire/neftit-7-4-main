import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { motion } from "framer-motion";
import StarryBackground from "@/components/layout/StarryBackground";

export function AuthPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // If already authenticated, redirect to home
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = (method: string) => {
    localStorage.setItem("isAuthenticated", "true");
    toast({
      title: "Login Successful",
      description: `Logged in with ${method}`,
    });
    navigate("/home");
  };

  const walletOptions = [
    {
      name: "MetaMask",
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-metamask-2728406-2261817.png",
      onClick: () => handleLogin("MetaMask")
    },
    {
      name: "X",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png",
      onClick: () => handleLogin("X")
    },
    {
      name: "Discord",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
      onClick: () => handleLogin("Discord")
    }
  ];

  const socialLogins = [
    {
      name: "Google",
      icon: "https://cdn-icons-png.flaticon.com/128/300/300221.png",
      onClick: () => handleLogin("Google")
    },
    {
      name: "Apple",
      icon: "https://cdn-icons-png.flaticon.com/128/0/747.png",
      onClick: () => handleLogin("Apple")
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Background Elements */}
      <StarryBackground />
      
      {/* Animated Gradient Orbs */}
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
      
      <div className="flex min-h-screen relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80"
              alt="Web3 Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />
          </div>
          
          {/* Branding Content with Animations */}
          <div className="relative z-10 flex flex-col justify-between w-full h-full p-16">
            {/* NEFTIT Text with Animation */}
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-bold bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent"
            >
              NEFTIT
            </motion.span>
            
            {/* Tagline with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-5xl font-bold leading-tight text-white max-w-xl">
                Empowering the Future of Digital Ownership
              </h1>
              <p className="text-gray-400 mt-4 text-lg">
                Discover, trade, and showcase unique digital assets in the metaverse
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Login Options with Glass Morphism */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 backdrop-blur-md bg-transparent">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-8 p-8 rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 shadow-xl"
          >
            {/* Header with Gradient Text */}
            <div className="text-center space-y-2">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold bg-gradient-to-r from-[#FF3BFF] via-[#36F9F6] to-[#5C24FF] bg-clip-text text-transparent"
              >
                Welcome to NEFTIT
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-300"
              >
                Connect your wallet to enter the metaverse
              </motion.p>
            </div>

            {/* Wallet Options with Animations */}
            <div className="space-y-4">
              {walletOptions.map((wallet, index) => (
                <motion.div
                  key={wallet.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Button
                    onClick={wallet.onClick}
                    className="w-full h-14 bg-black/30 hover:bg-black/50 text-white border border-white/10 rounded-xl transition-all duration-200 hover:scale-[1.02] space-x-3 backdrop-blur-md"
                  >
                    <img src={wallet.icon} alt={wallet.name} className="w-6 h-6" />
                    <span>Continue with {wallet.name}</span>
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Divider with Glow Effect */}
            <motion.div 
              className="relative my-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20 glow-sm"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/30 backdrop-blur-xl text-gray-300">Or continue with</span>
              </div>
            </motion.div>

            {/* Social Logins with Animations */}
            <div className="grid grid-cols-2 gap-4">
              {socialLogins.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <Button
                    onClick={social.onClick}
                    className="w-full bg-black/30 hover:bg-black/50 text-white border border-white/10 rounded-xl transition-all duration-200 hover:scale-[1.02] space-x-3 backdrop-blur-md"
                  >
                    <img src={social.icon} alt={social.name} className="w-5 h-5" />
                    <span>{social.name}</span>
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Terms with Hover Effects */}
            <motion.p 
              className="text-center text-sm text-gray-400 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              By connecting, you agree to our{" "}
              <Button variant="link" className="text-[#36F9F6] hover:text-[#36F9F6]/80 p-0">
                Terms of Service
              </Button>
              {" & "}
              <Button variant="link" className="text-[#36F9F6] hover:text-[#36F9F6]/80 p-0">
                Privacy Policy
              </Button>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
