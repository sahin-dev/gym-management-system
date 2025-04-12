import IError from "./IError";
import { ErrorResponse } from "../types/ErrorResponse";

export class ApiError implements IError{
    success: boolean;
    message: string;
    statusCode: number;
    errorDetails?: string | { field: string; message: string; } | undefined;

    constructor (statusCode:number, message:string,errorDetails?:any){
        this.success = false
        this.message = message
        this.statusCode = statusCode
        this.errorDetails = errorDetails
    }
    
    convertToResponse(): ErrorResponse {
        
        const errorResponse = {
            success:this.success,
            message:this.message,
            errorDetails:this.errorDetails
        }
        return errorResponse
    }
    
}