/** @jsxImportSource @emotion/react */
import React from 'react';

import {
  spinnerCss,
  spinnerLoader,
  spinnerTitle,
} from './styles';

export const Spinner = ({ text = '', size = '50px' }) => {
  const header = text ? <h4 css={spinnerTitle}>{text}</h4> : null;

  return (
    <div css={spinnerCss}>
      {header}
      <span css={spinnerLoader} style={{ height: size, width: size }} />
    </div>
  );
};
