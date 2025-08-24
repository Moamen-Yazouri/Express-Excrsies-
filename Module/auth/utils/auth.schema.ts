import { ZodType } from "zod";
import { userSchema } from "../../user/utils/user.schema";
import { ISignUpDTO } from "../types/auth.dto";

export const signUpSchema = userSchema.pick({
    password: true,  
    name: true,  
    email: true, 
    avatar: true
}) satisfies ZodType<ISignUpDTO>