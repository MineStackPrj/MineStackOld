/**
 * @file axiosWrap.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import axios from 'axios';

import { IResponseBodyType } from '@type-def-prj/response/IResponseType';

import { ApiError, AxiosError } from './axiosWrapError';

/**
 * Axiosのラッパー
 * @param path Api path excluding '/api'. ex)'/auth/login'
 * @param method Http Method
 * @param requestBody Request body to be used when call apis.
 * @typeParam T - Type of response value excluding statusCode and message.
 * @throws {ApiError} Get Error Api Response.
 * @throws {AxiosError} Axios Error. ex) fail calling api.
 */
export const callApis = async <T>(path: string, method: Method, requestBody?: any): Promise<T> => {
  const requestPath = `${apiPath}${path}`;
  let axiosResult;

  try {
    switch(method) {
    case 'GET':
      axiosResult = await axios.get<IResponseBodyType<T>>(requestPath);
      break;
    case 'POST':
      axiosResult = await axios.post<IResponseBodyType<T>>(requestPath, requestBody);
      break;
    case 'DELETE':
      axiosResult = await axios.delete<IResponseBodyType<T>>(requestPath, requestBody);
      break;
    case 'PUT':
      axiosResult = await axios.put<IResponseBodyType<T>>(requestPath, requestBody);
      break;
    case 'PATCH':
      axiosResult = await axios.patch<IResponseBodyType<T>>(requestPath, requestBody);
      break;
    }

    if(axiosResult === undefined) {
      throw new AxiosError('result undefined');
    }

    return axiosResult.data.value;

  } catch (err) {
    if(err.response) {

      // APIからのErrorレスポンス
      const errorData: IResponseBodyType<undefined> = {
        statusCode: err.response.data.statusCode,
        message   : err.response.data.message,
        value     : undefined
      };
      throw new ApiError(errorData);

    } else if(err.request) {

      // Requestの作成はできたがResponseがない
      throw new AxiosError(err.request);
    } else {

      // Requestもない
      throw new AxiosError(err);
    }
  }
};

const apiPath = '/api';

const methodList = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] as const;
type Method = typeof methodList[number];

