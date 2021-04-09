/**
 * @file axiosWrapError.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

import { IResponseBodyType } from '@type-def-prj/response/IResponseType';

export class ApiError {

  /**
   * エラーレスポンスボディ
   */
  public data: IResponseBodyType<undefined>

  /**
   * コンストラクター
   * @param data エラーレスポンスボディ
   */
  public constructor(data: IResponseBodyType<undefined>) {
    this.data = data;
  }
}

export class AxiosError {

  /**
   * エラー情報
   */
  public data: any

  /**
   * コンストラクタ
   * @param data エラー情報
   */
  public constructor(data: any) {
    this.data = data;
  }
}
