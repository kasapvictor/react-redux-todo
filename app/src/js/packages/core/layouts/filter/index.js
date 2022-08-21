/** @jsxImportSource @emotion/react */
import React from 'react';

import { filterCss, filterButtonsCss } from './styles';

export const Filter = ({ children }) => (
  <div css={filterCss}>
    <div css={filterButtonsCss}>{children}</div>
  </div>
);
