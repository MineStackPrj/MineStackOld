export const LogLevelEnumList = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const;
export type LogLevel = typeof LogLevelEnumList[number];
