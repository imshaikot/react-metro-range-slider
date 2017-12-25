"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = function Tooltip(props) {
  var l = props.text.length;
  var offsetLeft = props.offsetLeft - (props.text && l > 2 ? (l - 2) * 5 : 0);
  return _react2.default.createElement(
    "div",
    {
      className: "em-modal",
      style: { top: props.offsetTop, left: offsetLeft }
    },
    _react2.default.createElement(
      "p",
      { className: "em-title" },
      props.text
    )
  );
};

exports.default = Tooltip;