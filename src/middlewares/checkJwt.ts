import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export function checkJwt(req: Request, res: Response, next: NextFunction) {
    
    // Get the jwt token from headers.
    const token = <string>req.headers['auth'];
    let jwtPayload: any = null;

    // Try to validate the jwt token and get data from request.
    try {        
        jwtPayload = <any>jwt.verify(token, process.env.APP_SECRET!);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send(); // Return 401 if the tolen is not valid.
        return;
    }

    // Each request from user i will send a token valid for one hour.
    const { userId, userName } = jwtPayload;
    const newJwtToken = jwt.sign({ userId, userName }, process.env.APP_SECRET!, { expiresIn: '1h' });
    res.setHeader('token', newJwtToken);

    // Call the next middleware or controller.
    next();
}