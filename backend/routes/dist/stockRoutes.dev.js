"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _stockController = require("../controllers/stockController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/:symbol", _stockController.fetchStock);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=stockRoutes.dev.js.map
