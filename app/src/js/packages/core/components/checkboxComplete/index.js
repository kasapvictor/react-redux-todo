/** @jsxImportSource @emotion/react */
import React from 'react';

import { checkboxLabelCss, checkboxLabelCompletedCss } from './styles';

export const CheckboxComplete = ({ todoId, completed, onChange }) => {
  const handleCompleted = () => {
    onChange();
  };

  const styles = completed ? checkboxLabelCss : checkboxLabelCompletedCss;

  return (
    <label css={styles} htmlFor={`todo-checkbox-${todoId}`}>
      <input
        type="checkbox"
        id={`todo-checkbox-${todoId}`}
        checked={completed}
        onChange={handleCompleted}
      />
    </label>
  );
};
