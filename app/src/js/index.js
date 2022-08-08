import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { store, fetchUsers } from './store';

import '../scss/styles.scss';

const init = () => {
  store.dispatch(fetchUsers());

  const container = document.getElementById('root-container');

  if (container) {
    const root = createRoot(container);

    root.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
  }
};

init();
