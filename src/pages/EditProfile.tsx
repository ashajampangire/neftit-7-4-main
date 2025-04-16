import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Edit2,
  Check,
  Wallet,
  ChevronRight,
  Save,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";
import StarryBackground from "@/components/layout/StarryBackground";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from "@/components/wallet/WalletProvider";
import WalletConnectionsSection from "@/components/profile/WalletConnectionsSection";

type WalletType = "evm" | "solana" | "aptos" | "sui";

interface ConnectedWallet {
  address: string;
  type: WalletType;
  chainId?: string;
  name: string;
  icon: string;
  isConnected: boolean;
}

interface SocialAccount {
  platform: "discord" | "x" | "google" | "telegram";
  username: string;
  isConnected: boolean;
  icon: string;
}

interface SocialConnection {
  platform: string;
  icon: string;
  connected: boolean;
  username: string;
}

export default function EditProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { connect, disconnect } = useWallet();

  // Initialize state from localStorage/sessionStorage
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") ||
      localStorage.getItem("username") ||
      "neftit ranger"
  );
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    sessionStorage.getItem("avatar") ||
      localStorage.getItem("avatar") ||
      "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?fit=max&w=350"
  );

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [walletConnections, setWalletConnections] = useState([
    { name: "Metamask", icon: "https://cdn.iconscout.com/icon/free/png-256/free-metamask-2728406-2261817.png", connected: false },
    { name: "WalletConnect", icon: "/walletconnect.svg", connected: false },
    { name: "Phantom", icon: "https://i.imgur.com/IFgaR1p.png", connected: false },
  ]);

  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>([
    { platform: "Twitter", icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png", connected: false, username: "" },
    { platform: "Telegram", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111646.png", connected: false, username: "" },
    { platform: "Discord", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111370.png", connected: false, username: "" },
    { platform: "Google", icon: "https://cdn-icons-png.flaticon.com/512/300/300221.png", connected: false, username: "" },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        setHasUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    setHasUnsavedChanges(true);
  };

  const handleWalletConnect = (walletName: string) => {
    setWalletConnections(prev => prev.map(w => w.name === walletName ? { ...w, connected: true } : w));
  };
  const handleWalletDisconnect = (walletName: string) => {
    setWalletConnections(prev => prev.map(w => w.name === walletName ? { ...w, connected: false } : w));
  };

  const handleSocialConnect = (platform: string) => {
    setSocialConnections(prev => prev.map(s => s.platform === platform ? { ...s, connected: true } : s));
  };
  const handleSocialDisconnect = (platform: string) => {
    setSocialConnections(prev => prev.map(s => s.platform === platform ? { ...s, connected: false } : s));
  };

  const handleSaveChanges = () => {
    try {
      // Save to both localStorage and sessionStorage for persistence
      localStorage.setItem("username", username);
      sessionStorage.setItem("username", username);

      localStorage.setItem("avatar", avatarUrl);
      sessionStorage.setItem("avatar", avatarUrl);

      // Make sure authentication state is preserved
      if (!localStorage.getItem("isAuthenticated")) {
        localStorage.setItem("isAuthenticated", "true");
      }

      // Create and dispatch a custom event for real-time updates
      const profileUpdateEvent = new CustomEvent("profileUpdate", {
        detail: {
          username,
          avatar: avatarUrl,
        },
      });

      console.log("Dispatching profile update event with data:", {
        username,
        avatar: avatarUrl,
      });

      window.dispatchEvent(profileUpdateEvent);
      setHasUnsavedChanges(false);

      toast({
        title: "Changes saved successfully",
        description: "Your profile has been updated",
      });

      // Use a short delay then navigate
      setTimeout(() => {
        // Use the navigate function directly
        navigate("/profile");
      }, 300);
    } catch (error) {
      console.error("Error saving profile changes:", error);
      toast({
        title: "Error saving changes",
        description: "There was a problem updating your profile",
        variant: "destructive",
      });
    }
  };

  const handleGoBack = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (confirmLeave) {
        navigate("/profile");
      }
    } else {
      navigate("/profile");
    }
  };

  return (
    <Layout className="bg-background">
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>

      <div className="relative z-10">
        <div className="container max-w-4xl mx-auto pt-0 mt-0 px-4">
          <div className="flex items-center justify-between mb-8 sticky top-[72px] z-10 py-4 -mx-4 px-4 backdrop-blur-sm transition-all duration-200">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleGoBack}
                className="rounded-full text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Edit Profile
              </h1>
            </div>
            <Button
              onClick={handleSaveChanges}
              disabled={!hasUnsavedChanges}
              className={cn(
                "px-6 gap-2",
                hasUnsavedChanges
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  : "opacity-50 cursor-not-allowed"
              )}
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>

          <div className="grid gap-6">
            {/* Profile Section */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-all duration-500" />
                  <div className="relative">
                    <Avatar className="h-32 w-32 ring-4 ring-black">
                      <AvatarImage
                        src={avatarUrl}
                        alt="Profile"
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl">
                        {username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer rounded-full">
                      <Edit2 className="h-8 w-8 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex-grow space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2 block">
                      Username
                    </label>
                    {isEditingUsername ? (
                      <div className="flex items-center gap-2 max-w-md">
                        <Input
                          value={username}
                          onChange={(e) => handleUsernameChange(e.target.value)}
                          className="bg-white/5 border-white/10 text-white text-lg"
                          placeholder="Enter username"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setIsEditingUsername(false)}
                          className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                        >
                          <Check className="h-5 w-5" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-medium text-white">
                          {username}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setIsEditingUsername(true)}
                          className="text-white/60 hover:text-white hover:bg-white/5"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet Connections Section */}
            <div className="mt-8">
              <WalletConnectionsSection
                wallets={walletConnections}
                onConnect={handleWalletConnect}
                onDisconnect={handleWalletDisconnect}
              />
            </div>

            {/* Social Connections Section */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mt-8">
              <h2 className="text-xl font-semibold text-white mb-6">
                Social Connections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {socialConnections.map((social) => (
                  <div
                    key={social.platform}
                    className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 backdrop-blur-sm group hover:from-white/10 transition-all duration-300 ${social.connected ? "ring-1 ring-green-600" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={social.icon} alt={social.platform} className="h-6 w-6" />
                      <div>
                        <div className="text-sm font-medium text-white">{social.platform}</div>
                        {social.connected && <div className="text-xs text-green-400 font-semibold">Connected</div>}
                      </div>
                    </div>
                    {social.connected ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/60 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => handleSocialDisconnect(social.platform)}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 text-white hover:bg-white/10"
                        onClick={() => handleSocialConnect(social.platform)}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
