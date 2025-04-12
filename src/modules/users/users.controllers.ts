import {Request, Response, NextFunction } from "express";
import { handleCreateTrainer, handleGetProfile, handleGetTrainerProfile, handleTrainerProfileUpdate, handleUpdateProfile } from "./users.services";
import { ICreateTrainer, IUpdateProfile } from "./users.interfaces";
import { ApiError } from "../../error/ApiError";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";


export const createTrainer = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const trainerData:ICreateTrainer = req.body
        const trainer = await handleCreateTrainer({...trainerData})
        res.status(200).json({success:true, message:'Trainer created.',Data:trainer})
    }catch(err){
        next(err)
    }
}

export const getProfile = async (req:AuthenticatedRequest, res:Response, next:NextFunction)=>{
    try{
        const {userId} = req.body
        
        const userProfile = await handleGetProfile(userId);
        res.status(200).json({success:true,message:"Profile found",Data:userProfile})
    }catch(err){
        next(err)
    }
}

export const updateProfile = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const {userId,updatedData} = req.body

        const updatedUser = await handleUpdateProfile(userId,updatedData)
        res.status(200).json({success:true, message:'Profile updated', Data:updatedUser})
    }catch(err){
        next(err)
    }
}

export const getTrainerProfile = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const {trainerId} = req.body
        const trainer = await handleGetTrainerProfile(trainerId)
        res.status(200).json({success:true, message:'Trainer found!', Data:trainer})
    }catch(err){
        next(err)
    }
}

export const updateTrainerProfile = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const {trainerId, updatedData} = req.body
        const updatedTrainer = await handleTrainerProfileUpdate(trainerId,updatedData)
        res.status(200).json({success:true,message:"Profile updated", Data:updatedTrainer})
    }catch(err){
        next(err)
    }
}