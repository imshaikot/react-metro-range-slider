import React from 'react';
import './style.less';

class Range extends React.Component {

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

  componentDidMount() {
    const thumbSize = 20;
    const sliderWidth = this.rangeElem.parentNode.clientWidth;
    this.setState({
      fillWidth: this.calculateFill(sliderWidth),
      unfillWidth: (sliderWidth - 20) - this.calculateFill(sliderWidth)
    });
  }

  calculateFill(totalWidth) {
    const fill = (this.state.currentValue * 100) / this.state.max;
    return ((fill * (totalWidth - 20)) / 100);
  }

   calculateDiff(event) {
     const sliderWidth = this.rangeElem.parentNode.clientWidth - 20;
     const sliderWithOffset = sliderWidth + this.rangeElem.offsetLeft;
     if (event.pageX >= this.rangeElem.offsetLeft && event.pageX <= sliderWithOffset) {
       const diff = sliderWidth - (sliderWithOffset - event.pageX);
       const value = (((((diff * 100) / sliderWidth)) * this.state.max) / 100);
       this.setState({
         fillWidth: diff,
         unfillWidth: sliderWidth - diff,
         currentValue: value,
       });
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
  }

  handleEnd(event) {
    this.setState({ active: false });
    document.removeEventListener('mousemove', this.handleDrag.bind(this));
    document.removeEventListener('mouseup', this.handleEnd.bind(this));
  }

  seekIntent(event) {
    event.stopPropagation()
    console.dir(event.offsetX, event.offsetY)
  }

  render() {
    return (
      <div className="slider" ref={ el => this.rangeElem = el }>
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

export default Range;
