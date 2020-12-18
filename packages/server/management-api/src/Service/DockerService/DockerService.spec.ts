import { Container, decorate, injectable } from 'inversify';

import { InternalServerError } from '../../Error/InternalServerError';
import { TYPES } from '../../TYPES';
import { LoggerService } from '../LoggerService/LoggerService';
import { DockerError } from './DockerError';
import { DockerService } from './DockerService';

jest.mock('../../Service/LoggerService/LoggerService');
jest.mock('get-port');

decorate(injectable(), LoggerService);

describe('DockerService', () => {
  let container: Container;
  let service: DockerService;

  const getContainerSpy = {
    start  : jest.fn(),
    inspect: jest.fn()
  };
  const dockerSpy = {
    createContainer: jest.fn(),
    getContainer   : jest.fn().mockReturnValue(getContainerSpy),
    listImages     : jest.fn(),
    pull           : jest.fn()
  };

  beforeAll(() => {
    container = new Container();
    container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();
    container.bind<DockerService>(TYPES.service.docker).to(DockerService).inSingletonScope();

    service = container.get<DockerService>(TYPES.service.docker);
    const buff: any = service;
    buff.docker = dockerSpy;
  });

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('to be instance.', async () => {
    /* ------------------------------ 評価項目 ------------------------------ */
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('コンテナの作成に成功(イメージがある場合)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const server: any = {
        _id       : 'a',
        name      : 'Minecraft 1.16',
        version   : '1.16',
        serverType: 'vanilla',
        properties: {
          serverPort                : 25565,
          allowFlight               : false,
          allowNether               : true,
          difficulty                : 'normal',
          enableCommandBlock        : false,
          forceGamemode             : false,
          gamemode                  : 'survival',
          generateStructures        : true,
          hardcore                  : false,
          levelName                 : 'world',
          levelType                 : 'DEFAULT',
          maxBuildHeight            : 256,
          maxPlayers                : 20,
          maxTickTime               : 60000,
          maxWorldSize              : 29999984,
          opPermissionLevel         : 4,
          playerIdleTimeout         : 0,
          pvp                       : false,
          queryPort                 : 25565,
          snooperEnabled            : true,
          spawnAnimals              : true,
          spawnMonsters             : true,
          spawnNpcs                 : true,
          spawnProtection           : 16,
          viewDistance              : 10,
          memory                    : '1g',
          announcePlayerAchievements: true,
          resourcePack              : '',
          resourcePackSha1          : '',
          motd                      : '',
          levelSeed                 : '',
          enableQuery               : false,
          whiteList                 : [],
          ops                       : [],
          icon                      : ''
        }
      };
      const createContainerSpy = jest.spyOn(dockerSpy, 'createContainer');
      const listImagesSpy = jest.spyOn(dockerSpy, 'listImages').mockResolvedValue([
        {
          RepoDigests: ['itzg/minecraft-server']
        }
      ]);
      const pullSpy = jest.spyOn(dockerSpy, 'pull');

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await service.create(server);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(createContainerSpy).toBeCalled();
      expect(listImagesSpy).toBeCalled();
      expect(pullSpy).not.toBeCalled();
    });

    it('コンテナの作成に成功(イメージがない場合)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const server: any = {
        _id       : 'a',
        name      : 'Minecraft 1.16',
        version   : '1.16',
        serverType: 'vanilla',
        properties: {
          serverPort                : 25565,
          allowFlight               : false,
          allowNether               : true,
          difficulty                : 'normal',
          enableCommandBlock        : false,
          forceGamemode             : false,
          gamemode                  : 'survival',
          generateStructures        : true,
          hardcore                  : false,
          levelName                 : 'world',
          levelType                 : 'DEFAULT',
          maxBuildHeight            : 256,
          maxPlayers                : 20,
          maxTickTime               : 60000,
          maxWorldSize              : 29999984,
          opPermissionLevel         : 4,
          playerIdleTimeout         : 0,
          pvp                       : false,
          queryPort                 : 25565,
          snooperEnabled            : true,
          spawnAnimals              : true,
          spawnMonsters             : true,
          spawnNpcs                 : true,
          spawnProtection           : 16,
          viewDistance              : 10,
          memory                    : '1g',
          announcePlayerAchievements: true,
          resourcePack              : '',
          resourcePackSha1          : '',
          motd                      : '',
          levelSeed                 : '',
          enableQuery               : false,
          whiteList                 : [],
          ops                       : [],
          icon                      : ''
        }
      };
      const createContainerSpy = jest.spyOn(dockerSpy, 'createContainer');
      const listImagesSpy = jest
        .spyOn(dockerSpy, 'listImages')
        .mockResolvedValueOnce([
          {
            RepoDigests: ['']
          }
        ])
        .mockResolvedValueOnce([
          {
            RepoDigests: ['']
          }
        ])
        .mockResolvedValueOnce([
          {
            RepoDigests: ['itzg/minecraft-server']
          }
        ]);
      const pullSpy = jest.spyOn(dockerSpy, 'pull');

      // 5秒だと遅いため、短くする
      const serviceAny: any = service;
      serviceAny.pullWaitTime = 10;

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await service.create(server);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(createContainerSpy).toBeCalled();
      expect(listImagesSpy).toBeCalled();
      expect(pullSpy).toBeCalled();
    });

    it('コンテナの作成任意パラメータを設定', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const server: any = {
        _id       : 'a',
        name      : 'Minecraft 1.16',
        version   : '1.16',
        serverType: 'vanilla',
        properties: {
          serverPort                : 25565,
          allowFlight               : false,
          allowNether               : true,
          difficulty                : 'normal',
          enableCommandBlock        : false,
          forceGamemode             : false,
          gamemode                  : 'survival',
          generateStructures        : true,
          hardcore                  : false,
          levelName                 : 'world',
          levelType                 : 'DEFAULT',
          maxBuildHeight            : 256,
          maxPlayers                : 20,
          maxTickTime               : 60000,
          maxWorldSize              : 29999984,
          opPermissionLevel         : 4,
          playerIdleTimeout         : 0,
          pvp                       : false,
          queryPort                 : 25565,
          snooperEnabled            : true,
          spawnAnimals              : true,
          spawnMonsters             : true,
          spawnNpcs                 : true,
          spawnProtection           : 16,
          viewDistance              : 10,
          memory                    : '1g',
          announcePlayerAchievements: true,
          resourcePack              : 'a',
          resourcePackSha1          : 'a',
          motd                      : 'a',
          levelSeed                 : 'a',
          enableQuery               : true,
          whiteList                 : ['a', 'b'],
          ops                       : ['a', 'b'],
          icon                      : 'a'
        }
      };
      const spy = jest.spyOn(dockerSpy, 'createContainer');

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await service.create(server);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });

    it('コンテナの作成に失敗', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const server: any = {
        _id       : 'a',
        name      : 'Minecraft 1.16',
        version   : '1.16',
        serverType: 'vanilla',
        properties: {
          serverPort                : 25565,
          allowFlight               : false,
          allowNether               : true,
          difficulty                : 'normal',
          enableCommandBlock        : false,
          forceGamemode             : false,
          gamemode                  : 'survival',
          generateStructures        : true,
          hardcore                  : false,
          levelName                 : 'world',
          levelType                 : 'DEFAULT',
          maxBuildHeight            : 256,
          maxPlayers                : 20,
          maxTickTime               : 60000,
          maxWorldSize              : 29999984,
          opPermissionLevel         : 4,
          playerIdleTimeout         : 0,
          pvp                       : false,
          queryPort                 : 25565,
          snooperEnabled            : true,
          spawnAnimals              : true,
          spawnMonsters             : true,
          spawnNpcs                 : true,
          spawnProtection           : 16,
          viewDistance              : 10,
          memory                    : '1g',
          announcePlayerAchievements: true,
          resourcePack              : '',
          resourcePackSha1          : '',
          motd                      : '',
          levelSeed                 : '',
          enableQuery               : false,
          whiteList                 : [],
          ops                       : [],
          icon                      : ''
        }
      };
      const spy = jest.spyOn(dockerSpy, 'createContainer').mockRejectedValue(new InternalServerError());

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.create(server)).rejects.toBeInstanceOf(DockerError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });

    it('コンテナの作成に失敗(イメージリストの取得に失敗)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const server: any = {
        _id       : 'a',
        name      : 'Minecraft 1.16',
        version   : '1.16',
        serverType: 'vanilla',
        properties: {
          serverPort                : 25565,
          allowFlight               : false,
          allowNether               : true,
          difficulty                : 'normal',
          enableCommandBlock        : false,
          forceGamemode             : false,
          gamemode                  : 'survival',
          generateStructures        : true,
          hardcore                  : false,
          levelName                 : 'world',
          levelType                 : 'DEFAULT',
          maxBuildHeight            : 256,
          maxPlayers                : 20,
          maxTickTime               : 60000,
          maxWorldSize              : 29999984,
          opPermissionLevel         : 4,
          playerIdleTimeout         : 0,
          pvp                       : false,
          queryPort                 : 25565,
          snooperEnabled            : true,
          spawnAnimals              : true,
          spawnMonsters             : true,
          spawnNpcs                 : true,
          spawnProtection           : 16,
          viewDistance              : 10,
          memory                    : '1g',
          announcePlayerAchievements: true,
          resourcePack              : '',
          resourcePackSha1          : '',
          motd                      : '',
          levelSeed                 : '',
          enableQuery               : false,
          whiteList                 : [],
          ops                       : [],
          icon                      : ''
        }
      };
      const createContainerSpy = jest.spyOn(dockerSpy, 'createContainer');
      const listImagesSpy = jest.spyOn(dockerSpy, 'listImages').mockRejectedValue(new InternalServerError());
      const pullSpy = jest.spyOn(dockerSpy, 'pull');

      // 5秒だと遅いため、短くする
      const serviceAny: any = service;
      serviceAny.pullWaitTime = 10;

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.create(server)).rejects.toBeInstanceOf(DockerError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(listImagesSpy).toBeCalled();
      expect(createContainerSpy).not.toBeCalled();
      expect(pullSpy).not.toBeCalled();
    });

    it('コンテナの作成に失敗(イメージの取得に失敗)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const server: any = {
        _id       : 'a',
        name      : 'Minecraft 1.16',
        version   : '1.16',
        serverType: 'vanilla',
        properties: {
          serverPort                : 25565,
          allowFlight               : false,
          allowNether               : true,
          difficulty                : 'normal',
          enableCommandBlock        : false,
          forceGamemode             : false,
          gamemode                  : 'survival',
          generateStructures        : true,
          hardcore                  : false,
          levelName                 : 'world',
          levelType                 : 'DEFAULT',
          maxBuildHeight            : 256,
          maxPlayers                : 20,
          maxTickTime               : 60000,
          maxWorldSize              : 29999984,
          opPermissionLevel         : 4,
          playerIdleTimeout         : 0,
          pvp                       : false,
          queryPort                 : 25565,
          snooperEnabled            : true,
          spawnAnimals              : true,
          spawnMonsters             : true,
          spawnNpcs                 : true,
          spawnProtection           : 16,
          viewDistance              : 10,
          memory                    : '1g',
          announcePlayerAchievements: true,
          resourcePack              : '',
          resourcePackSha1          : '',
          motd                      : '',
          levelSeed                 : '',
          enableQuery               : false,
          whiteList                 : [],
          ops                       : [],
          icon                      : ''
        }
      };
      const createContainerSpy = jest.spyOn(dockerSpy, 'createContainer');
      const listImagesSpy = jest
        .spyOn(dockerSpy, 'listImages')
        .mockResolvedValueOnce([
          {
            RepoDigests: ['']
          }
        ])
        .mockResolvedValueOnce([
          {
            RepoDigests: ['']
          }
        ])
        .mockResolvedValueOnce([
          {
            RepoDigests: ['itzg/minecraft-server']
          }
        ]);
      const pullSpy = jest.spyOn(dockerSpy, 'pull').mockRejectedValue(new InternalServerError());

      // 5秒だと遅いため、短くする
      const serviceAny: any = service;
      serviceAny.pullWaitTime = 10;

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.create(server)).rejects.toBeInstanceOf(DockerError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(listImagesSpy).toBeCalled();
      expect(pullSpy).toBeCalled();
      expect(createContainerSpy).not.toBeCalled();
    });
  });

  describe('start', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('コンテナの作成に成功', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const server: any = {
        _id: 'a'
      };
      const spy = jest.spyOn(getContainerSpy, 'start');

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await service.start(server);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });

    it('コンテナの作成に失敗', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const server: any = {
        _id: 'a'
      };
      const spy = jest.spyOn(getContainerSpy, 'start').mockRejectedValue(new InternalServerError());

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.start(server)).rejects.toBeInstanceOf(DockerError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });
  });

  describe('getStatus', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('コンテナ状態の取得に成功(created -> exited)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(getContainerSpy, 'inspect').mockResolvedValue({
        State: {
          Status: 'created'
        }
      });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.getStatus('');

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toBe('exited');
      expect(spy).toBeCalled();
    });

    it('コンテナ状態の取得に成功(removing -> exited)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(getContainerSpy, 'inspect').mockResolvedValue({
        State: {
          Status: 'removing'
        }
      });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.getStatus('');

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toBe('exited');
      expect(spy).toBeCalled();
    });

    it('コンテナ状態の取得に成功(dead -> exited)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(getContainerSpy, 'inspect').mockResolvedValue({
        State: {
          Status: 'dead'
        }
      });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.getStatus('');

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toBe('exited');
      expect(spy).toBeCalled();
    });

    it('コンテナ状態の取得に成功(paused -> exited)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(getContainerSpy, 'inspect').mockResolvedValue({
        State: {
          Status: 'paused'
        }
      });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.getStatus('');

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toBe('exited');
      expect(spy).toBeCalled();
    });

    it('コンテナ状態の取得に成功(No Such Container -> exited)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(getContainerSpy, 'inspect').mockRejectedValue({
        reason: 'no such container'
      });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.getStatus('');

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toBe('exited');
      expect(spy).toBeCalled();
    });

    it('コンテナ状態の取得に成功(restarting -> running)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(getContainerSpy, 'inspect').mockResolvedValue({
        State: {
          Status: 'restarting'
        }
      });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.getStatus('');

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toBe('running');
      expect(spy).toBeCalled();
    });

    it('コンテナ状態の取得に失敗', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(getContainerSpy, 'inspect').mockRejectedValue({
        reason: ''
      });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.getStatus('')).rejects.toBeInstanceOf(DockerError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });
  });
});
