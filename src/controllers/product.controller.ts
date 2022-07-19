import { Router, Request, Response } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { ProductService } from '../services/product.service';

export class ProductController {
    public router: Router;
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
        this.router = Router();
        this.routes();
    }

    private index = async (req: Request, res: Response) => {
        res.send(this.productService.index());
    }

    private create = async (req: Request, res: Response) => {
        res.send(this.productService.create());
    }

    private update = async (req: Request, res: Response) => {
        res.send(this.productService.update());
    }

    private delete = async (req: Request, res: Response) => {
        res.send(this.productService.delete());
    }

    private routes() {
        this.router.get('/', [checkJwt], this.index);
        this.router.post('/', [checkJwt], this.create);
        this.router.put('/:id', [checkJwt], this.update);
        this.router.delete('/:id', [checkJwt], this.delete);
    }
}
