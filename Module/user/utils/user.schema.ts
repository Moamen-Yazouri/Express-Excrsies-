import * as z from "zod";
import { IUser } from "../user.entity";

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatar: z.string().optional(), 
    createdAt: z.date(),
    updatedAt: z.date(),
    password: z.string(),
}) satisfies z.ZodType<IUser> 