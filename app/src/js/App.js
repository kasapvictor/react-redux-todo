import React from 'react';
import { Todos } from './features/todos/Todos';

export const App = () => (
  <div className="container">
    <header className="header">
      <h1 className="h1">TODO</h1>
    </header>

    <main className="main">
      <Todos />
    </main>

    <footer className="footer">Footer</footer>
  </div>
);
