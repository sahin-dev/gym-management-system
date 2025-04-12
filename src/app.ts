import express,{ Express, NextFunction,Request,Response } from "express";
import routes from './routes'
import errorMiddleware from "./middlewares/error.middleware";
import helmet from 'helmet'
import {rateLimit} from 'express-rate-limit'


const limiter= rateLimit({
    windowMs:10*60*1000,
    limit:50,
    standardHeaders:true,
    legacyHeaders:false
})

const app = express()
app.use(express.json())
//Add security related headers
app.use(helmet())
//Add a rate liiter to prevent DoS attacks
app.use(limiter)

app.get('/', (req:Request,res:Response)=>{
    res.setHeader("Content-Type", "text/html")
    res.send("<h1>Api is working</h1>")
})
app.use('/api',routes)


app.use((req:Request, res:Response)=>{
    res.json({message:`Path: "${req.url}" not found.`})
})

app.use(errorMiddleware)

export default app