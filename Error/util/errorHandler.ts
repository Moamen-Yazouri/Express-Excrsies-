import {Response} from "express";
import { CustomError } from "../customError";
import { HttpStatus } from "../../@types";
export const errorHandler = (error: unknown, res: Response) => {
    if(error instanceof CustomError) {
        
        res.status(error.statusCode).send(error.message)
        return;
    }
    res.status(HttpStatus.InternalServerError).send("Internal Server Error");
    return;
}

// function toCustomError(err: unknown, context: string): CustomError {
//   // Already typed -> keep it
//   if (err instanceof CustomError) return err;

//   // Example: validation libraries
//   if (isZodError(err)) {
//     return new CustomError("Validation failed", 400, "VALIDATION_ERROR", context, { cause: err });
//   }

//   if (isAuthError(err)) {
//     return new CustomError("Unauthorized", 401, "AUTH_UNAUTHORIZED", context, { cause: err });
//   }

//   if (isNotFound(err)) {
//     return new CustomError("Not found", 404, "NOT_FOUND", context, { cause: err });
//   }

//   // Fallback: unexpected -> 500
//   return new CustomError("Internal server error", 500, "INTERNAL_ERROR", context, { cause: err });
// }
