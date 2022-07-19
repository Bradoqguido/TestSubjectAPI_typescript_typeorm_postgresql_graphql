import { UserController } from './user.controller';
import express, { Router, Request, Response } from 'express';

export class RouteController {
    private userController: UserController;

    constructor(app: express.Application) {
        this.userController = new UserController;
        this.routes(app);
    }

    private routes(app: express.Application) {
        app.get('/', (req: Request, res: Response) => {
            res.send('Server opened');
        });

        app.use('/api/user/', this.userController.router);
    }
}