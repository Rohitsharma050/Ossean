import express from 'express'
import {  googleLogin, loginUser, registerUser} from '../controller/userController.js'
import authUser from '../middleware/authUser.js'
const userRouter  = express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post("/google", googleLogin);
export default userRouter