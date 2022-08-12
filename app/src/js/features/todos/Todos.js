import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Spinner } from '../../components/Spinner';

import { fetchTodos, updateTodo, selectTodoById, selectTodosIds, resetUpdatingStatus } from './todoSlice';

const TodoItem = ({ todoId }) => {
  const dispatch = useDispatch();

  const todoStatusUpdate = useSelector((state) => state.todos.statusUpdate);
  const todo = useSelector((state) => selectTodoById(state, todoId));
  const { todo: name, completed, userId } = todo;

  const classNameTodo = classNames('todo', {
    todoCompleted: completed,
  });
  const classNameTodoName = classNames('todoName', {
    todoNameCompleted: completed,
  });
  const classNameTodoCheckbox = classNames('todoCheckBox', {
    todoCheckBoxCompleted: completed,
  });

  const handleCompleted = () => {
    const result = dispatch(updateTodo({ id: todoId, todo: name, userId, completed: !completed })).unwrap();

    result.then(() => {
      dispatch(resetUpdatingStatus());
    });
  };

  return (
    <li className={classNameTodo}>
      <div className="todoBody">
        <div className="todoCheckBoxWrapper">
          <label className={classNameTodoCheckbox} htmlFor={`todo-checkbox-${todoId}`}>
            <input
              type="checkbox"
              className="todoCheckBoxInput"
              id={`todo-checkbox-${todoId}`}
              checked={completed}
              onChange={handleCompleted}
            />
          </label>
        </div>
        <div className={classNameTodoName}>{name}</div>
        <div className="todoRemoveWrapper">
          <button className="todoRemove">
            <span className="textHide">Remove</span>
          </button>
        </div>
      </div>

      <div className="todoFooter">
        <div className="meta todoMeta">
          <span className="textSmall metaItem">ID: {todoId}</span>
          <span className="textSmall metaItem">USER ID: {todo.userId}</span>
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
      {todoStatus === 'failed' && <div className="errorMessage">{todosError}</div>}
      {todoStatus === 'loading' && <Spinner text="Loading..." />}
      {todoStatus === 'succeeded' && (
        <ul className="todoList">
          <RenderTodos />
        </ul>
      )}
    </section>
  );
};
