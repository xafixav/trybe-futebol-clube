import * as express from 'express';
import LoginController from './database/controller/Login';
import ErrorHandler from './database/middleware/ErrorHandler';

class App {
  public app: express.Express = express();

  private LoginController: LoginController;

  private Error: ErrorHandler;
  // ...

  constructor() {
    // ...
    this.config();
    this.LoginController = new LoginController();
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

  // ...
  public start(PORT: string | number):void {
    this.app.listen(Number(PORT), () => console.log(`Servidor ouvindo na PORTA: ${PORT}`));
    this.app.post('/login', this.LoginController.login);
    this.app.use(ErrorHandler.ErrorReport);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
