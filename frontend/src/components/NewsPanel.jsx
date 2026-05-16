import { useEffect, useState } from "react";
import { getNews } from "../services/newsService";

const NewsPanel = ({ symbol }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews(symbol);

        if (Array.isArray(data)) {
          setNews(data);
        } else if (Array.isArray(data?.articles)) {
          setNews(data.articles);
        } else {
          setNews([]);
        }
      } catch (error) {
        console.error("News fetch error:", error);
        setNews([]);
      }
    };

    fetchNews();
  }, [symbol]);

  return (
    <div className="bg-gray-900 p-4 rounded-xl mt-4 border border-gray-800">
      <h2 className="text-lg font-bold mb-3">📰 News</h2>

      {news.length === 0 && (
        <p className="text-gray-400 text-sm">No news available</p>
      )}

      {news.map((n, i) => (
        <div key={i} className="mb-3">
          <a
            href={n.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm hover:underline"
          >
            {n.title}
          </a>

          <p className="text-xs text-yellow-400">
            {n.sentiment || "NEUTRAL"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NewsPanel;