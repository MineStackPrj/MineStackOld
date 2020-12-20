import { MinecraftServerType, MinecraftServerVersion } from '@type-def-prj/Minecraft';

import { IServerProperties } from './ServerProperties';

export interface IMinecraftServer {
  /**
   * サーバーを一意に指定するID
   */
  _id: any;

  /**
   * サーバー名
   */
  name: string;

  /**
   * マイクラのバージョン
   */
  version: MinecraftServerVersion;

  /**
   * サーバーの種類
   */
  serverType: MinecraftServerType;

  /**
   * サーバープロパティ
   */
  properties: IServerProperties;

  /**
   * サーバーがホストするポート番号を設定する
   */
  serverPort: number;

  /**
   * サーバー作成日
   */
  created: Date;

  /**
   * サーバー更新日
   */
  updated: Date;
}
