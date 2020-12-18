import { BaseError } from '@type-def-prj/BaseError';

export class NotFoundError extends BaseError {
  public constructor() {
    super('Not Found');
  }
}
