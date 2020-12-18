// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
import { Container } from 'inversify';

import { MinecraftController } from './Controller/MinecraftController/MinecraftController';
import { MinecraftCreateValidator } from './Controller/MinecraftController/Validator/MinecraftCreateValidator';
import { MinecraftGetValidator } from './Controller/MinecraftController/Validator/MinecraftGetValidator';
import { UserController } from './Controller/UserController/UserController';
import { AccessMiddleware } from './Middleware/AccessMiddleware/AccessMiddleware';
import { DockerService } from './Service/DockerService/DockerService';
import { HostService } from './Service/HostService/HostService';
import { LoggerService } from './Service/LoggerService/LoggerService';
import { MinecraftService } from './Service/MinecraftService/MinecraftService';
import { MongooseService } from './Service/MongooseService/MongooseService';
import { UserService } from './Service/UserService/UserService';
import { MinecraftServerTable } from './Table/MinecraftServerTable/MinecraftServerTable';
import { UserTable } from './Table/UserTable/UserTable';
import { TYPES } from './TYPES';

export function createContainer(): Container {
  const container = new Container();

  // Controller
  container.bind<MinecraftController>(TYPES.controller.minecraft).to(MinecraftController).inSingletonScope();
  container.bind<UserController>(TYPES.controller.user).to(UserController).inSingletonScope();

  // Validator
  container
    .bind<MinecraftCreateValidator>(TYPES.validator.minecraft.create)
    .to(MinecraftCreateValidator)
    .inSingletonScope();
  container.bind<MinecraftGetValidator>(TYPES.validator.minecraft.get).to(MinecraftGetValidator).inSingletonScope();

  // Middleware
  container.bind<AccessMiddleware>(TYPES.middleware.access).to(AccessMiddleware).inSingletonScope();

  // Service
  container.bind<MinecraftService>(TYPES.service.minecraft).to(MinecraftService).inSingletonScope();
  container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();
  container.bind<DockerService>(TYPES.service.docker).to(DockerService).inSingletonScope();
  container.bind<HostService>(TYPES.service.host).to(HostService).inSingletonScope();
  container.bind<MongooseService>(TYPES.service.mongoose).to(MongooseService).inSingletonScope();
  container.bind<UserService>(TYPES.service.user).to(UserService).inSingletonScope();

  // Table
  container.bind<MinecraftServerTable>(TYPES.table.minecraftServer).to(MinecraftServerTable).inSingletonScope();
  container.bind<UserTable>(TYPES.table.user).to(UserTable).inSingletonScope();

  return container;
}
