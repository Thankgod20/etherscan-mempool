"use client";
import React from "react";
import { useEthContext } from "@/context/eathContext";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Globe, Server } from "lucide-react";

const FeaturedSection = () => {
  const { ethPrice, marketCap } = useEthContext();
  const ethToBtcConversionRate = 0.00001;

  const formatEthPrice = (price: string) => {
    return parseFloat(price || "0").toFixed(2);
  };

  const convertEthToBtc = (ethPrice: string) => {
    const ethValue = parseFloat(ethPrice || "0");
    const btcValue = ethValue * ethToBtcConversionRate;
    return btcValue.toFixed(4);
  };

  return (
    <div className="border bg-white dark:bg-black rounded-lg p-5 flex">
      <div className="flex items-center justify-between w-full">
        <div className="flex justify-between gap-5 w-full">
          <div className="flex items-center gap-3">
            <Image
              src="/ethereum_icon.png"
              alt="ethereum_icon"
              width={100}
              height={100}
              className="w-10 h-10"
            />
            <div className="flex flex-col gap-1 items-start text-opacity-70">
              <p className=" font-light uppercase text-sm">Ether Price</p>
              <p>
                <span className="text-opacity-100">
                  ${formatEthPrice(ethPrice)}
                </span>{" "}
                <span className="opacity-70 text-sm">
                  @ {convertEthToBtc(ethPrice)} BTC
                </span>
              </p>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8" />
            <div className="flex flex-col gap-1 items-start text-opacity-70">
              <p className=" font-light uppercase text-sm">Market Cap</p>
              <span className="text-opacity-100">
                ${marketCap.substring(0, 13)}.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
