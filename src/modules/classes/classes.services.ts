import { ICreateClass } from "./classes.interfaces";
import prisma from '../../config/db'
import {startOfDay, endOfDay} from 'date-fns'
import { ClassLimitExceedError } from "../../error/ClassLimitExceedError";

export const handleCreateClass = async ({date,startTime,endTime,trainerId}:ICreateClass)=>{
    const scheduleDate = new Date(date)
    const count = await prisma.class.count({where:{
        date:{
            gte:startOfDay(scheduleDate),
            lte:endOfDay(scheduleDate)
        }
    }})

    if (count >= 5){
        throw new ClassLimitExceedError("Class limit reached. Max 5 class allowed per day.")
    }

    const createdClass = prisma.class.create({data:{
        date:scheduleDate,
        startTime:startTime,
        endTime:endTime,
        trainerId
    }})

    return createdClass
}

export const handleGetTrainerClasses = async (trainerId:string)=>{

    const classes =await prisma.class.findMany({where:{trainerId}, orderBy:{date:'asc'}})
    return classes
}

export const handleGetAvailableClass = async ()=>{
    const availableClasses = await prisma.class.findMany({include:{bookings:true}})

    const filteredClasses = availableClasses.filter(c => c.bookings.length <10)
    return filteredClasses
}