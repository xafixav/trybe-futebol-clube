import * as express from 'express';
import LoginController from './controller/Login';
import ErrorHandler from './middleware/ErrorHandler';
import LoginMiddleware from './middleware/Login';
import LoginRoutes from './Routes/Login';

class App {
  public app: express.Express = express();

  private LoginController: LoginController;

  private LoginMiddelware: LoginMiddleware;

  private Error: ErrorHandler;

  private LoginRoutes: express.Router;
  // ...

  constructor() {
    // ...
    this.config();
    this.LoginRoutes = LoginRoutes;
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    // ...
  }

  public apiMethods() {
    this.app.post('/login', LoginRoutes);
    this.app.get('/login/validate', LoginRoutes);
    this.app.use(ErrorHandler.ErrorReport);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(Number(PORT), () => console.log(`Servidor ouvindo na PORTA: ${PORT}`));
    this.apiMethods();
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
const testClass = new App();

testClass.apiMethods();

export const { app } = testClass;
