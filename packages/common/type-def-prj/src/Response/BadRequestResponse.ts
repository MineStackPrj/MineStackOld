import { ErrorResponse } from '../Response';

export class BadRequestResponse extends ErrorResponse {
  public constructor() {
    super(400, 'Bad Request');
  }
}
