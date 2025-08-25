import { HttpStatus } from "../../@types";
import { CustomError } from "../../Error/customError";
import { createArgon2Hash, verifyArgon2Hash } from "../../utils/hashAndVerify";
import { removeFields } from "../../utils/object.utils";
import { IUser } from "../user/user.entity";
import userService from "../user/user.service";
import { ILoginDTO, ISignUpDTO } from "./types/auth.dto";

class AuthService {
    async login(data: ILoginDTO): Promise<IUser | null> {
        const user = userService.findByEmail(data.email);
        if(!user) {
            return null
        }
        const isValid = await verifyArgon2Hash(data.password, user.password);
        if(!isValid) {
            return null
        }
        return user;
    }

    async signUp(data: ISignUpDTO) {
        console.log(data, "from service");
        try {
            const hashedPassword = await createArgon2Hash(data.password);
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
