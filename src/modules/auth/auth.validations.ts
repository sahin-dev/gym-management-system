import {z} from 'zod'

export const registrationSchema = z.object({
    firstName:z.string({required_error:"first name is required"}),
    lastName:z.string({required_error:"last name is required"}),
    email:z.string().email("Invalid email format"),
    password:z.string().min(4, 'Password must be at least 4 characters long')
})

export const loginSchema = z.object({
    email:z.string({required_error:"Email is required"}),
    passwod:z.string({required_error:"Password is required"})
})