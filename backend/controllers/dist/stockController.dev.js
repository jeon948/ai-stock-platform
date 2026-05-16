"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchStock = void 0;

var _stockService = require("../services/stockService.js");

var fetchStock = function fetchStock(req, res) {
  var symbol, data;
  return regeneratorRuntime.async(function fetchStock$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          symbol = req.params.symbol;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _stockService.getStockData)(symbol));

        case 3:
          data = _context.sent;
          res.json(data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.fetchStock = fetchStock;
//# sourceMappingURL=stockController.dev.js.map
