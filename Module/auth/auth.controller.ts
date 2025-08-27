import {Request, Response} from "express";
import { HttpStatus, StringObj } from "../../@types";
import { zodValidation } from "../../validation/zod.validation";
import authService from "./auth.service";
import { ILoginDTO, ILoginResponseDTO, ILoginResponseWithJWT, ISignUpDTO, ISignUpResponseDTO } from "./types/auth.dto";
import { loginSchema, signUpSchema } from "./utils/auth.schema";
import { deleteUploadedAsset } from "../../utils/deleteAfterFailure";
import { removeFields } from "../../utils/object.utils";
import { generateToken } from "./utils/jwt.util";

class AuthController {
    public async login(req: Request<StringObj, StringObj,  ILoginDTO>, res: Response<ILoginResponseDTO | string>) {
        const data = req.body;
        
        const validData = zodValidation(loginSchema, data, 'auth');
        
        const user = await authService.login(validData);
        
        if(!user) {
             res
                .status(HttpStatus.BadRequest)
                .send("Invalid Credintials!");
            return;
                
        }
        const userDto = removeFields(user, ["password"]);

        req.session.userId = user.id;

        res
            .json(userDto)

    }
    public async loginWithJwt(req: Request<StringObj, StringObj,  ILoginDTO>, res: Response<ILoginResponseWithJWT | string>) {
        const data = req.body;
        
        const validData = zodValidation(loginSchema, data, 'auth');
        
        const user = await authService.login(validData);
        
        if(!user) {
             res
                .status(HttpStatus.BadRequest)
                .send("Invalid Credintials!");
            return;
                
        }
        const userDto = removeFields(user, ["password"]);

        const token = generateToken({sub: user.id, name: user.name, email: user.email});

        res
            .json({token, user: userDto})

    }

    async signUp(req: Request<StringObj, StringObj,  ISignUpDTO>, res: Response<ISignUpResponseDTO | string>) {
        try {

            const data = req.body;
            const validData = zodValidation(signUpSchema, data, "auth");
    
            const signed = await authService.signUp(validData);
            return res.status(201).json(signed)
        }
        catch(err: unknown) {
            if(req.file) {
                await deleteUploadedAsset(req.file.filename)
            }
            res
                .status(500)
                .send("Internal server error!")
        }

    }



}

export default new AuthController();


