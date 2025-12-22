import express from 'express'
import { googleLogin, loginUser, registerUser, reportBug, sendSuggestion } from '../controller/userController.js'
import authUser from '../middleware/authUser.js'
const userRouter  = express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/suggestion',authUser,sendSuggestion)
userRouter.post('/bug',authUser,reportBug)
userRouter.post('/googleLogin',googleLogin)
export default userRouter