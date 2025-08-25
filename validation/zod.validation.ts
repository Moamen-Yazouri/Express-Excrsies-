import { ZodError, ZodType } from "zod";
import { HttpStatus, MyModules } from "../@types";
import { CustomError } from "../Error/customError";

export const zodValidation = <T>(schema: ZodType<T>, data: T, moduleName: MyModules) => {
    try {
        const validData = schema.parse(data);
        return validData;
    }
    catch(err: unknown) {
        if(err instanceof ZodError) {
            console.log(err);
            throw new CustomError(
                err.message,
                moduleName,
                HttpStatus.BadRequest
            )
        }
        throw err;
    }
}