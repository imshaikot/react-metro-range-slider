import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import Tooltip from './cmp/tooltip';

class ReactRangeSlider extends React.Component {
  static addTransitions(elem) {
    elem.classList.remove('cross-transition');
    elem.classList.add('cross-transition');
  }

  static removeTransitions(elem) {
    elem.classList.add('cross-transition');
    elem.classList.remove('cross-transition');
  }

  constructor(props) {
    super(props);
    this.state = {
      currentValue: 5,
      active: false,
      modalActive: false,
      modalOffsetTop: -35,
      modalOffsetLeft: 0,
      modalPredictionValue: 0,
    };
  }

  componentWillMount() {
    this.setState({
      currentValue: this.props.preValue || 0,
    });
  }

  componentWillReceiveProps(newProps) {
    if ((newProps.value || 0) !== this.state.currentValue) {
      this.state.currentValue = newProps.value;
    }
  }

  componentDidMount() {
    if (!this.rangeElem) return;
    /* eslint-disable */
    this.setState({  });
    /* eslint-enable */
    const resizeObserver = new ResizeObserver(() => this.setState({}))
    resizeObserver.observe(this.rangeElem)
  }

  calculateDiff(event) {
    const sliderWidth = this.rangeElem.clientWidth - 20;
    const sliderWithOffset = sliderWidth + this.rangeElem.offsetLeft;
    if ((event.pageX) >= this.rangeElem.offsetLeft && (event.pageX) <= sliderWithOffset) {
      const diff = sliderWidth - (sliderWithOffset - event.pageX);
      const value = (((((diff * 100) / sliderWidth)) * (this.props.max || 100)) / 100);
      if (typeof this.props.onChange === 'function' && value !== this.state.currentValue) {
        this.props.onChange(event, value + (this.props.min || 0));
      }
      this.setState({
        currentValue: value,
      });
      setTimeout(() => ReactRangeSlider.removeTransitions(this.rangeElem), 250);
    }
  }

  handleDrag(event) {
    if (this.state.active) {
      this.calculateDiff(event);
    }
  }


  handleStart(event) {
    this.setState({ active: true });
    document.addEventListener('mousemove', this.handleDrag.bind(this));
    document.addEventListener('mouseup', this.handleEnd.bind(this));
    if (typeof this.props.onChangeStart === 'function') this.props.onChangeStart(event, this.state.currentValue + this.props.min);
  }

  handleEnd(event) {
    this.setState({ active: false });
    document.removeEventListener('mousemove', this.handleDrag.bind(this));
    document.removeEventListener('mouseup', this.handleEnd.bind(this));
    if (typeof this.props.onChangeEnd === 'function') this.props.onChangeEnd(event, this.state.currentValue + this.props.min);
  }

  seekIntent(event) {
    ReactRangeSlider.addTransitions(this.rangeElem);
    this.calculateDiff(event);
  }

  seekPrediction(event) {
    if (!this.props.onPreModal) return;
    const sliderWidth = this.rangeElem.clientWidth - 20;
    const sliderWithOffset = sliderWidth + this.rangeElem.offsetLeft;
    if ((event.pageX) >= this.rangeElem.offsetLeft && (event.pageX) <= sliderWithOffset) {
      const diff = sliderWidth - (sliderWithOffset - event.pageX);
      const value = (((((diff * 100) / sliderWidth)) * (this.props.max || 100)) / 100);
      if (this.state.modalPredictionValue !== value) {
        this.setState({
          modalOffsetLeft: (event.pageX - this.rangeElem.offsetLeft) - 20,
          modalActive: true,
          modalPredictionValue: value + (this.props.min || 0),
        });
      }
    }
  }

  deactiveModal() {
    if (this.state.modalActive) this.setState({
      modalActive: false,
    });
  }

  toFill() {
    if (!this.rangeElem) return;
    const count = this.props.max || 100;
    const percentage = (100 * this.state.currentValue) / count;
    const sliderWidth = this.rangeElem.clientWidth - 20;
    const toFill = (sliderWidth - ((percentage * sliderWidth) / 100));
    return isFinite(toFill) ? toFill : sliderWidth;
  }

  fill() {
    if (!this.rangeElem) return;
    const sliderWidth = this.rangeElem.clientWidth - 20;
    return sliderWidth - this.toFill();
  }

  /* eslint-disable */
  render() {
    const colors = this.props.colorPalette || {};
    return (
      <div className="slider" style={ this.props.style } ref={ (el) => {
        if (!this.rangeElem) this.rangeElem = el;
       } }
      onMouseDown={e => this.seekIntent(e)}
      onMouseMove={e => this.seekPrediction(e)} onMouseOut={e => this.deactiveModal(e)}>
        <div
        className="fill" style={{ width: this.fill() }}>
          <div  style={{ backgroundColor: colors.fill }} className="fill-child" />
        </div>

        <div
        className="thumb" style={{ left: this.fill(), borderColor: colors.thumb }}
        onMouseDown={e => this.handleStart(e) } onMouseUp={ e => this.handleEnd(e) } />

        <div style={{ width: this.toFill() }} className="unfill">
          <div style={{ backgroundColor: colors.toFill }} className="unfill-child" />
        </div>
        {typeof this.props.onPreModal === 'function' && this.state.modalActive ? <Tooltip offsetTop={this.state.modalOffsetTop}
        offsetLeft={this.state.modalOffsetLeft}
        text={this.props.onPreModal(this.state.modalPredictionValue) || this.state.modalPredictionValue} /> : null}
      </div>
    );
  }
}

export default ReactRangeSlider;
