import { IAuthUserInfo } from './types/AuthUserInfo';

type StorageSetter = {
  UserInfo: IAuthUserInfo;
};

/**
 * ローカルストレージに値を保存する
 * @param key StorageSetter内のキーを指定する
 * @param item Keyで指定したStorageSetter内のオブジェクト
 */
export function setLocalStorage<T extends StorageSetter, U extends keyof T>(key: U, item: T[U]): void {
  localStorage.setItem(key.toString(), JSON.stringify(item));
}

/**
 * 指定したキーのローカルストレージオブジェクトを取得する
 * @param key StorageSetter内のキーを指定する
 */
export function getLocalStorage<T extends StorageSetter, U extends keyof T>(key: U): T[U] | undefined {
  const item = localStorage.getItem(key.toString());
  return item ? JSON.parse(item) : undefined;
}
