import { getNews } from "./newsService";

const AI_BASE_URL = import.meta.env.VITE_AI_API_URL || "http://localhost:8000";

const fallbackAI = (candles = []) => {
  if (!candles || candles.length < 5) {
    return {
      action: "HOLD",
      confidence: 50,
      reason: ["Not enough market data"],
    };
  }

  const last = candles[candles.length - 1].close;
  const prev = candles[candles.length - 5].close;
  const priceChange = ((last - prev) / prev) * 100;

  if (priceChange > 2) {
    return {
      action: "BUY",
      confidence: 65,
      reason: [
        "Uptrend detected",
        `Price change: ${priceChange.toFixed(2)}%`,
      ],
    };
  }

  if (priceChange < -2) {
    return {
      action: "SELL",
      confidence: 65,
      reason: [
        "Downtrend detected",
        `Price change: ${priceChange.toFixed(2)}%`,
      ],
    };
  }

  return {
    action: "HOLD",
    confidence: 50,
    reason: [
      "Market is neutral",
      `Price change: ${priceChange.toFixed(2)}%`,
    ],
  };
};

const calculateConfidence = (aiData) => {
  if (!aiData?.predicted_price || !aiData?.current_price) return 0;

  const diff =
    Math.abs(aiData.predicted_price - aiData.current_price) /
    aiData.current_price;

  return Math.min(100, diff * 100);
};

export const getAIRecommendation = async (symbol, candles) => {
  try {
    if (!symbol || !candles || candles.length < 5) {
      return fallbackAI(candles);
    }

    let aiData = null;

    try {
      const res = await fetch(`${AI_BASE_URL}/predict/${symbol}`);

      if (res.ok) {
        aiData = await res.json();
      }
    } catch (err) {
      console.warn("AI backend failed");
    }

    const last = candles[candles.length - 1].close;
    const prev = candles[candles.length - 5].close;

    const priceChange = ((last - prev) / prev) * 100;

    let priceSignal = "HOLD";

    if (priceChange > 2) priceSignal = "BUY";
    else if (priceChange < -2) priceSignal = "SELL";

    const newsResponse = await getNews(symbol);

    const news = Array.isArray(newsResponse)
      ? newsResponse
      : Array.isArray(newsResponse?.articles)
      ? newsResponse.articles
      : [];

    let sentimentScore = 0;

    news.forEach((n) => {
      if (n.sentiment === "POSITIVE") sentimentScore++;
      if (n.sentiment === "NEGATIVE") sentimentScore--;
    });

    let action = "HOLD";
    let confidence = 50;
    let reason = [];

    if (priceSignal === "BUY" && sentimentScore > 0) {
      action = "BUY";
      confidence = 80;
      reason.push("Uptrend + Positive news");
    } else if (priceSignal === "SELL" && sentimentScore < 0) {
      action = "SELL";
      confidence = 80;
      reason.push("Downtrend + Negative news");
    } else if (priceSignal === "BUY") {
      action = "BUY";
      confidence = 65;
      reason.push("Uptrend detected");
    } else if (priceSignal === "SELL") {
      action = "SELL";
      confidence = 65;
      reason.push("Downtrend detected");
    }

    if (aiData && aiData.predicted_price && aiData.current_price) {
      reason.push(`Predicted: $${aiData.predicted_price.toFixed(2)}`);
      reason.push(`Current: $${aiData.current_price.toFixed(2)}`);

      confidence = Math.min(90, confidence + calculateConfidence(aiData) / 4);
    }

    if (reason.length === 0) {
      return fallbackAI(candles);
    }

    reason.push(`Price change: ${priceChange.toFixed(2)}%`);
    reason.push(`News score: ${sentimentScore}`);

    return {
      action,
      confidence: Math.round(confidence),
      reason,
    };
  } catch (error) {
    console.warn("⚠️ AI failed, using fallback", error);
    return fallbackAI(candles);
  }
};