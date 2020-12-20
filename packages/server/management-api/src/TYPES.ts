export const TYPES = {
  controller: {
    minecraft: Symbol.for('MinecraftController'),
    user     : Symbol.for('UserController'),
    auth     : Symbol.for('AuthController')
  },
  validator: {
    minecraft: {
      create: Symbol.for('MinecraftCreateValidator'),
      get   : Symbol.for('MinecraftGetValidator')
    },
    user: {
      create: Symbol.for('UserCreateValidator'),
      get   : Symbol.for('UserGetValidator')
    }
  },
  service: {
    minecraft: Symbol.for('MinecraftService'),
    logger   : Symbol.for('LoggerService'),
    docker   : Symbol.for('DockerService'),
    host     : Symbol.for('HostService'),
    mongoose : Symbol.for('MongooseService'),
    user     : Symbol.for('UserService'),
    auth     : Symbol.for('AuthService')
  },
  table: {
    minecraftServer: Symbol.for('MinecraftServerTable'),
    user           : Symbol.for('UserTable')
  },
  middleware: {
    access   : Symbol.for('AccessMiddleware'),
    localAuth: Symbol.for('LocalAuthMiddleware'),
    jwtAuth  : Symbol.for('JwtAuthMiddleware')
  }
};
