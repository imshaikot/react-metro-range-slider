
<h1 align="center"> Metro layout range slider for React </h1>
<hr>
<p align="center">
  Tiny react component for modern metro layout based range slider prototype.
</p>
<p align="center">
  <a href="https://www.npmjs.org/package/react-metro-range-slider"><img src="https://img.shields.io/npm/v/react-metro-range-slider.svg?style=flat-square" /></a>
  <a href="https://travis-ci.org/imshaikot/react-metro-range-slider"><img src="https://api.travis-ci.org/imshaikot/react-metro-range-slider.svg" /></a>
</p>

## Installation

```bash
$ npm install react-metro-range-slider --save
```

## Getting Started

There's a lot of other range-slider available for different design purposes - this one will lets you bring the metro layout and the slider by itself very thin :)
It's very easy to start with this range slider if you're using any bundler (whether CommonJS or ES6 import).

```js
// Using an ES6
import RangeSlider from 'react-metro-range-slider'

// To include the default styles
import 'react-metro-range-slider/lib/index.css'

// Not using an ES6 transpiler
var RangeSlider = require('react-rangeslider')
```

## Example and API

```jsx
import React from 'react'
import RangeSlider from 'react-metro-range-slider'

class MyComponent extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      my_value: 0
    }
  }

  onChange(event, value) {
    this.setState({
      my_value: value
    })
  }

  render() {
    return (
      <RangeSlider
        onChange={(e, v) => this.onChange(e, v)} // [Optional] in order to track the chages
        onChangeStart={(e, v) => console.log(e, v)} // [Optional] fires when change/drag starts
        onChangeEnd={(e, v) => console.log(e, v)} // [Optional] fires when change/drag ends

        max={50} // [Optional] [Default: 100]
        min={-20} // [Optional] [Default: 0]
        preValue={10} // [Optional] [Default: 0] to set prefilled value
        value={0} // [Optional] this one is very important - it won't update on change and you shouldn't assign the updated value on it. The purpose of using this prop is to set any data to set during the runtime (ex. any async value)

        preModal={(value) => Math.round(value) } // [Optional] to show a predictional tooltip, you should pass a function and return the filtered value to it. If the function returns undefined, it'll show the current value on the tooltip
      />
    )
  }
}
```

