/**
 * @file SideMenuSimpleItem.spec.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import { createMemoryHistory } from 'history';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Router } from 'react-router-dom';

import { querySelector } from '@src/QuerySelector';
import { act, fireEvent } from '@testing-library/react';

import { SideMenuSimpleItem } from './SideMenuSimpleItem';

jest.mock('@material-ui/core/Icon', () => (props: {children?: React.ReactNode}): JSX.Element => {
  return (<div>{props.children}</div>);
});

jest.mock('@material-ui/core/ListItem', () => (props: {children?: React.ReactNode, onClick: () => void}): JSX.Element => {
  return (<div data-testid="ListItem" onClick={props.onClick} >{props.children}</div>);
});
jest.mock('@material-ui/core/ListItemIcon', () => (props: {children?: React.ReactNode}): JSX.Element => {
  return (<div>{props.children}</div>);
});
jest.mock('@material-ui/core/ListItemText', () => (props: {children?: React.ReactNode}): JSX.Element => {
  return (<div>{props.children}</div>);
});

describe('SideMenuSimpleItem', () => {
  let container: HTMLDivElement | undefined = undefined;
  beforeEach(() => {

    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.useFakeTimers();
  });

  afterEach(() => {

    // cleanup on exiting
    unmountComponentAtNode(container as HTMLDivElement);
    container?.remove();
    container = undefined;
    jest.useRealTimers();
  });

  it('ListItem onclick', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */

    const history = createMemoryHistory();

    /* ------------------------ Execute the function under test ------------------------ */

    await act(async () => {
      render(<Router history={history}><SideMenuSimpleItem routingPath="/test" icon={'test' as any} title="test" /></Router>, container as any);
    });

    /* ------------------------------- Evaluation Items -------------------------------- */

    expect(history.location.pathname).toBe('/');

    await act(async () => {
      fireEvent.click(querySelector(container, 'ListItem'));
    });

    expect(history.location.pathname).toBe('/test');
  });
});
