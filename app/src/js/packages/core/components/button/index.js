/** @jsxImportSource @emotion/react */
import React from 'react';

import {
  FILTERED_BY_ALL,
  FILTERED_BY_ACTIVE,
  FILTERED_BY_COMPLETED,
} from '@react-redux-todos/core-constants';

import {
  buttonCss,
  buttonActiveCss,
  buttonSuccessCss,
  buttonActiveActiveCss,
  buttonSuccessActiveCss,
  buttonDefaultActiveCss,
} from './styles';

export const Button = ({ variant, isActive, onClick, children }) => {
  const classes = {
    [FILTERED_BY_ALL]: isActive ? buttonDefaultActiveCss : buttonCss,
    [FILTERED_BY_ACTIVE]: isActive ? buttonActiveActiveCss : buttonActiveCss,
    [FILTERED_BY_COMPLETED]: isActive ? buttonSuccessActiveCss : buttonSuccessCss,
  };

  const styles = classes[variant];

  const handleButton = () => {
    onClick();
  };

  return (<button css={styles} onClick={handleButton}>{children}</button>);
};
