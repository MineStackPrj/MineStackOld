import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import { BadRequestResponse } from '@type-def-prj/Response/BadRequestResponse';

import { LoggerService } from '../../Service/LoggerService/LoggerService';
import { TYPES } from '../../TYPES';
import {
  ApiRequestValidator, IArrayRequestValidator, IEnumRequestValidator, INumberRequestValidator, IObjectRequestValidator,
  IStringRequestValidator, RequestValidator
} from './ApiRequestValidator';

@injectable()
export abstract class ValidatorMiddleware extends BaseMiddleware {
  /**
   * 最終的なリリース時にはdebugに変更する
   */
  private logLevel: 'error' | 'debug' = 'error';

  /**
   * Bodyのバリデーター
   */
  protected abstract bodyValidator?: ApiRequestValidator<any>;

  /**
   * Paramのバリデーター
   */
  protected abstract paramValidator?: ApiRequestValidator<any>;

  /**
   * Queryのバリデーター
   */
  protected abstract queryValidator?: ApiRequestValidator<any>;

  /**
   * Headerのバリデーター
   */
  protected abstract headerValidator?: ApiRequestValidator<any>;

  public constructor(@inject(TYPES.service.logger) protected readonly logger: LoggerService) {
    super();
  }

  public handler(req: Request, res: Response, next: NextFunction): void {
    this.logger.trace('ValidatorMiddleware', 'handler');
    let flag = true;

    // Bodyのバリデーションチェック
    if (this.bodyValidator !== undefined) {
      flag = flag && this.validation(req.body, this.bodyValidator);
    }

    // Paramのバリデーションチェック
    if (this.paramValidator !== undefined) {
      flag = flag && this.validation(req.params, this.paramValidator);
    }

    // Queryのバリデーションチェック
    if (this.queryValidator !== undefined) {
      flag = flag && this.validation(req.query, this.queryValidator);
    }

    // Headerのバリデーションチェック
    if (this.headerValidator !== undefined) {
      flag = flag && this.validation(req.headers, this.headerValidator);
    }

    if (flag) {
      this.logger.info('Validator Check Success');
      next();
    } else {
      const response = new BadRequestResponse();
      res.status(response.code);
      res.send(response.toString());
    }
  }

  private validation(param: any, validationList: ApiRequestValidator<any>): boolean {
    this.logger.trace('ValidatorMiddleware', 'validation');
    let result = true;
    Object.keys(validationList).forEach(key => {
      let flag = true;
      const validator: RequestValidator = validationList[key];

      const paramExists = key in param;

      // パラメータが必須項目の場合、存在確認
      if (validator.required) {
        flag = flag && paramExists;
      }

      // パラメータが存在している時はバリデーションチェック
      if (validator.type === 'string' && paramExists) {
        flag = flag && this.stringValidation(param[key], validator);
      }

      if (validator.type === 'boolean' && paramExists) {
        flag = flag && this.booleanValidation(param[key]);
      }

      if (validator.type === 'number' && paramExists) {
        flag = flag && this.numberValidation(param[key], validator);
      }

      if (validator.type === 'object' && paramExists) {
        flag = flag && this.objectValidation(param[key], validator);
      }

      if (validator.type === 'array' && paramExists) {
        flag = flag && this.arrayValidation(param[key], validator);
      }

      if (validator.type === 'enum' && paramExists) {
        flag = flag && this.enumValidation(param[key], validator);
      }

      if (!flag) {
        this.logger[this.logLevel]('Validation Error:', key);
      }
      result = result && flag;
    });

    return result;
  }

  private enumValidation(param: string, validator: IEnumRequestValidator): boolean {
    return validator.list.includes(param);
  }

  private arrayValidation(param: any[], validator: IArrayRequestValidator<any>): boolean {
    let flag = true;

    if (validator.minLength !== undefined) {
      flag = flag && param.length >= validator.minLength;
    }

    if (validator.maxLength !== undefined) {
      flag = flag && param.length <= validator.maxLength;
    }

    if (validator.validator !== undefined) {
      param.forEach(p => {
        flag = flag && this.validation(p, validator.validator);
      });
    }

    return flag;
  }

  private objectValidation(param: object, validator: IObjectRequestValidator<any>): boolean {
    let flag = true;

    if (validator.validator !== undefined) {
      flag = flag && this.validation(param, validator.validator);
    }

    return flag;
  }

  private booleanValidation(param: boolean): boolean {
    return typeof param === 'boolean';
  }

  private numberValidation(param: number, validator: INumberRequestValidator): boolean {
    let flag = true;

    if (validator.integer) {
      flag = flag && Number.isInteger(param);
    }

    if (validator.min !== undefined) {
      flag = flag && param >= validator.min;
    }

    if (validator.max !== undefined) {
      flag = flag && param <= validator.max;
    }

    return flag;
  }

  private stringValidation(param: string, validator: IStringRequestValidator): boolean {
    let flag = true;

    if (validator.regExp !== undefined) {
      flag = flag && validator.regExp.test(param);
    }

    if (validator.minLength !== undefined) {
      flag = flag && param.length >= validator.minLength;
    }

    if (validator.maxLength !== undefined) {
      flag = flag && param.length <= validator.maxLength;
    }

    return flag;
  }
}
