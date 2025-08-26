import { ZodType } from "zod";
import { userSchema } from "../../user/utils/user.schema";
import { ILoginDTO, ISignUpDTO } from "../types/auth.dto";

export const signUpSchema = userSchema.pick({
    password: true,  
    name: true,  
    email: true, 
    avatar: true
}) satisfies ZodType<ISignUpDTO>


export const loginSchema = userSchema.pick({
    email: true, 
    password: true,  
}) satisfies ZodType<ILoginDTO>



 