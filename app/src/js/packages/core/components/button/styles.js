/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  p,
  color10,
  color2,
  color3,
  color4,
  color6,
  color7,
  color8,
  color9,
  borderRadius,
} from '@react-redux-todos/core-styles';

const common = `
  display: inline-block;
  ${p(3, 10, 3, 10)};
  ${borderRadius(4)};
  cursor: pointer;
  border: 1px solid;
`;

export const buttonCss = css`
  ${common}
  border-color: ${color3};
  background-color: ${color3};
  color: ${color2};

  &:hover {
   background-color: ${color2};
   color: ${color3};
  }

  &:active {
   background-color: ${color10};
   color: ${color2};
   border-color: ${color10};
  }

  &:disabled {
    background-color: ${color7};
    border-color: ${color7};
    cursor: not-allowed;

    &:hover {
      color: ${color2};
      background-color: ${color7};
      borderColor: ${color7};
    }
  }
`;

export const buttonDefaultActiveCss = css`
  ${buttonCss}

  background-color: ${color10};
  color: ${color2};
  border-color: ${color10};

  &:hover {
    background-color: ${color10};
    color: ${color2};
    border-color: ${color10};
  }

  &:active {
   background-color: ${color10};
    color: ${color2};
    border-color: ${color10};
  }
`;

export const buttonActiveCss = css`
  ${common}

  background-color: ${color6};
  border-color: ${color8};
  color: ${color2};

  &:hover {
    color: ${color6};
    background-color: ${color2}
  }

  &:active {
    background-color: ${color8};
    color: ${color2};
  }
`;

export const buttonActiveActiveCss = css`
  ${buttonActiveCss}

  background-color: ${color8};
  color: ${color2};

  &:hover {
    background-color: ${color8};
    color: ${color2};
  }

  &:active {
    background-color: ${color8};
    color: ${color2};
  }
`;

export const buttonSuccessCss = css`
  ${common}

  background-color: ${color4};
  border-color: ${color9};
  color: ${color2};

  &:hover {
    color: ${color4};
  }
  &:active {
    background-color: ${color9};
    color: ${color2};
  }
  &:hover {
    background-color: ${color9};
    color: ${color2};
  }
`;

export const buttonSuccessActiveCss = css`
  ${buttonSuccessCss}

   background-color: ${color9};
   color: ${color2};

  &:active {
   background-color: ${color9};
   color: ${color2};
  }

  &:hover {
   background-color: ${color9};
   color: ${color2};
  }
`;
