import { ErrorResponse } from '../Response';

export class UnauthorizedResponse extends ErrorResponse {
  public constructor() {
    super(401, 'Unauthorized');
  }
}
