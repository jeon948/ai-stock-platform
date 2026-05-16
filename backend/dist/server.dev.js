"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _http = _interopRequireDefault(require("http"));

var _db = _interopRequireDefault(require("./config/db.js"));

var _stockRoutes = _interopRequireDefault(require("./routes/stockRoutes.js"));

var _newsRoutes = _interopRequireDefault(require("./routes/newsRoutes.js"));

var _aiRoutes = _interopRequireDefault(require("./routes/aiRoutes.js"));

var _socket = require("./websocket/socket.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

app.use((0, _cors["default"])());
app.use(_express["default"].json());

var startServer = function startServer() {
  var PORT;
  return regeneratorRuntime.async(function startServer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _db["default"])());

        case 2:
          // ✅ Stock Routes
          app.use("/api/stocks", _stockRoutes["default"]); // ✅ News Routes

          app.use("/news", _newsRoutes["default"]); // ✅ AI Routes

          app.use("/api/ai", _aiRoutes["default"]); // ✅ Health Route

          app.get("/", function (req, res) {
            res.send("🚀 API Running");
          }); // ✅ Initialize WebSocket

          (0, _socket.initWebSocket)(server);
          PORT = process.env.PORT || 5000;
          server.listen(PORT, function () {
            console.log("\uD83D\uDD25 Server running on port ".concat(PORT));
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

startServer();
//# sourceMappingURL=server.dev.js.map
