import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useWallet } from "./WalletProvider";

interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletConnectionModal: React.FC<WalletConnectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { connect } = useWallet();

  const handleConnectWallet = async (provider: string) => {
    try {
      await connect();
      onClose();
    } catch (error) {
      console.error(`Failed to connect with ${provider}:`, error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-black backdrop-blur-xl border border-gray-800 text-white">
        <div className="flex flex-col gap-6 py-6 px-4">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">
              <span className="text-purple-400">Welcome to </span>
              <span className="text-blue-400">NEFTIT</span>
            </h2>
            <p className="text-gray-400">
              Connect your wallet to enter the metaverse
            </p>
          </div>

          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              onClick={() => handleConnectWallet("MetaMask")}
              className="py-4 bg-black border border-gray-800 hover:bg-gray-900 flex justify-center items-center gap-3"
            >
              <MetaMaskIcon />
              <span>Continue with MetaMask</span>
            </Button>

            <Button
              onClick={() => handleConnectWallet("X")}
              className="py-4 bg-black border border-gray-800 hover:bg-gray-900 flex justify-center items-center gap-3"
            >
              <XIcon />
              <span>Continue with X</span>
            </Button>

            <Button
              onClick={() => handleConnectWallet("Discord")}
              className="py-4 bg-black border border-gray-800 hover:bg-gray-900 flex justify-center items-center gap-3"
            >
              <DiscordIcon />
              <span>Continue with Discord</span>
            </Button>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-800"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleConnectWallet("Google")}
                className="py-4 bg-black border border-gray-800 hover:bg-gray-900 flex justify-center items-center gap-2"
              >
                <GoogleIcon />
                <span>Google</span>
              </Button>

              <Button
                onClick={() => handleConnectWallet("Apple")}
                className="py-4 bg-black border border-gray-800 hover:bg-gray-900 flex justify-center items-center gap-2"
              >
                <AppleIcon />
                <span>Apple</span>
              </Button>
            </div>
          </motion.div>

          <div className="text-center text-gray-500 text-xs">
            By connecting, you agree to our
            <span className="text-cyan-400"> Terms of Service</span> &
            <span className="text-cyan-400"> Privacy Policy</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Provider Icons
const MetaMaskIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 8.5L21 3L13 8L11 3L9 8L1 3L0 8.5L2 14L0 19.5L4.5 21.5L9 15.5L15 15.5L19.5 21.5L24 19.5L22 14L24 8.5H22Z"
      fill="#E2761B"
      stroke="#E2761B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DiscordIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.5 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="#5865F2" />
    <path d="M15.5 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="#5865F2" />
    <path
      d="M19.27 6.18C17.86 5.51 16.34 5.03 14.76 4.78c-.11-.02-.21.04-.26.14-.7.13-.13.23-.19.34a15.22 15.22 0 0 0-4.6 0c-.06-.11-.12-.21-.19-.34a.276.276 0 0 0-.26-.14c-1.58.25-3.1.73-4.51 1.4-.07.03-.12.08-.15.14-2.1 3.23-2.76 6.53-2.56 9.94.01.07.05.14.11.19 1.54 1.18 3.25 2.14 5.06 2.84.11.04.24 0 .31-.1.43-.61.82-1.25 1.15-1.92.05-.11.02-.24-.08-.32-.56-.22-1.09-.48-1.59-.78-.13-.08-.14-.25-.03-.36.11-.09.21-.18.31-.28.05-.05.13-.06.2-.03 3.73 1.76 7.78 1.76 11.47 0 .07-.03.14-.02.2.03.1.09.2.18.31.28.11.11.1.29-.02.36-.5.3-1.03.57-1.59.78-.1.08-.12.21-.08.32.34.67.72 1.31 1.15 1.92.07.1.19.14.31.1 1.81-.7 3.52-1.66 5.06-2.84.06-.05.1-.11.11-.19.24-3.9-.58-7.16-2.56-9.94 0-.06-.06-.11-.13-.14z"
      fill="#5865F2"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.8055 8.0415H19V8H10V12H15.6515C14.827 14.3285 12.6115 16 10 16C6.6865 16 4 13.3135 4 10C4 6.6865 6.6865 4 10 4C11.5295 4 12.921 4.577 13.9805 5.5195L16.809 2.691C15.023 1.0265 12.634 0 10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 9.3295 19.931 8.675 19.8055 8.0415Z"
      fill="#FFC107"
    />
    <path
      d="M1.15295 5.3455L4.43845 7.755C5.32695 5.554 7.48045 4 9.99995 4C11.5294 4 12.921 4.577 13.9805 5.5195L16.809 2.691C15.023 1.0265 12.634 0 9.99995 0C6.15895 0 2.82795 2.1685 1.15295 5.3455Z"
      fill="#FF3D00"
    />
    <path
      d="M10 20C12.583 20 14.93 19.0115 16.7045 17.404L13.6095 14.785C12.5718 15.5742 11.3037 16.001 10 16C7.39903 16 5.19053 14.3415 4.35853 12.027L1.09753 14.5395C2.75253 17.778 6.11353 20 10 20Z"
      fill="#4CAF50"
    />
    <path
      d="M19.8055 8.0415H19V8H10V12H15.6515C15.2571 13.1082 14.5467 14.0766 13.608 14.7855L13.6095 14.785L16.7045 17.404C16.4855 17.6025 20 15 20 10C20 9.3295 19.931 8.675 19.8055 8.0415Z"
      fill="#1976D2"
    />
  </svg>
);

const AppleIcon = () => (
  <svg
    width="20"
    height="24"
    viewBox="0 0 20 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5349 0C14.6142 0 14.6935 0 14.7834 0C14.8414 0.481621 14.7834 0.963243 14.7255 1.44486C14.5563 2.60894 14.0219 3.57313 13.2497 4.40001C12.5248 5.18509 11.6632 5.66671 10.6324 5.81944C10.5425 5.83022 10.4525 5.84099 10.3518 5.86255C10.2045 5.30248 10.2731 4.76396 10.4739 4.23622C10.8091 3.31843 11.3542 2.55491 12.0684 1.93244C12.7932 1.29919 13.6335 0.889089 14.5349 0Z"
      fill="white"
    />
    <path
      d="M19.8284 17.7073C19.762 18.0195 19.6966 18.3318 19.6115 18.644C19.2004 20.1543 18.4062 21.4478 17.2335 22.4873C16.1693 23.4191 14.9461 24 13.5536 24C13.4965 24 13.4288 23.9892 13.3713 23.9785C12.6894 23.9246 12.0684 23.6662 11.4795 23.3432C10.9346 23.0417 10.3785 22.8264 9.77851 22.8156C9.15917 22.8049 8.58436 23.0309 8.01883 23.3539C7.43474 23.6877 6.84136 23.9246 6.18941 23.9785C6.1319 23.9892 6.07439 24 6.01687 24C4.74626 23.9892 3.63371 23.4191 2.65991 22.5491C1.83766 21.8186 1.20903 20.9379 0.760461 19.9308C0.249863 18.7883 0 17.5919 0 16.3309C0 14.9592 0.282622 13.7198 0.878178 12.6696C1.34603 11.825 1.99798 11.1376 2.79947 10.6128C3.49305 10.1527 4.2853 9.90434 5.11683 9.9043C5.66422 9.9043 6.18941 10.0571 6.69002 10.1957C7.24671 10.3559 7.76261 10.5389 8.28779 10.5496C8.56057 10.5496 8.83335 10.5067 9.09685 10.4528C9.47895 10.3774 9.86106 10.2926 10.2539 10.3019C10.8912 10.3235 11.4909 10.4743 12.0683 10.6882C12.8018 10.9681 13.5057 11.0206 14.25 10.8389C14.9436 10.6775 15.5667 10.3451 16.1012 9.83671C17.0233 8.97823 17.6752 7.93881 18.0894 6.75316C18.2481 6.26077 18.387 5.76838 18.4875 5.26522C18.5136 5.12325 18.5241 4.98129 18.5453 4.83933C18.5665 4.60825 18.5136 4.39871 18.3658 4.22443C18.0682 3.86376 17.7392 3.53541 17.4208 3.19629C16.7693 2.50105 16.2262 1.71598 15.9232 0.792788C15.9126 0.760999 15.9021 0.72921 15.9021 0.69742C19.1348 3.91061 20.0358 8.39662 19.8284 17.7073Z"
      fill="white"
    />
  </svg>
);

export default WalletConnectionModal;
