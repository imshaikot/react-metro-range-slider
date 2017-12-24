import React from 'react';

import Tooltip from './cmp/tooltip';

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
      modalActive: false,
      modalOffsetTop: 0,
      modalOffsetLeft: 0,
      modalPredictionValue: 0,
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
    const sliderWidth = this.rangeElem.clientWidth;
    this.setState({
      fillWidth: this.calculateFill(sliderWidth),
      unfillWidth: (sliderWidth - 20) - this.calculateFill(sliderWidth),
      modalOffsetTop: -35
    });
  }

  calculateFill(totalWidth, value) {
    const fill = ((value || this.state.currentValue) * 100) / this.state.max;
    return ((fill * (totalWidth - 20)) / 100);
  }

   calculateDiff(event) {
     const sliderWidth = this.rangeElem.clientWidth - 20;
     const sliderWithOffset = sliderWidth + this.rangeElem.offsetLeft;
     if ((event.pageX) >= this.rangeElem.offsetLeft && (event.pageX) <= sliderWithOffset) {
       const diff = sliderWidth - (sliderWithOffset - event.pageX);
       const value = (((((diff * 100) / sliderWidth)) * this.state.max) / 100);
       this.setState({
         fillWidth: diff,
         unfillWidth: sliderWidth - diff,
         currentValue: value,
       });
       // console.log('value', value);
       typeof this.props.onChange === 'function' ? this.props.onChange(event, value) : null;
       //setTimeout(() => this.removeTransitions(this.rangeElem), 250);
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

  // addTransitions(elem) {
  //   elem.style.transition = 'width 250ms';
  //   for (let i=0; elem.childNodes.length > i; i++) {
  //     if (elem.childNodes[i].classList && elem.childNodes[i].classList.contains('thumb')) {
  //       elem.childNodes[i].style.transition = 'left 250ms';
  //       continue;
  //     }
  //     elem.childNodes[i].style.transition = 'width 250ms';
  //     if (elem.childNodes[i].childNodes) this.addTransitions(elem.childNodes[i]);
  //   }
  // }
  //
  // removeTransitions(elem) {
  //   if (!this.props.onPreModal) return;
  //   elem.style.transition = 'width 0ms';
  //   for (let i=0; elem.childNodes.length > i; i++) {
  //
  //     if (elem.childNodes[i].classList && elem.childNodes[i].classList.contains('thumb')) {
  //       elem.childNodes[i].style.transition = 'left 0ms';
  //       continue;
  //     }
  //
  //     elem.childNodes[i].style.transition = 'width 0ms';
  //     if (elem.childNodes[i].childNodes) this.removeTransitions(elem.childNodes[i]);
  //   }
  // }

  seekIntent(event) {
    this.calculateDiff(event);
  }

  seekPrediction(event) {
    event.stopPropagation();
    const sliderWidth = this.rangeElem.clientWidth - 20;
    const sliderWithOffset = sliderWidth + this.rangeElem.offsetLeft;
    if ((event.pageX) >= this.rangeElem.offsetLeft && (event.pageX) <= sliderWithOffset) {
      const diff = sliderWidth - (sliderWithOffset - event.pageX);
      const value = (((((diff * 100) / sliderWidth)) * this.state.max) / 100);
      this.setState({
        modalOffsetLeft: event.pageX - 20,
        modalActive: true,
        modalPredictionValue: value,
      })
    }
  }

  deactiveModal() {
    this.setState({
      modalActive: false,
    })
  }

  render() {
    return (
      <div className="slider" style={ this.props.style } ref={ el => this.rangeElem = el }
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
