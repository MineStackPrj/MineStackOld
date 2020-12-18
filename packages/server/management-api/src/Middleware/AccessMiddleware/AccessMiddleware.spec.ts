import { Container, decorate, injectable } from 'inversify';

import { LoggerService } from '../../Service/LoggerService/LoggerService';
import { TYPES } from '../../TYPES';
import { AccessMiddleware } from './AccessMiddleware';

jest.mock('../../Service/LoggerService/LoggerService');

decorate(injectable(), LoggerService);

describe('AccessMiddleware', () => {
  let container: Container;
  let middleware: AccessMiddleware;
  let logger: LoggerService;

  beforeAll(() => {
    container = new Container();
    container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();
    container.bind<AccessMiddleware>(TYPES.middleware.access).to(AccessMiddleware).inSingletonScope();

    middleware = container.get<AccessMiddleware>(TYPES.middleware.access);
    logger = container.get<LoggerService>(TYPES.service.logger);
  });

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('to be instance.', () => {
    /* ------------------------------ 評価項目 ------------------------------ */
    expect(middleware).toBeTruthy();
  });

  describe('handler', () => {
    beforeAll(() => {});

    afterAll(() => {});

    beforeEach(() => {});

    afterEach(() => {});

    it('', async () => {
      /* --------------------------- テストの前処理 --------------------------- */
      const req: any = {
        method: 'GET',
        url   : '/minecraft'
      };

      const spy = jest.spyOn(logger, 'info').mockImplementation();

      /* ------------------------ テスト対象関数を実行 ------------------------ */
      // @ts-ignore
      middleware.handler(req, undefined, () => {});

      /* ------------------------------ 評価項目 ------------------------------ */
      expect(spy).toBeCalled();
    });
  });
});
