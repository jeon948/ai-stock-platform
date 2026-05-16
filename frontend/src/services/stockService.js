import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * 📊 Fetch historical stock data from BACKEND
 */
export const getHistoricalData = async (symbol) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/stocks/${symbol}`
    );

    if (!res.data || !Array.isArray(res.data)) {
      return [];
    }

    return res.data;
  } catch (error) {
    console.error("Stock API error:", error);
    return [];
  }
};

/**
 * 📰 Fetch stock news from BACKEND
 */
export const getStockNews = async (symbol) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/news/${symbol}`
    );

    return res.data?.articles || [];
  } catch (error) {
    console.error("News API error:", error);
    return [];
  }
};