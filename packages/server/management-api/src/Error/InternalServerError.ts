import { BaseError } from '@type-def-prj/BaseError';

export class InternalServerError extends BaseError {
  public constructor() {
    super('Internal Server Error');
  }
}
