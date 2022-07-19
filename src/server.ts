import { RouteController } from './controllers/router';
import express from 'express';
import 'reflect-metadata';
import * as TypeORM from 'typeorm';
const cors = require('cors');

class Server {
  private app: express.Application;
  private routerController: any = null;

  constructor() {
    this.app = express();
    this.configuration();
    this.setupRoutes();
  }

  private async configuration() {
    try {
      this.app.set('port', process.env.APP_PORT || 3000);

      this.app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
      }));

      await TypeORM.createConnection();

    } catch (error) {
      console.log(error);
      
    }
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