import 'reflect-metadata';

import { App } from '@src/app';
import { serverPort } from '@src/config';

const app = new App().server.build();

/**
 * ポートの設定.
 */
const port = normalizePort(process.env.PORT || serverPort);
app.set('port', port);

/**
 * HTTPサーバ生成.
 */
app.listen(port, () => console.log(`API running on localhost:${port}`));
app.on('error', onError);

/**
 * ポートを正規化.
 */
function normalizePort(val: number | string): boolean | number | string {
  const normalizedPort: number = typeof val === 'string' ? parseInt(val, 10) : val;

  if(isNaN(normalizedPort)) {
    return val;
  }

  if(normalizedPort >= 0) {
    return normalizedPort;
  }

  return false;
}

/**
 * エラーハンドラー.
 */
function onError(error: any): void {
  if(error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch(error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    // eslint-disable-next-line no-process-exit
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    // eslint-disable-next-line no-process-exit
    process.exit(1);
    break;
  default:
    throw error;
  }
}
