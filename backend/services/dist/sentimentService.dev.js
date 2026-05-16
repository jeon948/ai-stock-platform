"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyzeSentiment = void 0;
var positiveWords = ["gain", "surge", "bull", "growth", "positive", "up"];
var negativeWords = ["fall", "drop", "bear", "loss", "negative", "down"];

var analyzeSentiment = function analyzeSentiment(articles) {
  var score = 0;
  articles.forEach(function (article) {
    var text = ((article.title || "") + " " + (article.description || "")).toLowerCase();
    positiveWords.forEach(function (word) {
      if (text.includes(word)) score++;
    });
    negativeWords.forEach(function (word) {
      if (text.includes(word)) score--;
    });
  });
  var sentiment = "NEUTRAL";
  if (score > 2) sentiment = "POSITIVE";else if (score < -2) sentiment = "NEGATIVE";
  return {
    sentiment: sentiment,
    score: score
  };
};

exports.analyzeSentiment = analyzeSentiment;
//# sourceMappingURL=sentimentService.dev.js.map
