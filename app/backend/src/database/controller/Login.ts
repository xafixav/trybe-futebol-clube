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
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
    } catch (e) {
      next(e);
    }
  };
}
