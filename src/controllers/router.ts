import { ProductController } from './product.controller';
import { CategoryController } from './category.controller';
import { UserController } from './user.controller';
import express, { Router, Request, Response } from 'express';

export class RouteController {
    private userController: UserController;
    private categoryController: CategoryController;
    private productController: ProductController;

    constructor(app: express.Application) {
        this.userController = new UserController;
        this.categoryController = new CategoryController;
        this.productController = new ProductController;
        this.routes(app);
    }

    private routes(app: express.Application) {
        app.get('/', (req: Request, res: Response) => {
            res.send('Server opened');
        });

        app.use('/api/user/', this.userController.router);
        app.use('/api/category/', this.categoryController.router);
        app.use('/api/product/', this.productController.router);
    }
}