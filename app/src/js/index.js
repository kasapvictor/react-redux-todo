import React from 'react';
import { Provider } from 'react-redux';

import { createRoot } from 'react-dom/client';

import '@fontsource/merriweather';
import '@fontsource/merriweather/900.css';
import '@fontsource/merriweather/300.css';
import '@fontsource/material-icons-rounded';

import '../scss/styles.scss';

import { App } from './App';
import { store } from './store';

const init = () => {
  const container = document.getElementById('root-container');

  if (container) {
    const root = createRoot(container);

    root.render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  }
};

init();
