"use client";

import { useCallback, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { Button } from "~~/components/ui/button";
import { Input } from "~~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~~/components/ui/select";

const Swap = () => {
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const availableCurrencies = {
    cbeth: "cbETH",
    usdc: "USDC",
  };
  const [firstCurrencySwap, setFirstCurrencySwap] = useState(availableCurrencies.cbeth);
  const [secondCurrencySwap, setSecondCurrencySwap] = useState(availableCurrencies.usdc);

  const handleQuickSwitch = useCallback(() => {
    setFirstCurrencySwap(secondCurrencySwap);
    setSecondCurrencySwap(firstCurrencySwap);
  }, [firstCurrencySwap, secondCurrencySwap]);

  const handleFirstSwitch = useCallback(
    selectedValue => {
      setFirstCurrencySwap(availableCurrencies[selectedValue]);
      if (secondCurrencySwap === availableCurrencies[selectedValue]) {
        setSecondCurrencySwap(
          Object.values(availableCurrencies)
            .filter(i => i !== secondCurrencySwap)
            .pop(),
        );
      }
    },
    [firstCurrencySwap, secondCurrencySwap],
  );

  const handleSecondSwitch = useCallback(
    selectedValue => {
      setSecondCurrencySwap(availableCurrencies[selectedValue]);
      if (firstCurrencySwap === availableCurrencies[selectedValue]) {
        setFirstCurrencySwap(
          Object.values(availableCurrencies)
            .filter(i => i !== firstCurrencySwap)
            .pop(),
        );
      }
    },
    [firstCurrencySwap, secondCurrencySwap],
  );

  return (
    <div className="space-y-4">
      <div className="bg-white/50 rounded-2xl p-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">You pay</span>
            <span className="text-sm text-gray-600">Balance: 0 {firstCurrencySwap}</span>
          </div>
          <div className="flex items-center">
            <Input
              type="number"
              placeholder="0"
              value={amount1}
              onChange={e => setAmount1(e.target.value)}
              className="text-2xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0"
            />
            <Select onValueChange={handleFirstSwitch}>
              <SelectTrigger className="w-[120px] border-none bg-white/50">
                <SelectValue placeholder={firstCurrencySwap}>{firstCurrencySwap}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.keys(availableCurrencies).map(value => (
                  <SelectItem key={value} value={value}>
                    {availableCurrencies[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/50 hover:bg-white/70 transition-colors duration-300"
          onClick={handleQuickSwitch}
        >
          <ArrowDownUp className="h-6 w-6" />
        </Button>
      </div>

      <div className="bg-white/50 rounded-2xl p-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">You receive</span>
            <span className="text-sm text-gray-600">Balance: 0 {secondCurrencySwap}</span>
          </div>
          <div className="flex items-center">
            <Input
              type="number"
              placeholder="0"
              value={amount2}
              onChange={e => setAmount2(e.target.value)}
              className="text-2xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0"
            />
            <Select onValueChange={handleSecondSwitch}>
              <SelectTrigger className="w-[120px] border-none bg-white/50">
                <SelectValue placeholder={secondCurrencySwap}>{secondCurrencySwap}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.keys(availableCurrencies).map(value => (
                  <SelectItem key={value} value={value}>
                    {availableCurrencies[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02]">
        Connect Wallet
      </Button>
    </div>
  );
};

export default Swap;
