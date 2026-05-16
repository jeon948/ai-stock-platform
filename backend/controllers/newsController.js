import { getNewsBySymbol } from "../services/newsService.js";
import { analyzeSentiment } from "../services/sentimentService.js";

export const getStockNews = async (req, res) => {
  try {
    const { symbol } = req.params;

    const articles = await getNewsBySymbol(symbol);
    const sentiment = analyzeSentiment(articles);

    res.json({
      symbol,
      sentiment,
      articles: articles.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};