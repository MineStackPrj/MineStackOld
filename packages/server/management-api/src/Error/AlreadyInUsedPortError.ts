import { BaseError } from '@type-def-prj/BaseError';

/**
 * 指定したポートがすでに使用されている時のエラー
 */
export class AlreadyInUsedPortError extends BaseError {
  public constructor() {
    super('Already in used port');
  }
}
