/** @jsxImportSource @emotion/react */
import React from 'react';

import { buttonRemoveCss, buttonRemoveWrapperCss } from './styles';

export const ButtonRemove = ({ onClick, children }) => {
  const handleButton = () => {
    onClick();
  };

  return (
    <div css={buttonRemoveWrapperCss}>
      <button css={buttonRemoveCss} onClick={handleButton}>{children}</button>
    </div>
  );
};
