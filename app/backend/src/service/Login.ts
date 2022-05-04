import * as bcryptjs from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import Users from '../database/models/Users';
import ILoginResponse from '../interfaces/ILoginResponse';
import ILogin from '../interfaces/ILogin';
import JwtService from './Jwt';
import ErrorExtension from '../utility/ErrorExtension';

export default class LoginService {
  jwt: JwtService;

  private user;

  constructor() {
    this.jwt = new JwtService();
    this.user = Users;
  }

  public findUser = async (data: ILogin): Promise<ILoginResponse> => {
    const { email, password } = data;
    const userPayload = await Users.findOne({ where: { email } });

    if (!userPayload) {
      throw new ErrorExtension({ status: 400, message: 'Incorrect email or password' });
    }
    this.validateUser(userPayload, password);

    const userResponse = {
      id: userPayload.id,
      username: userPayload.username,
      role: userPayload.role,
      email,
    };

    return {
      user: userResponse,
      token: this.jwt.generateToken(data),
    };
  };

  private validateUser = (payload: ILogin, password: string): boolean => {
    const validUser = bcryptjs.compareSync(password, payload.password);

    if (!validUser) {
      throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST,
        message: 'Incorrect email or password' });
    }
    return validUser;
  };

  public getUserRole = async (token: string) => {
    try {
      const { email }: any = this.jwt.validateToken(token);

      const User = await this.user.findOne({ where: { email } });

      if (User) {
        return User.role;
      }
    } catch (e: any) {
      throw new ErrorExtension({ status: StatusCodes.BAD_REQUEST, message: e.message });
    }
  };
}
