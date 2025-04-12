import { ErrorResponse } from "../types/ErrorResponse";

export default interface IError{
    success:boolean
    message:string
    statusCode:number
    errorDetails?:{field:string, message:string} | string

    convertToResponse(): ErrorResponse;
    
}

