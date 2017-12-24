"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = function Tooltip(props) {
  var offsetLeft = props.offsetLeft - (props.text && props.text.length > 2 ? (props.text.length - 2) * 5 : 0);
  console.log(props.offsetLeft, offsetLeft);
  return _react2.default.createElement(
    "div",
    { className: "em-modal", style: { top: props.offsetTop,
        left: offsetLeft } },
    _react2.default.createElement(
      "p",
      { className: "em-title" },
      props.text
    )
  );
};

exports.default = Tooltip;