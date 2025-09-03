import express from "express";
import passport from "../config/passport.js";
import { signup, signin, profile } from "../controllers/auth.controller.js";
import { signupSchema, signinSchema } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.js";


const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/signin", validate(signinSchema), signin);
router.get("/profile", passport.authenticate("jwt", { session: false }), profile);

export default router;
