import express from 'express'
import { getRandomRepo,getFilterRepo, getSearchRepo,getOrgList } from '../controller/githubController.js'
const githubRouter = express.Router()
githubRouter.get('/randomRepo',getRandomRepo)
githubRouter.get('/filterRepo',getFilterRepo)
githubRouter.get('/searchRepo',getSearchRepo)
githubRouter.get('/getOrg',getOrgList)

export default githubRouter