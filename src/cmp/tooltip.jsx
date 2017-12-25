import React from 'react';

const Tooltip = (props) => {
  const l = props.text.length;
  const t = String(props.text);
  const offsetLeft = props.offsetLeft - (t && l > 2 ? ((l - 2) * 5) : 0);
  return (
    <div
      className="em-modal"
      style={{ top: props.offsetTop, left: offsetLeft }}
    >
      <p className="em-title">
        {t}
      </p>
    </div>
  );
};

export default Tooltip;
