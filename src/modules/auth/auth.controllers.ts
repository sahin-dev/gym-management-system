import { NextFunction, Request,Response } from "express"
import { handleLogin } from "./auth.service"

export const login = async (req:Request,res: Response,next:NextFunction) =>{
    const {email,password} = req.body
    try{
        const loginResult = await handleLogin({email, password})
        res.status(200).json({success:true,statusCode:200,message:'Logged in successfully',Data:
            {
                token:loginResult
            }})
    }catch(error){
        next(error)
    }

}

