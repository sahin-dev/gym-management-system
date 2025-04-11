
import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { createClass, getAvailableClasses, getTrainerClasses } from "./classes.controllers";

const router = Router();

router.post('/create', authenticate,authorize(['ADMIN']), createClass)
router.get('/classes',authenticate, authorize(['TRAINER']),getTrainerClasses)
router.get('/available',authenticate,authorize(['TRAINEE']), getAvailableClasses)

export default router;