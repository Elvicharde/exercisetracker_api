import { Router } from "express";

const router = Router();

// importing controllers
import { createUser, fetchUsers } from "../controllers/usersController.js";
import { exercisesRouter } from "./exercises.route.js";

// user registration handler
router.route("/").post(createUser).get(fetchUsers);

//passing requests to the exercises route
router.use(exercisesRouter);

export { router as usersRouter };
