import app from "./src/app";
import { createServer } from "http";
import dotenv from 'dotenv';



dotenv.config()

const PORT = process.env.PORT || 8000

const server = createServer(app)

server.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`)
})

// export default app