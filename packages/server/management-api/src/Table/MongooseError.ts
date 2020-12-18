import { BaseError } from '@type-def-prj/BaseError';

export class DatabaseError extends BaseError {
  public duplicate: boolean;

  public constructor(message: string) {
    super(message);

    this.duplicate = message.includes('duplicate key');
  }
}
