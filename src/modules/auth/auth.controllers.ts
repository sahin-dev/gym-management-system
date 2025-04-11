import { NextFunction, Request,Response } from "express"
import { ValidationError } from "../../error/ValidationError"
import { ILoginUser } from "./auth.interfaces"
import { handleLogin } from "./auth.service"

export const login = async (req:Request,res: Response,next:NextFunction) =>{
    const credentials:ILoginUser = req.body
    try{
        const loginResult = await handleLogin({email:"email", password:'password'})
        res.status(200).json(loginResult)
    }catch(error){
        next(error)
    }

}

