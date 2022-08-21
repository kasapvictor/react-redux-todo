/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { p, mb, color2, color4, color11, color12 } from '@react-redux-todos/core-styles';

export const todoCss = css`
  ${mb(4)};
  ${p(3, 3, 3, 3)};
  border: 1px solid ${color4};
  border-radius: 4px;
  background-color: ${color2};
`;

export const todoCompletedCss = css`
    ${todoCss}

    border: 1px solid ${color11};
    background-color: ${color12};
`;

export const todoBody = css`
  display: flex;
  align-items: center;
`;
