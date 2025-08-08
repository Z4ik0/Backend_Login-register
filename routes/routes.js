import { Router } from "express";
import { Login } from "../controllers/Login.controller.js";
import { Register } from "../controllers/Register.controller.js";
import { googleLogout, googleProfile, googleAuth, googleCallback } from "../controllers/Google.controller.js";
import { Logout } from "../controllers/logout.controller.js";
import { ForgotPassword } from "../controllers/Forgot_password.controller.js";
import { ResetPassword } from "../controllers/Reset_password.controller.js";


const router = Router();

//Rutas get inicio
router.get("/", (req, res)=> res.status(200).send('servidor funcionando'));
router.get("/google", (req, res) => res.send(req.user));
router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleCallback);
router.get("/auth/google/profile", googleProfile);
router.get("/auth/google/logout", googleLogout);
router.get("/logout", Logout);
//Rutas get Fin

router.post("/resetpassword", ResetPassword)
router.post("/recover", ForgotPassword)
router.post("/login", Login)
router.post('/register', Register)  
export default router;