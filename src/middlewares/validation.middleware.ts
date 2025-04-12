
import { Request, Response,NextFunction } from 'express'
import {AnyZodObject} from 'zod'
import { ValidationError } from '../error/ValidationError'

export const validate = (schema:AnyZodObject)=>{
    return (req:Request, res:Response, next:NextFunction)=>{
        try{
            schema.parse({
                body:req.body
            })
            next
        }catch(err:any){
            next(new ValidationError(err.message,"fields","field is required"))
        }
    }
}