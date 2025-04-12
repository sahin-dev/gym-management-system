
import { Router } from "express";
import { login ,register} from "./auth.controllers";
import {validate} from '../../middlewares/validation.middleware'
import {registrationSchema, loginSchema} from './auth.validations'

const router = Router();

router.post('/login', validate(loginSchema),login)
router.post('/register',validate(registrationSchema), register)
export default router;