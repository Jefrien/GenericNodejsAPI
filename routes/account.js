import {Router} from 'express'
import { RouteMethods } from "../controllers/auth.controller.js";
import {TokenRouterMethods} from "../controllers/token.controller.js";
const router = Router()

router.post("/refresh", TokenRouterMethods().refresh);
router.post('/account/login', RouteMethods().login)
router.post('/account/register', RouteMethods().register)

export default router