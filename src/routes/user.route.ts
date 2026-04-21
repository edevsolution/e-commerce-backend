import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

router.post("/", userController.createUser)
router.get("/", userController.getUser)

export const userRouter: Router = router;
