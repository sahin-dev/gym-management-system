import IError from "./IError";
import { ErrorResponse } from "../types/ErrorResponse";


export class ValidationError implements IError{
    name: string;
    success: boolean;
    message: string;
    statusCode: number;
    errorDetails: { field: string; message: string; };

    constructor( message:string,field:string,details:string){
        this.name = "Validation Error"
        this.success = false
        this.statusCode = 400
        this.message = message
        this.errorDetails = {field,message:details}
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