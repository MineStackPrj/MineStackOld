import { ErrorResponse } from '../Response';

export class InternalServerResponse extends ErrorResponse {
  public constructor() {
    super(500, 'Internal Server');
  }
}
