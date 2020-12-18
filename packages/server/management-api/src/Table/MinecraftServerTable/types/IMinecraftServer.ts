import { MinecraftServerType, MinecraftServerVersion } from '@type-def-prj/Minecraft';

import { IServerProperties } from './ServerProperties';

export interface IMinecraftServer {
  /**
   * サーバを一意に指定するID
   */
  _id: any;

  /**
   * サーバ名
   */
  name: string;

  /**
   * マイクラのバージョン
   */
  version: MinecraftServerVersion;

  /**
   * サーバの種類
   */
  serverType: MinecraftServerType;

  /**
   * サーバプロパティ
   */
  properties: IServerProperties;

  /**
   * サーバがホストするポート番号を設定する
   */
  serverPort: number;

  /**
   * サーバ作成日
   */
  created: Date;

  /**
   * サーバ更新日
   */
  updated: Date;
}
