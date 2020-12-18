export const TYPES = {
  controller: {
    minecraft: Symbol.for('MinecraftController'),
    user     : Symbol.for('UserController')
  },
  validator: {
    minecraft: {
      create: Symbol.for('MinecraftCreateValidator'),
      get   : Symbol.for('MinecraftGetValidator')
    }
  },
  service: {
    minecraft: Symbol.for('MinecraftService'),
    logger   : Symbol.for('LoggerService'),
    docker   : Symbol.for('DockerService'),
    host     : Symbol.for('HostService'),
    mongoose : Symbol.for('MongooseService'),
    user     : Symbol.for('UserService')
  },
  table: {
    minecraftServer: Symbol.for('MinecraftServerTable'),
    user           : Symbol.for('UserTable')
  },
  middleware: {
    access: Symbol.for('AccessMiddleware')
  }
};
