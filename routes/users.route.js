import { Router } from "express";

const router = Router();

// importing controllers
import { createUser } from "../controllers/usersController.js";
import { exercisesRouter } from "./exercises.route.js";

// user registration handler
router.route("/").post(createUser);

//passing requests to the exercises route
router.use("/:_id", exercisesRouter);

export { router as usersRouter };
