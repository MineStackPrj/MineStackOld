import { ErrorResponse } from '../Response';

export class NotFoundResponse extends ErrorResponse {
  public constructor() {
    super(404, 'Not Found');
  }
}
