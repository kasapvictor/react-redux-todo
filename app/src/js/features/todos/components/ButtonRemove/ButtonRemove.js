import React from 'react';
import { useDispatch } from 'react-redux';

import { ButtonRemove as ButtonRemoveEl } from '@react-redux-todos/core-components-button-remove';

import { removeTodo, resetRemovingStatus } from '../../todoSlice';

export const ButtonRemove = ({ todoId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    const result = dispatch(removeTodo({ id: todoId })).unwrap();
    result.then(() => {
      dispatch(resetRemovingStatus());
    });
  };

  return (
    <ButtonRemoveEl onClick={handleRemove}>
      <span className="textHide">Remove</span>
      <span className="material-icons-rounded">cancel</span>
    </ButtonRemoveEl>
  );
};
