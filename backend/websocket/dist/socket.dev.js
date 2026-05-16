"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWebSocket = void 0;

var _ws = _interopRequireWildcard(require("ws"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var clients = [];

var initWebSocket = function initWebSocket(server) {
  // ✅ Correct way
  var wss = new _ws.WebSocketServer({
    server: server
  }); // 🔗 Connect to Finnhub

  var finnhub = new _ws["default"]("wss://ws.finnhub.io?token=".concat(process.env.FINNHUB_API_KEY));
  finnhub.on("open", function () {
    console.log("✅ Connected to Finnhub");
    finnhub.send(JSON.stringify({
      type: "subscribe",
      symbol: "AAPL"
    }));
    finnhub.send(JSON.stringify({
      type: "subscribe",
      symbol: "TSLA"
    }));
    finnhub.send(JSON.stringify({
      type: "subscribe",
      symbol: "MSFT"
    }));
  });
  finnhub.on("message", function (data) {
    var parsed = JSON.parse(data);

    if (parsed.type === "trade") {
      clients.forEach(function (client) {
        if (client.readyState === _ws["default"].OPEN) {
          client.send(JSON.stringify(parsed));
        }
      });
    }
  }); // 👥 Frontend clients

  wss.on("connection", function (ws) {
    console.log("👤 Frontend connected");
    clients.push(ws);
    ws.on("close", function () {
      clients = clients.filter(function (c) {
        return c !== ws;
      });
      console.log("❌ Client disconnected");
    });
  });
};

exports.initWebSocket = initWebSocket;
//# sourceMappingURL=socket.dev.js.map
