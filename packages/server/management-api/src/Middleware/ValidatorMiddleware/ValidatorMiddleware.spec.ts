import { Container, decorate, injectable } from 'inversify';

import { LoggerService } from '../../Service/LoggerService/LoggerService';
import { TYPES } from '../../TYPES';
import { ApiRequestValidator } from './ApiRequestValidator';
import { ValidatorMiddleware } from './ValidatorMiddleware';

jest.mock('../../Service/LoggerService/LoggerService');

decorate(injectable(), LoggerService);

describe('ValidatorMiddleware', () => {
  let container: Container;
  let middleware: ValidatorMiddleware;

  beforeAll(() => {
    container = new Container();
    container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();
  });

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('すべてのValidatorがUndefinedのとき', async () => {
    class TestMiddleware extends ValidatorMiddleware {
      public bodyValidator: undefined;
      public paramValidator: undefined;
      public queryValidator: undefined;
      public headerValidator: undefined;
    }

    /* --------------------------- テストの前処理 --------------------------- */
    const middlewareName = 'Middleware';
    container.bind<TestMiddleware>(middlewareName).to(TestMiddleware).inSingletonScope();
    middleware = container.get<TestMiddleware>(middlewareName);
    const req: any = {
      body   : {},
      params : {},
      query  : {},
      headers: {}
    };
    const res: any = { status: jest.fn(), send: jest.fn() };
    const next: any = jest.fn();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    middleware.handler(req, res, next);

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(middleware).toBeTruthy();
    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.send).not.toBeCalled();

    container.unbind(middlewareName);
  });

  it('キーが一部足りないとき', async () => {
    interface IBodyData {
      a: {
        aa: string;
      };
    }
    const body: any = {};
    class TestMiddleware extends ValidatorMiddleware {
      public bodyValidator: ApiRequestValidator<IBodyData> = {
        a: {
          type    : 'object',
          required: true
        }
      };
      public paramValidator: undefined;
      public queryValidator: undefined;
      public headerValidator: undefined;
    }

    /* --------------------------- テストの前処理 --------------------------- */
    const middlewareName = 'Middleware';
    container.bind<TestMiddleware>(middlewareName).to(TestMiddleware).inSingletonScope();
    middleware = container.get<TestMiddleware>(middlewareName);
    const req: any = {
      body,
      params : {},
      query  : {},
      headers: {}
    };
    const res: any = { status: jest.fn(), send: jest.fn() };
    const next: any = jest.fn();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    middleware.handler(req, res, next);

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(middleware).toBeTruthy();
    expect(next).not.toBeCalled();
    expect(res.status).toBeCalled();
    expect(res.send).toBeCalled();

    container.unbind(middlewareName);
  });

  it('バリデーションエラーのとき', async () => {
    interface IBodyData {
      a: string;
    }
    const body: IBodyData = {
      a: 'aa'
    };
    class TestMiddleware extends ValidatorMiddleware {
      public bodyValidator: ApiRequestValidator<IBodyData> = {
        a: {
          type     : 'string',
          required : true,
          minLength: 10
        }
      };
      public paramValidator: undefined;
      public queryValidator: undefined;
      public headerValidator: undefined;
    }

    /* --------------------------- テストの前処理 --------------------------- */
    const middlewareName = 'Middleware';
    container.bind<TestMiddleware>(middlewareName).to(TestMiddleware).inSingletonScope();
    middleware = container.get<TestMiddleware>(middlewareName);
    const req: any = {
      body,
      params : {},
      query  : {},
      headers: {}
    };
    const res: any = { status: jest.fn(), send: jest.fn() };
    const next: any = jest.fn();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    middleware.handler(req, res, next);

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(middleware).toBeTruthy();
    expect(next).not.toBeCalled();
    expect(res.status).toBeCalled();
    expect(res.send).toBeCalled();

    container.unbind(middlewareName);
  });

  it('StringValidator', async () => {
    interface IParamData {
      a: string;
      b: string;
      c: string;
    }
    const params: IParamData = {
      a: 'ss',
      b: 'ss',
      c: '090'
    };
    class TestMiddleware extends ValidatorMiddleware {
      public bodyValidator: undefined;
      public paramValidator: ApiRequestValidator<IParamData> = {
        a: {
          type    : 'string',
          required: true
        },
        b: {
          type     : 'string',
          required : false,
          minLength: 1,
          maxLength: 2
        },
        c: {
          type    : 'string',
          required: false,
          regExp  : /[0-9]{3}/
        }
      };
      public queryValidator: undefined;
      public headerValidator: undefined;
    }

    /* --------------------------- テストの前処理 --------------------------- */
    const middlewareName = 'StringValidator';
    container.bind<TestMiddleware>(middlewareName).to(TestMiddleware).inSingletonScope();
    middleware = container.get<TestMiddleware>(middlewareName);
    const req: any = {
      body   : {},
      params,
      query  : {},
      headers: {}
    };
    const res: any = { status: jest.fn(), send: jest.fn() };
    const next: any = jest.fn();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    middleware.handler(req, res, next);

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(middleware).toBeTruthy();
    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.send).not.toBeCalled();

    container.unbind(middlewareName);
  });

  it('NumberValidator', async () => {
    interface IHeaderData {
      a: number;
      b: number;
      c: number;
    }
    const headers: IHeaderData = {
      a: 1,
      b: 2,
      c: 3
    };
    class TestMiddleware extends ValidatorMiddleware {
      public bodyValidator: undefined;
      public paramValidator: undefined;
      public queryValidator: undefined;
      public headerValidator: ApiRequestValidator<IHeaderData> = {
        a: {
          type    : 'number',
          required: true,
          integer : false
        },
        b: {
          type    : 'number',
          required: false,
          integer : true,
          min     : 0,
          max     : 3
        },
        c: {
          type    : 'number',
          required: false,
          integer : true
        }
      };
    }

    /* --------------------------- テストの前処理 --------------------------- */
    const middlewareName = 'NumberValidator';
    container.bind<TestMiddleware>(middlewareName).to(TestMiddleware).inSingletonScope();
    middleware = container.get<TestMiddleware>(middlewareName);
    const req: any = {
      body  : {},
      params: {},
      query : {},
      headers
    };
    const res: any = { status: jest.fn(), send: jest.fn() };
    const next: any = jest.fn();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    middleware.handler(req, res, next);

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(middleware).toBeTruthy();
    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.send).not.toBeCalled();

    container.unbind(middlewareName);
  });

  it('BooleanValidator', async () => {
    interface IQueryData {
      a: boolean;
    }
    const query: IQueryData = {
      a: true
    };
    class TestMiddleware extends ValidatorMiddleware {
      public bodyValidator: undefined;
      public paramValidator: undefined;
      public queryValidator: ApiRequestValidator<IQueryData> = {
        a: {
          type    : 'boolean',
          required: true
        }
      };
      public headerValidator: undefined;
    }

    /* --------------------------- テストの前処理 --------------------------- */
    const middlewareName = 'BooleanValidator';
    container.bind<TestMiddleware>(middlewareName).to(TestMiddleware).inSingletonScope();
    middleware = container.get<TestMiddleware>(middlewareName);
    const req: any = {
      body   : {},
      params : {},
      query,
      headers: {}
    };
    const res: any = { status: jest.fn(), send: jest.fn() };
    const next: any = jest.fn();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    middleware.handler(req, res, next);

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(middleware).toBeTruthy();
    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.send).not.toBeCalled();

    container.unbind(middlewareName);
  });

  it('ObjectValidator', async () => {
    interface IBodyData {
      a: {
        aa: string;
      };
      b: {
        bb: string;
      };
    }
    const body: IBodyData = {
      a: { aa: 'aa' },
      b: { bb: 'bb' }
    };
    class TestMiddleware extends ValidatorMiddleware {
      public bodyValidator: ApiRequestValidator<IBodyData> = {
        a: {
          type    : 'object',
          required: true
        },
        b: {
          type     : 'object',
          required : true,
          validator: {
            bb: {
              type    : 'string',
              required: false
            }
          }
        }
      };
      public paramValidator: undefined;
      public queryValidator: undefined;
      public headerValidator: undefined;
    }

    /* --------------------------- テストの前処理 --------------------------- */
    const middlewareName = 'ObjectValidator';
    container.bind<TestMiddleware>(middlewareName).to(TestMiddleware).inSingletonScope();
    middleware = container.get<TestMiddleware>(middlewareName);
    const req: any = {
      body,
      params : {},
      query  : {},
      headers: {}
    };
    const res: any = { status: jest.fn(), send: jest.fn() };
    const next: any = jest.fn();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    middleware.handler(req, res, next);

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(middleware).toBeTruthy();
    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.send).not.toBeCalled();

    container.unbind(middlewareName);
  });

  it('ArrayValidator', async () => {
    interface IBodyData {
      a: string[];
      b: {
        bb: string;
      }[];
      c: number[];
    }
    const body: IBodyData = {
      a: ['a'],
      b: [{ bb: 'bb' }],
      c: [1]
    };
    class TestMiddleware extends ValidatorMiddleware {
      public bodyValidator: ApiRequestValidator<IBodyData> = {
        a: {
          type    : 'array',
          required: true
        },
        b: {
          type     : 'array',
          required : true,
          validator: {
            bb: {
              type    : 'string',
              required: false
            }
          }
        },
        c: {
          type     : 'array',
          required : true,
          minLength: 0,
          maxLength: 2
        }
      };
      public paramValidator: undefined;
      public queryValidator: undefined;
      public headerValidator: undefined;
    }

    /* --------------------------- テストの前処理 --------------------------- */
    const middlewareName = 'ArrayValidator';
    container.bind<TestMiddleware>(middlewareName).to(TestMiddleware).inSingletonScope();
    middleware = container.get<TestMiddleware>(middlewareName);
    const req: any = {
      body,
      params : {},
      query  : {},
      headers: {}
    };
    const res: any = { status: jest.fn(), send: jest.fn() };
    const next: any = jest.fn();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    middleware.handler(req, res, next);

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(middleware).toBeTruthy();
    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.send).not.toBeCalled();

    container.unbind(middlewareName);
  });

  it('EnumValidator', async () => {
    const enumList = ['a'] as const;
    type EnumType = typeof enumList[number];
    interface IBodyData {
      a: EnumType;
    }
    const body: IBodyData = {
      a: 'a'
    };
    class TestMiddleware extends ValidatorMiddleware {
      public bodyValidator: ApiRequestValidator<IBodyData> = {
        a: {
          type    : 'enum',
          required: true,
          list    : enumList
        }
      };
      public paramValidator: undefined;
      public queryValidator: undefined;
      public headerValidator: undefined;
    }

    /* --------------------------- テストの前処理 --------------------------- */
    const middlewareName = 'EnumValidator';
    container.bind<TestMiddleware>(middlewareName).to(TestMiddleware).inSingletonScope();
    middleware = container.get<TestMiddleware>(middlewareName);
    const req: any = {
      body,
      params : {},
      query  : {},
      headers: {}
    };
    const res: any = { status: jest.fn(), send: jest.fn() };
    const next: any = jest.fn();

    /* ------------------------ テスト対象関数を実行 ------------------------ */
    middleware.handler(req, res, next);

    /* ------------------------------ 評価項目 ------------------------------ */
    expect(middleware).toBeTruthy();
    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.send).not.toBeCalled();

    container.unbind(middlewareName);
  });
});
