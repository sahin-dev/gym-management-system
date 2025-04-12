import { ErrorResponse } from "../types/ErrorResponse";

interface IError{
    success:boolean
    message:string
    statusCode:number
    errorDetails?:{field:string, message:string} | string

    convertToResponse(): ErrorResponse;
    
}

export default IError