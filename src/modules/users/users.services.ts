import { ICreateTrainer, IUpdateProfile } from "./users.interfaces";
import prisma from '../../config/db'
import { ApiError } from "../../error/ApiError";
import bcrypt from 'bcryptjs'


export const handleCreateTrainer = async ({firstName,lastName,email,password}:ICreateTrainer)=>{
    const existingUser = await prisma.user.findUnique({where:{email}})
    if(existingUser){
        throw new ApiError(409, "Validation Error", {field:'email', details:'Email already exist'})
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const createdTrainer = prisma.user.create({data:{firstName,lastName,email,password:hashedPassword,role:'TRAINER'}})
    return createdTrainer
}   


export const handleGetProfile = async (userId:string)=>{
    const user = await prisma.user.findUnique({where:{id:userId}})
    if (!user){
        throw new ApiError(404, "User not found")
    }
    return user
}

export const handleUpdateProfile = async (id:string,data:IUpdateProfile)=>{
    const user = await prisma.user.update({where:{id},data})
    return user
}