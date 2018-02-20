import React from 'react';
import './index.scss';

const component = ({onClick, className, text, disabled}) => (
  <button onClick={onClick} className={className, "button"} disabled={disabled}>
    {text}
  </button>
)

export default component;
