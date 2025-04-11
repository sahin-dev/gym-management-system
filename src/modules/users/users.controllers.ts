import {Request, Response, NextFunction } from "express";
import { handleCreateTrainer, handleGetProfile, handleUpdateProfile } from "./users.services";
import { ICreateTrainer, IUpdateProfile } from "./users.interfaces";
import { ApiError } from "../../error/ApiError";


export const createTrainer = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const trainerData:ICreateTrainer = req.body
        const trainer = await handleCreateTrainer({...trainerData})
        res.status(200).json({success:true, message:'Trainer created.',Data:trainer})
    }catch(err){
        next(err)
    }
}

export const getProfile = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const userId:string = req.body
        const userProfile = await handleGetProfile(userId);
        res.status(200).json({success:true,message:"Profile found",Data:userProfile})
    }catch(err){
        next(err)
    }
}

export const updateProfile = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const {id,updatedData} = req.body

        const updatedUser = await handleUpdateProfile(id,updatedData)
        res.status(200).json({success:true, message:'Profile updated', Data:updatedUser})
    }catch(err){
        next(err)
    }
}