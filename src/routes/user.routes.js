import { Router } from "express";
import { registerUser } from "../controllers/user.controller";

const router=Router();

router.route("/register").post(registerUser.js)
// router.route("/login").post()//login route,it is declared but not implemented as we have not created login function in controller


export default router;//importing the registerUser function from user.controller.js
