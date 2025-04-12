
import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { createTrainer, getProfile, getTrainerProfile, updateProfile, updateTrainerProfile } from "./users.controllers";

const router = Router();

router.post('/create-trainer',authenticate,authorize(['ADMIN']), createTrainer)
router.route('/trainer-profile').get(authenticate, authorize(['ADMIN']), getTrainerProfile).post(authenticate,authorize(['ADMIN']),updateTrainerProfile)
router.route('/profile').get(authenticate,authorize(['TRAINEE']), getProfile).post(authenticate,authorize(['TRAINEE']), updateProfile)

export default router;