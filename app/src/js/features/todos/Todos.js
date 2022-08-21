/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from '@react-redux-todos/core-components-spinner';
import {
  IDLE_STATUS,
  LOADING_STATUS,
  SUCCESS_STATUS,
  FAILED_STATUS,
} from '@react-redux-todos/core-constants';

import { Filter } from './Filter';
import { TodoList } from './TodoList';
import {
  fetchTodos,
} from './todoSlice';

export const Todos = () => {
  const dispatch = useDispatch();
  const todoStatus = useSelector((state) => state.todos.statusFetch);
  const todosError = useSelector((state) => state.todos.error);

  useEffect(() => {
    if (todoStatus === IDLE_STATUS) {
      dispatch(fetchTodos());
    }
  }, [todoStatus, dispatch]);

  return (
    <section className="todos">
      {todoStatus === FAILED_STATUS && <div className="errorMessage">{todosError}</div>}
      {todoStatus === LOADING_STATUS && <Spinner text="Loading..." />}
      {todoStatus === SUCCESS_STATUS && (
        <div className="todosInner">
          <Filter />
          <TodoList />
        </div>
      )}
    </section>
  );
};
