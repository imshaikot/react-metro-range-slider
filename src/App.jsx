import React from 'react';
import ReactDOM from 'react-dom';

import ReactRangeSlider from './index';
import './styles/style.less';

const App = () => (
  <div style={{ margin: '0 auto' }}>
    <div style={{ width: 500, height: 400, backgroundColor: '#fefefe' }} />
    <ReactRangeSlider
      colorPalette={{}}
      style={{ width: 400 }}
      max={80}
      min={-20}
      onChange={(e, v) => {
        console.info(v);
      }}
      onPreModal={val => Math.round(val)}
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root-target'));
