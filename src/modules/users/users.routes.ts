
import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { createTrainer, getProfile, updateProfile } from "./users.controllers";

const router = Router();

router.post('/create-trainer',authenticate,authorize(['ADMIN']), createTrainer)
router.route('/profile').get(authenticate, getProfile).post(authenticate, updateProfile)

export default router;