import Dockerode from 'dockerode';
import { inject, injectable } from 'inversify';

import { MinecraftServerStatus } from '@type-def-prj/Minecraft';

import { IMinecraftServer } from '../../Table/MinecraftServerTable/types/IMinecraftServer';
import { TYPES } from '../../TYPES';
import { LoggerService } from '../LoggerService/LoggerService';
import { DockerError } from './DockerError';

/**
 * Dockerを制御するサービス
 * @see https://github.com/itzg/docker-minecraft-server
 */
@injectable()
export class DockerService {
  private docker = new Dockerode();

  /**
   * イメージをDLするときの待機時間
   */
  private pullWaitTime = 5000;

  public constructor(@inject(TYPES.service.logger) private readonly logger: LoggerService) {}

  /**
   * コンテナを起動
   * @param server サーバー情報
   * @throws {DockerError}
   */
  public async create(server: IMinecraftServer): Promise<void> {
    this.logger.trace('DockerService', 'create');
    try {
      const config = this.createContainerConfig(server);
      await this.pullImage(config.Image as string);
      await this.docker.createContainer(config);
      this.logger.info('DockerService', 'Container Create Success');
    } catch (err) {
      this.logger.error('DockerService', err.message);
      if (err instanceof DockerError) {
        throw err;
      } else {
        throw new DockerError(err);
      }
    }
  }

  /**
   * コンテナを起動
   * @param server サーバー情報
   * @throws {DockerError}
   */
  public async start(server: IMinecraftServer): Promise<void> {
    this.logger.trace('DockerService', 'start');
    try {
      await this.docker.getContainer(server._id.toString()).start();
      this.logger.info('DockerService', 'Container Start Success');
    } catch (err) {
      this.logger.error('Start Error:', err.message);
      throw new DockerError(err);
    }
  }

  /**
   * コンテナの状態取得
   * @param server マイクラサーバーID
   * @throws {DockerError}
   */
  public async getStatus(minecraftId: string): Promise<MinecraftServerStatus> {
    this.logger.trace('DockerService', 'getStatus');
    try {
      const result = await this.docker.getContainer(minecraftId).inspect();
      let status: any = result.State.Status;
      if (status === 'created' || status === 'removing' || status === 'dead' || status === 'paused') {
        status = 'exited';
      }
      if (status === 'restarting') {
        status = 'running';
      }
      this.logger.debug('Debug', status);
      return status;
    } catch (err) {
      this.logger.error('GetStatus Error', err);
      if (err.reason === 'no such container') {
        return 'exited';
      }
      throw new DockerError(err);
    }
  }

  /**
   * nameのイメージをPullする
   * @param name イメージ名
   * @throws {DockerError}
   */
  private async pullImage(name: string): Promise<void> {
    this.logger.trace('DockerService', 'pullImage');
    try {
      const result = await this.existImage(name);
      if (!result) {
        this.logger.info('No Such Image');
        while (!(await this.existImage(name))) {
          await this.docker.pull(name);
          await new Promise(resolve => setTimeout(resolve, this.pullWaitTime));
        }
      }
    } catch (err) {
      this.logger.error('DockerService', err.message);
      if (err instanceof DockerError) {
        throw err;
      } else {
        throw new DockerError(err);
      }
    }
  }

  /**
   * nameのイメージが存在するかを確認
   * @param name イメージ名
   * @throws {DockerError}
   */
  private async existImage(name: string): Promise<boolean> {
    this.logger.trace('DockerService', 'existImage');
    try {
      const list = await this.docker.listImages();
      return list.some(s => s.RepoDigests?.some(ss => ss.includes(name)));
    } catch (err) {
      this.logger.error('DockerService', err.message);
      throw new DockerError(err);
    }
  }

  private createContainerConfig(server: IMinecraftServer): Dockerode.ContainerCreateOptions {
    return {
      name        : server._id.toString(),
      ExposedPorts: {
        [`${server.serverPort}/tcp`]: {},
        '25575/tcp'                 : {} // rcon用のポートのため固定値
      },
      Env       : ['EULA=TRUE', ...this.createMinecraftServerDockerEnv(server)],
      HostConfig: {
        PortBindings: { [`${server.serverPort}/tcp`]: [{ HostPort: `${server.serverPort}` }] },
        Binds       : [this.createMountDirectory(server)]
      },
      Image: 'itzg/minecraft-server'
    };
  }

  private createMountDirectory(server: IMinecraftServer): string {
    return `/usr/minestack/${server._id.toString()}:/data`;
  }

  private createMinecraftServerDockerEnv(server: IMinecraftServer): string[] {
    const envList: string[] = [];
    envList.push('OVERRIDE_SERVER_PROPERTIES=true');
    envList.push(`VERSION=${server.version}`);
    envList.push(`SERVER_PORT=${server.serverPort}`);
    envList.push(`SERVER_NAME=${server.name}`);
    envList.push(`DIFFICULTY=${server.properties.difficulty}`);
    if (server.properties.whiteList.length !== 0) {
      envList.push(`WHITELIST=${server.properties.whiteList.join(',')}`);
    }
    if (server.properties.ops.length !== 0) {
      envList.push(`OPS=${server.properties.ops.join(',')}`);
    }
    if (server.properties.icon !== '') {
      envList.push(`ICON=${server.properties.icon}`);
    }
    if (server.properties.enableQuery) {
      envList.push(`ENABLE_QUERY=${server.properties.enableQuery}`);
      envList.push(`QUERY_PORT=${server.properties.queryPort}`);
    }
    envList.push(`MAX_PLAYERS=${server.properties.maxPlayers}`);
    envList.push(`MAX_WORLD_SIZE=${server.properties.maxWorldSize}`);
    envList.push(`ALLOW_NETHER=${server.properties.allowNether}`);
    envList.push(`ANNOUNCE_PLAYER_ACHIEVEMENTS=${server.properties.announcePlayerAchievements}`);
    envList.push(`ENABLE_COMMAND_BLOCK=${server.properties.enableCommandBlock}`);
    envList.push(`FORCE_GAMEMODE=${server.properties.forceGamemode}`);
    envList.push(`GENERATE_STRUCTURES=${server.properties.generateStructures}`);
    envList.push(`HARDCORE=${server.properties.hardcore}`);
    envList.push(`SNOOPER_ENABLED=${server.properties.snooperEnabled}`);
    envList.push(`MAX_BUILD_HEIGHT=${server.properties.maxBuildHeight}`);
    envList.push(`MAX_TICK_TIME=${server.properties.maxTickTime}`);
    envList.push(`SPAWN_ANIMALS=${server.properties.spawnAnimals}`);
    envList.push(`SPAWN_MONSTERS=${server.properties.spawnMonsters}`);
    envList.push(`SPAWN_NPCS=${server.properties.spawnNpcs}`);
    envList.push(`SPAWN_PROTECTION=${server.properties.spawnProtection}`);
    envList.push(`VIEW_DISTANCE=${server.properties.viewDistance}`);
    if (server.properties.levelSeed !== '') {
      envList.push(`SEED=${server.properties.levelSeed}`);
    }
    envList.push(`MODE=${server.properties.gamemode}`);
    if (server.properties.motd !== '') {
      envList.push(`MOTD=${server.properties.motd}`);
    }
    envList.push(`PVP=${server.properties.pvp}`);
    envList.push(`LEVEL_TYPE=${server.properties.levelType}`);
    if (server.properties.resourcePack !== '') {
      envList.push(`RESOURCE_PACK=${server.properties.resourcePack}`);
      envList.push(`RESOURCE_PACK_SHA1=${server.properties.resourcePackSha1}`);
    }
    envList.push(`LEVEL=${server.properties.levelName}`);
    envList.push(`ALLOW_FLIGHT=${server.properties.allowFlight}`);
    envList.push(`PLAYER_IDLE_TIMEOUT=${server.properties.playerIdleTimeout}`);
    envList.push(`OP_PERMISSION_LEVEL=${server.properties.opPermissionLevel}`);
    envList.push(`MEMORY=${server.properties.memory}`);

    return envList;
  }
}
