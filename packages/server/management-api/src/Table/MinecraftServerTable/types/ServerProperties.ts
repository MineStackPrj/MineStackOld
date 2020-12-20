export const LevelTypeList = ['DEFAULT', 'FLAT', 'LARGEBIOMES', 'AMPLIFIED', 'CUSTOMIZED', 'BUFFET'] as const;
export type LevelType = typeof LevelTypeList[number];

export const MinecraftGameModeTypeList = ['creative', 'survival', 'adventure', 'spectator'] as const;
export type MinecraftGameModeType = typeof MinecraftGameModeTypeList[number];

export const MinecraftDifficultyTypeList = ['peaceful', 'easy', 'normal', 'hard'] as const;
export type MinecraftDifficultyType = typeof MinecraftDifficultyTypeList[number];

export interface IServerProperties {
  /**
   * サバイバルモードで、飛行を可能にする Mod を導入しているプレイヤーに飛行を許可する
   */
  allowFlight: boolean;

  /**
   * プレイヤーがネザーに行くことを許可する
   */
  allowNether: boolean;

  /**
   * サーバーの難易度
   */
  difficulty: MinecraftDifficultyType;

  /**
   * GameSpy4 のプロトコルサーバーリスナーを有効にする
   */
  enableQuery: boolean;

  /**
   * コマンドブロックを有効にする
   */
  enableCommandBlock: boolean;

  /**
   * プレイヤーにデフォルトのゲームモードで参加させる
   */
  forceGamemode: boolean;

  /**
   * ゲームモードを決定する
   */
  gamemode: MinecraftGameModeType;

  /**
   * 構造物を生成するかどうかを決定する
   */
  generateStructures: boolean;

  /**
   * プレイヤーが死んだ際にスペクテイターモードになる
   */
  hardcore: boolean;

  /**
   * ワールドのシード値を設定できる
   */
  levelSeed: string;

  /**
   * ワールド名とそのフォルダ名として使用される
   */
  levelName: string;

  /**
   * 生成されるマップのタイプを決定する
   */
  levelType: LevelType;

  /**
   * 建築が許可された最大高度
   */
  maxBuildHeight: number;

  /**
   * 同時にサーバー上でプレイできるプレイヤーの最大数
   */
  maxPlayers: number;

  /**
   * サーバーのウォッチドッグが、サーバーを停止させるまでにかかる単一ティックの最大ミリ秒
   */
  maxTickTime: number;

  /**
   * 世界の境界が生成される半径を表します
   */
  maxWorldSize: number;

  /**
   * クライアントのサーバー一覧の、サーバー名の下に表示されるメッセージ
   */
  motd: string;

  /**
   * デフォルトの権限レベルを設定する
   */
  opPermissionLevel: number;

  /**
   * 無操作のプレイヤーがサーバーからキックされるまでの時間を分で設定する
   */
  playerIdleTimeout: number;

  /**
   * サーバーでのPvPを有効にする
   */
  pvp: boolean;

  /**
   * クエリサーバーのポート番号を設定する
   */
  queryPort: number;

  /**
   * リソースパックへのURIを設定する
   */
  resourcePack: string;

  /**
   * リソースパックのオプションのSHA-1ダイジェスト（小文字の16進数）
   */
  resourcePackSha1: string;

  /**
   * 'サーバーが定期的にsnoopデータをhttp://snoop.minecraft.netに送信するかどうかを設定する'
   */
  snooperEnabled: boolean;

  /**
   * 動物がスポーンできるかどうかを決定する
   */
  spawnAnimals: boolean;

  /**
   * モンスターがスポーンするかどうかを決定する
   */
  spawnMonsters: boolean;

  /**
   * 村人がスポーンするかどうかを決定する
   */
  spawnNpcs: boolean;

  /**
   * スポーン保護の半径を（x * 2）+1として決定する
   */
  spawnProtection: number;

  /**
   * サーバーがクライアントに送信するワールドデータの量を、プレーヤーの各方向のチャンク（直径ではなく半径）で測定して設定する
   */
  viewDistance: number;

  /**
   * サーバーでホワイトリストを有効にする
   */
  whiteList: string[];

  /**
   * 管理者権限
   */
  ops: string[];

  /**
   * サーバーアイコン
   */
  icon: string;

  /**
   * プレーヤーの実績を発表する
   */
  announcePlayerAchievements: boolean;

  /**
   * サーバーに割り当てるメモリ
   */
  memory: string;
}
