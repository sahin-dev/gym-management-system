import bcrypt from 'bcryptjs'
import jwt from'jsonwebtoken'
import prisma from "../../config/db";
import { ValidationError } from "../../error/ValidationError";
import { ILoginUser, IRegister } from "./auth.interfaces";


export const handleLogin = async({email,password}:ILoginUser)=>{
    const user = await prisma.user.findUnique({where:{email}})
    if (!user){
        throw new ValidationError("Validation error occured!", 'email','provided email is incorrect')
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch){
        throw new ValidationError("Validation error occured!", 'password', 'password is not correct')
    }

    const token = jwt.sign({id:user.id,role:user.role}, process.env.JWT_SECRET as string, {expiresIn:'7d'})
    return token
}

export const handleRegister = async ({firstName, lastName,email,password}:IRegister)=>{
    const existingUser = await prisma.user.findUnique({where:{email}})
    if (existingUser){
        throw new ValidationError("Validation error!", "email","Email already exist!")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.user.create({data:{firstName,lastName,email,password:hashedPassword}})
    return createdUser
}