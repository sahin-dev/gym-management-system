import {Request, Response, NextFunction} from 'express'
import { UnauthorizedAccessError } from '../error/UnauthorizedAccessError'
import jwt from 'jsonwebtoken'
import client from '../config/db'
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest'


export const authenticate = async (req:AuthenticatedRequest, res:Response, next:NextFunction)=>{
    try{
        const token = req.header('Authorization')?.split(' ')[1]
        
        if (!token){
            throw new UnauthorizedAccessError("Authentication failed", "Token Invalid")
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET!) as {id:string}
        const user = await client.user.findUnique({where:{id:decode.id}})
        if (!user){
            throw new UnauthorizedAccessError("Authentication failed", "User not found")
        }
       
        req.user = user
        next()
    }catch(err){
        next(err)
    }
    
}

export const authorize = (roles:string[])=>{
    return (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
        
        if (!roles.includes(req.user.role)){
            throw new UnauthorizedAccessError("Authorization failed", "Permission denied!")
        }
        next()
    }
}