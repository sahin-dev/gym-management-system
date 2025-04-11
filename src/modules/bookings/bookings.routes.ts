
import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { bookClass } from "./bookings.controllers";

const router = Router();

router.post('/book', authenticate,authorize(['TRAINEE']), bookClass)

export default router;