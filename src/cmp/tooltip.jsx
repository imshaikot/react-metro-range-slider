import React from 'react';

const Tooltip = (props) => {
  const offsetLeft = props.offsetLeft - (props.text && props.text.length > 2 ?
     ((props.text.length - 2) * 5) : 0);
     console.log(props.offsetLeft, offsetLeft);
  return (
    <div className="em-modal" style={{top: props.offsetTop,
      left: offsetLeft }}>
      <p className="em-title">{props.text}</p>
    </div>
  );
};

export default Tooltip;
