import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../service/Login';

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
    this.login = this.login.bind(LoginController);
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const loginResponse = await this.loginService.findUser({ email, password });
      if (loginResponse) {
        return res.status(StatusCodes.OK).json(loginResponse);
      }
    } catch (e) {
      next(e);
    }
  };

  public getRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Token not exist' });
      }
      const UserRole = await this.loginService.getUserRole(authorization);

      return res.status(StatusCodes.OK).json(UserRole);
    } catch (e) {
      next(e);
    }
  };
}
