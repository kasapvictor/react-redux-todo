/** @jsxImportSource @emotion/react */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CheckboxComplete, Spinner } from '@react-redux-todos/core-components';
import { IDLE_STATUS, LOADING_STATUS } from '@react-redux-todos/core-constants';

import { checkboxWrapper } from './styles';
import { resetUpdatingStatus, todoUpdatingId, updateTodo } from './todoSlice';

export const CompleteCheckbox = ({ todo }) => {
  const dispatch = useDispatch();
  const todoStatusUpdate = useSelector((state) => state.todos.statusUpdate);
  const todoUpdatingCurrentId = useSelector((state) => state.todos.updatingTodoId);
  const { id: todoId, todo: name, completed, userId } = todo;

  const handleCompleted = () => {
    const result = dispatch(updateTodo({ id: todoId, todo: name, userId, completed: !completed })).unwrap();
    dispatch(todoUpdatingId(todoId));

    result.then(() => {
      dispatch(resetUpdatingStatus());
    });
  };

  return (
    <div css={checkboxWrapper}>
      {todoUpdatingCurrentId === todoId && todoStatusUpdate === LOADING_STATUS && <Spinner size="20px" />}
      {(todoUpdatingCurrentId !== todoId || todoStatusUpdate === IDLE_STATUS) && (
        <CheckboxComplete todoId={todoId} completed={completed} onChange={handleCompleted}/>
      )}
    </div>
  );
};
