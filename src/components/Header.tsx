"use client";
import React from "react";
import { PiGasCan, } from "react-icons/pi";
import { ModeToggle } from "./themeToggle/ModeToggle";
import WalletConnectButton from "./WalletConnectButton";
import { useEthContext } from "@/context/eathContext";

const Header: React.FC = () => {
  const { ethPrice, gasPrice } = useEthContext();

  const formatEthPrice = (price: string) => {
    return parseFloat(price || "0").toFixed(2);
  };

  const isValidData = (data: any) => {
    return typeof data === "string" || typeof data === "number";
  };

  return (
    <div className="w-11/12 lg:w-2/3 mx-auto flex justify-between items-center py-3 border-b text-sm text-opacity-60">
      <div className="flex items-center gap-8">
        {isValidData(ethPrice) && isValidData(gasPrice) ? (
          <>
            <h1>
              ETH Price:{" "}
              <span className="text-[#2e90cf]">
                ${formatEthPrice(ethPrice)}
              </span>
            </h1>
            <p className="flex items-center gap-1">
              <PiGasCan />
              Gas Price: <span className="text-[#2e90cf]">{gasPrice} Gwei</span>
            </p>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="flex items-center gap-6">
        <ModeToggle />
        <WalletConnectButton />
      </div>
    </div>
  );
};

export default Header;
