/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';

import { FILTERED_BY_ALL, FILTERED_BY_ACTIVE, FILTERED_BY_COMPLETED } from '@react-redux-todos/core-constants';

import { selectTodoById } from '../../todoSlice';
import { CompleteCheckbox, Name, ButtonRemove } from '../index';

import { todoCss, todoCompletedCss, todoBody } from './styles';

export const Todo = ({ todoId }) => {
  const filteredBy = useSelector((state) => state.todos.filteredBy);
  const todo = useSelector((state) => selectTodoById(state, todoId));
  const { completed } = todo;

  const todoItem = {
    [FILTERED_BY_ALL]: todo,
    [FILTERED_BY_ACTIVE]: !completed ? todo : null,
    [FILTERED_BY_COMPLETED]: completed ? todo : null,
  };

  const todoFiltered = todoItem[filteredBy];

  const todoStyles = completed ? todoCss : todoCompletedCss;

  return (
    <>
      {todoFiltered && (
        <li css={todoStyles}>
          <div css={todoBody}>
            <CompleteCheckbox todo={todoFiltered} />
            <Name todo={todoFiltered}/>
            <ButtonRemove todoId={todoId} />
          </div>

          <div>
            <div className="meta todoMeta">
              <span className="textSmall metaItem">ID: {todoId}</span>
              <span className="textSmall metaItem">USER ID: {todoFiltered.userId}</span>
            </div>
          </div>
        </li>
      )}
    </>
  );
};
