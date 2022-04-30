import { ErrorRequestHandler } from 'express';

export default class ErrorHandler {
  public static ErrorReport: ErrorRequestHandler = (err, _req, res, _next) => {
    const status = err.status || 500;

    console.log(err);
    return res.status(status).json({ message: err.message });
  };
}
