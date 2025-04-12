import IError from "./IError";
import { ErrorResponse } from "../types/ErrorResponse";


export class UnauthorizedAccessError implements IError{
    name: string;
    success: boolean;
    message: string;
    statusCode: number;
    errorDetails:string;

    constructor( message:string, details:string){
        this.name = "Unauthorized Access"
        this.success = false
        this.statusCode = 401
        this.message = message
        this.errorDetails = details
    }

    convertToResponse(): ErrorResponse {
        let response:ErrorResponse = {
            success:this.success,
            message:this.message,
            errorDetails:this.errorDetails
        };
    
        return response
    }
    
}