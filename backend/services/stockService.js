import axios from "axios";
import Stock from "../models/Stock.js";

const isCacheFresh = (cached) => {
  if (!cached?.updatedAt) return false;

  const sixHours = 6 * 60 * 60 * 1000;
  return Date.now() - new Date(cached.updatedAt).getTime() < sixHours;
};

const saveToCache = async (symbol, data) => {
  return await Stock.findOneAndUpdate(
    { symbol },
    { symbol, data },
    { upsert: true, returnDocument: "after" }
  );
};

const getAlphaData = async (symbol) => {
  try {
    console.log("📡 Trying Alpha Vantage...");

    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol,
        apikey: process.env.ALPHA_API_KEY,
      },
    });

    const raw = response.data["Time Series (Daily)"];

    if (!raw) {
      console.log("⚠️ Alpha failed or limit reached");
      return [];
    }

    return Object.keys(raw)
      .map((date) => ({
        time: date,
        open: Number(raw[date]["1. open"]),
        high: Number(raw[date]["2. high"]),
        low: Number(raw[date]["3. low"]),
        close: Number(raw[date]["4. close"]),
      }))
      .sort((a, b) => new Date(a.time) - new Date(b.time));
  } catch (error) {
    console.log("⚠️ Alpha error:", error.message);
    return [];
  }
};

const getYahooData = async (symbol) => {
  try {
    console.log("📡 Trying Yahoo Finance fallback...");

    const response = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
      {
        params: {
          range: "6mo",
          interval: "1d",
        },
      }
    );

    const result = response.data.chart.result?.[0];

    if (!result) {
      console.log("⚠️ Yahoo failed");
      return [];
    }

    const timestamps = result.timestamp;
    const quote = result.indicators.quote[0];

    const formatted = timestamps
      .map((time, index) => ({
        time: new Date(time * 1000).toISOString().split("T")[0],
        open: Number(quote.open[index]),
        high: Number(quote.high[index]),
        low: Number(quote.low[index]),
        close: Number(quote.close[index]),
      }))
      .filter(
        (item) =>
          item.time &&
          !Number.isNaN(item.open) &&
          !Number.isNaN(item.high) &&
          !Number.isNaN(item.low) &&
          !Number.isNaN(item.close)
      );

    return formatted;
  } catch (error) {
    console.log("⚠️ Yahoo error:", error.message);
    return [];
  }
};

export const getStockData = async (symbol) => {
  symbol = symbol.toUpperCase();

  try {
    const cached = await Stock.findOne({ symbol });

    if (cached && cached.data?.length > 0 && isCacheFresh(cached)) {
      console.log("⚡ Using fresh cached stock data");
      return cached.data;
    }

    let data = await getAlphaData(symbol);

    if (!data || data.length === 0) {
      data = await getYahooData(symbol);
    }

    if (data && data.length > 0) {
      const saved = await saveToCache(symbol, data);
      console.log("✅ Stock data saved:", saved._id);
      return data;
    }

    if (cached && cached.data?.length > 0) {
      console.log("⚡ Using old cached stock data");
      return cached.data;
    }

    console.log("❌ No stock data available");
    return [];
  } catch (error) {
    console.error("❌ Stock Service Error:", error.message);

    const cached = await Stock.findOne({ symbol });

    if (cached && cached.data?.length > 0) {
      return cached.data;
    }

    return [];
  }
};