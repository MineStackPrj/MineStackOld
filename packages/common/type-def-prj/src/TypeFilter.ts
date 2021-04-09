/**
 * @file TypeFilter.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

/**
 * T型オブジェクトからU型のバリューを持つデータだけを抽出する
 */
export type TypeFilter<T extends Record<string, any>, U> = Pick<
 T,
 {
   [Key in keyof T]: T[Key] extends U ? Key : never;
 }[keyof T]
>;

/**
 * T型オブジェクトからU型のバリューを持つKeyリストを抽出する
 */
export type TypeFilterKeyList<T extends Record<string, any>, U> = keyof TypeFilter<T, U>;
