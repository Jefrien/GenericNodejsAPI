import {Router} from 'express'
import { RouterMethods } from "../controllers/stream.controller.js";
const router = Router()

router.post('/stream/upload', RouterMethods().upload)
router.get('/stream/play/:id', RouterMethods().stream)

export default router