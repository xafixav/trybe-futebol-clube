import * as bcryptjs from 'bcryptjs';
import Users from '../models/Users';
import ILoginResponse from '../interfaces/ILoginResponse';
import ILogin from '../interfaces/ILogin';
import JwtService from './Jwt';
import ErrorExtension from '../ErrorExtension';

export default class LoginService {
  jwt: JwtService;

  constructor() {
    this.jwt = new JwtService();
  }

  public findUser = async (data: ILogin): Promise<ILoginResponse> => {
    const { email, password } = data;
    const userPayload: any = await Users.findOne({ where: { email } });

    if (!userPayload) {
      throw new ErrorExtension({ status: 400, message: 'Incorrect email or password' });
    }

    const validUser = bcryptjs.compareSync(password, userPayload.password);

    if (!validUser) {
      throw new ErrorExtension({ status: 400, message: 'Incorrect email or password' });
    }

    const token = this.jwt.generateToken(data);

    const userResponse = {
      id: userPayload.id,
      username: userPayload.username,
      role: userPayload.role,
      email
    }

    return {
      user: userResponse,
      token,
    };
  };
}
