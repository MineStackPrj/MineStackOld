/**
 * エラーの抽象クラス
 */
export abstract class BaseError extends Error {
  /**
   * コンストラクト
   * @param message エラーメッセージ
   */
  public constructor(public readonly message: string) {
    super();
    this.name = new.target.name;
  }
}
