import React, { useState } from 'react';

export const Button = ({ children }) => {
  const [text, setText] = useState('Hello');

  const handleButton = () => {
    setText('Bla Bla Bla');
  };

  return (<button onClick={handleButton}>{text} {children}</button>);
};
