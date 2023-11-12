import { Router } from "express";

const router = Router();

// importing controllers
import {
    fetchUserExercises,
    createUserExercises,
} from "../controllers/exercisesController.js";

// exercise post handler
router.route("/:_id/exercises").post(createUserExercises);

//exercises fetch handler
router.route("/:_id/logs").get(fetchUserExercises);

export { router as exercisesRouter };
