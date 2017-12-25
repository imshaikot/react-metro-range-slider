import React from 'react';

const Tooltip = (props) => {
  const l = props.text.length;
  const offsetLeft = props.offsetLeft - (props.text && l > 2 ? ((l - 2) * 5) : 0);
  return (
    <div
      className="em-modal"
      style={{ top: props.offsetTop, left: offsetLeft }}
    >
      <p className="em-title">
        {props.text}
      </p>
    </div>
  );
};

export default Tooltip;
