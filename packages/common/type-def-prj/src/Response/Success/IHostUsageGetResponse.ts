
/**
 * HostサーバのCPUとメモリーの使用率情報
 */
export interface IHostUsageGetResponse {
  /***
   * CPU使用率
   */
  cpu: {
    /**
     * CPU全体使用率
     */
    used: number,
    /**
     * コア単位の使用使用率
     */
    cores: number[]
  },
  /**
   * メモリの使用率
   */
  mem: {
    /**
     * サーバのメモリ数（Byte）
     */
    total: number,
    /**
     * 使用率（100分率）
     */
    used: number
  }
}
