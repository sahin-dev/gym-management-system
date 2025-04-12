
import {z} from 'zod'

export const bookingSchema = z.object({
    userId:z.string({required_error:"User id is required"}),
    classId:z.string({required_error:"Class id is required"})
})