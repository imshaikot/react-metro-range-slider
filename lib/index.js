'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tooltip = require('./cmp/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactRangeSlider = function (_React$PureComponent) {
  _inherits(ReactRangeSlider, _React$PureComponent);

  _createClass(ReactRangeSlider, null, [{
    key: 'addTransitions',
    value: function addTransitions(elem) {
      elem.classList.remove('cross-transition');
      elem.classList.add('cross-transition');
    }
  }, {
    key: 'removeTransitions',
    value: function removeTransitions(elem) {
      elem.classList.add('cross-transition');
      elem.classList.remove('cross-transition');
    }
  }]);

  function ReactRangeSlider(props) {
    _classCallCheck(this, ReactRangeSlider);

    var _this = _possibleConstructorReturn(this, (ReactRangeSlider.__proto__ || Object.getPrototypeOf(ReactRangeSlider)).call(this, props));

    _this.state = {
      max: 100,
      min: 0,
      currentValue: 5,
      fillWidth: 0,
      unfillWidth: 0,
      active: false,
      modalActive: false,
      modalOffsetTop: -35,
      modalOffsetLeft: 0,
      modalPredictionValue: 0
    };
    return _this;
  }

  _createClass(ReactRangeSlider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        max: this.props.max || this.state.max,
        min: this.props.min || this.state.min,
        currentValue: this.props.preValue || 0
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var thumbSize = 20;
      var sliderWidth = this.rangeElem.clientWidth;
      /* eslint-disable */
      this.setState({
        fillWidth: this.calculateFill(sliderWidth),
        unfillWidth: sliderWidth - thumbSize - this.calculateFill(sliderWidth)
      });
      /* eslint-enable */
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      if (!this.rangeElem) return;
      var thumbSize = 20;
      var sliderWidth = this.rangeElem.clientWidth - thumbSize;
      var fillWidth = this.calculateFill(sliderWidth, this.props.value || 0);
      this.setState({
        fillWidth: fillWidth,
        unfillWidth: sliderWidth - fillWidth
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
      if (event.pageX >= this.rangeElem.offsetLeft && event.pageX <= sliderWithOffset) {
        var diff = sliderWidth - (sliderWithOffset - event.pageX);
        var value = diff * 100 / sliderWidth * this.state.max / 100;
        // console.log('value', value);
        if (typeof this.props.onChange === 'function' && value !== this.state.currentValue) {
          this.props.onChange(event, value + this.state.min);
        }
        this.setState({
          fillWidth: diff,
          unfillWidth: sliderWidth - diff,
          currentValue: value
        });
        setTimeout(function () {
          return ReactRangeSlider.removeTransitions(_this2.rangeElem);
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
      if (typeof this.props.onChangeStart === 'function') this.props.onChangeStart(event, this.state.currentValue);
    }
  }, {
    key: 'handleEnd',
    value: function handleEnd(event) {
      this.setState({ active: false });
      document.removeEventListener('mousemove', this.handleDrag.bind(this));
      document.removeEventListener('mouseup', this.handleEnd.bind(this));
      if (typeof this.props.onChangeEnd === 'function') this.props.onChangeEnd(event, this.state.currentValue);
    }
  }, {
    key: 'seekIntent',
    value: function seekIntent(event) {
      ReactRangeSlider.addTransitions(this.rangeElem);
      this.calculateDiff(event);
    }
  }, {
    key: 'seekPrediction',
    value: function seekPrediction(event) {
      if (!this.props.onPreModal) return;
      var sliderWidth = this.rangeElem.clientWidth - 20;
      var sliderWithOffset = sliderWidth + this.rangeElem.offsetLeft;
      if (event.pageX >= this.rangeElem.offsetLeft && event.pageX <= sliderWithOffset) {
        var diff = sliderWidth - (sliderWithOffset - event.pageX);
        var value = diff * 100 / sliderWidth * this.state.max / 100;
        if (this.state.modalPredictionValue !== value) {
          this.setState({
            modalOffsetLeft: event.pageX - 20,
            modalActive: true,
            modalPredictionValue: value + this.state.min
          });
        }
      }
    }
  }, {
    key: 'deactiveModal',
    value: function deactiveModal() {
      this.setState({
        modalActive: false
      });
    }
    /* eslint-disable */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this,
          _React$createElement2;

      return _react2.default.createElement(
        'div',
        { className: 'slider', style: this.props.style, ref: function ref(el) {
            if (!_this3.rangeElem) _this3.rangeElem = el;
          },
          onMouseDown: function onMouseDown(e) {
            return _this3.seekIntent(e);
          },
          onMouseMove: function onMouseMove(e) {
            return _this3.seekPrediction(e);
          }, onMouseOut: function onMouseOut(e) {
            return _this3.deactiveModal(e);
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
        ),
        typeof this.props.onPreModal === 'function' && this.state.modalActive ? _react2.default.createElement(_tooltip2.default, { offsetTop: this.state.modalOffsetTop,
          offsetLeft: this.state.modalOffsetLeft,
          text: this.props.onPreModal(this.state.modalPredictionValue) || this.state.modalPredictionValue }) : null
      );
    }
  }]);

  return ReactRangeSlider;
}(_react2.default.PureComponent);

exports.default = ReactRangeSlider;