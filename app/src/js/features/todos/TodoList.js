import React from 'react';
import { useSelector } from 'react-redux';

import { Todo } from './Todo';
import { selectTodosIds } from './todoSlice';

export const TodoList = () => {
  const todosIds = useSelector(selectTodosIds);
  const filteredTodosIds = useSelector((state) => state.todos.filteredTodosIds);
  const ids = filteredTodosIds.length === 0 ? todosIds : filteredTodosIds;

  return (
    <div className="todosBody">
      <ul className="todoList">
        {ids.map((todoId) => (
          <Todo key={todoId} todoId={todoId} />
        ))}
      </ul>
    </div>
  );
};
