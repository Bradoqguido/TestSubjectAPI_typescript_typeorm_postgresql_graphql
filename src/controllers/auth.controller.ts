import { validate } from 'class-validator';
import { Router, Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
require('dotenv').config();
import { User } from "../entities/user.entity";

export class AuthController {
  public router: Router;

  constructor() {
      this.router = Router();
      this.routes();
  }

  private login = async (req: Request, res: Response) => {
    let { userName, password } = req.body;

    // Check if has username and password.
    if (!(userName && password)) {
      res.status(400).send('Please, type your username and password.');
      return;
    }

    try {
      // Get user from database.
      const userRepository = getRepository(User);
      let user: User;
      user = await userRepository.findOneOrFail({ where: { userName } });

      if (!user.checkIfPasswordIsValid(password)) {
        throw new Error("Incorrect username or password.");
      }

      // Sing a jwt that is valid for one hour.
      const token = jwt.sign(
        { userId: user.userId, userName: user.userName },
        process.env.APP_SECRET!,
        { expiresIn: '1h' }
      );

      // Send the jwt in the response.
      res.send(token);
    } catch (error) {
      res.status(401).send(error);
    }
  }

  private changePassword = async (req: Request, res: Response) => {
    // get the userId from jwt payload.
    const userId = res.locals.jwtPayload.userId;
      
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send("Please, type your old password and the new password");
      return;
    }

    // Get user from database.
    const userRepository = getRepository(User);
    let user!: User;
    try {
      user = await userRepository.findOneOrFail({ where: { userId } });
      
      if (!user.checkIfPasswordIsValid(oldPassword)) {
        throw new Error();
      }
    } catch (error) {
      res.status(401).send();
    }

    // Validate entity.
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Hash the new password and save.
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  }

  private routes() {
      this.router.post('/login', this.login);
      this.router.post('/changePassword/:id', this.changePassword);
  }
}