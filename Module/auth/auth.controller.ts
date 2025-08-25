import { HttpStatus, StringObj } from "../../@types";
import { zodValidation } from "../../validation/zod.validation";
import authService from "./auth.service";
import { ILoginDTO, ILoginResponseDTO, ISignUpDTO, ISignUpResponseDTO } from "./types/auth.dto";
import { Request, Response } from "express";
import { loginSchema, signUpSchema } from "./utils/auth.schema";
import { deleteUploadedAsset } from "../../utils/deleteAfterFailure";
import { removeFields } from "../../utils/object.utils";

class AuthController {
    async login(req: Request<StringObj, StringObj,  ILoginDTO, StringObj>, res: Response<ILoginResponseDTO | string>) {
        const data = req.body;
        const validData = zodValidation(loginSchema, data, 'auth');
        const user = await authService.login(validData);
        if(!user) {
            res
                .status(HttpStatus.BadRequest)
                .send("Invalid Credintials!")
                return;
        }
        const userDto = removeFields(user, ["password"])
        res
            .status(HttpStatus.OK)
            .json(userDto)

    }

    async signUp(req: Request<StringObj, StringObj,  ISignUpDTO, StringObj>, res: Response<ISignUpResponseDTO | string>) {
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


