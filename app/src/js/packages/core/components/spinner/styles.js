/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color2, color3 } from '@react-redux-todos/core-styles';

export const spinnerCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const spinnerLoader = css`
  font-size: 10px;
  margin: 10px;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background: ${color3};
  background: -moz-linear-gradient(left, ${color3} 10%, rgba(128, 0, 255, 0) 42%);
  background: -webkit-linear-gradient(left, ${color3} 10%, rgba(128, 0, 255, 0) 42%);
  background: -o-linear-gradient(left, ${color3} 10%, rgba(128, 0, 255, 0) 42%);
  background: -ms-linear-gradient(left, ${color3} 10%, rgba(128, 0, 255, 0) 42%);
  background: linear-gradient(to right, ${color3} 10%, rgba(128, 0, 255, 0) 42%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: ${color3};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

 &:after {
    background: ${color2};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

export const spinnerTitle = css`
  margin: 5px;
`;
