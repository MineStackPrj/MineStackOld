/**
 * レスポンス定義
 */
export interface IResponse<T> {
  readonly code: number;
  readonly message: string;
  readonly value?: T;
  toString(): string;
}

/**
 * 成功レスポンス
 */
export class SuccessResponse<T> implements IResponse<T> {
  public readonly code: number = 200;
  public readonly message: string = 'OK';
  /**
   * コンストラクト
   * @param value 返却したいオブジェクト
   */
  public constructor(public readonly value?: T) {}

  /**
   * JSON文字列に変換
   */
  public toString(): string {
    return JSON.stringify(this);
  }
}

/**
 * エラーレスポンスの抽象クラス
 */
export abstract class ErrorResponse implements IResponse<undefined> {
  /**
   * コンストラクト
   * @param code エラーコード
   * @param message エラーメッセージ
   */
  public constructor(public readonly code: number, public readonly message: string) {}

  /**
   * JSON文字列に変換
   */
  public toString(): string {
    return JSON.stringify(this);
  }
}
