import Users from '../models/Users';
import ILoginResponse from '../interfaces/ILoginResponse';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';
import JwtService from './Jwt';

export default class LoginService {
  jwt: JwtService;
  constructor () {
    this.jwt = new JwtService();
  }

  public async findUser(data: ILogin): Promise<ILoginResponse| void> {

    const {email, password} = data;
    const user = await Users.findOne({ where: { email, password }, attributes: ['password'] });
    if (user) {
      const token = this.jwt.generateToken(data);
      return {
        user,
        token,
      }
    };
  }
}