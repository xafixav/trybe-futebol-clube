import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import loginSchema from '../schema/LoginSchema';

export default class LoginMiddleware {
  public loginIsValid = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { error } = loginSchema.validate({
        email, password,
      }, { convert: false });
      if (error) {
        const [StatusCode, ErrorMessage] = error.details[0].message.split('|');
        return res.status(Number(StatusCode)).json({ error: ErrorMessage });
      }
      next();
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  };
}
