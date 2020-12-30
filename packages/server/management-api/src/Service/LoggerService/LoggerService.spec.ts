import { Container } from 'inversify';
import log4js from 'log4js';

import { TYPES } from '../../TYPES';
import { LoggerService } from './LoggerService';
import { LogLevelEnumList } from './LogLevel';

describe('LoggerService', () => {
  let container: Container;
  let loggerService: LoggerService;

  const loggerMock: any = {
    trace: jest.fn(),
    debug: jest.fn(),
    info : jest.fn(),
    warn : jest.fn(),
    error: jest.fn(),
    fatal: jest.fn()
  };

  beforeAll(() => {
    container = new Container();
    container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();

    jest.spyOn(log4js, 'getLogger').mockReturnValue(loggerMock);
    loggerService = container.get<LoggerService>(TYPES.service.logger);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    LogLevelEnumList;
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('trace', () => {
    /* ------------------------ テスト対象関数を実行 ------------------------ */
    loggerService.trace('');

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(loggerMock.trace).toBeCalled();
  });

  it('debug', () => {
    /* ------------------------ テスト対象関数を実行 ------------------------ */
    loggerService.debug('');

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(loggerMock.debug).toBeCalled();
  });

  it('info', () => {
    /* ------------------------ テスト対象関数を実行 ------------------------ */
    loggerService.info('');

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(loggerMock.info).toBeCalled();
  });

  it('warn', () => {
    /* ------------------------ テスト対象関数を実行 ------------------------ */
    loggerService.warn('');

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(loggerMock.warn).toBeCalled();
  });

  it('error', () => {
    /* ------------------------ テスト対象関数を実行 ------------------------ */
    loggerService.error('');

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(loggerMock.error).toBeCalled();
  });

  it('fatal', () => {
    /* ------------------------ テスト対象関数を実行 ------------------------ */
    loggerService.fatal('');

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(loggerMock.fatal).toBeCalled();
  });
});
