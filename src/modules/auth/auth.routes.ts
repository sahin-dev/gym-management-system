
import { Router } from "express";
import { login } from "./controllers/auth.controllers";

const router = Router();

router.get('/login', login)

export default router;