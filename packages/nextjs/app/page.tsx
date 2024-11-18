"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { NextPage } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~~/components/ui/accordion";
import { Button } from "~~/components/ui/button";

const Home: NextPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-teal-800 overflow-hidden relative flex flex-col [font-family:'Georgia',serif]">
      <div className="absolute inset-0 z-0 opacity-50">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0.2" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)">
            <animate attributeName="x" from="0" to="100%" dur="10s" repeatCount="1" />
          </rect>
        </svg>
      </div>
      <main className="flex-grow relative z-30">
        {/* Hero Section */}
        <section className="container px-4 py-24 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white [font-family:'Imperial',Georgia,serif] leading-tight">
              Use{" "}
              <motion.span
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                animate={{
                  color: isHovered ? "#3268FF" : "#FFFFFF",
                }}
                className="relative inline-block"
              >
                smart swaps
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 -z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-full h-full bg-[#326891]/10 rounded-lg" />
                  </motion.div>
                )}
              </motion.span>{" "}
              natively on <span className="italic">base</span>
            </h1>
            <p className="mt-6 text-xl text-teal-100 [font-family:'Cheltenham',Georgia,serif] leading-relaxed">
              DEX aggregators are reshaping DeFi by optimizing liquidity and trade efficiency across Solana, Ethereum Layer 2s, and emerging blockchains like SUI and Aptos, driving a seamless and innovative trading experience.
            </p>
            <div className="flex items-center justify-center gap-4 mt-10">
              <Button size="lg" className="bg-black hover:bg-[#333] text-white font-sans">
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-blue-500/20 transition-colors text-white border-transparent hover:bg-blue-500/40 duration-300"
              >
                View Documentation
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Disclaimer */}
        <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 mx-auto max-w-4xl mb-12">
          <p className="text-yellow-200 text-sm text-center">
            <strong>Disclaimer:</strong> This project is intended solely for educational purposes and as a demonstration
            of skills. It is not a real product or service offering. Any resemblance to actual products, services, or
            companies is purely coincidental. The information provided herein should not be considered as professional
            or legal advice.
          </p>
        </div>

        {/* Features Section */}
        <section className="container px-4 py-24 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white [font-family:'Imperial',Georgia,serif]">
              Everything you need to understand DEX Aggregators
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  title: "Understanding DEX Aggregators",
                  content:
                    "DEX aggregators simplify DeFi by unifying liquidity and trade routes across decentralized exchanges, ensuring users access optimal prices with reduced slippage and enhanced efficiency.",
                  link: "/blog/understanding-dex-aggregators",
                  linkText: "Read More",
                },
                {
                  title: "DEX Aggregators on Ethereum Layer 2s",
                  content:
                    "Ethereum Layer 2s like Optimism and zkSync, integrated with DEX aggregators, are redefining DeFi by offering faster, cheaper, and more efficient trading solutions while unlocking new possibilities for scalability and user experience.",
                  link: "/blog/dex-aggregators-l2",
                  linkText: "Read More",
                },
                {
                  title: "DEX Aggregators on Solana, SUI, Aptos, and SEI",
                  content:
                    "On Solana, SUI, Aptos, and SEI, DEX aggregators like Jupiter and Umi.ag are building efficient, interconnected networks to simplify trading and enhance liquidity access across emerging blockchain ecosystems.",
                  link: "/blog/dex-aggregators-solana-move",
                  linkText: "Read More",
                },
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`} className="border-b border-white/20">
                  <AccordionTrigger className="text-white group">
                    <div className="flex items-center gap-4 w-full p-2 rounded-lg transition-all duration-300 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-pink-500/20 group-hover:via-purple-500/20 group-hover:to-teal-500/20">
                      <div className="p-2 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/40 transition-colors duration-300">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                      {item.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-teal-100">
                    <p className="mb-4">{item.content}</p>
                    <Link
                      href={item.link}
                      target="_blank"
                      className="text-pink-300 hover:text-pink-400 inline-flex items-center"
                    >
                      {item.linkText}
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
