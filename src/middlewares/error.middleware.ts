import IError from '../interfaces/IError'

import { Request, Response,NextFunction } from "express";

const errorMiddleware = (err:IError,req:Request, res:Response, next:NextFunction)=>{
    console.log(err)
   
    res.status(404).json(err.convertToResponse())
}

export default errorMiddleware