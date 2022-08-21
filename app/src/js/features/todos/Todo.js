import React from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';

import { CompleteCheckbox } from './CompletedCheckbox';
import { Name } from './Name';
import { RemoveButton } from './RemoveButton';
import { selectTodoById } from './todoSlice';

export const Todo = ({ todoId }) => {
  const filteredBy = useSelector((state) => state.todos.filteredBy);
  const todo = useSelector((state) => selectTodoById(state, todoId));
  const { completed } = todo;

  const todoItem = {
    all: todo,
    active: !completed ? todo : null,
    completed: completed ? todo : null,
  };

  const todoFiltered = todoItem[filteredBy];

  const classNameTodo = classNames('todo', {
    todoCompleted: completed,
  });

  return (
    <>
      {todoFiltered && (
        <li className={classNameTodo}>
          <div className="todoBody">
            <CompleteCheckbox todo={todoFiltered} />
            <Name todo={todoFiltered} />
            <RemoveButton todoId={todoId} />
          </div>

          <div className="todoFooter">
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
