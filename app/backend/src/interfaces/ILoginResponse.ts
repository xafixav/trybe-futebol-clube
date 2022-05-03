import IUser from './IUser';

export default interface ILoginResponse {
  user: IUser,
  token: string,
}
