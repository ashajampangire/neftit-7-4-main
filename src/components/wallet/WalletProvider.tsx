import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";

type WalletType = "evm" | "solana" | "aptos" | "sui";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connect: (type?: WalletType) => Promise<void>;
  disconnect: () => void;
  isAuthenticated: boolean;
  walletType: WalletType | null;
  balance: number;
  stakedAmount: number;
  updateBalance: (newBalance: number) => void;
  updateStakedAmount: (newStakedAmount: number) => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
  isAuthenticated: false,
  walletType: null,
  balance: 0,
  stakedAmount: 0,
  updateBalance: () => {},
  updateStakedAmount: () => {},
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [walletType, setWalletType] = useState<WalletType | null>(null);
  const [balance, setBalance] = useState<number>(1000); // Mock initial balance
  const [stakedAmount, setStakedAmount] = useState<number>(0);

  useEffect(() => {
    // Check if user is already connected
    const savedAddress = localStorage.getItem("walletAddress");
    const savedAuthStatus = localStorage.getItem("isAuthenticated");
    const savedWalletType = localStorage.getItem("walletType") as WalletType;
    const savedBalance = localStorage.getItem("walletBalance");
    const savedStakedAmount = localStorage.getItem("stakedAmount");

    if (savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
      setWalletType(savedWalletType);
    }

    if (savedAuthStatus === "true") {
      setIsAuthenticated(true);
    }

    if (savedBalance) {
      setBalance(Number(savedBalance));
    }

    if (savedStakedAmount) {
      setStakedAmount(Number(savedStakedAmount));
    }
  }, []);

  const connect = async (type: WalletType = "evm"): Promise<void> => {
    try {
      const mockAddress = "0x" + Math.random().toString(16).substring(2, 42);

      setAddress(mockAddress);
      setIsConnected(true);
      setIsAuthenticated(true);
      setWalletType(type);
      setBalance(1000); // Mock initial balance
      setStakedAmount(0);

      // Save to localStorage
      localStorage.setItem("walletAddress", mockAddress);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("walletType", type);
      localStorage.setItem("walletBalance", "1000");
      localStorage.setItem("stakedAmount", "0");

      toast.success("Wallet connected successfully!");
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setAddress(null);
      setIsConnected(false);
      setIsAuthenticated(false);
      setWalletType(null);
      setBalance(0);
      setStakedAmount(0);

      // Clear from localStorage
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("walletType");
      localStorage.removeItem("walletBalance");
      localStorage.removeItem("stakedAmount");

      toast.error("Failed to connect wallet");
      return Promise.reject(error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setIsAuthenticated(false);
    setWalletType(null);
    setBalance(0);
    setStakedAmount(0);

    // Clear from localStorage
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("walletType");
    localStorage.removeItem("walletBalance");
    localStorage.removeItem("stakedAmount");

    toast.success("Wallet disconnected");
  };

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
    localStorage.setItem("walletBalance", newBalance.toString());
  };

  const updateStakedAmount = (newStakedAmount: number) => {
    setStakedAmount(newStakedAmount);
    localStorage.setItem("stakedAmount", newStakedAmount.toString());
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        connect,
        disconnect,
        isAuthenticated,
        walletType,
        balance,
        stakedAmount,
        updateBalance,
        updateStakedAmount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
