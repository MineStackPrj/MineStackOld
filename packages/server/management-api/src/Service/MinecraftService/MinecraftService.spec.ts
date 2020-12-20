import { Container, decorate, injectable } from 'inversify';

import { AlreadyInUsedPortError } from '../../Error/AlreadyInUsedPortError';
import { InternalServerError } from '../../Error/InternalServerError';
import { MinecraftServerTable } from '../../Table/MinecraftServerTable/MinecraftServerTable';
import { NotFoundError } from '../../Table/NotFoundError';
import { TYPES } from '../../TYPES';
import { DockerService } from '../DockerService/DockerService';
import { HostService } from '../HostService/HostService';
import { LoggerService } from '../LoggerService/LoggerService';
import { MinecraftService } from './MinecraftService';

jest.mock('../../Service/LoggerService/LoggerService');
jest.mock('../../Table/MinecraftServerTable/MinecraftServerTable');
jest.mock('../DockerService/DockerService');
jest.mock('../HostService/HostService');

decorate(injectable(), LoggerService);
decorate(injectable(), MinecraftServerTable);
decorate(injectable(), DockerService);
decorate(injectable(), HostService);

describe('MinecraftService', () => {
  let container: Container;
  let service: MinecraftService;

  let host: HostService;
  let table: MinecraftServerTable;
  let docker: DockerService;

  beforeAll(() => {
    container = new Container();
    container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();
    container.bind<MinecraftServerTable>(TYPES.table.minecraftServer).to(MinecraftServerTable).inSingletonScope();
    container.bind<MinecraftService>(TYPES.service.minecraft).to(MinecraftService).inSingletonScope();
    container.bind<DockerService>(TYPES.service.docker).to(DockerService).inSingletonScope();
    container.bind<HostService>(TYPES.service.host).to(HostService).inSingletonScope();

    service = container.get<MinecraftService>(TYPES.service.minecraft);
    host = container.get<HostService>(TYPES.service.host);
    docker = container.get<DockerService>(TYPES.service.docker);
    table = container.get<MinecraftServerTable>(TYPES.table.minecraftServer);
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

    it('Minecraft Serverの作成のみ', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const obj: any = {
        startServer: false,
        serverPort : 25565
      };

      const hostSpy = jest.spyOn(host, 'usePort').mockResolvedValue(30000);
      // @ts-ignore
      const tableSpy = jest.spyOn(table, 'insert').mockResolvedValue({
        _id: {
          toString: () => {
            return '';
          }
        }
      });
      const dockerCreateSpy = jest.spyOn(docker, 'create');
      const dockerStateSpy = jest.spyOn(docker, 'start');

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.create(obj);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toEqual({ minecraftId: '' });
      expect(hostSpy).toBeCalled();
      expect(hostSpy).toBeCalledWith(25565);
      expect(tableSpy).toBeCalled();
      expect(tableSpy).toBeCalledWith({
        startServer: false,
        serverPort : 30000
      });
      expect(dockerCreateSpy).not.toBeCalled();
      expect(dockerStateSpy).not.toBeCalled();
    });

    it('Minecraft Serverの作成後、起動まで行うか', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const obj: any = {
        startServer: true,
        serverPort : 25565
      };

      const hostSpy = jest.spyOn(host, 'usePort').mockResolvedValue(25565);
      // @ts-ignore
      const tableSpy = jest.spyOn(table, 'insert').mockResolvedValue({
        _id: {
          toString: () => {
            return '';
          }
        }
      });
      const dockerCreateSpy = jest.spyOn(docker, 'create');
      const dockerStateSpy = jest.spyOn(docker, 'start');

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.create(obj);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toEqual({ minecraftId: '' });
      expect(hostSpy).toBeCalled();
      expect(hostSpy).toBeCalledWith(25565);
      expect(tableSpy).toBeCalled();
      expect(tableSpy).toBeCalledWith({
        startServer: true,
        serverPort : 25565
      });
      expect(dockerCreateSpy).toBeCalled();
      expect(dockerStateSpy).toBeCalled();
    });

    it('Minecraft Serverの作成に失敗(InternalServerError)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const obj: any = {
        startServer: true,
        serverPort : 25565
      };

      const hostSpy = jest.spyOn(host, 'usePort').mockResolvedValue(25565);
      const tableSpy = jest.spyOn(table, 'insert').mockRejectedValue(new InternalServerError());
      const dockerCreateSpy = jest.spyOn(docker, 'create');
      const dockerStateSpy = jest.spyOn(docker, 'start');

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.create(obj)).rejects.toBeInstanceOf(InternalServerError);

      /* ------------------------------ 評価項目 ------------------------------ */

      expect(hostSpy).toBeCalled();
      expect(hostSpy).toBeCalledWith(25565);
      expect(tableSpy).toBeCalledWith({
        startServer: true,
        serverPort : 25565
      });
      expect(dockerCreateSpy).not.toBeCalled();
      expect(dockerStateSpy).not.toBeCalled();
    });

    it('Minecraft Serverの作成に失敗(AlreadyInUsedPortError)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const obj: any = {
        startServer: true,
        serverPort : 25565
      };

      const hostSpy = jest.spyOn(host, 'usePort').mockRejectedValue(new AlreadyInUsedPortError());
      const tableSpy = jest.spyOn(table, 'insert');
      const dockerCreateSpy = jest.spyOn(docker, 'create');
      const dockerStateSpy = jest.spyOn(docker, 'start');

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.create(obj)).rejects.toBeInstanceOf(AlreadyInUsedPortError);

      /* ------------------------------ 評価項目 ------------------------------ */

      expect(hostSpy).toBeCalled();
      expect(hostSpy).toBeCalledWith(25565);
      expect(tableSpy).not.toBeCalled();
      expect(dockerCreateSpy).not.toBeCalled();
      expect(dockerStateSpy).not.toBeCalled();
    });
  });

  describe('get', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('マイクラサーバー情報の取得に成功', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      // @ts-ignore
      const spy = jest.spyOn(table, 'get').mockResolvedValue({});

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.get('');

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toEqual({});
      expect(spy).toBeCalled();
    });

    it('マイクラサーバー情報の取得に失敗(NotFoundError)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(table, 'get').mockRejectedValue(new NotFoundError());

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.get('')).rejects.toBeInstanceOf(NotFoundError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });

    it('マイクラサーバー情報の取得に失敗(InternalServerError)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(table, 'get').mockRejectedValue(new InternalServerError());

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.get('')).rejects.toBeInstanceOf(InternalServerError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });
  });

  describe('getStatus', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('マイクラサーバー情報の取得に成功', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      // @ts-ignore
      const getSpy = jest.spyOn(table, 'get').mockResolvedValue({});

      const getStatusSpy = jest.spyOn(docker, 'getStatus').mockResolvedValue('running');

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.getStatus('');

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toBe('running');
      expect(getSpy).toBeCalled();
      expect(getStatusSpy).toBeCalled();
    });

    it('マイクラサーバー情報の取得に失敗(NotFoundError)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const getSpy = jest.spyOn(table, 'get').mockRejectedValue(new NotFoundError());
      const getStatusSpy = jest.spyOn(docker, 'getStatus').mockResolvedValue('running');

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.getStatus('')).rejects.toBeInstanceOf(NotFoundError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(getSpy).toBeCalled();
      expect(getStatusSpy).not.toBeCalled();
    });

    it('マイクラサーバー情報の取得に失敗(InternalServerError)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const getSpy = jest.spyOn(table, 'get').mockRejectedValue(new InternalServerError());
      const getStatusSpy = jest.spyOn(docker, 'getStatus').mockResolvedValue('running');

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.getStatus('')).rejects.toBeInstanceOf(InternalServerError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(getSpy).toBeCalled();
      expect(getStatusSpy).not.toBeCalled();
    });
  });
});
