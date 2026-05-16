"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStockNews = void 0;

var _newsService = require("../services/newsService.js");

var _sentimentService = require("../services/sentimentService.js");

var getStockNews = function getStockNews(req, res) {
  var symbol, articles, sentiment;
  return regeneratorRuntime.async(function getStockNews$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          symbol = req.params.symbol;
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _newsService.getNewsBySymbol)(symbol));

        case 4:
          articles = _context.sent;
          sentiment = (0, _sentimentService.analyzeSentiment)(articles);
          res.json({
            symbol: symbol,
            sentiment: sentiment,
            articles: articles.slice(0, 5)
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: "Failed to fetch news"
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getStockNews = getStockNews;
//# sourceMappingURL=newsController.dev.js.map
