/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color3 } from '@react-redux-todos/core-styles';

export const inputCss = css`
  width: 90%;
  border-bottom: 1px solid ${color3};
  font-weight: 100;
  font-style: italic;
`;

export const nameCompletedCss = css`
  text-decoration: line-through;
  opacity: 0.5;
`;
