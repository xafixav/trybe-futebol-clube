export default interface IUser {
  id?: string | number,
  username: string,
  role: string,
  email: string,
  password?: string,
}
