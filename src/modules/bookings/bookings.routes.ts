
import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { bookClass } from "./bookings.controllers";
import {validate} from '../../middlewares/validation.middleware'
import {bookingSchema} from './bookings.validations'

const router = Router();

router.post('/book',validate(bookingSchema), authenticate,authorize(['TRAINEE']),bookClass)

export default router;