import { Request,Response } from "express"
import { ValidationError } from "../../../error/ValidationError"

export const login = (req:Request,res: Response)=>{
    throw new  ValidationError("Validation error","email","Email is not valid")
}

