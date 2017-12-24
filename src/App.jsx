import React from 'react';
import ReactRangeSlider from './components/ReactRangeSlider';

class App extends React.Component {

  state = {value: 0};

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
        <ReactRangeSlider onChange={(e, v) => console.log(v)} value={this.state.value} max={500} preValue={10} />
        <ReactRangeSlider onChange={(e, v) => console.log(v)} value={this.state.value} max={500} preValue={100} />
      </div>
    );
  }
}

export default App;
