import * as Jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import ILogin from '../interfaces/ILogin';

export default class JwtService {
  private jwtSecret: string;

  private jwtSignConfig: SignOptions;

  constructor() {
    this.jwtSecret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
    this.jwtSignConfig = { expiresIn: '24h' };
  }

  public generateToken(data: ILogin) {
    return Jwt.sign(data, this.jwtSecret, this.jwtSignConfig);
  }

  public validateToken(token: string): Jwt.JwtPayload | string {
    return Jwt.verify(token, this.jwtSecret);
  }

  public static decodeToken(token: string) {
    return Jwt.decode(token);
  }
}
