import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/me", userController.getUser)
router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)

export const userRouter: Router = router;
