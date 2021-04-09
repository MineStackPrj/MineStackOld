import * as bodyParser from 'body-parser';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import mongoose from 'mongoose';
import passport from 'passport';

import { mongoUrl } from './config';
import { createContainer } from './container';

export class App {
  public server: InversifyExpressServer;

  /**
   *
   */
  public constructor() {
    const app = express();
    this.middleware(app);
    this.createStaciRouter(app);
    this.server = new InversifyExpressServer(createContainer(), null, { rootPath: '/api' }, app);
  }

  /**
   *
   */
  private createStaciRouter(app: express.Express): void {
    app.use('', express.static('build/public'));
  }

  /**
   *
   */
  private middleware(app: express.Express): void {

    // add body parser
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    app.use(bodyParser.json());

    // CORS回避
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    // passportの設定
    app.use(passport.initialize());

    // 接続する MongoDB の設定
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);
    mongoose
      .connect(process.env.mongoUrl || mongoUrl, {
        useNewUrlParser   : true,
        useUnifiedTopology: true,
        promiseLibrary    : require('bluebird')
      })
      .then(() => console.log('connection successful'))
      .catch((err: any) => console.error(err));
    process.on('SIGINT', () => {
      mongoose.disconnect();
    });
  }
}
