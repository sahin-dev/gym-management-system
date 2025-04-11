import { Request, Response,NextFunction } from "express";
import { handleCreateClass, handleGetAvailableClass, handleGetTrainerClasses } from "./classes.services";

export const createClass = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const {date,startTime,endTime,trainerId} = req.body
        const createdClass = await handleCreateClass({date,startTime,endTime,trainerId})
        res.status(201).json({success:true,statusCode:201,message:'Class created successfully', Data:createdClass})
    }catch(err){
        next(err)
    }
  
}

export const getTrainerClasses = async (req:Request,res:Response, next:NextFunction)=>{
    try{
        const {trainerId} = req.body
        const classes = await handleGetTrainerClasses(trainerId)
        res.status(200).json({success:true,statusCode:200,message:"Trainer classes fetched.", Data:classes})

    }catch(err){
        next(err)
    }
}

export const getAvailableClasses =async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const availableClasses = await handleGetAvailableClass()
        res.status(200).json({success:true,satatusCode:200,message:"Available classes fetched.", Data:availableClasses})
    }catch(err){
        next(err)
    }
}