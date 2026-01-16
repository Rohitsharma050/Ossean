import express from 'express'
import {  bugReport, googleLogin, loginUser, registerUser, sendSuggestion} from '../controller/userController.js'
import authUser from '../middleware/authUser.js'
import { upload } from '../middleware/multer.js'
const userRouter  = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post("/google", googleLogin);
userRouter.post('/suggestion',sendSuggestion);
userRouter.post('/bug', upload.single("screenshot"),bugReport);
export default userRouter