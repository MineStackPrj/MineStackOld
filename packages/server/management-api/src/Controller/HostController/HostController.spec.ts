import { Container, decorate, injectable } from 'inversify';

import { HostService } from '@service/HostService/HostService';
import { LoggerService } from '@service/LoggerService/LoggerService';
import { TYPES } from '@src/TYPES';
import { SuccessResponse } from '@type-def-prj/Response';
import { InternalServerResponse } from '@type-def-prj/Response/InternalServerResponse';

import { HostController } from './HostController';

jest.mock('@service/LoggerService/LoggerService');
jest.mock('@service/HostService/HostService');

decorate(injectable(), LoggerService);
decorate(injectable(), HostService);

describe('HostController', () => {
  let container: Container;
  let controller: HostController;
  let service: HostService;

  const responseSpy = {
    status: jest.fn(),
    send  : jest.fn()
  };

  beforeAll(() => {
    container = new Container();
    container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();
    container.bind<HostController>(TYPES.controller.host).to(HostController).inSingletonScope();
    container.bind<HostService>(TYPES.service.host).to(HostService).inSingletonScope();

    service = container.get<HostService>(TYPES.service.host);
    controller = container.get<HostController>(TYPES.controller.host);
  });

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('to be instance.', async () => {
    /* ------------------------------ 評価項目 ------------------------------ */
    expect(controller).toBeTruthy();
  });

  describe('getUsage', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('ホストサーバの使用率取得', async () => {
    /* --------------------------- テストの前処理 --------------------------- */
      // @ts-ignore
      const spy = jest.spyOn(service, 'getUsage').mockResolvedValue({ cpu: {} });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.getUsage(responseSpy);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new SuccessResponse({ cpu: {} });
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
      expect(spy).toBeCalled();
    });

    it('ホストサーバの取得に失敗', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(service, 'getUsage').mockRejectedValue(new InternalServerResponse());

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.getUsage(responseSpy);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new InternalServerResponse();
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
      expect(spy).toBeCalled();
    });
  });
});
