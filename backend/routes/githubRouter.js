import express from 'express'
import { getRandomRepo,getFilterRepo, getSearchRepo } from '../controller/githubController.js'
const githubRouter = express.Router()
githubRouter.get('/randomRepo',getRandomRepo)
githubRouter.get('/filterRepo',getFilterRepo)
githubRouter.get('/searchRepo',getSearchRepo)

export default githubRouter