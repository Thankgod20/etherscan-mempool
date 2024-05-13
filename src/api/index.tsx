import axios from "axios";

const API_KEY = "11T9KQ5CKNTIJP92D7BIUJNNSS6WS9C823";
const API_BASE_URL = "https://api.etherscan.io/api";

export const fetchEthPrice = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        module: "stats",
        action: "ethprice",
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Ethereum price: ", error);
    return null;
  }
};

export const fetchGasPrice = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        module: "gastracker",
        action: "gasoracle",
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching gas price: ", error);
    return null;
  }
};

export const fetchMarketCap = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        module: "stats",
        action: "ethsupply",
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching market cap: ", error);
    return null;
  }
};
