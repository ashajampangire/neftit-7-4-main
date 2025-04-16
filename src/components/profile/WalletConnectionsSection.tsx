import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WalletStatus {
  name: string;
  icon: string;
  connected: boolean;
}

interface WalletConnectionsSectionProps {
  wallets: WalletStatus[];
  onConnect: (wallet: string) => void;
  onDisconnect: (wallet: string) => void;
}

export const WalletConnectionsSection: React.FC<WalletConnectionsSectionProps> = ({ wallets, onConnect, onDisconnect }) => {
  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white mb-6">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2M5 9h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" /></svg>
          Wallet Connections
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {wallets.map((wallet) => (
            <div
              key={wallet.name}
              className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 backdrop-blur-sm group hover:from-white/10 transition-all duration-300 ${wallet.connected ? "ring-1 ring-green-600" : ""}`}
            >
              <div className="flex items-center gap-3">
                <img src={wallet.icon} alt={wallet.name} className="h-6 w-6" />
                <div>
                  <div className="text-sm font-medium text-white">{wallet.name}</div>
                  {wallet.connected && <div className="text-xs text-green-400 font-semibold">Connected</div>}
                </div>
              </div>
              {wallet.connected ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-red-400 hover:bg-red-500/10"
                  onClick={() => onDisconnect(wallet.name)}
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 text-white hover:bg-white/10"
                  onClick={() => onConnect(wallet.name)}
                >
                  Connect
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnectionsSection;
