"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

type SearchAreaProps = {
  onSearch: (searchValue: string) => void;
};

const SearchArea: React.FC<SearchAreaProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className="h-[25vh] w-full bg-[#05152e] flex flex-col items-left justify-center relative">
      <Image
        src="/line_waves.png"
        width={1000}
        height={1000}
        alt="line_waves"
        className="w-full h-full absolute object-fit opacity-50"
      />
      <div className="z-50 w-2/3 mx-auto space-y-2">
        <h1 className="font-bold text-xl text-white">
          The Ethereum Blockchain Explorer
        </h1>
        <div className="p-2 bg-white dark:bg-black rounded-lg lg:w-1/2 flex justify-between gap-2">
          <Input
            placeholder="Search by Address"
            className="w-full dark:bg-black"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button className="bg-blue-500 p-2" onClick={handleSearch}>
            <Search />
          </Button>
        </div>
        <p className="font-bold text-sm text-white opacity-70">
          Sponsored:{" "}
          <span className="text-sm font-normal text-white opacity-70">
            Less than 14 days to go! WIn $1 Million USDC -{" "}
          </span>
          <span className="text-blue-500">
            Click Here & Claim Your Free Entry Today!
          </span>
        </p>
      </div>
    </div>
  );
};

export default SearchArea;
