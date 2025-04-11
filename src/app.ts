import express,{ Express, NextFunction,Request,Response } from "express";
import routes from './routes'
import errorMiddleware from "./middlewares/error.middleware";



const app = express()

app.use(express.json())
app.use('/api',routes)


app.use((req:Request, res:Response)=>{
    res.json({message:`Path: "${req.url}" not found.`})
})

app.use(errorMiddleware)

export default app