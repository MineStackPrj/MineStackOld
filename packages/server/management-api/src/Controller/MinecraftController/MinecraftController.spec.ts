import { Container, decorate, injectable } from 'inversify';

import { SuccessResponse } from '@type-def-prj/Response';
import { BadRequestResponse } from '@type-def-prj/Response/BadRequestResponse';
import { InternalServerResponse } from '@type-def-prj/Response/InternalServerResponse';
import { NotFoundResponse } from '@type-def-prj/Response/NotFoundResponse';

import { AlreadyInUsedPortError } from '../../Error/AlreadyInUsedPortError';
import { LoggerService } from '../../Service/LoggerService/LoggerService';
import { MinecraftService } from '../../Service/MinecraftService/MinecraftService';
import { NotFoundError } from '../../Table/NotFoundError';
import { TYPES } from '../../TYPES';
import { MinecraftController } from './MinecraftController';

jest.mock('../../Service/LoggerService/LoggerService');
jest.mock('../../Service/MinecraftService/MinecraftService');

decorate(injectable(), LoggerService);
decorate(injectable(), MinecraftService);

describe('MinecraftController', () => {
  let container: Container;
  let controller: MinecraftController;
  let service: MinecraftService;

  const responseSpy = {
    status: jest.fn(),
    send  : jest.fn()
  };

  beforeAll(() => {
    container = new Container();
    container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();
    container.bind<MinecraftService>(TYPES.service.minecraft).to(MinecraftService).inSingletonScope();
    container.bind<MinecraftController>(TYPES.controller.minecraft).to(MinecraftController).inSingletonScope();

    service = container.get<MinecraftService>(TYPES.service.minecraft);
    controller = container.get<MinecraftController>(TYPES.controller.minecraft);
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

  describe('getMinecraftServerList', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('Hallow World', async () => {
      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.getMinecraftServerList(responseSpy);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new SuccessResponse('Hallow World');
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
    });
  });

  describe('postMinecraftServer', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('マイクラのサーバー作成に成功', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const body: any = {};
      const spy = jest.spyOn(service, 'create').mockResolvedValue({ minecraftId: 'aaa' });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.postMinecraftServer(responseSpy, body);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new SuccessResponse({ minecraftId: 'aaa' });
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
      expect(spy).toBeCalled();
    });

    it('マイクラのサーバー作成に失敗(InternalServerResponse)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const body: any = {};
      const spy = jest.spyOn(service, 'create').mockRejectedValue(new InternalServerResponse());

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.postMinecraftServer(responseSpy, body);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new InternalServerResponse();
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
      expect(spy).toBeCalled();
    });

    it('マイクラのサーバー作成に失敗(AlreadyInUsedPortError)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const body: any = {};
      const spy = jest.spyOn(service, 'create').mockRejectedValue(new AlreadyInUsedPortError());

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.postMinecraftServer(responseSpy, body);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new BadRequestResponse();
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
      expect(spy).toBeCalled();
    });
  });

  describe('getMinecraftServer', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('サーバー情報の取得に成功', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const minecraftId = '';

      // @ts-ignore
      const spy = jest.spyOn(service, 'get').mockResolvedValue({});

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.getMinecraftServer(responseSpy, minecraftId);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new SuccessResponse({});
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
      expect(spy).toBeCalled();
    });

    it('サーバー情報がないとき', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const minecraftId = '';

      // @ts-ignore
      const spy = jest.spyOn(service, 'get').mockRejectedValue(new NotFoundError());

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.getMinecraftServer(responseSpy, minecraftId);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new NotFoundResponse();
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
      expect(spy).toBeCalled();
    });

    it('サーバーエラーのとき', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const minecraftId = '';

      // @ts-ignore
      const spy = jest.spyOn(service, 'get').mockRejectedValue(new InternalServerResponse());

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.getMinecraftServer(responseSpy, minecraftId);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new InternalServerResponse();
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
      expect(spy).toBeCalled();
    });
  });

  describe('getMinecraftServerStatus', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('サーバー状態の取得に成功', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const minecraftId = '';

      // @ts-ignore
      const spy = jest.spyOn(service, 'getStatus').mockResolvedValue({});

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.getMinecraftServerStatus(responseSpy, minecraftId);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new SuccessResponse({});
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
      expect(spy).toBeCalled();
    });

    it('サーバーエラーのとき(InternalServerResponse)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const minecraftId = '';

      // @ts-ignore
      const spy = jest.spyOn(service, 'getStatus').mockRejectedValue(new InternalServerResponse());

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.getMinecraftServerStatus(responseSpy, minecraftId);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new InternalServerResponse();
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
      expect(spy).toBeCalled();
    });

    it('サーバーエラーのとき(NotFoundError)', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const minecraftId = '';

      // @ts-ignore
      const spy = jest.spyOn(service, 'getStatus').mockRejectedValue(new NotFoundError());

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      await controller.getMinecraftServerStatus(responseSpy, minecraftId);

      /* ------------------------------ 評価項目 ------------------------------ */
      const response = new NotFoundResponse();
      expect(responseSpy.status).toBeCalledWith(response.code);
      expect(responseSpy.send).toBeCalledWith(response.toString());
      expect(spy).toBeCalled();
    });
  });
});
