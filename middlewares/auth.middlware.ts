import {Response, Request, NextFunction } from "express";
import { CustomError } from "../Error/customError";
import { HttpStatus } from "../@types";
import userService from "../Module/user/user.service";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const uid = req.session.userId;
    if(!uid) {
        next(
            new CustomError(
                'user is not Authenticated',
                'auth',
                HttpStatus.Unauthorized
            )
        );
        return;
    }

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