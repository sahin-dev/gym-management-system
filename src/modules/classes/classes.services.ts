import { ICreateClass } from "./classes.interfaces";
import prisma from '../../config/db';
import {startOfDay, endOfDay} from 'date-fns';
import { ClassLimitExceedError } from "../../error/ClassLimitExceedError";
import {LIMIT_CLASS_PER_DAY, LIMIT_TRAINEE_PRE_CLASS} from '../../config/constants';
import { ApiError } from "../../error/ApiError";


//create class
export const handleCreateClass = async ({date,startTime,trainerId}:ICreateClass)=>{
    const scheduleDate = new Date(date)
    const start = new Date(`${scheduleDate}T${startTime}`)
    const end = new Date(start.getTime()+ 2*60*60*1000)
    //Check number of classes created today
    const count = await getCount(scheduleDate)

    if (count >= LIMIT_CLASS_PER_DAY){
        throw new ClassLimitExceedError("Class limit reached. Max 5 class allowed per day.")
    }

    const conflictClass = await checkConfilcts(trainerId, scheduleDate, start,end)
    if (conflictClass){
        throw new ApiError(409, "Class Conflicted!", "Trainer already scheduled for another class in same day and time.")
    }

    const createdClass = await prisma.class.create({data:{
        date:scheduleDate,
        startTime:start,
        endTime:end,
        trainerId
    }})

    return createdClass
}

//Get trainer assigned classes
export const handleGetTrainerClasses = async (trainerId:string)=>{

    const classes = await prisma.class.findMany({where:{trainerId}, orderBy:{date:'asc'}})
    return classes
}

//get available classes which bookings less then 10

export const handleGetAvailableClass = async ()=>{
    const availableClasses = await prisma.class.findMany({include:{bookings:true}})

    const filteredClasses = availableClasses.filter(c => c.bookings.length < LIMIT_TRAINEE_PRE_CLASS)
    return filteredClasses
}

//Count the number of class for a day

const getCount = async (scheduleDate:Date)=>{
    return await prisma.class.count({where:{
        date:{
            gte:startOfDay(scheduleDate),
            lte:endOfDay(scheduleDate)
        }
    }})
}

//check class conflicts for a trainer in the same time and day

const checkConfilcts = async (trainerId:string,scheduleDate:Date,start:Date,end:Date)=>{
    return await prisma.class.findFirst(
        {
            where:{trainerId,date:scheduleDate,
            OR:[
                {
                    startTime:{lt:end},
                    endTime:{gt:start}
                }
        ]}})
}