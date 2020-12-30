import { Container } from 'inversify';

import { AuthController } from '@controller/AuthController/AuthController';
import { MinecraftController } from '@controller/MinecraftController/MinecraftController';
import { MinecraftCreateValidator } from '@controller/MinecraftController/Validator/MinecraftCreateValidator';
import { MinecraftGetValidator } from '@controller/MinecraftController/Validator/MinecraftGetValidator';
import { UserController } from '@controller/UserController/UserController';
import { UserCreateValidator } from '@controller/UserController/Validator/UserCreateValidator';
import { UserGetValidator } from '@controller/UserController/Validator/UserGetValidator';
import { AccessMiddleware } from '@middleware/AccessMiddleware/AccessMiddleware';
import { JwtAuthMiddleware } from '@middleware/AuthMiddleware/JwtAuthMiddleware';
import { LocalAuthMiddleware } from '@middleware/AuthMiddleware/LocalAuthMiddleware';
import { AuthService } from '@service/AuthService/AuthService';
import { DockerService } from '@service/DockerService/DockerService';
import { HostService } from '@service/HostService/HostService';
import { LoggerService } from '@service/LoggerService/LoggerService';
import { MinecraftService } from '@service/MinecraftService/MinecraftService';
import { MongooseService } from '@service/MongooseService/MongooseService';
import { UserService } from '@service/UserService/UserService';
import { MinecraftServerTable } from '@table/MinecraftServerTable/MinecraftServerTable';
import { UserTable } from '@table/UserTable/UserTable';

import { TYPES } from './TYPES';

export function createContainer(): Container {
  const container = new Container();

  // Controller
  container.bind<MinecraftController>(TYPES.controller.minecraft).to(MinecraftController).inSingletonScope();
  container.bind<UserController>(TYPES.controller.user).to(UserController).inSingletonScope();
  container.bind<AuthController>(TYPES.controller.auth).to(AuthController).inSingletonScope();

  // Validator
  container
    .bind<MinecraftCreateValidator>(TYPES.validator.minecraft.create)
    .to(MinecraftCreateValidator)
    .inSingletonScope();
  container.bind<MinecraftGetValidator>(TYPES.validator.minecraft.get).to(MinecraftGetValidator).inSingletonScope();
  container.bind<UserCreateValidator>(TYPES.validator.user.create).to(UserCreateValidator).inSingletonScope();
  container.bind<UserGetValidator>(TYPES.validator.user.get).to(UserGetValidator).inSingletonScope();

  // Middleware
  container.bind<AccessMiddleware>(TYPES.middleware.access).to(AccessMiddleware).inSingletonScope();
  container.bind<LocalAuthMiddleware>(TYPES.middleware.localAuth).to(LocalAuthMiddleware).inSingletonScope();
  container.bind<JwtAuthMiddleware>(TYPES.middleware.jwtAuth).to(JwtAuthMiddleware).inSingletonScope();

  // Service
  container.bind<MinecraftService>(TYPES.service.minecraft).to(MinecraftService).inSingletonScope();
  container.bind<LoggerService>(TYPES.service.logger).to(LoggerService).inSingletonScope();
  container.bind<DockerService>(TYPES.service.docker).to(DockerService).inSingletonScope();
  container.bind<HostService>(TYPES.service.host).to(HostService).inSingletonScope();
  container.bind<MongooseService>(TYPES.service.mongoose).to(MongooseService).inSingletonScope();
  container.bind<UserService>(TYPES.service.user).to(UserService).inSingletonScope();
  container.bind<AuthService>(TYPES.service.auth).to(AuthService).inSingletonScope();

  // Table
  container.bind<MinecraftServerTable>(TYPES.table.minecraftServer).to(MinecraftServerTable).inSingletonScope();
  container.bind<UserTable>(TYPES.table.user).to(UserTable).inSingletonScope();

  return container;
}
