import { Router } from "express";
import { Login } from "../controllers/Login.controller.js";
import { Register } from "../controllers/Register.controller.js";
import { authLogout, authProfile, googleAuth, googleCallback } from "../controllers/Google.controller.js";

const router = Router();

//Rutas get inicio
router.get("/", (req, res)=> res.status(200).send('servidor funcionando'));
router.get("/google", (req, res) => res.send(req.user));
router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleCallback);
router.get("/auth/profile", authProfile);
router.get("/auth/logout", authLogout);
//Rutas get Fin

router.post("/login", Login)
router.post('/register', Register)  
export default router;