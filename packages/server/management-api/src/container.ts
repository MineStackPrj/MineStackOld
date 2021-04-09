import { Container } from 'inversify';

import { AuthController } from '@controller/AuthController/AuthController';

/**
 *
 */
export function createContainer(): Container {
  const container = new Container();

  // Controller
  container.bind<AuthController>(TYPES.controller.auth).to(AuthController).inSingletonScope();

  // Validator

  // Middleware

  // Service

  // Table

  return container;
}

export const TYPES = {
  controller: {
    auth: Symbol.for('AuthController')
  },
  validator: {
  },
  service: {
  },
  table: {
  },
  middleware: {
  }
};
