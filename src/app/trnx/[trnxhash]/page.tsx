"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";
import { Web3 } from 'web3';
import styles from './styles.module.css';
import { CiCircleQuestion, } from "react-icons/ci";
import { FaRegCopy, FaEthereum } from "react-icons/fa";
import { IoCheckmarkCircleSharp, } from "react-icons/io5";
import SearchArea from "@/components/SearchArea";
import ImageHeader from "@/components/ImageHeader";
import Link from "next/link";
import { useEthContext } from "@/context/eathContext";
import mempoolData from "./memepool.json"
import Marquee from "react-fast-marquee"
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
interface MeMPool {
  transactionhash: string;
  status: string;
  block: string;
  from: string;
  to: string;
  value: string;
  tranFee: string;
  gas: string;
}
const Trnx: React.FC = () => {
  const { ethPrice } = useEthContext();
  const { trnxhash }: { trnxhash: string } = useParams();
  const [mempool, setMempool] = useState<MeMPool[]>([]);

  const [transHash, setTransHash] = useState<string | null>(null);
  const [block, setBlock] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [gasPrice, setGasPrice] = useState<string | null>(null);
  const [gas, setGas] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null | undefined>(null);
  const [value, setValue] = useState<string | null>(null);
  const [ethUSD, setethUSD] = useState<string>("");

  const endpoint = 'https://mainnet.infura.io/v3/56bb53b84c2e439fa277c9e6522044fe';
  const web3 = new Web3(endpoint);

  const [accountAddress, setAccountAddress] = useState("");
  const handleSearch = (value: string) => {
    setAccountAddress(value);
  };
  useEffect(() => {

    const fetchBalanceAndTransactions = async () => {

      try {
        const response = await fetch('https://stonkbullz.com/mempool.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("DATA", data.mempool)
        setMempool(data.mempool)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBalanceAndTransactions();
  }, []);
  useEffect(() => {
    const updateBalance = async () => {
      const foundTransaction = mempool.find(
        (transaction) => transaction.transactionhash === trnxhash
      );
      console.log("STAT_!", foundTransaction)
      if (foundTransaction) {
        console.log("Mempool", foundTransaction)
        setTransHash(trnxhash)
        setBlock(Number(foundTransaction.block))
        setStatus(foundTransaction.status)
        setGasPrice(weiToEther(foundTransaction.tranFee))
        setGas(weiToGwei(foundTransaction.gas))
        setFrom(foundTransaction.from)
        setTo(foundTransaction.to)
        setValue(weiToEther(foundTransaction.value))
        const ethUDST = Number(weiToEther(foundTransaction.value)) * parseFloat(ethPrice)
        const ethVa = (ethUDST).toFixed(2)
        //console.log("===><><>", isNaN(Number(ethVa)) ? "0.00" : ethVa, ethPrice)
        setethUSD(isNaN(Number(ethVa)) ? "0" : ethVa)
      } else if (trnxhash) {
        console.log("Stat 2")
        const transaction = await web3.eth.getTransaction(trnxhash);
        setTransHash(trnxhash)
        setBlock(Number(transaction.blockNumber))
        setStatus("successful")
        setGasPrice(weiToEther(transaction.gasPrice))
        setGas(weiToGwei(transaction.gas))
        setFrom(transaction.from)
        setTo(transaction.to)
        setValue(weiToEther(transaction.value))
        const ethUDST = Number(weiToEther(transaction.value)) * parseFloat(ethPrice)
        const ethVa = (ethUDST).toFixed(2)
        //console.log("===><><>", isNaN(Number(ethVa)) ? "0.00" : ethVa, ethPrice)
        setethUSD(isNaN(Number(ethVa)) ? "0" : ethVa)
        console.log(transaction)
      }
    };
    updateBalance()
  }, [mempool, trnxhash, ethPrice]);


  const weiToEther = (valueInWei: string): string => {
    return (Number(valueInWei) / 1e18).toFixed(5);
  };

  const weiToGwei = (valueInWei: string): string => {
    return (Number(valueInWei) / 1e9).toFixed(6);
  };

  return (
    <div>
      <ImageHeader />
      <div className="mt-12 relative min-h-[70vh] w-11/12 lg:w-2/3 mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-left">{status == "pending" ? "MeMPool Transaction Details" : "Transaction Details"}</h1>
        <Card className="space-y-8">
          <hr></hr>
          <button className={styles.button}>Overview</button>
          <Card className={styles.transxBox}>
            <p>
              <Marquee style={{ color: "red", fontSize: "10px" }} direction="right">{status == "pending" ? "Low Priority Transaction Please Boost GasFee" : ""}</Marquee>
              <span ></span>
            </p>
            <p>
              <p className="flex items-center gap-1"><CiCircleQuestion /><span className="text-md font-semibold">Transaction Hash: {"  "}</span>
              </p>
              <p style={{ marginTop: "10px" }} className="flex items-center gap-1 "><span className="text-md" style={{}}>{transHash}</span><FaRegCopy className="text-[#9d9d9d]" /></p>
            </p>
            <p style={{ marginTop: "20px" }}>
              <p className="flex items-center gap-1"><CiCircleQuestion /><span className="text-md font-semibold">Status: {"  "}</span><span style={{ marginLeft: "10px", borderWidth: "1px", borderColor: status == "pending" ? "red" : "green", borderRadius: "5px", padding: "2px", backgroundColor: status == "pending" ? "#e9d2db" : "#e2eee2", fontSize: "10px", color: status == "pending" ? "red" : "green" }} className="flex items-center gap-1"><IoCheckmarkCircleSharp style={{ color: status == "pending" ? "red" : "green" }} /> {status}</span>
              </p>

            </p>
            <p style={{ marginTop: "20px" }}>
              <p className="flex items-center gap-1">
                <CiCircleQuestion /><span className="text-md font-semibold">Block: {"  "}</span>
              </p>
              <p style={{ marginTop: "10px" }} >
                <span style={{ borderRadius: "5px", padding: "2px", color: "#2e90cf" }} className="flex items-center gap-1"><IoCheckmarkCircleSharp style={{ color: "green" }} /> {block}</span>

              </p>

            </p>
            <hr />
            <p style={{ marginTop: "20px" }}>
              <p className="flex items-center gap-1">
                <CiCircleQuestion /><span className="text-md font-semibold">From: {"  "}</span>
              </p>
              <p style={{ marginTop: "10px" }} >
                <span style={{ borderRadius: "5px", padding: "2px", color: "#2e90cf" }} className="flex items-center gap-1"><Link href={"/addr/" + from}> {from}</Link> <FaRegCopy className="text-[#9d9d9d]" /></span>

              </p>

            </p>
            <p style={{ marginTop: "20px" }}>
              <p className="flex items-center gap-1">
                <CiCircleQuestion /><span className="text-md font-semibold">Interacted With (To): {"  "}</span>
              </p>
              <p style={{ marginTop: "10px" }} >
                <span style={{ borderRadius: "5px", padding: "2px", color: "#2e90cf" }} className="flex items-center gap-1"><Link href={"/addr/" + to}> {to} </Link><FaRegCopy className="text-[#9d9d9d]" /></span>

              </p>

            </p>
            <hr />
            <p style={{ marginTop: "20px" }}>
              <p className="flex items-center gap-1">
                <CiCircleQuestion /><span className="text-md font-semibold">Value: {"  "}</span>
              </p>
              <p style={{ marginTop: "10px", alignItems: "center" }} className="flex item-center gap-4">
                <span style={{ borderRadius: "5px", padding: "2px", }} className="flex items-center gap-1"><FaEthereum className="text-[#8d9d9d]" /> {value} ETH</span><span style={{ backgroundColor: "#d0d0d3", fontSize: "10px", borderRadius: "10px", padding: "2px" }}>${ethUSD}</span>
              </p>

            </p>
            <p style={{ marginTop: "20px" }}>
              <p className="flex items-center gap-1">
                <CiCircleQuestion /><span className="text-md font-semibold">Transaction Fee: {"  "}</span>
              </p>
              <p style={{ marginTop: "10px" }} >
                <span style={{ borderRadius: "5px", padding: "2px", }} className="flex items-center gap-1"><FaEthereum className="text-[#8d9d9d]" /> {gasPrice} ETH </span>

              </p>

            </p>
            <p style={{ marginTop: "20px" }}>
              <p className="flex items-center gap-1">
                <CiCircleQuestion /><span className="text-md font-semibold">Gas Price: {"  "} </span>
              </p>
              <p style={{ marginTop: "10px" }} >
                <span style={{ borderRadius: "5px", padding: "2px", }} className="flex items-center gap-1">{gas} GWei</span>

              </p>

            </p>
          </Card>
          <hr />
          <Card className={styles.footerBox}>
            <p className="flex items-center gap-2 text-lg">
              <FaEthereum /><span> Powered by Ethereum</span>
            </p>
            <br />
            <p>
              <span className="text-sm">
                Etherscan is a Block Explorer and Analytics Platfrom for Ethereum, a decentralized smart contract platfom
              </span>
            </p>
          </Card>
          <br />
        </Card>
      </div>
    </div>
  );
};

export default Trnx;
