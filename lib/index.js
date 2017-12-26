'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _tooltip = require('./cmp/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactRangeSlider = function (_React$Component) {
  _inherits(ReactRangeSlider, _React$Component);

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
      currentValue: 5,
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
        currentValue: this.props.preValue || 0
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.rangeElem) return;
      /* eslint-disable */
      this.setState({});
      /* eslint-enable */
      var resizeObserver = new _resizeObserverPolyfill2.default(function () {
        return _this2.setState({});
      });
      resizeObserver.observe(this.rangeElem);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.value !== undefined && newProps.value !== this.state.currentValue) {
        this.state.currentValue = newProps.value;
      }
    }
  }, {
    key: 'calculateDiff',
    value: function calculateDiff(event) {
      var _this3 = this;

      var sliderWidth = this.rangeElem.clientWidth - 20;
      var sliderWithOffset = sliderWidth + this.rangeElem.offsetLeft;
      if (event.pageX >= this.rangeElem.offsetLeft && event.pageX <= sliderWithOffset) {
        var diff = sliderWidth - (sliderWithOffset - event.pageX);
        var value = diff * 100 / sliderWidth * (this.props.max || 100) / 100;
        if (typeof this.props.onChange === 'function' && value !== this.state.currentValue) {
          this.props.onChange(event, value + (this.props.min || 0));
        }
        this.setState({
          currentValue: value
        });
        setTimeout(function () {
          return ReactRangeSlider.removeTransitions(_this3.rangeElem);
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
      if (typeof this.props.onChangeStart === 'function') this.props.onChangeStart(event, this.state.currentValue + (this.props.min || 0));
    }
  }, {
    key: 'handleEnd',
    value: function handleEnd(event) {
      this.setState({ active: false });
      document.removeEventListener('mousemove', this.handleDrag.bind(this));
      document.removeEventListener('mouseup', this.handleEnd.bind(this));
      if (typeof this.props.onChangeEnd === 'function') this.props.onChangeEnd(event, this.state.currentValue + (this.props.min || 0));
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
        var value = diff * 100 / sliderWidth * (this.props.max || 100) / 100;
        if (this.state.modalPredictionValue !== value) {
          this.setState({
            modalOffsetLeft: event.pageX - this.rangeElem.offsetLeft - 20,
            modalActive: true,
            modalPredictionValue: value + (this.props.min || 0)
          });
        }
      }
    }
  }, {
    key: 'deactiveModal',
    value: function deactiveModal() {
      if (this.state.modalActive) {
        this.setState({
          modalActive: false
        });
      }
    }
  }, {
    key: 'toFill',
    value: function toFill() {
      if (!this.rangeElem) return 0;
      var count = this.props.max || 100;
      var percentage = 100 * this.state.currentValue / count;
      var sliderWidth = this.rangeElem.clientWidth - 20;
      var toFill = sliderWidth - percentage * sliderWidth / 100;
      /* eslint-disable */
      return isFinite(toFill) ? toFill : sliderWidth;
      /* eslint-enable */
    }
  }, {
    key: 'fill',
    value: function fill() {
      if (!this.rangeElem) return 0;
      var sliderWidth = this.rangeElem.clientWidth - 20;
      return sliderWidth - this.toFill();
    }

    /* eslint-disable */

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var colors = this.props.colorPalette || {};
      return _react2.default.createElement(
        'div',
        { className: 'slider', style: this.props.style, ref: function ref(el) {
            if (!_this4.rangeElem) _this4.rangeElem = el;
          },
          onMouseDown: function onMouseDown(e) {
            return _this4.seekIntent(e);
          },
          onMouseMove: function onMouseMove(e) {
            return _this4.seekPrediction(e);
          }, onMouseOut: function onMouseOut(e) {
            return _this4.deactiveModal(e);
          } },
        _react2.default.createElement(
          'div',
          {
            className: 'fill', style: { width: this.fill() } },
          _react2.default.createElement('div', { style: { backgroundColor: colors.fill }, className: 'fill-child' })
        ),
        _react2.default.createElement('div', {
          className: 'thumb', style: { left: this.fill(), borderColor: colors.thumb },
          onMouseDown: function onMouseDown(e) {
            return _this4.handleStart(e);
          }, onMouseUp: function onMouseUp(e) {
            return _this4.handleEnd(e);
          } }),
        _react2.default.createElement(
          'div',
          { style: { width: this.toFill() }, className: 'unfill' },
          _react2.default.createElement('div', { style: { backgroundColor: colors.toFill }, className: 'unfill-child' })
        ),
        typeof this.props.onPreModal === 'function' && this.state.modalActive ? _react2.default.createElement(_tooltip2.default, { offsetTop: this.state.modalOffsetTop,
          offsetLeft: this.state.modalOffsetLeft,
          text: this.props.onPreModal(this.state.modalPredictionValue) || this.state.modalPredictionValue }) : null
      );
    }
  }]);

  return ReactRangeSlider;
}(_react2.default.Component);

exports.default = ReactRangeSlider;