"use client";

import type { NextPage } from "next";
import Swap from "~~/components/home/swap";
import { Tabs, TabsList, TabsTrigger } from "~~/components/ui/tabs";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/60 rounded-3xl border border-white/20 shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="swap" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/20 p-1 rounded-xl backdrop-blur-sm">
                <TabsTrigger
                  value="swap"
                  className="rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500/50 hover:to-purple-500/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Swap
                </TabsTrigger>
                <TabsTrigger
                  value="buy"
                  className="rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500/50 hover:to-purple-500/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                  disabled
                >
                  Buy
                </TabsTrigger>
                <TabsTrigger
                  value="sell"
                  className="rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500/50 hover:to-purple-500/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                  disabled
                >
                  Sell
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Swap />
        </div>
      </div>
    </div>
  );
};

export default Home;
