export interface IAuthUserInfo {
  /**
   * JWTトークン
   */
  jwtToken: string;

  /**
   * ログインしているか
   * ログインしている場合は、jwtTokenに値が保存される
   */
  isAuth: boolean;
}
