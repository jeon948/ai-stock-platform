import axios from "axios";

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

export const getNewsBySymbol = async (symbol) => {
  try {
    console.log("📰 Fetching news from GNews...");

    const response = await axios.get("https://gnews.io/api/v4/search", {
      params: {
        q: symbol,
        lang: "en",
        max: 5,
        token: GNEWS_API_KEY,
      },
    });

    return response.data.articles || [];
  } catch (error) {
    console.log("⚠️ GNews failed, trying Yahoo Finance news...");

    try {
      const yahooResponse = await axios.get(
        "https://query1.finance.yahoo.com/v1/finance/search",
        {
          params: {
            q: symbol,
            newsCount: 5,
            quotesCount: 0,
          },
        }
      );

      const news = yahooResponse.data.news || [];

      return news.map((item) => ({
        title: item.title,
        description: item.publisher,
        url: item.link,
        publishedAt: item.providerPublishTime,
      }));
    } catch (yahooError) {
      console.log("❌ Yahoo news also failed:", yahooError.message);
      return [];
    }
  }
};