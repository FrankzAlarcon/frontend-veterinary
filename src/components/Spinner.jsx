import React from 'react';
import '../styles/spinner.css';

function Spinner({ type }) {
  return (
    <div className={`spinner ${type === 'lazy' ? 'lazy' : ''}`}>
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  );
}

export default Spinner;
