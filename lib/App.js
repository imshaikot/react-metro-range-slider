'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

require('./styles/style.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react2.default.createElement(
    'div',
    { style: { margin: '0 auto' } },
    _react2.default.createElement('div', { style: { width: 500, height: 400, backgroundColor: '#fefefe' } }),
    _react2.default.createElement(_index2.default, { colorPalette: {}, style: { width: 400 },
      max: 10,
      onChange: function onChange(e, v) {
        console.log(v);
      }, onPreModal: function onPreModal(val) {
        return Math.round(val);
      } })
  );
};

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('root-target'));