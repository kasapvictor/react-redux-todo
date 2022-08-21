import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IDLE_STATUS } from '@react-redux-todos/core-constants';
import classNames from 'classnames';

import { resetUpdatingStatus, todoUpdatingId, updateTodo } from './todoSlice';

export const Name = ({ todo }) => {
  const dispatch = useDispatch();
  const { id: todoId, todo: todoName, completed, userId } = todo;
  const updatingStatus = useSelector((state) => state.todos.statusUpdate);

  const [name, setName] = useState(todoName);
  const [statusChange, setStatusChange] = useState(IDLE_STATUS);

  const inputNameRef = useRef(null);

  const classNameTodoName = classNames('todoName', {
    todoNameCompleted: completed,
  });

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
          className="todoChangeInputName"
          type="text"
          value={name}
          onChange={handleChangeName}
          onBlur={handleChangeNameSave}
          onKeyDown={handleChangeNameSaveClick}
          ref={inputNameRef}
        />
      )}
      {statusChange === IDLE_STATUS && (
        <div className={classNameTodoName} onClick={handleClickName}>
          {name}
        </div>
      )}
    </>
  );
};
