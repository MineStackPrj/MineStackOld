/**
 * @file IResponseType.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

/**
 * APIのレスポンス
 */
export interface IResponseBodyType<T = any> {

  /**
   * ステータスコード
   */
  statusCode: number;

  /**
   * メッセージ(短文)
   */
  message: string;

  /**
   * 呼び出し元に返却したいデータ
   */
  value: T;
}

export interface IAuthSignInResponseBody {
  idToken: string;
}

