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
    const user = await prisma.user.findUnique({where:{id:userId, role:"TRAINEE"}})
    if (!user){
        throw new ApiError(404, "User not found")
    }
    return user
}

export const handleUpdateProfile = async (id:string,data:IUpdateProfile)=>{
    const user = await prisma.user.update({where:{id, role:'TRAINEE'},data:{}})
    if (!user){
        throw new ApiError(404,"User not found")
    }
    return user
}

export const handleGetTrainerProfile = async (trainerId:string)=>{
    const trainer = await prisma.user.findUnique({where:{role:'TRAINER', id:trainerId}})
    if (!trainer){
        throw new ApiError(404,'Trainer not found' )
    }
    return trainer
}

export const handleTrainerProfileUpdate = async (trainerId:string,data:IUpdateProfile)=>{
    const trainer = await prisma.user.update({where:{role:'TRAINER',id:trainerId}, data})
    if (!trainer){
        throw new ApiError(404, 'Trainer not found')
    }
    return trainer
}