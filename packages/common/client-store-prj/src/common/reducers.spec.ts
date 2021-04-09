/**
 * @file reducers.spec.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import { indexReducer } from './reducers';

describe('reducers', () => {

  it('call combine reducers', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */
    /* ------------------------ Execute the function under test ------------------------ */
    const reducers = indexReducer;

    /* ------------------------------- Evaluation Items -------------------------------- */
    expect(reducers).toEqual(indexReducer);
  });

});
