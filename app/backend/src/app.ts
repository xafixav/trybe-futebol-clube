import * as express from 'express';
import ErrorHandler from './middleware/ErrorHandler';
import LoginRouter from './Routes/Login';
import TeamsRouter from './Routes/Teams';
import MatchesRouter from './Routes/Matches';

class App {
  public app: express.Express = express();

  private LoginRoutes: express.Router;

  private TeamsRoutes: express.Router;

  private MatchesRoutes: express.Router;
  // ...

  constructor() {
    // ...
    this.config();
    this.LoginRoutes = LoginRouter;
    this.TeamsRoutes = TeamsRouter;
    this.MatchesRoutes = MatchesRouter;
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
    const { LoginRoutes, TeamsRoutes, MatchesRoutes } = this;
    this.app.use(LoginRoutes);
    this.app.use(TeamsRoutes);
    this.app.use(MatchesRoutes);
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
