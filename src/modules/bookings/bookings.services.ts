import prisma from '../../config/db'
import {Request, Response} from 'express'
import { IBooking } from './bookings.interfaces'
import { ApiError } from '../../error/ApiError'
import { LIMIT_TRAINEE_PRE_CLASS } from '../../config/constants'


export const handleBooking = async({userId,classId}:IBooking)=>{

    const availableClass = await prisma.class.findUnique({where:{id:classId}, include:{bookings:true}})
    if (!availableClass){
        throw new ApiError(404,"Class not found")
    }
    if (availableClass.bookings.length >= LIMIT_TRAINEE_PRE_CLASS){
        throw new ApiError(409, "Booking Limit Exceed")
    }
    const booking = await prisma.booking.create({data:{classId,userId}})
    return booking
}