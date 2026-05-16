"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Temporary route (we'll upgrade later)


router.get("/:symbol", function (req, res) {
  res.json({
    message: "AI route working"
  });
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=aiRoutes.dev.js.map
