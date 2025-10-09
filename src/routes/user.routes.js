import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router();

router.route("/register").post(
    upload.fields([
        {name:"avatar",
            maxCount:1//the maximum number of files that can be uploaded with this field name
        },
        {name:"coverimage",
            maxCount:1
        }
    ]),
    registerUser);
// router.route("/login").post()//login route,it is declared but not implemented as we have not created login function in controller


export default router;//importing the registerUser function from user.controller.js
