/**
 * @file App.spec.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { act } from '@testing-library/react';

import App from './App';
import { querySelector } from './QuerySelector';

describe('App', () => {
  let container: HTMLDivElement | undefined = undefined;
  beforeEach(() => {

    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {

    // cleanup on exiting
    unmountComponentAtNode(container as HTMLDivElement);
    container?.remove();
    container = undefined;
  });

  test('renders learn react link', () => {
    act(() => {
      render(<App />, container as any);
    });
    expect(querySelector(container, 'APP-Link')?.textContent).toEqual('Learn React');
  });
});
