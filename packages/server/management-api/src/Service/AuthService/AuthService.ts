import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, VerifyCallback } from 'passport-jwt';
import { IStrategyOptions, IVerifyOptions, Strategy as LocalStrategy, VerifyFunction } from 'passport-local';

import { TYPES } from '@/TYPES';
import { LoggerService } from '@service/LoggerService/LoggerService';
import { UserService } from '@service/UserService/UserService';

@injectable()
export class AuthService {
  // ミドルウェア用関数
  public LocalAuthMiddleware: (req: Request, res: Response, next: NextFunction) => void;

  public JwtAuthMiddleware: (req: Request, res: Response, next: NextFunction) => void;

  // jsonwebtoken
  private readonly jwtSecret = 'secret';
  private readonly jwtOptions: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d'
  };

  // passport-jwt
  private readonly issuer = 'accounts.minestack.example.com';

  private readonly siteUrl = 'minestack.example.com';

  private readonly jwtStrategyOptions: any = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey   : this.jwtSecret
    /*   issuer: this.issuer,
    audience: this.siteUrl */
  };

  // passport-local
  private readonly localStrategyOptions: IStrategyOptions = {
    usernameField: 'userId',
    passwordField: 'password'
  };

  public constructor(
    @inject(TYPES.service.logger) private readonly logger: LoggerService,
    @inject(TYPES.service.user) private readonly user: UserService
  ) {
    // Passportに関する設定
    passport.use(new LocalStrategy(this.localStrategyOptions, this.localAuthVerifyFuncGenerator()));
    passport.use(new JwtStrategy(this.jwtStrategyOptions, this.jwtAuthVerifyFuncGenerator()));
    this.LocalAuthMiddleware = passport.authenticate('local', { session: false });
    this.JwtAuthMiddleware = passport.authenticate('jwt', { session: false });
  }

  /**
   * JWT発行
   * @param userId ユーザーID
   */
  public jwtSign(userId: string): string | boolean {
    this.logger.info(userId);
    return jwt.sign({ userId: userId }, this.jwtSecret, this.jwtOptions);
  }

  /**
   * ローカル認証ストラテジーを返す
   */
  private localAuthVerifyFuncGenerator(): VerifyFunction {
    const userService = this.user;
    const verifyFunc = (
      userId: string,
      password: string,
      done: (error: any, user?: any, options?: IVerifyOptions | undefined) => void
    ): void => {
      userService.getUser(userId).then(matchedUser => {
        console.log('hoge');
        if (!matchedUser) {
          return done(null, false, { message: 'ユーザー名が正しくありません。' });
        }
        return userService.comparePassword(matchedUser.userId, password).then(isOk => {
          if (!isOk) {
            return done(null, false, { message: 'パスワードが正しくありません。' });
          } else {
            return done(null, matchedUser);
          }
        });
      });
    };
    return verifyFunc;
  }

  /**
   * JWT認証ストラテジーを返す
   */
  private jwtAuthVerifyFuncGenerator(): VerifyCallback {
    const userService = this.user;
    const verifyFunc = (
      payload: any,
      done: (error: any, user?: any, options?: IVerifyOptions | undefined) => void
    ): void => {
      userService.getUser(payload.userId).then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, null);
        }
      });
    };
    return verifyFunc;
  }
}
