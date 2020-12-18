export interface IUser {
  /**
   * ユーザを一意に指定するID
   */
  _id: any;
  /**
   * メールアドレス（一意）
   */
  email: string;
  /**
   * ユーザー名
   */
  username: string;
  /**
   * パスワード
   */
  password: string;
}
