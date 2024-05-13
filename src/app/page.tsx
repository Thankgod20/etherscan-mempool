"use client";
import FeaturedSection from "@/components/FeaturedSection";
import SearchArea from "@/components/SearchArea";
import SearchResult from "@/components/SearchResult";
import { useState } from "react";

const Home: React.FC = () => {
  const [accountAddress, setAccountAddress] = useState("");

  const handleSearch = (value: string) => {
    setAccountAddress(value);
  };

  return (
    <main className="bg-slate-50 dark:bg-slate-950">
      <SearchArea onSearch={handleSearch} />
      <div className="w-11/12 lg:w-2/3 mx-auto space-y-8 -translate-y-6 z-50">
        <FeaturedSection />
        <SearchResult accountAddress={accountAddress} />
      </div>
    </main>
  );
};

export default Home;
