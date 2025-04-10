
export type ErrorResponse = {
    success:boolean,
    message:string,
    errorDetails?:{field:string,message:string} | string
}