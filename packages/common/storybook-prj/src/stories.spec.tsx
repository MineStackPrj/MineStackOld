/**
 * @file stories.spec.tsx
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { store } from '@stores/store/store';
import initStoryshots from '@storybook/addon-storyshots';
import { addDecorator } from '@storybook/react';

jest.mock('@material-ui/core', () => {
  const materialUI = jest.requireActual('@material-ui/core');
  return {
    ...materialUI,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Fade: (props: {children?: React.ReactNode}): JSX.Element => {
      return (
        <>
          <div>Fade</div>
          <div>{props.children}</div>
        </>
      );
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Backdrop: (props: {children?: React.ReactNode}): JSX.Element => {
      return (
        <>
          <div>Backdrop</div>
          <div>{props.children}</div>
        </>
      );
    }
  };
});

addDecorator(story => (
  <Provider store={store}><MemoryRouter initialEntries={['/', 'posts']}>{story()}</MemoryRouter></Provider>
));

initStoryshots();
