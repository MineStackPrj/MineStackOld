import { Container, decorate, injectable } from 'inversify';

import { TYPES } from '@/TYPES';
import { AlreadyInUsedPortError } from '@error/AlreadyInUsedPortError';
import { LoggerService } from '@service/LoggerService/LoggerService';
import { MongooseService } from '@service/MongooseService/MongooseService';
import { DatabaseError } from '@table/MongooseError';

import { MinecraftServerTable } from './MinecraftServerTable';
import { MinecraftServerCreateDto } from './types/MinecraftServerDto';
import { LevelTypeList, MinecraftDifficultyTypeList, MinecraftGameModeTypeList } from './types/ServerProperties';

jest.mock('./types/MinecraftServerModel');
jest.mock('@service/LoggerService/LoggerService');
jest.mock('@service/MongooseService/MongooseService');

decorate(injectable(), LoggerService);
decorate(injectable(), MongooseService);

describe('MinecraftServerTable', () => {
  let container: Container;
  let service: MinecraftServerTable;
  let mongoose: MongooseService;

  beforeAll(() => {
    container = new Container();
    container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();
    container.bind<MongooseService>(TYPES.service.mongoose).to(MongooseService).inSingletonScope();
    container.bind<MinecraftServerTable>(TYPES.table.minecraftServer).to(MinecraftServerTable).inSingletonScope();

    service = container.get<MinecraftServerTable>(TYPES.table.minecraftServer);
    mongoose = container.get<MongooseService>(TYPES.service.mongoose);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    LevelTypeList;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    MinecraftGameModeTypeList;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    MinecraftDifficultyTypeList;
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('to be instance.', () => {
    /* ------------------------------ 評価項目 ------------------------------ */
    expect(service).toBeTruthy();
  });

  describe('insert', () => {
    it('insert success.', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const dto: MinecraftServerCreateDto = {
        name      : 'Test',
        serverType: 'vanilla',
        version   : '1.16',
        serverPort: 25565,
        properties: {
          allowFlight               : true,
          allowNether               : true,
          announcePlayerAchievements: true,
          difficulty                : 'easy',
          enableCommandBlock        : true,
          enableQuery               : true,
          forceGamemode             : true,
          gamemode                  : 'survival',
          generateStructures        : true,
          hardcore                  : true,
          icon                      : '',
          levelName                 : '',
          levelSeed                 : '',
          levelType                 : 'DEFAULT',
          maxBuildHeight            : 256,
          maxPlayers                : 20,
          maxTickTime               : 60000,
          maxWorldSize              : 25565,
          memory                    : '1g',
          motd                      : '',
          opPermissionLevel         : 1,
          ops                       : [],
          playerIdleTimeout         : 6000,
          pvp                       : true,
          queryPort                 : 25565,
          resourcePack              : '',
          resourcePackSha1          : '',
          snooperEnabled            : true,
          spawnAnimals              : true,
          spawnMonsters             : true,
          spawnNpcs                 : true,
          spawnProtection           : 1,
          viewDistance              : 1,
          whiteList                 : []
        }
      };

      // @ts-ignore
      const spy = jest.spyOn(mongoose, 'insert').mockResolvedValue({ a: 'b' });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.insert(dto);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toEqual({ a: 'b' });
      expect(spy).toBeCalled();
    });

    it('insert failed.1', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const dto: MinecraftServerCreateDto = {
        name      : 'Test',
        serverType: 'vanilla',
        version   : '1.16',
        serverPort: 25565,
        properties: {
          allowFlight               : true,
          allowNether               : true,
          announcePlayerAchievements: true,
          difficulty                : 'easy',
          enableCommandBlock        : true,
          enableQuery               : true,
          forceGamemode             : true,
          gamemode                  : 'survival',
          generateStructures        : true,
          hardcore                  : true,
          icon                      : '',
          levelName                 : '',
          levelSeed                 : '',
          levelType                 : 'DEFAULT',
          maxBuildHeight            : 256,
          maxPlayers                : 20,
          maxTickTime               : 60000,
          maxWorldSize              : 25565,
          memory                    : '1g',
          motd                      : '',
          opPermissionLevel         : 1,
          ops                       : [],
          playerIdleTimeout         : 6000,
          pvp                       : true,
          queryPort                 : 25565,
          resourcePack              : '',
          resourcePackSha1          : '',
          snooperEnabled            : true,
          spawnAnimals              : true,
          spawnMonsters             : true,
          spawnNpcs                 : true,
          spawnProtection           : 1,
          viewDistance              : 1,
          whiteList                 : []
        }
      };

      const spy = jest.spyOn(mongoose, 'insert').mockRejectedValue(new DatabaseError('CastError'));

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.insert(dto)).rejects.toBeInstanceOf(DatabaseError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });

    it('insert failed.2', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const dto: MinecraftServerCreateDto = {
        name      : 'Test',
        serverType: 'vanilla',
        version   : '1.16',
        serverPort: 25565,
        properties: {
          allowFlight               : true,
          allowNether               : true,
          announcePlayerAchievements: true,
          difficulty                : 'easy',
          enableCommandBlock        : true,
          enableQuery               : true,
          forceGamemode             : true,
          gamemode                  : 'survival',
          generateStructures        : true,
          hardcore                  : true,
          icon                      : '',
          levelName                 : '',
          levelSeed                 : '',
          levelType                 : 'DEFAULT',
          maxBuildHeight            : 256,
          maxPlayers                : 20,
          maxTickTime               : 60000,
          maxWorldSize              : 25565,
          memory                    : '1g',
          motd                      : '',
          opPermissionLevel         : 1,
          ops                       : [],
          playerIdleTimeout         : 6000,
          pvp                       : true,
          queryPort                 : 25565,
          resourcePack              : '',
          resourcePackSha1          : '',
          snooperEnabled            : true,
          spawnAnimals              : true,
          spawnMonsters             : true,
          spawnNpcs                 : true,
          spawnProtection           : 1,
          viewDistance              : 1,
          whiteList                 : []
        }
      };

      const spy = jest.spyOn(mongoose, 'insert').mockRejectedValue(new DatabaseError('duplicate key'));

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.insert(dto)).rejects.toBeInstanceOf(DatabaseError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });

    it('insert failed.3', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const dto: MinecraftServerCreateDto = {
        name      : 'Test',
        serverType: 'vanilla',
        version   : '1.16',
        serverPort: 25565,
        properties: {
          allowFlight               : true,
          allowNether               : true,
          announcePlayerAchievements: true,
          difficulty                : 'easy',
          enableCommandBlock        : true,
          enableQuery               : true,
          forceGamemode             : true,
          gamemode                  : 'survival',
          generateStructures        : true,
          hardcore                  : true,
          icon                      : '',
          levelName                 : '',
          levelSeed                 : '',
          levelType                 : 'DEFAULT',
          maxBuildHeight            : 256,
          maxPlayers                : 20,
          maxTickTime               : 60000,
          maxWorldSize              : 25565,
          memory                    : '1g',
          motd                      : '',
          opPermissionLevel         : 1,
          ops                       : [],
          playerIdleTimeout         : 6000,
          pvp                       : true,
          queryPort                 : 25565,
          resourcePack              : '',
          resourcePackSha1          : '',
          snooperEnabled            : true,
          spawnAnimals              : true,
          spawnMonsters             : true,
          spawnNpcs                 : true,
          spawnProtection           : 1,
          viewDistance              : 1,
          whiteList                 : []
        }
      };

      const spy = jest.spyOn(mongoose, 'insert').mockRejectedValue(new DatabaseError('duplicate key serverPort'));

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.insert(dto)).rejects.toBeInstanceOf(AlreadyInUsedPortError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });
  });

  describe('get', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('マイクラサーバー取得1', async () => {
      // @ts-ignore
      const spy = jest.spyOn(mongoose, 'findById').mockResolvedValue({ a: 'b' });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.get('');

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toEqual({ a: 'b' });
      expect(spy).toBeCalled();
    });

    it('マイクラサーバー取得2', async () => {
      // @ts-ignore
      const spy = jest.spyOn(mongoose, 'findById').mockRejectedValue(new DatabaseError(''));

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.get('')).rejects.toBeInstanceOf(DatabaseError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });
  });
});
