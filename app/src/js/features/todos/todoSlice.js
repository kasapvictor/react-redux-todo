import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const URL_FETCH_ALL = 'https://dummyjson.com/todos';

const IDLE_STATUS = 'idle';
const LOADING_STATUS = 'loading';
const SUCCESS_STATUS = 'succeeded';
const FAILED_STATUS = 'failed';

const todosAdapter = createEntityAdapter();
const initialState = todosAdapter.getInitialState({
  statusFetch: IDLE_STATUS,
  statusUpdate: IDLE_STATUS,
  statusRemove: IDLE_STATUS,
  filteredTodosIds: [],
  error: null,
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(URL_FETCH_ALL);

  return response.data;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    resetUpdatingStatus: (state) => {
      state.statusUpdate = IDLE_STATUS;
    },
    resetRemovingStatus: (state) => {
      state.statusRemove = IDLE_STATUS;
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
      });
  },
});

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodosIds,
} = todosAdapter.getSelectors((state) => state.todos);

export const { resetUpdatingStatus, resetRemovingStatus } = todosSlice.actions;

export const selectTodosByUser = createSelector([selectAllTodos, (state, userId) => userId], (todos, userId) =>
  todos.filter((todo) => +todo.id === +userId),
);

export default todosSlice.reducer;
