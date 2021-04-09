/**
 * @file axiosWrap.spec.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import axios from 'axios';

import { callApis } from './axiosWrap';
import { ApiError, AxiosError } from './axiosWrapError';

jest.mock('axios');

describe('axiosWrap', () => {

  beforeEach(() => {

  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('get Success', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */

    const getSpy = jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        value: {
          test: 'test'
        }
      }
    });

    /* ------------------------ Execute the function under test ------------------------ */

    let result;
    try {
      result = await callApis('/test', 'GET');
    } catch (e) {
      result = e;
    }

    /* ------------------------------- Evaluation Items -------------------------------- */

    expect(getSpy).toHaveBeenNthCalledWith(1, '/api/test');
    expect(result).toEqual({ test: 'test' });
  });

  it('post Success', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */

    const postSpy = jest.spyOn(axios, 'post').mockResolvedValue({
      data: {}
    });

    /* ------------------------ Execute the function under test ------------------------ */

    let result;
    try {
      result = await callApis('/test', 'POST', { test: 'aaa' });
    } catch (e) {
      result = e;
    }

    /* ------------------------------- Evaluation Items -------------------------------- */

    expect(postSpy).toHaveBeenNthCalledWith(1, '/api/test', { test: 'aaa' });
    expect(result).toEqual(undefined);
  });

  it('delete Success', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */

    const getSpy = jest.spyOn(axios, 'delete').mockResolvedValue({
      data: {}
    });

    /* ------------------------ Execute the function under test ------------------------ */

    let result;
    try {
      result = await callApis('/test', 'DELETE', { test: 'aaa' });
    } catch (e) {
      result = e;
    }

    /* ------------------------------- Evaluation Items -------------------------------- */

    expect(getSpy).toHaveBeenNthCalledWith(1, '/api/test', { test: 'aaa' });
    expect(result).toEqual(undefined);
  });

  it('put Success', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */

    const getSpy = jest.spyOn(axios, 'put').mockResolvedValue({
      data: {}
    });

    /* ------------------------ Execute the function under test ------------------------ */

    let result;
    try {
      result = await callApis('/test', 'PUT', { test: 'body' });
    } catch (e) {
      result = e;
    }

    /* ------------------------------- Evaluation Items -------------------------------- */

    expect(getSpy).toHaveBeenNthCalledWith(1, '/api/test', { test: 'body' });
    expect(result).toEqual(undefined);
  });

  it('patch Success', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */

    const getSpy = jest.spyOn(axios, 'patch').mockResolvedValue({
      data: {}
    });

    /* ------------------------ Execute the function under test ------------------------ */

    let result;
    try {
      result = await callApis('/test', 'PATCH', { test: 'body' });
    } catch (e) {
      result = e;
    }

    /* ------------------------------- Evaluation Items -------------------------------- */

    expect(getSpy).toHaveBeenNthCalledWith(1, '/api/test', { test: 'body' });
    expect(result).toEqual(undefined);
  });

  it('API Error', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */

    const getSpy = jest.spyOn(axios, 'get').mockRejectedValue({
      response: {
        data: {
          statusCode: 400,
          message   : 'aaa',
          value     : {
            test: 'test'
          }
        }
      }
    });

    /* ------------------------ Execute the function under test ------------------------ */

    let result;
    try {
      result = await callApis('/test', 'GET');
    } catch (e) {
      result = e;
    }

    /* ------------------------------- Evaluation Items -------------------------------- */
    expect(getSpy).toHaveBeenNthCalledWith(1, '/api/test');
    expect(result).toBeInstanceOf(ApiError);
  });

  it('Axios Error(Result Undefined)', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */

    const getSpy = jest.spyOn(axios, 'get').mockResolvedValue(undefined);

    /* ------------------------ Execute the function under test ------------------------ */

    let result;
    try {
      result = await callApis('/test', 'GET');
    } catch (e) {
      result = e;
    }

    /* ------------------------------- Evaluation Items -------------------------------- */
    expect(getSpy).toHaveBeenNthCalledWith(1, '/api/test');
    expect(result).toBeInstanceOf(AxiosError);
  });

  it('send Error (response undefined)', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */

    const getSpy = jest.spyOn(axios, 'get').mockRejectedValue({
      request: {
        test: ''
      }
    });

    /* ------------------------ Execute the function under test ------------------------ */

    let result;
    try {
      result = await callApis('/test', 'GET');
    } catch (e) {
      result = e;
    }

    /* ------------------------------- Evaluation Items -------------------------------- */
    expect(getSpy).toHaveBeenNthCalledWith(1, '/api/test');
    expect(result).toBeInstanceOf(AxiosError);
  });

  it('make request Error (request undefined)', async () => {

    /* ------------------------------ Test preprocessing ------------------------------- */

    const getSpy = jest.spyOn(axios, 'get').mockRejectedValue({});

    /* ------------------------ Execute the function under test ------------------------ */

    let result;
    try {
      result = await callApis('/test', 'GET');
    } catch (e) {
      result = e;
    }

    /* ------------------------------- Evaluation Items -------------------------------- */
    expect(getSpy).toHaveBeenNthCalledWith(1, '/api/test');
    expect(result).toBeInstanceOf(AxiosError);
  });
});
