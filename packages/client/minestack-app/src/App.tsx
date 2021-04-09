/**
 * @file App.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */
import './App.css';

import React from 'react';

import logo from '@static/svg/logo.svg';

/**
 * アプリケーションのメインコンポーネント
 */
export default function App(): JSX.Element {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" data-testid="APP-Link">
          Learn React
        </a>
      </header>
    </div>
  );
}
