import {
  FAILED_STATUS,
  FILTERED_BY_ACTIVE,
  FILTERED_BY_ALL,
  FILTERED_BY_COMPLETED,
  IDLE_STATUS, LOADING_STATUS,
  SUCCESS_STATUS,
} from '@react-redux-todos/core-constants';
import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const URL_FETCH_ALL = 'https://dummyjson.com/todos';
const URL_UPDATE_TODO = 'https://dummyjson.com/todos/';
const URL_REMOVE_TODO = 'https://dummyjson.com/todos/';

const todosAdapter = createEntityAdapter();
const initialState = todosAdapter.getInitialState({
  statusFetch: IDLE_STATUS,
  statusUpdate: IDLE_STATUS,
  statusRemove: IDLE_STATUS,
  updatingTodoId: null,
  filteredTodosIds: [],
  filteredBy: FILTERED_BY_ALL,
  error: null,
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(URL_FETCH_ALL);

  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (data) => {
  const { id, ...restData } = data;
  const response = await axios.put(`${URL_UPDATE_TODO}/${id}`, restData);

  return response.data;
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (data) => {
  const { id } = data;
  const response = await axios.delete(`${URL_REMOVE_TODO}/${id}`);

  return response.data;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoUpdatingId: (state, action) => {
      state.updatingTodoId = action.payload;
    },
    resetUpdatingStatus: (state) => {
      state.statusUpdate = IDLE_STATUS;
    },
    resetRemovingStatus: (state) => {
      state.statusRemove = IDLE_STATUS;
    },
    filterClear: (state) => {
      state.filteredBy = FILTERED_BY_ALL;
    },
    filterByActive: (state) => {
      state.filteredBy = FILTERED_BY_ACTIVE;
    },
    filteredByCompleted: (state) => {
      state.filteredBy = FILTERED_BY_COMPLETED;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.statusFetch = LOADING_STATUS;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.statusFetch = SUCCESS_STATUS;
        todosAdapter.upsertMany(state, action.payload.todos);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.statusFetch = FAILED_STATUS;
        state.error = action.error.message;
      })
      .addCase(updateTodo.pending, (state) => {
        state.statusUpdate = LOADING_STATUS;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.statusUpdate = SUCCESS_STATUS;
        todosAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            completed: action.payload.completed,
            todo: action.payload.todo,
          },
        });
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.statusUpdate = FAILED_STATUS;
        state.error = action.error.message;
      })
      .addCase(removeTodo.pending, (state) => {
        state.statusRemove = LOADING_STATUS;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.statusRemove = SUCCESS_STATUS;

        const {
          payload: { id },
        } = action;

        todosAdapter.removeOne(state, id);
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.statusRemove = FAILED_STATUS;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodosIds,
} = todosAdapter.getSelectors((state) => state.todos);

export const {
  todoUpdatingId,
  resetUpdatingStatus,
  resetRemovingStatus,
  filterClear,
  filterByActive,
  filteredByCompleted,
} = todosSlice.actions;

/* FOR FILTER BY USER -- NOT USING */
export const selectTodosByUser = createSelector([selectAllTodos, (state, userId) => userId], (todos, userId) =>
  todos.filter((todo) => +todo.id === +userId),
);

export default todosSlice.reducer;
