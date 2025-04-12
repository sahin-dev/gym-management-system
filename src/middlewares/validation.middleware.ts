
import { Request, Response,NextFunction } from 'express'
import {AnyZodObject,ZodError,ZodIssue} from 'zod'
import { ValidationError } from '../error/ValidationError'

export const validate = (schema:AnyZodObject)=>{
    return (req:Request, res:Response, next:NextFunction)=>{
        
        try{
            
            schema.parse(req.body)
           
            next()
        }catch(err:any){
           const details =  err.issues.map((issue: { path: any,message:any,code:any,validation:any })=> {
            return {path:issue.path[0], message:issue.message}
        })
            
            next(new ValidationError("Validation error",details[0].path,details[0].message))
        }
    }
}