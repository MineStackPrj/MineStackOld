import { Container, decorate, injectable } from 'inversify';
import { mocked } from 'ts-jest/utils';

import { LoggerService } from '@service/LoggerService/LoggerService';
import { TYPES } from '@src/TYPES';
import { MinecraftServerModel } from '@table/MinecraftServerTable/types/MinecraftServerModel';
import { DatabaseError } from '@table/MongooseError';

import { MongooseService } from './MongooseService';

jest.mock('@table/MinecraftServerTable/types/MinecraftServerModel');
jest.mock('@service/LoggerService/LoggerService');

decorate(injectable(), LoggerService);

describe('MongooseService', () => {
  let container: Container;
  let service: MongooseService;

  const modelMock = {
    save    : jest.fn(),
    findById: jest.fn()
  };

  beforeAll(() => {
    container = new Container();
    container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();
    container.bind<MongooseService>(TYPES.service.mongoose).to(MongooseService).inSingletonScope();

    mocked(MinecraftServerModel).mockClear();
    mocked(MinecraftServerModel).mockImplementation((): any => {
      return modelMock;
    });

    service = container.get<MongooseService>(TYPES.service.mongoose);
  });

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('to be instance.', () => {
    /* ------------------------------ 評価項目 ------------------------------ */
    expect(service).toBeTruthy();
  });

  describe('insert', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('データベースにレコードの追加に成功', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(modelMock, 'save').mockResolvedValue({});

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      const result = await service.insert(MinecraftServerModel, {});

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(result).toEqual({});
      expect(spy).toBeCalled();
    });

    it('データベースにレコードの追加に失敗', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const spy = jest.spyOn(modelMock, 'save').mockRejectedValue({ message: '' });

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      await expect(service.insert(MinecraftServerModel, {})).rejects.toBeInstanceOf(DatabaseError);

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });
  });
});
