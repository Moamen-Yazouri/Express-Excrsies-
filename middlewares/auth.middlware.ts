import {Response, Request, NextFunction } from "express";
import { CustomError } from "../Error/customError";
import { HttpStatus } from "../@types";
import userService from "../Module/user/user.service";
import { verifyToken } from "../Module/auth/utils/jwt.util";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = req.session.userId;
    const authHeader = req.headers.authorization
    if(uid) {            
        const user = userService.findById(uid);
        if(!user) {
            res.clearCookie("connect.sid")
            next(
                new CustomError(
                    'user is not Authenticated',
                    'auth',
                    HttpStatus.Unauthorized
                )
            );
            return;
        }
        next();
    }
    if(authHeader) {
        const jwt = authHeader.replace("Bearer ", "");
        console.log("jwt: ", jwt);
        try {
            const tokenPayload = verifyToken(jwt);
            console.log("Data: ", tokenPayload);
            next();
        }   
        catch {
            console.log("wrong token!");
        }
        return;
    }
    
    next(
        new CustomError(
            'user is not Authenticated',
            'auth',
            HttpStatus.Unauthorized
        )
    );
    return;

} 