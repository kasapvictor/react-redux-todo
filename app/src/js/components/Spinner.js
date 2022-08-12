import React from 'react';

export const Spinner = ({ text = '', size = '5rem' }) => {
  const header = text ? <h4>{text}</h4> : null;

  return (
    <div className="spinner">
      {header}
      <span className="spinner__loader loader" style={{ height: size, width: size }} />
    </div>
  );
};
