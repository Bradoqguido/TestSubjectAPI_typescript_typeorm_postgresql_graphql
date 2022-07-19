import { Router, Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

export class CategoryController {
    public router: Router;
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
        this.router = Router();
        this.routes();
    }

    private index = async (req: Request, res: Response) => {
        res.send(this.categoryService.index());
    }

    private create = async (req: Request, res: Response) => {
        res.send(this.categoryService.create());
    }

    private update = async (req: Request, res: Response) => {
        res.send(this.categoryService.update());
    }

    private delete = async (req: Request, res: Response) => {
        res.send(this.categoryService.delete());
    }

    private routes() {
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
