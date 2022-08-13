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
  filterClear,
  filterByActive,
  filteredByCompleted,
} from './todoSlice';

const IDLE_STATUS = 'idle';
const LOADING_STATUS = 'loading';
const SUCCESS_STATUS = 'succeeded';
const FAILED_STATUS = 'failed';

const FILTERED_BY_ALL = 'all';
const FILTERED_BY_ACTIVE = 'active';
const FILTERED_BY_COMPLETED = 'completed';

const TodosFilter = () => {
  const dispatch = useDispatch();
  const filteredBy = useSelector((state) => state.todos.filteredBy);

  const handleFilterClear = () => {
    dispatch(filterClear());
  };
  const handleFilterActive = () => {
    dispatch(filterByActive());
  };
  const handleFilterComplete = () => {
    dispatch(filteredByCompleted());
  };

  const classNameFilterButtonClear = classNames('button todoClearedButton', {
    todoClearedButtonActive: filteredBy === FILTERED_BY_ALL,
  });
  const classNameFilterButtonActive = classNames('button todoActiveButton', {
    todoActiveButtonActive: filteredBy === FILTERED_BY_ACTIVE,
  });
  const classNameFilterButtonCompleted = classNames('button todoCompletedButton', {
    todoCompletedButtonActive: filteredBy === FILTERED_BY_COMPLETED,
  });

  return (
    <div className="todosHeader">
      <div className="todoFiltersButtons">
        <button className={classNameFilterButtonClear} onClick={handleFilterClear}>
          All
        </button>
        <button className={classNameFilterButtonActive} onClick={handleFilterActive}>
          Active
        </button>
        <button className={classNameFilterButtonCompleted} onClick={handleFilterComplete}>
          Completed
        </button>
      </div>
    </div>
  );
};

const TodoName = ({ todo }) => {
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
      {todoUpdatingCurrentId === todoId && todoStatusUpdate === LOADING_STATUS && <Spinner size="20px" />}
      {(todoUpdatingCurrentId !== todoId || todoStatusUpdate === IDLE_STATUS) && (
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
            <TodoCompleteCheckbox todo={todoFiltered} />
            <TodoName todo={todoFiltered} />
            <TodoRemoveButton todoId={todoId} />
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

const RenderTodos = () => {
  const todosIds = useSelector(selectTodosIds);
  const filteredTodosIds = useSelector((state) => state.todos.filteredTodosIds);
  const ids = filteredTodosIds.length === 0 ? todosIds : filteredTodosIds;

  return (
    <div className="todosBody">
      <ul className="todoList">
        {ids.map((todoId) => (
          <TodoItem key={todoId} todoId={todoId} />
        ))}
      </ul>
    </div>
  );
};

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
          <TodosFilter />
          <RenderTodos />
        </div>
      )}
    </section>
  );
};
