/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IDLE_STATUS } from '@react-redux-todos/core-constants';

import { resetUpdatingStatus, todoUpdatingId, updateTodo } from '../../todoSlice';

import { inputCss, nameCompletedCss } from './styles';

export const Name = ({ todo }) => {
  const dispatch = useDispatch();
  const { id: todoId, todo: todoName, completed } = todo;
  const updatingStatus = useSelector((state) => state.todos.statusUpdate);

  const [name, setName] = useState(todoName);
  const [statusChange, setStatusChange] = useState(IDLE_STATUS);

  const inputNameRef = useRef(null);

  const todoNameStyles = completed ? '' : nameCompletedCss;

  const dispatchUpdateTodo = () => {
    const result = dispatch(updateTodo({ id: todoId, todo: name, completed })).unwrap();
    dispatch(todoUpdatingId(todoId));

    result.then(() => {
      dispatch(resetUpdatingStatus());
    });
  };

  const handleChangeName = ({ target: { value } }) => {
    setName(value);
  };

  const handleClickName = () => {
    setStatusChange('editing');
  };

  const handleChangeNameSave = () => {
    setStatusChange(IDLE_STATUS);
    if (todoName !== name) {
      dispatchUpdateTodo();
    }
  };

  const handleChangeNameSaveClick = ({ code, keyCode }) => {
    if (code === 'Enter' || keyCode === '13') {
      setStatusChange(IDLE_STATUS);
      if (todoName !== name) {
        dispatchUpdateTodo();
      }
    }
  };

  useEffect(() => {
    if (statusChange === 'editing') {
      inputNameRef.current.select();
    }
  }, [statusChange]);

  return (
    <>
      {statusChange === 'editing' && updatingStatus === IDLE_STATUS && (
        <input
          css={inputCss}
          type="text"
          value={name}
          onChange={handleChangeName}
          onBlur={handleChangeNameSave}
          onKeyDown={handleChangeNameSaveClick}
          ref={inputNameRef}
        />
      )}
      {statusChange === IDLE_STATUS && (
        <div css={todoNameStyles} onClick={handleClickName}>
          {name}
        </div>
      )}
    </>
  );
};
