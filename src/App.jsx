import React from 'react';
import ReactRangeSlider from './components/ReactRangeSlider';

class App extends React.Component {

  state = {valueX: 0, valueY: 0};

  componentWillMount() {
    // setInterval(() => {
    //   this.setState({
    //     value: this.state.value + 1
    //   });
    // }, 500)
  }
  render() {
    return (
      <div>
        <ReactRangeSlider onChange={(e, v) => {
          // this.setState({
          //   valueX: v
          // });
          console.log(v);
        }} value={this.state.valueX} max={500} preValue={10} colorPalette={{}} />
        <ReactRangeSlider onChange={(e, v) => null}  colorPalette={{}} max={500} preValue={100} />
      </div>
    );
  }
}

export default App;
