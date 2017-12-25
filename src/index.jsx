import React from 'react';

import Tooltip from './cmp/tooltip';

class ReactRangeSlider extends React.PureComponent {
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
      max: 100,
      min: 0,
      currentValue: 5,
      fillWidth: 0,
      unfillWidth: 0,
      active: false,
      modalActive: false,
      modalOffsetTop: -35,
      modalOffsetLeft: 0,
      modalPredictionValue: 0,
    };
  }

  componentWillMount() {
    this.setState({
      max: this.props.max || this.state.max,
      min: this.props.min || this.state.min,
      currentValue: this.props.preValue || 0,
    });
  }

  componentDidMount() {
    const thumbSize = 20;
    const sliderWidth = this.rangeElem.clientWidth;
    /* eslint-disable */
    this.setState({
      fillWidth: this.calculateFill(sliderWidth),
      unfillWidth: (sliderWidth - thumbSize) - this.calculateFill(sliderWidth),
    });
    /* eslint-enable */
  }

  componentWillReceiveProps() {
    if (!this.rangeElem) return;
    const thumbSize = 20;
    const sliderWidth = this.rangeElem.clientWidth - thumbSize;
    const fillWidth = this.calculateFill(sliderWidth, (this.props.value || 0));
    this.setState({
      fillWidth,
      unfillWidth: sliderWidth - fillWidth,
    });
  }

  calculateFill(totalWidth, value) {
    const fill = ((value || this.state.currentValue) * 100) / (this.state.max);
    return ((fill * (totalWidth - 20)) / 100);
  }

  calculateDiff(event) {
    const sliderWidth = this.rangeElem.clientWidth - 20;
    const sliderWithOffset = sliderWidth + this.rangeElem.offsetLeft;
    if ((event.pageX) >= this.rangeElem.offsetLeft && (event.pageX) <= sliderWithOffset) {
      const diff = sliderWidth - (sliderWithOffset - event.pageX);
      const value = (((((diff * 100) / sliderWidth)) * (this.state.max)) / 100);
      // console.log('value', value);
      if (typeof this.props.onChange === 'function' && value !== this.state.currentValue) {
        this.props.onChange(event, value + this.state.min);
      }
      this.setState({
        fillWidth: diff,
        unfillWidth: sliderWidth - diff,
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
    if (typeof this.props.onChangeStart === 'function') this.props.onChangeStart(event, this.state.currentValue);
  }

  handleEnd(event) {
    this.setState({ active: false });
    document.removeEventListener('mousemove', this.handleDrag.bind(this));
    document.removeEventListener('mouseup', this.handleEnd.bind(this));
    if (typeof this.props.onChangeEnd === 'function') this.props.onChangeEnd(event, this.state.currentValue);
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
      const value = (((((diff * 100) / sliderWidth)) * this.state.max) / 100);
      if (this.state.modalPredictionValue !== value) {
        this.setState({
          modalOffsetLeft: event.pageX - 20,
          modalActive: true,
          modalPredictionValue: value + this.state.min,
        });
      }
    }
  }

  deactiveModal() {
    this.setState({
      modalActive: false,
    });
  }
  /* eslint-disable */
  render() {
    return (
      <div className="slider" style={ this.props.style } ref={ (el) => {
        if (!this.rangeElem) this.rangeElem = el;
       } }
      onMouseDown={e => this.seekIntent(e)}
      onMouseMove={e => this.seekPrediction(e)} onMouseOut={e => this.deactiveModal(e)}>
        <div style={{ backgroundColor: this.props.colorPalette.fill }}
        className="fill" style={{ width: this.state.fillWidth }}>
          <div className="fill-child" />
        </div>

        <div style={{ borderColor: this.props.colorPalette.thumb }}
        className="thumb" style={{ left: this.state.fillWidth }}
        onMouseDown={e => this.handleStart(e) } onMouseUp={ e => this.handleEnd(e) } />

        <div style={{ width: this.state.unfillWidth }} className="unfill">
          <div style={{ backgroundColor: this.props.colorPalette.toFill }} className="unfill-child" />
        </div>
        {this.props.onPreModal && this.state.modalActive ? <Tooltip offsetTop={this.state.modalOffsetTop}
        offsetLeft={this.state.modalOffsetLeft} text={String(this.props.onPreModal(this.state.modalPredictionValue))} /> : null}
      </div>
    );
  }
}

export default ReactRangeSlider;
