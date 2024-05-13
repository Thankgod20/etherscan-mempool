"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useEthContext } from "@/context/eathContext";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Grid } from "react-loader-spinner";

type SearchResultProps = {
  accountAddress: string;
};

const SearchResult: React.FC<SearchResultProps> = ({ accountAddress }) => {
  const { ethPrice } = useEthContext();
  const [balanceInEth, setBalanceInEth] = useState<string>("");
  const [ethUSD, setethUSD] = useState<string>("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchAccountData = async () => {
      setLoading(true);
      try {
        const balanceResponse = await fetch(
          `https://api.etherscan.io/api?module=account&action=balance&address=${accountAddress}&apikey=11T9KQ5CKNTIJP92D7BIUJNNSS6WS9C823`
        );
        if (balanceResponse.ok) {
          const balanceData = await balanceResponse.json();
          const balanceInEth = parseFloat(balanceData.result) / 1e18;
          const ethUDST = balanceInEth * parseFloat(ethPrice)
          const ethVa = (ethUDST).toFixed(5)
          console.log("===><><>", isNaN(Number(ethVa)) ? "0.00" : ethVa, ethPrice)
          setethUSD(isNaN(Number(ethVa)) ? "0" : ethVa)
          setBalanceInEth(balanceInEth.toFixed(5));
        }
        const transactionsResponse = await fetch(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${accountAddress}&apikey=11T9KQ5CKNTIJP92D7BIUJNNSS6WS9C823`
        );
        if (transactionsResponse.ok) {
          const transactionsData = await transactionsResponse.json();
          setTransactions(transactionsData.result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accountAddress) {
      fetchAccountData();
    }
  }, [accountAddress, ethPrice]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 8;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const formatEthPrice = (price: string) => {
    return parseFloat(price || "0").toFixed(2);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toISOString();
  };

  const displayedPages = 10;
  const maxDisplayedPages = Math.min(displayedPages, totalPages);
  const startPage =
    totalPages > maxDisplayedPages
      ? Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2))
      : 1;

  return (
    <>
      {accountAddress ? (
        <div className="space-y-8">
          <h2 className="py-6 border-b">
            <span className="font-light text-lg">Address{"  "}</span>
            <span className="text-blue-500">{accountAddress}</span>
          </h2>
          <Card className="border">
            <CardHeader className="text-lg font-semibold">Overview</CardHeader>
            <CardContent className="flex flex-col gap-6 text-sm">
              <p className="flex flex-col gap-1 uppercase">
                <span className="opacity-70">ETH balance</span>
                <span>{balanceInEth} ETH</span>
              </p>
              <p className="flex flex-col gap-1 uppercase">
                <span className="opacity-70">ETH Value</span>
                <span>$ {formatEthPrice(ethUSD)}</span>
              </p>
            </CardContent>
          </Card>
          <h3 className="px-4 py-2 bg-blue-500 text-white w-max rounded-lg">
            Transactions
          </h3>
          <Table className="border">
            <TableCaption>List of all the transactions</TableCaption>
            <TableHeader className="text-sm">
              <TableRow>
                <TableHead>Transaction Hash</TableHead>
                <TableHead>Block</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <div className="flex items-center justify-center py-8 w-full">
                  <Grid
                    height="80"
                    width="80"
                    color="#4F6CFF"
                    ariaLabel="grid-loading"
                    radius="12.5"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : (
                currentTransactions.map((transaction: any) => (
                  <TableRow key={transaction.hash}>
                    <TooltipProvider>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>
                            {transaction.hash
                              ? <Link style={{ color: "blue" }} href={"/trnx/" + transaction.hash}>{transaction.hash.substring(0, 16) + "..."}</Link>
                              : "Loading..."}
                          </TooltipTrigger>
                          <TooltipContent><Link href={"/trnx/" + transaction.hash}>{transaction.hash}</Link></TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{transaction.blockNumber}</TableCell>
                      <TableCell>{formatDate(transaction.timeStamp)}</TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>
                            {transaction.from
                              ? `${transaction.from.substring(0, 16)}...`
                              : "Loading..."}
                          </TooltipTrigger>
                          <TooltipContent>{transaction.from}</TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>
                            {transaction.to
                              ? `${transaction.to.substring(0, 16)}...`
                              : "Loading..."}
                          </TooltipTrigger>
                          <TooltipContent>{transaction.to}</TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{transaction.value}</TableCell>
                    </TooltipProvider>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {transactions.length > transactionsPerPage && (
            <div className="flex justify-center space-x-2 overflow-auto">
              {currentPage > 1 && (
                <Button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
              )}
              {Array.from(
                { length: maxDisplayedPages },
                (_, i) => startPage + i
              ).map((page) => (
                <Button
                  key={page}
                  onClick={() => paginate(page)}
                  className={
                    currentPage === page
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }
                >
                  {page}
                </Button>
              ))}
              <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchResult;
