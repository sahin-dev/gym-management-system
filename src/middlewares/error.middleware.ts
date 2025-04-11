import IError from '../interfaces/IError'

import { Request, Response,NextFunction } from "express";

const errorMiddleware = (err:any,req:Request, res:Response, next:NextFunction)=>{
    
    if (err instanceof Error){
        res.status(500).json({success:false, message:err.name, errorDetails:err.message})
        return
    }
   
    res.status(404).json(err.convertToResponse())
}

export default errorMiddleware