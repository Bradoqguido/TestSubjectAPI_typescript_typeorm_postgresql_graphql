import { RouteController } from './controllers/router';
import express, { Router, Request, Response } from 'express';

class Server {
  private app: express.Application;
  private routerController: any = null;

  constructor() {
    this.app = express();
    this.configuration();
    this.setupRoutes();
  }

  private configuration() {
    this.app.set('port', process.env.PORT || 3000);
  }

  private setupRoutes() {
    this.routerController = new RouteController(this.app);
  }

  public start () {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening at ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server();
server.start();