import React from 'react';
import { useDispatch } from 'react-redux';

import { ButtonRemove } from '@react-redux-todos/core-components-button-remove';

import { removeTodo, resetRemovingStatus } from './todoSlice';

export const RemoveButton = ({ todoId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    const result = dispatch(removeTodo({ id: todoId })).unwrap();
    result.then(() => {
      dispatch(resetRemovingStatus());
    });
  };

  return (
    <ButtonRemove onClick={handleRemove}>
      <span className="textHide">Remove</span>
      <span className="material-icons-rounded">cancel</span>
    </ButtonRemove>
  );
};
