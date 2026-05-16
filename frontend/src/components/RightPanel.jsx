import { useEffect, useState } from "react";
import API from "../services/api";

const RightPanel = () => {
  const [gainer, setGainer] = useState(null);
  const [loser, setLoser] = useState(null);
  const [sentiment, setSentiment] = useState("Loading...");

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      // Example stocks
      const stocks = ["AAPL", "NVDA", "TSLA", "META", "MSFT"];

      let marketData = [];

      for (const symbol of stocks) {
        const res = await API.get(`/api/stocks/${symbol}`);

        const stock = res.data;

        // Alpha Vantage formatted candle array
        if (Array.isArray(stock) && stock.length > 1) {
          const latest = stock[0];
          const previous = stock[1];

          const percent =
            ((latest.close - previous.close) / previous.close) * 100;

          marketData.push({
            symbol,
            percent,
          });
        }
      }

      if (marketData.length > 0) {
        marketData.sort((a, b) => b.percent - a.percent);

        setGainer(marketData[0]);
        setLoser(marketData[marketData.length - 1]);

        // Simple sentiment logic
        const avg =
          marketData.reduce((sum, item) => sum + item.percent, 0) /
          marketData.length;

        if (avg > 1) {
          setSentiment("Bullish");
        } else if (avg < -1) {
          setSentiment("Bearish");
        } else {
          setSentiment("Neutral");
        }
      }
    } catch (error) {
      console.error("Market Overview Error:", error);
    }
  };

  return (
    <div className="w-72 bg-[#020617] border-l border-gray-800 p-4">
      <h2 className="text-lg font-semibold mb-6 text-gray-300">
        Market Overview
      </h2>

      {/* Top Gainer */}
      <div className="bg-gray-900 p-4 rounded-xl mb-4 border border-gray-800">
        <p className="text-xs text-gray-400">Top Gainer</p>

        <p className="text-green-400 text-lg font-bold">
          {gainer?.symbol || "Loading..."}
        </p>

        <p className="text-green-400 text-sm">
          {gainer ? `${gainer.percent.toFixed(2)}%` : ""}
        </p>
      </div>

      {/* Top Loser */}
      <div className="bg-gray-900 p-4 rounded-xl mb-4 border border-gray-800">
        <p className="text-xs text-gray-400">Top Loser</p>

        <p className="text-red-400 text-lg font-bold">
          {loser?.symbol || "Loading..."}
        </p>

        <p className="text-red-400 text-sm">
          {loser ? `${loser.percent.toFixed(2)}%` : ""}
        </p>
      </div>

      {/* Market Sentiment */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
        <p className="text-xs text-gray-400">Market Sentiment</p>

        <p
          className={`text-lg font-bold ${
            sentiment === "Bullish"
              ? "text-green-400"
              : sentiment === "Bearish"
              ? "text-red-400"
              : "text-yellow-400"
          }`}
        >
          {sentiment}
        </p>
      </div>
    </div>
  );
};

export default RightPanel;