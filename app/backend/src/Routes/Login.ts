import * as express from 'express';
import LoginController from '../controller/Login';
import LoginMiddleware from '../middleware/Login';

const { login, getRole } = new LoginController();
const { loginIsValid } = new LoginMiddleware();

const router = express.Router();

router
  .route('/login')
  .post(
    loginIsValid,
    login,
  );

router
  .route('/login/validate')
  .get(
    getRole,
  );

export default router;
