"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { FaRegCopy, FaEthereum } from "react-icons/fa";


const ImageHeader: React.FC = () => {


  return (
    <div className="h-[25vh] w-full bg-[#05152e] flex flex-col items-left justify-center relative">
      <Image
        src="/line_waves.png"
        width={1000}
        height={1000}
        alt="line_waves"
        className="w-full h-full absolute object-fit opacity-50"
      />
      <p className="flex items-center gap-2 text-lg" style={{ color: "white", fontWeight: "bolder", paddingLeft: "10%" }}>
        <FaEthereum /><span>Ethereum Explorer and MemPool</span>
      </p>
    </div>
  );
};

export default ImageHeader;
