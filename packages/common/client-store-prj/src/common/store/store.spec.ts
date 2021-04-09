/**
 * @file store.spec.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import { store } from './store';

describe('store', () => {

  it('call store', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */
    /* ------------------------ Execute the function under test ------------------------ */
    const testStore = store;

    /* ------------------------------- Evaluation Items -------------------------------- */
    expect(testStore).toEqual(store);
  });

});
