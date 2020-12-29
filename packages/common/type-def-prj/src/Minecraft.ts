/**
 * サーバー種別リスト
 */
export const MinecraftServerTypeList = ['vanilla', 'forge', 'spigot', 'snapshot', 'bukkit'] as const;

/**
 * サーバー種別
 */
export type MinecraftServerType = typeof MinecraftServerTypeList[number];

/**
 * サーバーバージョンリスト
 */
export const MinecraftServerVersionList = ['latest', '1.16'] as const;

/**
 * サーバーバージョン
 */
export type MinecraftServerVersion = typeof MinecraftServerVersionList[number];

/**
 * Minecraftのデフォルトポート番号
 */
export const MinecraftDefaultPortNumber = 25565;

/**
 * マイクラサーバーの状態リスト
 */
export const MinecraftServerStatusList = ['running', 'exited'] as const;

/**
 * マイクラサーバーの状態
 */
export type MinecraftServerStatus = typeof MinecraftServerStatusList[number];
