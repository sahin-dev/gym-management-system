
import { Request, Response,NextFunction } from 'express'
import {AnyZodObject} from 'zod'
import { ValidationError } from '../error/ValidationError'

export const validate = (schema:AnyZodObject)=>{
    return (req:Request, res:Response, next:NextFunction)=>{
        
        try{
            
            schema.parse(req.body)
           
            next()
        }catch(err:any){
            console.log(err)
            next(err)
        }
    }
}