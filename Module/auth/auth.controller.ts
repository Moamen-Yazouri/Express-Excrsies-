import { StringObj } from "../../@types";
import authService from "./auth.service";
import { ILoginDTO, ISignUpDTO } from "./types/auth.dto";
import { Request, Response } from "express";

class AuthController {
    login(req: Request<StringObj, StringObj, {data: ILoginDTO}, StringObj>, res: Response) {

        const {data} = req.body;
    }

    async signUp(req: Request<StringObj, StringObj, {data: ISignUpDTO}, StringObj>, res: Response) {
        const {data} = req.body;
        
        const signed = await authService.signUp(data);
        return res.status(201).json({
            message: "User signed up successfully",
            data: signed
        })

    }



}

export default new AuthController();


