import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import { getHistoricalData } from "../services/stockService";
import { getAIRecommendation } from "../services/aiService";
import NewsPanel from "./NewsPanel";

const ChartSection = ({ symbol }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const seriesRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [ai, setAI] = useState(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: 900,
      height: 420,
      layout: {
        background: { color: "#020617" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    chartInstance.current = chart;
    seriesRef.current = candleSeries;

    return () => {
      chart.remove();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!seriesRef.current) return;

      setLoading(true);

      try {
        const res = await getHistoricalData(symbol);

        const data = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : [];

        const cleanData = data
          .map((item) => ({
            time: item.time,
            open: Number(item.open),
            high: Number(item.high),
            low: Number(item.low),
            close: Number(item.close),
          }))
          .filter(
            (item) =>
              item.time &&
              !isNaN(item.open) &&
              !isNaN(item.high) &&
              !isNaN(item.low) &&
              !isNaN(item.close)
          )
          .sort((a, b) => new Date(a.time) - new Date(b.time));

        seriesRef.current.setData(cleanData);
        chartInstance.current.timeScale().fitContent();

        const aiResult = await getAIRecommendation(symbol, cleanData);
        setAI(aiResult);
      } catch (error) {
        console.error("Chart fetch error:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [symbol]);

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{symbol}</h1>
        <span className="text-gray-400 text-sm">AI Candlestick Analysis</span>
      </div>

      <div className="w-full overflow-hidden rounded-xl bg-[#020617]">
        <div ref={chartRef} className="w-full h-[420px]" />
      </div>

      {loading && <p className="text-gray-400 mt-3">Loading chart...</p>}

      {ai && (
        <div className="bg-gray-800 p-4 rounded-xl mt-6 border border-gray-700">
          <h2 className="font-bold mb-2">🤖 AI Recommendation</h2>

          <p
            className={`text-xl font-bold ${
              ai.action === "BUY"
                ? "text-green-400"
                : ai.action === "SELL"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {ai.action}
          </p>

          <p className="text-gray-400 text-sm">
            Confidence: {ai.confidence}%
          </p>

          <ul className="text-sm mt-2 text-gray-300">
            {ai.reason?.map((r, i) => (
              <li key={i}>• {r}</li>
            ))}
          </ul>

          <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs leading-relaxed">
            ⚠️ Disclaimer: This platform uses real-time or near real-time
            market data from third-party APIs for educational and research
            purposes only. AI recommendations are experimental and should not
            be considered financial or investment advice.
          </div>
        </div>
      )}

      <NewsPanel symbol={symbol} />
    </div>
  );
};

export default ChartSection;