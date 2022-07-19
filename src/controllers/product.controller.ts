import { Router, Request, Response } from 'express';
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
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
