import { Jwt }, { SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import ILogin from '../interfaces/ILogin';

export default class JwtService {
  private jwtSecret: string
  private jwtSignConfig: SignOptions
  constructor() {
    this.jwtSecret = fs.readFileSync('./app/backend/jwt.evaluation.key', { encoding: 'utf-8' });
    this.jwtSignConfig = {algorithm: 'RS256', expiresIn: '24h'}
  }

  public generateToken(data: ILogin) {
    return Jwt.sign(data, this.jwtSecret, this.jwtSignConfig);
  }

  public validateToken(token: string) {
    try {
     return Jwt.verify(token, this.jwtSecret)
    } catch (e) {
      return e;
    }
  }

  public decodeToken(token: string) {
    return Jwt.decode(token);
  }
}