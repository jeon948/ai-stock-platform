"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewsBySymbol = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GNEWS_API_KEY = process.env.GNEWS_API_KEY;

var getNewsBySymbol = function getNewsBySymbol(symbol) {
  var response, yahooResponse, news;
  return regeneratorRuntime.async(function getNewsBySymbol$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("📰 Fetching news from GNews...");
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("https://gnews.io/api/v4/search", {
            params: {
              q: symbol,
              lang: "en",
              max: 5,
              token: GNEWS_API_KEY
            }
          }));

        case 4:
          response = _context.sent;
          return _context.abrupt("return", response.data.articles || []);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log("⚠️ GNews failed, trying Yahoo Finance news...");
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap(_axios["default"].get("https://query1.finance.yahoo.com/v1/finance/search", {
            params: {
              q: symbol,
              newsCount: 5,
              quotesCount: 0
            }
          }));

        case 14:
          yahooResponse = _context.sent;
          news = yahooResponse.data.news || [];
          return _context.abrupt("return", news.map(function (item) {
            return {
              title: item.title,
              description: item.publisher,
              url: item.link,
              publishedAt: item.providerPublishTime
            };
          }));

        case 19:
          _context.prev = 19;
          _context.t1 = _context["catch"](11);
          console.log("❌ Yahoo news also failed:", _context.t1.message);
          return _context.abrupt("return", []);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8], [11, 19]]);
};

exports.getNewsBySymbol = getNewsBySymbol;
//# sourceMappingURL=newsService.dev.js.map
