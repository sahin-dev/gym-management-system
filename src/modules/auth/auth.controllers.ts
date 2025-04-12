import { NextFunction, Request,Response } from "express"
import { handleLogin, handleRegister } from "./auth.service"
import prisma from '../../config/db'
import { ApiError } from "../../error/ApiError"
import { ValidationError } from "../../error/ValidationError"

export const login = async (req:Request,res: Response,next:NextFunction) =>{
    
    const {email,password} = req.body
    try{
        const token = await handleLogin({email, password})
        res.status(200).json({success:true,statusCode:200,message:'Logged in successfully',Data:{token}})
    }catch(error){
        next(error)
    }

}

export const register = async (req:Request, res:Response, next:NextFunction) => {
    const {firstName, lastName, email, password} = req.body
    console.log(req.body)
    try{
        const registerData = await handleRegister({firstName,lastName,email,password})
        res.status(200).json({success:true,message:"User registered successfully", Data:registerData})
    }catch(err){
        next(err)
    }
}

