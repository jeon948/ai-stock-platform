const positiveWords = ["gain", "surge", "bull", "growth", "positive", "up"];
const negativeWords = ["fall", "drop", "bear", "loss", "negative", "down"];

export const analyzeSentiment = (articles) => {
  let score = 0;

  articles.forEach((article) => {
    const text = (
      (article.title || "") +
      " " +
      (article.description || "")
    ).toLowerCase();

    positiveWords.forEach((word) => {
      if (text.includes(word)) score++;
    });

    negativeWords.forEach((word) => {
      if (text.includes(word)) score--;
    });
  });

  let sentiment = "NEUTRAL";

  if (score > 2) sentiment = "POSITIVE";
  else if (score < -2) sentiment = "NEGATIVE";

  return {
    sentiment,
    score,
  };
};