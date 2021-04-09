/**
 * @file userSlice.spec.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import { userInitialReducer, userReducer, userSignInReducer } from './userSlice';

describe('userSlice', () => {

  it('initial user reducer', () => {
    expect(
      userReducer(
        undefined,
        {} as any
      )
    ).toEqual({
      signInStatus: 'initial',
      userInfo    : { email: '', userId: '', userName: '' }
    });
  });

  it('initial user initial reducer', () => {
    expect(
      userInitialReducer(
        undefined,
        {} as any
      )
    ).toEqual({
      signInStatus: 'initial',
      userInfo    : { email: '', userId: '', userName: '' }
    });
  });

  it('initial user sign in reducer', () => {
    expect(
      userSignInReducer(
        undefined,
        {} as any
      )
    ).toEqual({
      signInStatus: 'signIn',
      userInfo    : { email: '', userId: '', userName: '' }
    });
  });
});

