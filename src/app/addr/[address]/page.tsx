"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";
import FeaturedSection from "@/components/FeaturedSection";
import SearchArea from "@/components/SearchArea";
import SearchResult from "@/components/SearchResult";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  hash: string;
  value: string;
  from: string;
  to: string;
  gas: string;
}

const Addr: React.FC = () => {
  const { address }: { address: string } = useParams();
  console.log(" Address", address)
  const [accountAddress, setAccountAddress] = useState("");
  const handleSearch = (value: string) => {
    setAccountAddress(value);
  };
  useEffect(() => {
    const fetchBalanceAndTransactions = async () => {
      try {
        if (address) {
          handleSearch(address)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBalanceAndTransactions();
  }, [address]);



  return (
    <main className="bg-slate-50 dark:bg-slate-950">
      <SearchArea onSearch={handleSearch} />
      <div className="w-11/12 lg:w-2/3 mx-auto space-y-8 -translate-y-6 z-50">
        <FeaturedSection />
        <SearchResult accountAddress={accountAddress} />
      </div>
    </main>);
};

export default Addr;
