import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";

export function checkRole(roles: Array<string>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get user id from previous middleware (checkJwt)
            const id = res.locals.jwtPayload.userId;

            // Getting user role from database
            const userRepository = getRepository(User);
            let user: User;

            user = await userRepository.findOneOrFail(id);

            if (roles.indexOf(user.role) > -1) {
                next();
            }
            
            throw new Error("User not autorized!");
        } catch (error) {
            res.status(401).send();
        }
    }
}
