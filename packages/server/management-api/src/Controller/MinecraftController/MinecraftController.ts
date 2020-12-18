import { Response } from 'express';
import { inject } from 'inversify';
import {
  controller, httpGet, httpPost, interfaces, requestBody, requestParam, response
} from 'inversify-express-utils';

import { IResponse, SuccessResponse } from '@type-def-prj/Response';
import { BadRequestResponse } from '@type-def-prj/Response/BadRequestResponse';
import { InternalServerResponse } from '@type-def-prj/Response/InternalServerResponse';
import { NotFoundResponse } from '@type-def-prj/Response/NotFoundResponse';

import { AlreadyInUsedPortError } from '../../Error/AlreadyInUsedPortError';
import { LoggerService } from '../../Service/LoggerService/LoggerService';
import { MinecraftService } from '../../Service/MinecraftService/MinecraftService';
import { MinecraftServiceCreateRequest } from '../../Service/MinecraftService/types/MinecraftServiceRequest';
import { NotFoundError } from '../../Table/NotFoundError';
import { TYPES } from '../../TYPES';

@controller('/minecraft', TYPES.middleware.access)
export class MinecraftController implements interfaces.Controller {
  public constructor(
    @inject(TYPES.service.minecraft) private readonly minecraftService: MinecraftService,
    @inject(TYPES.service.logger) private readonly logger: LoggerService
  ) {}

  /**
   * マイクラサーバーリスト
   */
  @httpGet('/')
  public async getMinecraftServerList(@response() res: Response): Promise<void> {
    this.logger.trace('MinecraftController', 'getMinecraftServerList');
    const response = new SuccessResponse('Hallow World');
    res.status(response.code);
    res.send(response.toString());
  }

  /**
   * マイクラサーバーの作成
   * @param obj Request Body
   */
  @httpPost('/', TYPES.validator.minecraft.create)
  public async postMinecraftServer(
    @response() res: Response,
    @requestBody() obj: MinecraftServiceCreateRequest
  ): Promise<void> {
    this.logger.trace('MinecraftController', 'postMinecraftServer');
    let response: IResponse<any>;
    try {
      const id = await this.minecraftService.create(obj);
      response = new SuccessResponse(id);
    } catch (err) {
      this.logger.error('MinecraftController', err.message);
      if (err instanceof AlreadyInUsedPortError) {
        response = new BadRequestResponse();
      } else {
        response = new InternalServerResponse();
      }
    }
    res.status(response.code);
    res.send(response.toString());
  }

  /**
   * マイクラサーバーの情報を取得
   * @param minecraftId マイクラサーバーId
   */
  @httpGet('/:minecraftId', TYPES.validator.minecraft.get)
  public async getMinecraftServer(
    @response() res: Response,
    @requestParam('minecraftId') minecraftId: string
  ): Promise<void> {
    this.logger.trace('MinecraftController', 'getMinecraftServer');
    let response: IResponse<any>;
    try {
      const result = await this.minecraftService.get(minecraftId);
      response = new SuccessResponse(result);
    } catch (err) {
      if (err instanceof NotFoundError) {
        response = new NotFoundResponse();
      } else {
        response = new InternalServerResponse();
      }
    }
    res.status(response.code);
    res.send(response.toString());
  }

  /**
   * マイクラサーバーの状態を取得
   * @param minecraftId マイクラサーバーId
   */
  @httpGet('/:minecraftId/status', TYPES.validator.minecraft.get)
  public async getMinecraftServerStatus(
    @response() res: Response,
    @requestParam('minecraftId') minecraftId: string
  ): Promise<void> {
    this.logger.trace('MinecraftController', 'getMinecraftServer');
    let response: IResponse<any>;
    try {
      const result = await this.minecraftService.getStatus(minecraftId);
      response = new SuccessResponse(result);
    } catch (err) {
      if (err instanceof NotFoundError) {
        response = new NotFoundResponse();
      } else {
        response = new InternalServerResponse();
      }
    }
    res.status(response.code);
    res.send(response.toString());
  }
}
