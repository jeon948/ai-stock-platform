"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _newsController = require("../controllers/newsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/:symbol", _newsController.getStockNews);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=newsRoutes.dev.js.map
