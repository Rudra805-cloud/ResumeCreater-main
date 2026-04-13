import { Router } from "express";
import { handelUserRegisterController ,handelUserLoginController,handelUserLogoutController} from "../controllers/auth.controller.js";
const authRouter=Router();
/**
 * @route POST /api/auth/register
 * @description Register new user
 * @access public 
 */

authRouter.post("/register",handelUserRegisterController)

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access public 
 */
authRouter.post("/login",handelUserLoginController)
/**
 * @route get /api/auth/logout
 * @description Logot a user
 * @access public 
 */
authRouter.get("/logout",handelUserLogoutController)


export {authRouter}