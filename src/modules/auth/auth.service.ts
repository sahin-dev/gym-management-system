import bcrypt from 'bcryptjs'
import jwt from'jsonwebtoken'
import prisma from "../../config/db";
import { ValidationError } from "../../error/ValidationError";
import { ILoginUser } from "./auth.interfaces";


export const handleLogin = async({email,password}:ILoginUser)=>{
    const user = await prisma.user.findUnique({where:{email}})
    if (!user){
        throw new ValidationError("Validation error occured!", 'email','provided email is incorrect')
    }
    const passwordMatch = await bcrypt.compare(user.password, password)
    if (!passwordMatch){
        throw new ValidationError("Validation error occured!", 'password', 'password is not correct')
    }

    const token = jwt.sign({id:user.id,role:user.role}, process.env.JWT_SECRET as string, {expiresIn:'7d'})
    return token
}