
import { Router } from "express";
import { login } from "./auth.controllers";

const router = Router();

router.get('/login',login)

export default router;