import { HttpStatus, MyModules } from "../@types";

export class CustomError extends Error {
    public errorType = "custom";
    public modulName: MyModules;
    public statusCode: HttpStatus;
    constructor(
        msg: string,
        module: MyModules,
        statusCode: HttpStatus
    ) {
        super(msg);
        this.modulName = module;
        this.statusCode = statusCode;
    }
}

