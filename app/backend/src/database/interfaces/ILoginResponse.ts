import Users from '../models/Users';

export default interface ILoginResponse {
  user: Users,
  token: string,
}
