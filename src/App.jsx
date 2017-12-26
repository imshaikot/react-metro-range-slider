import React from 'react';
import ReactDOM from 'react-dom';

import Slider from './index';
import './styles/App.less';
import './styles/style.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1: {
        val: 0,
      },
      slider2val: 0,
      slider2start: 0,
      slider2end: 0,
      asyncVal: 0,
    };
  }

  render() {
    return (
      <div className="body">
        <h1 style={{ marginTop: 30 }}>React Metro Range Slider </h1>
        <div className="box">
          <p>Basic default slider (Just tracking change)</p>
          <Slider max={300} colorPalette={{}} onChange={(e, v) => this.setState({
            slider1: {
              val: v,
            }
          })} />
          <p>Raw Value: <b>{this.state.slider1.val}</b></p>
        </div>
        <div className="box">
          <p>Slider with start and end tracks</p>
          <Slider max={200} min={50} onChange={(e, v) => this.setState({
            slider2val: v
          })}
          onChangeStart={(e, v) => this.setState({
            slider2start: v
          })}
          onChangeEnd={(e, v) => this.setState({
            slider2end: v
          })}
          />
          <p>Raw Value: <b>{this.state.slider2val}</b></p>
          <p>Drag Start Value: <b>{this.state.slider2start}</b></p>
          <p>Drag End Value: <b>{this.state.slider2end}</b></p>
        </div>

        <div className="box">
          <p>Sliders with different color palettes</p>
          <Slider preValue={25} style={{ marginTop: 10 }} colorPalette={{fill: '#F97D4E', toFill: '#939292', thumb: '#FD5412'}} />
          <Slider preValue={45} style={{ marginTop: 10 }} colorPalette={{fill: '#14B03B', toFill: '#DAF9C5', thumb: '#5E79F5'}} />
          <Slider preValue={15} style={{ marginTop: 10 }} colorPalette={{fill: '#ED2D2D', toFill: '#FA8080', thumb: '#6B6A6A'}} />
        </div>
        
        <div className="box">
          <p>Slider with prediction tooltip (onPreModal)</p>
          <Slider onPreModal={val => Math.round(val)} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root-target'));
