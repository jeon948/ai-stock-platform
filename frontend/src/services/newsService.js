import axios from "axios";

export const getNews = async (symbol) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/news/${symbol}`
    );

    // ✅ backend returns { symbol, sentiment, articles }

    if (!res.data || !res.data.articles) {
      return [];
    }

    return res.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      sentiment: res.data.sentiment?.sentiment || "NEUTRAL",
    }));
  } catch (err) {
    console.error("News API error:", err);
    return [];
  }
};