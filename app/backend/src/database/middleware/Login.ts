import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import loginSchema from '../schema/LoginSchema';

export default class LoginMiddleware {
  public loginIsValid = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json({ message: 'All fields must be filled' });
      }
      const { error } = loginSchema.validate({
        email, password,
      }, { convert: false });
      if (error) {
        const [StatusCode, ErrorMessage] = error.details[0].message.split('|');
        return res.status(Number(StatusCode)).json({ message: ErrorMessage });
      }
      next();
    } catch (e) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
