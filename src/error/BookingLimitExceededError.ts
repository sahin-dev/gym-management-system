import IError from "../interfaces/IError";
import { ErrorResponse } from "../types/ErrorResponse";


export class BookingLimitExceededError implements IError{
    name: string;
    success: boolean;
    message: string;
    statusCode: number;
   

    constructor( message:string){
        this.name = "Booking Limit Exceeded"
        this.success = false
        this.statusCode = 405
        this.message = message
    }

    convertToResponse(): ErrorResponse {
        let response:ErrorResponse = {
            success:this.success,
            message:this.message,
        };
    
        return response
    }
    
}