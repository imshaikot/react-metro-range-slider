'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactRangeSlider = function (_React$Component) {
  _inherits(ReactRangeSlider, _React$Component);

  function ReactRangeSlider(props) {
    _classCallCheck(this, ReactRangeSlider);

    var _this = _possibleConstructorReturn(this, (ReactRangeSlider.__proto__ || Object.getPrototypeOf(ReactRangeSlider)).call(this, props));

    _this.state = {
      max: 100,
      min: 0,
      currentValue: 5,
      fillWidth: 0,
      unfillWidth: 0,
      active: false
    };
    return _this;
  }

  _createClass(ReactRangeSlider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        max: this.props.max || 100,
        min: this.props.min || 0,
        currentValue: this.props.preValue || 0
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      var thumbSize = 20;
      var sliderWidth = this.rangeElem.clientWidth - thumbSize;
      var fillWidth = this.calculateFill(sliderWidth, this.props.value || 0);
      this.setState({
        fillWidth: fillWidth,
        unfillWidth: sliderWidth - fillWidth
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var thumbSize = 20;
      var sliderWidth = this.rangeElem.clientWidth;
      this.setState({
        fillWidth: this.calculateFill(sliderWidth),
        unfillWidth: sliderWidth - 20 - this.calculateFill(sliderWidth)
      });
    }
  }, {
    key: 'calculateFill',
    value: function calculateFill(totalWidth, value) {
      var fill = (value || this.state.currentValue) * 100 / this.state.max;
      return fill * (totalWidth - 20) / 100;
    }
  }, {
    key: 'calculateDiff',
    value: function calculateDiff(event) {
      var _this2 = this;

      var sliderWidth = this.rangeElem.clientWidth - 20;
      var sliderWithOffset = sliderWidth + this.rangeElem.offsetLeft;
      // console.log('sliderWithOffset', sliderWithOffset);
      // console.log('pageX', event.pageX);
      // console.log('offsetLeft', this.rangeElem.offsetLeft)
      if (event.pageX >= this.rangeElem.offsetLeft && event.pageX <= sliderWithOffset) {
        var diff = sliderWidth - (sliderWithOffset - event.pageX);
        var value = diff * 100 / sliderWidth * this.state.max / 100;
        // if (this.state.fillWidth === diff) return;
        this.setState({
          fillWidth: diff,
          unfillWidth: sliderWidth - diff,
          currentValue: value
        });
        // console.log('value', value);
        typeof this.props.onChange === 'function' ? this.props.onChange(event, value) : null;
        setTimeout(function () {
          return _this2.removeTransitions(_this2.rangeElem);
        }, 250);
      }
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(event) {
      if (this.state.active) {
        this.calculateDiff(event);
      }
    }
  }, {
    key: 'handleStart',
    value: function handleStart(event) {
      this.setState({ active: true });
      document.addEventListener('mousemove', this.handleDrag.bind(this));
      document.addEventListener('mouseup', this.handleEnd.bind(this));
      typeof this.props.onChangeStart === 'function' ? this.props.onChangeStart(event, this.state.currentValue) : null;
    }
  }, {
    key: 'handleEnd',
    value: function handleEnd(event) {
      this.setState({ active: false });
      document.removeEventListener('mousemove', this.handleDrag.bind(this));
      document.removeEventListener('mouseup', this.handleEnd.bind(this));
      typeof this.props.onChangeEnd === 'function' ? this.props.onChangeEnd(event, this.state.currentValue) : null;
    }
  }, {
    key: 'addTransitions',
    value: function addTransitions(elem) {
      elem.style.transition = 'width 250ms';
      for (var i = 0; elem.childNodes.length > i; i++) {
        if (elem.childNodes[i].classList.contains('thumb')) {
          elem.childNodes[i].style.transition = 'left 250ms';
          continue;
        }
        elem.childNodes[i].style.transition = 'width 250ms';
        if (elem.childNodes[i].childNodes) this.addTransitions(elem.childNodes[i]);
      }
    }
  }, {
    key: 'removeTransitions',
    value: function removeTransitions(elem) {
      elem.style.transition = 'width 0ms';
      for (var i = 0; elem.childNodes.length > i; i++) {

        if (elem.childNodes[i].classList.contains('thumb')) {
          elem.childNodes[i].style.transition = 'left 0ms';
          continue;
        }

        elem.childNodes[i].style.transition = 'width 0ms';
        if (elem.childNodes[i].childNodes) this.removeTransitions(elem.childNodes[i]);
      }
    }
  }, {
    key: 'seekIntent',
    value: function seekIntent(event) {
      this.addTransitions(this.rangeElem);
      this.calculateDiff(event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this,
          _React$createElement2;

      return _react2.default.createElement(
        'div',
        { className: 'slider', style: this.props.style, ref: function ref(el) {
            return _this3.rangeElem = el;
          }, onMouseDown: function onMouseDown(e) {
            return _this3.seekIntent(e);
          } },
        _react2.default.createElement(
          'div',
          _defineProperty({ style: { backgroundColor: this.props.colorPalette.fill },
            className: 'fill' }, 'style', { width: this.state.fillWidth }),
          _react2.default.createElement('div', { className: 'fill-child' })
        ),
        _react2.default.createElement('div', (_React$createElement2 = { style: { borderColor: this.props.colorPalette.thumb },
          className: 'thumb' }, _defineProperty(_React$createElement2, 'style', { left: this.state.fillWidth }), _defineProperty(_React$createElement2, 'onMouseDown', function onMouseDown(e) {
          return _this3.handleStart(e);
        }), _defineProperty(_React$createElement2, 'onMouseUp', function onMouseUp(e) {
          return _this3.handleEnd(e);
        }), _React$createElement2)),
        _react2.default.createElement(
          'div',
          { style: { width: this.state.unfillWidth }, className: 'unfill' },
          _react2.default.createElement('div', { style: { backgroundColor: this.props.colorPalette.toFill }, className: 'unfill-child' })
        )
      );
    }
  }]);

  return ReactRangeSlider;
}(_react2.default.Component);

console.log(ReactRangeSlider);
exports.default = ReactRangeSlider;