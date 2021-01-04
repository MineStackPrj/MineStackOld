import getPort from 'get-port';
import { Container, decorate, injectable } from 'inversify';
import os from 'os';
import si from 'systeminformation';
import { mocked } from 'ts-jest/utils';

import { AlreadyInUsedPortError } from '@error/AlreadyInUsedPortError';
import { LoggerService } from '@service/LoggerService/LoggerService';
import { TYPES } from '@src/TYPES';

import { HostService } from './HostService';

jest.mock('@service/LoggerService/LoggerService');
jest.mock('get-port');

decorate(injectable(), LoggerService);

describe('HostService', () => {
  let container: Container;
  let service: HostService;

  beforeAll(() => {
    container = new Container();
    container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();
    container.bind<HostService>(TYPES.service.host).to(HostService).inSingletonScope();

    service = container.get<HostService>(TYPES.service.host);

    mocked(getPort).mockClear();
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

  describe('usePort', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('指定したポートを取得', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const port = 25565;

      const spy = mocked(getPort).mockResolvedValue(25565);

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.usePort(port);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toBe(25565);
      expect(spy).toBeCalled();
      expect(spy).toBeCalledWith({ port: 25565 });
    });

    it('指定した以外を取得', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const port = 25565;

      const spy = mocked(getPort).mockResolvedValue(30000);

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.usePort(port)).rejects.toBeInstanceOf(AlreadyInUsedPortError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
      expect(spy).toBeCalledWith({ port: 25565 });
    });

    it('ランダムなポートを取得', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const port = 0;

      const spy = mocked(getPort).mockResolvedValue(30000);

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.usePort(port);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toBe(30000);
      expect(spy).toBeCalled();
    });
  });

  describe('getUsage', () => {
    it('CPU使用率などを取得', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      jest.spyOn(os, 'cpus').mockReturnValue([
        {
          // @ts-ignore
          times: {
            user: 1,
            idle: 0,
            irq : 99
          }
        }
      ]);
      // @ts-ignore
      jest.spyOn(si, 'mem').mockResolvedValue({
        used : 1,
        total: 100
      });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.getUsage();

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toEqual({
        cpu: {
          used : 1,
          cores: [1]
        },
        mem: {
          total: 100,
          used : 1
        }
      });
    });
  });
});
