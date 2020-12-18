
import { MinecraftServerTypeList, MinecraftServerVersionList } from '@type-def-prj/Minecraft';

import { ApiRequestValidator } from '../../../Middleware/ValidatorMiddleware/ApiRequestValidator';
import { ValidatorMiddleware } from '../../../Middleware/ValidatorMiddleware/ValidatorMiddleware';
import { MinecraftServiceCreateRequest } from '../../../Service/MinecraftService/types/MinecraftServiceRequest';
import {
  LevelTypeList, MinecraftDifficultyTypeList, MinecraftGameModeTypeList
} from '../../../Table/MinecraftServerTable/types/ServerProperties';

export class MinecraftCreateValidator extends ValidatorMiddleware {
  /**
   * Bodyのバリデーター
   */
  protected bodyValidator: ApiRequestValidator<MinecraftServiceCreateRequest> = {
    name: {
      type     : 'string',
      required : true,
      minLength: 1,
      maxLength: 30
    },
    startServer: {
      type    : 'boolean',
      required: true
    },
    serverType: {
      type    : 'enum',
      required: true,
      list    : MinecraftServerTypeList
    },
    version: {
      type    : 'enum',
      required: true,
      list    : MinecraftServerVersionList
    },
    serverPort: { type: 'number', required: true, integer: true, min: 0, max: 65534 },
    properties: {
      type     : 'object',
      required : true,
      validator: {
        allowFlight               : { type: 'boolean', required: true },
        allowNether               : { type: 'boolean', required: true },
        difficulty                : { type: 'enum', required: true, list: MinecraftDifficultyTypeList },
        enableQuery               : { type: 'boolean', required: true },
        enableCommandBlock        : { type: 'boolean', required: true },
        forceGamemode             : { type: 'boolean', required: true },
        gamemode                  : { type: 'enum', required: true, list: MinecraftGameModeTypeList },
        generateStructures        : { type: 'boolean', required: true },
        hardcore                  : { type: 'boolean', required: true },
        levelSeed                 : { type: 'string', required: true },
        levelName                 : { type: 'string', required: true },
        levelType                 : { type: 'enum', required: true, list: LevelTypeList },
        maxBuildHeight            : { type: 'number', required: true, integer: true },
        maxPlayers                : { type: 'number', required: true, integer: true, min: 1, max: 2147483647 },
        maxTickTime               : { type: 'number', required: true, integer: true, min: 0, max: 9.223372e18 },
        maxWorldSize              : { type: 'number', required: true, integer: true, min: 1, max: 29999984 },
        motd                      : { type: 'string', required: true },
        opPermissionLevel         : { type: 'number', required: true, integer: true, min: 1, max: 4 },
        playerIdleTimeout         : { type: 'number', required: true, integer: true },
        pvp                       : { type: 'boolean', required: true },
        queryPort                 : { type: 'number', required: true, integer: true, min: 0, max: 65534 },
        resourcePack              : { type: 'string', required: true },
        resourcePackSha1          : { type: 'string', required: true },
        snooperEnabled            : { type: 'boolean', required: true },
        spawnAnimals              : { type: 'boolean', required: true },
        spawnMonsters             : { type: 'boolean', required: true },
        spawnNpcs                 : { type: 'boolean', required: true },
        spawnProtection           : { type: 'number', required: true, integer: true },
        viewDistance              : { type: 'number', required: true, integer: true, min: 2, max: 32 },
        whiteList                 : { type: 'array', required: true },
        ops                       : { type: 'array', required: true },
        icon                      : { type: 'string', required: true },
        announcePlayerAchievements: { type: 'boolean', required: true },
        memory                    : { type: 'string', required: true, regExp: /^[0-9]+[mg]$/ }
      }
    }
  };

  /**
   * Paramのバリデーター
   */
  protected paramValidator = undefined;

  /**
   * Queryのバリデーター
   */
  protected queryValidator = undefined;

  /**
   * Headerのバリデーター
   */
  protected headerValidator = undefined;
}
