import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Spinner } from '../../components/Spinner';

import { fetchTodos, selectTodoById, selectTodosIds } from './todoSlice';

const TodoItem = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId));
  const { todo: name, completed } = todo;

  const classNameTodo = classNames('todo', {
    todoCompleted: completed,
  });

  const classNameTodoName = classNames('todoName', {
    todoNameCompleted: completed,
  });

  const handleCompleted = (id) => () => {
    console.log('ID', id);
  };

  console.log('todo', todo);

  return (
    <li className={classNameTodo}>
      <div className="todoBody">
        <div className="todoCheckBox">
          <label htmlFor={`todo-checkbox-${todoId}`}>
            <span>lklklk</span>
            <input
              type="checkbox"
              className="todoCheckBoxInput"
              id={`todo-checkbox-${todoId}`}
              checked={completed}
              onChange={handleCompleted(todoId)}
            />
          </label>
        </div>
        <div className={classNameTodoName}>{name}</div>
      </div>

      <div className="todoFooter">
        <div className="meta todoMeta">
          <span className="text--small meta__item">ID: {todoId}</span>
          <span className="text--small meta__item">USER ID: {todo.userId}</span>
        </div>
      </div>
    </li>
  );
};

const RenderTodos = () => {
  const todosIds = useSelector(selectTodosIds);
  const filteredTodosIds = useSelector((state) => state.todos.filteredTodosIds);
  const ids = filteredTodosIds.length === 0 ? todosIds : filteredTodosIds;

  return ids.map((todoId) => <TodoItem key={todoId} todoId={todoId} />);
};

export const Todos = () => {
  const dispatch = useDispatch();
  const todoStatus = useSelector((state) => state.todos.statusFetch);
  const todosError = useSelector((state) => state.todos.error);

  useEffect(() => {
    if (todoStatus === 'idle') {
      dispatch(fetchTodos());
    }
  }, [todoStatus, dispatch]);

  return (
    <section className="todos">
      {todoStatus === 'failed' && <div className="error__message">{todosError}</div>}
      {todoStatus === 'loading' && <Spinner text="Loading..." />}
      {todoStatus === 'succeeded' && (
        <ul className="todoList">
          <RenderTodos />
        </ul>
      )}
    </section>
  );
};
