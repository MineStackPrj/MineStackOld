import { BaseError } from '@type-def-prj/BaseError';

export class DockerError extends BaseError {
  public constructor(public readonly value: any) {
    super('DockerError');
  }
}
