/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color4, color5, color9 } from '@react-redux-todos/core-styles';

export const checkboxLabelCss = css`
  display: block;
  width: 20px;
  min-width: 20px;
  height: 20px;
  min-height: 20px;
  border: 3px solid ${color5};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    border-color: ${color9};
    background-color: ${color4};
  }
`;

export const checkboxLabelCompletedCss = css`
  ${checkboxLabelCss}

  border-color: ${color9};
  background-color: ${color4};
`;
