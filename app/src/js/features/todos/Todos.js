import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Spinner } from '../../components/Spinner';

import {
  fetchTodos,
  updateTodo,
  removeTodo,
  todoUpdatingId,
  selectTodoById,
  selectTodosIds,
  resetUpdatingStatus,
  resetRemovingStatus,
} from './todoSlice';

const TodoName = ({ todo }) => {
  const dispatch = useDispatch();
  const { id: todoId, todo: todoName, completed, userId } = todo;
  const updatingStatus = useSelector((state) => state.todos.statusUpdate);

  const [name, setName] = useState(todoName);
  const [statusChange, setStatusChange] = useState('idle');

  const inputNameRef = useRef(null);

  const classNameTodoName = classNames('todoName', {
    todoNameCompleted: completed,
  });

  const dispatchUpdateTodo = () => {
    const result = dispatch(updateTodo({ id: todoId, todo: name, userId, completed })).unwrap();
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
    setStatusChange('idle');
    dispatchUpdateTodo();
  };

  const handleChangeNameSaveClick = ({ code, keyCode }) => {
    if (code === 'Enter' || keyCode === '13') {
      setStatusChange('idle');
      dispatchUpdateTodo();
    }
  };

  useEffect(() => {
    if (statusChange === 'editing') {
      inputNameRef.current.select();
    }
  }, [statusChange]);

  return (
    <>
      {statusChange === 'editing' && updatingStatus === 'idle' && (
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
      {statusChange === 'idle' && (
        <div className={classNameTodoName} onClick={handleClickName}>
          {name}
        </div>
      )}
    </>
  );
};

const TodoCompleteCheckbox = ({ todo }) => {
  const dispatch = useDispatch();
  const todoStatusUpdate = useSelector((state) => state.todos.statusUpdate);
  const todoUpdatingCurrentId = useSelector((state) => state.todos.updatingTodoId);
  const { id: todoId, todo: name, completed, userId } = todo;

  const classNameTodoCheckbox = classNames('todoCheckBox', {
    todoCheckBoxCompleted: completed,
  });

  const handleCompleted = () => {
    const result = dispatch(updateTodo({ id: todoId, todo: name, userId, completed: !completed })).unwrap();
    dispatch(todoUpdatingId(todoId));

    result.then(() => {
      dispatch(resetUpdatingStatus());
    });
  };

  return (
    <div className="todoCheckBoxWrapper">
      {todoUpdatingCurrentId === todoId && todoStatusUpdate === 'loading' && <Spinner size="20px" />}
      {(todoUpdatingCurrentId !== todoId || todoStatusUpdate === 'idle') && (
        <label className={classNameTodoCheckbox} htmlFor={`todo-checkbox-${todoId}`}>
          <input
            type="checkbox"
            className="todoCheckBoxInput"
            id={`todo-checkbox-${todoId}`}
            checked={completed}
            onChange={handleCompleted}
          />
        </label>
      )}
    </div>
  );
};

const TodoRemoveButton = ({ todoId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    const result = dispatch(removeTodo({ id: todoId })).unwrap();
    result.then(() => {
      dispatch(resetRemovingStatus());
    });
  };
  return (
    <div className="todoRemoveWrapper">
      <button className="todoRemove" onClick={handleRemove}>
        <span className="textHide">Remove</span>
      </button>
    </div>
  );
};

const TodoItem = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId));
  const { completed } = todo;

  const classNameTodo = classNames('todo', {
    todoCompleted: completed,
  });

  return (
    <li className={classNameTodo}>
      <div className="todoBody">
        <TodoCompleteCheckbox todo={todo} />
        <TodoName todo={todo} />
        <TodoRemoveButton todoId={todoId} />
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
