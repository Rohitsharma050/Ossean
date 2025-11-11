import express from "express"
import 'dotenv/config'
import cors from 'cors'
import connectDb from './config/mongodb.js'
const app = express()
app.use(express.json())
app.use(cors())
connectDb()
const port = process.env.PORT || 3000
app.get('/',(_req,res)=>{
   return res.write("Ji boliye")
})
app.listen(port,()=>{
    console.log('started')
})
