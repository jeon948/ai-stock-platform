"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var stockSchema = new _mongoose["default"].Schema({
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
    index: true
  },
  data: {
    type: Array,
    "default": []
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model("Stock", stockSchema);

exports["default"] = _default;
//# sourceMappingURL=Stock.dev.js.map
