import * as bcryptjs from 'bcryptjs'
import Users from '../models/Users';
import ILoginResponse from '../interfaces/ILoginResponse';
import ILogin from '../interfaces/ILogin';
import JwtService from './Jwt';

export default class LoginService {
  jwt: JwtService;

  constructor() {
    this.jwt = new JwtService();
  }

  public async findUser(data: ILogin): Promise<ILoginResponse> {
    const { email, password } = data;
    const user: any = await Users.findOne({ where: { email }});
    const validUser = bcryptjs.compareSync(user.password, password);

    if (!validUser || !user) {
      throw { status: 401, message: 'Incorrect email or password' }
    }

    delete user.password;

    const token = this.jwt.generateToken(data);
    return {
      user,
      token,
    };
  }
}
