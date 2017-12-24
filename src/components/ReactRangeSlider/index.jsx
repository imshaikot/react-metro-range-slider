import React from 'react';
import './style.less';

class ReactRangeSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      max: 100,
      min: 0,
      currentValue: 5,
      fillWidth: 0,
      unfillWidth: 0,
      active: false,
    };
  }

  componentWillMount() {
    this.setState({
      max: this.props.max || 100,
      min: this.props.min || 0,
      currentValue: this.props.preValue || 0,
    });
  }

  componentWillReceiveProps() {
    const thumbSize = 20;
    const sliderWidth = this.rangeElem.clientWidth - thumbSize;
    const fillWidth = this.calculateFill(sliderWidth, (this.props.value || 0));
    this.setState({
      fillWidth,
      unfillWidth: sliderWidth - fillWidth,
    });
  }

  componentDidMount() {
    const thumbSize = 20;
    const sliderWidth = this.rangeElem.parentNode.clientWidth;
    this.setState({
      fillWidth: this.calculateFill(sliderWidth),
      unfillWidth: (sliderWidth - 20) - this.calculateFill(sliderWidth)
    });
  }

  calculateFill(totalWidth, value) {
    const fill = ((value || this.state.currentValue) * 100) / this.state.max;
    return ((fill * (totalWidth - 20)) / 100);
  }

   calculateDiff(event) {
     const sliderWidth = this.rangeElem.parentNode.clientWidth - 20;
     const sliderWithOffset = sliderWidth + this.rangeElem.offsetLeft;
     if (event.pageX >= this.rangeElem.offsetLeft && event.pageX <= sliderWithOffset) {
       const diff = sliderWidth - (sliderWithOffset - event.pageX);
       const value = (((((diff * 100) / sliderWidth)) * this.state.max) / 100);
       // if (this.state.fillWidth === diff) return;
       this.setState({
         fillWidth: diff,
         unfillWidth: sliderWidth - diff,
         currentValue: value,
       });
       typeof this.props.onChange === 'function' ? this.props.onChange(event, this.state.currentValue) : null;
       setTimeout(() => this.removeTransitions(this.rangeElem), 250);
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
    typeof this.props.onChangeStart === 'function' ? this.props.onChangeStart(event, this.state.currentValue) : null;
  }

  handleEnd(event) {
    this.setState({ active: false });
    document.removeEventListener('mousemove', this.handleDrag.bind(this));
    document.removeEventListener('mouseup', this.handleEnd.bind(this));
    typeof this.props.onChangeEnd === 'function' ? this.props.onChangeEnd(event, this.state.currentValue) : null;
  }

  addTransitions(elem) {
    elem.style.transition = 'width 250ms';
    for (let i=0; elem.childNodes.length > i; i++) {
      if (elem.childNodes[i].classList.contains('thumb')) {
        elem.childNodes[i].style.transition = 'left 250ms';
        continue;
      }
      elem.childNodes[i].style.transition = 'width 250ms';
      if (elem.childNodes[i].childNodes) this.addTransitions(elem.childNodes[i]);
    }
  }

  removeTransitions(elem) {
    elem.style.transition = 'width 0ms';
    for (let i=0; elem.childNodes.length > i; i++) {

      if (elem.childNodes[i].classList.contains('thumb')) {
        elem.childNodes[i].style.transition = 'left 0ms';
        continue;
      }

      elem.childNodes[i].style.transition = 'width 0ms';
      if (elem.childNodes[i].childNodes) this.removeTransitions(elem.childNodes[i]);
    }
  }

  seekIntent(event) {
    this.addTransitions(this.rangeElem);
    this.calculateDiff(event);
  }

  render() {
    return (
      <div className="slider" ref={ el => this.rangeElem = el } onMouseDown={e => this.seekIntent(e)}>
        <div className="fill" style={{ width: this.state.fillWidth }}>
          <div className="fill-child" />
        </div>

        <div className="thumb" style={{ left: this.state.fillWidth }}
        onMouseDown={e => this.handleStart(e) } onMouseUp={ e => this.handleEnd(e) } />

        <div style={{ width: this.state.unfillWidth }} className="unfill">
          <div className="unfill-child" />
        </div>
      </div>
    );
  }
}

export default ReactRangeSlider;
