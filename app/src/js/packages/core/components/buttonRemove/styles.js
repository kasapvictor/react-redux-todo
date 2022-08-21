/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color5 } from '@react-redux-todos/core-styles';

export const buttonRemoveWrapperCss = css`
  margin-left: auto;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

export const buttonRemoveCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  color: ${color5};
  cursor: pointer;
  opacity: 1;
  cursor: pointer;
`;
