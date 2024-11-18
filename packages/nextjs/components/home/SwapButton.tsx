import { useCallback } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WrongNetworkDropdown } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton/WrongNetworkDropdown";
import { Button } from "~~/components/ui/button";
import { useScaffoldWriteContract, useTargetNetwork } from "~~/hooks/scaffold-eth";

export default function SwapButton() {
  const amountIn = "1000000000000000000"; // 1 token (assuming 18 decimals)
  const amountOutMin = "900000000000000000"; // Min 0.9 tokens out
  const path = ["0xTokenAAddress", "0xTokenBAddress"];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const to = "";

  const { writeContractAsync: swapTokensAsync } = useScaffoldWriteContract("ClamAggregator");
  const { data: swapTokensData, isMining: swapTokensLoading } = useScaffoldWriteContract("ClamAggregator", {
    functionName: "swapTokens",
    args: [amountIn, amountOutMin, path, to, deadline],
  });
  const { targetNetwork } = useTargetNetwork();

  const handleSwap = useCallback(() => {
    if (!swapTokensLoading) {
      console.log({ swapTokensData });
    }
  }, [swapTokensData, swapTokensLoading]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02]"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported || chain.id !== targetNetwork.id) {
                return <WrongNetworkDropdown />;
              }

              return (
                <>
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02]"
                    onClick={handleSwap}
                    type="button"
                  >
                    Swap Tokens
                  </Button>
                </>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
