import { Router, Request, Response } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { UserService } from '../services/user.service';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserController {
    public router: Router;
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.router = Router();
        this.routes();
    }

    private listAllUsers = async (req: Request, res: Response) => {
        // Getting all users from database.
        const userRepository = getRepository(User);
        const users = await userRepository.find({ select: ["userId", "userName", "role"] });
        res.status(200).send(users);
    }


    private getOneById = async (req: Request, res: Response) => {
        // Get the userId from url.
        const userId: number = Number(req.params.id);

        // Get the user from database.
        const userRepository = getRepository(User);

        try {
            const user = await userRepository.findOneOrFail({ 
                where: { userId }, 
                select: ["userId", "userName", "role"]
            });

            res.status(200).send(user);
        } catch (error) {
            res.status(404).send("User not found");
        }
    }

    private register = async (req: Request, res: Response) => {
        
    }

    private update = async (req: Request, res: Response) => {
        
    }

    private delete = async (req: Request, res: Response) => {
        
    }

    private routes() {
        this.router.get('/ListAllUsers', [checkJwt], this.listAllUsers);
        this.router.get('/:id', [checkJwt], this.getOneById);
        this.router.post('/register', this.register);
        this.router.put('/:id', [checkJwt], this.update);
        this.router.delete('/:id', [checkJwt], this.delete);
    }
}
