import express from 'express'
const router = express.Router()

import { saveGalery } from '../controllers/controll_galery.js'

router.post('/',saveGalery)



export default router