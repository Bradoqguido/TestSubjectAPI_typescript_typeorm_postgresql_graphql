import { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    public router: Router;
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.router = Router();
        this.routes();
    }

    private index = async (req: Request, res: Response) => {
        res.send(this.userService.index());
    }

    private create = async (req: Request, res: Response) => {
        res.send(this.userService.create());
    }

    private update = async (req: Request, res: Response) => {
        res.send(this.userService.update());
    }

    private delete = async (req: Request, res: Response) => {
        res.send(this.userService.delete());
    }

    private routes() {
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
