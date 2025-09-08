import express from "express";
import { createQuery, getAllQueries } from "../controllers/customerQuery.controller.js";
import { createQuerySchema } from "../validators/customerQuery.validator.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", validate(createQuerySchema), createQuery);
router.get("/", getAllQueries);

export default router;
