import { HttpStatus } from "../../@types";
import { CustomError } from "../../Error/customError";
import { createArgon2Hash } from "../../utils/hashAndVerify";
import { removeFields } from "../../utils/object.utils";
import userService from "../user/user.service";
import { ILoginDTO, ISignUpDTO } from "./types/auth.dto";
import { signUpSchema } from "./utils/auth.schema";

class AuthService {
    login(data: ILoginDTO) {
        console.log(data);
    }

    async signUp(data: ISignUpDTO) {
        try {
            const hashedPassword = await createArgon2Hash(data.password);
            signUpSchema.parse(data);
            const signed = userService.createUser(
                data.name,
                data.email,
                hashedPassword,
                data.avatar,
            );
            return removeFields(signed, ["password"]);
        }
        catch(err: unknown) {
            if(err instanceof Error)
                throw new CustomError(err.message, "auth", HttpStatus.BadRequest);
            else 
                throw new CustomError("Internal server error", "auth", HttpStatus.InternalServerError);
        }
    }

}

export default new AuthService();
