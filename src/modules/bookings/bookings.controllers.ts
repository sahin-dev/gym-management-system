import { Request, Response,NextFunction } from "express";
import { IBooking } from "./bookings.interfaces";
import { handleBooking } from "./bookings.services";


export const bookClass = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const bookingData:IBooking = req.body
        const booking = await handleBooking(bookingData)
        res.status(200).json({success:true,message:'Class booked', Data:booking})
    }catch(err){
        next(err)
    }
}

