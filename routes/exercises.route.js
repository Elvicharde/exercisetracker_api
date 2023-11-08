import { Router } from "express";

const router = Router();

// importing controllers
import {
    fetchUserExercises,
    createUserExercises,
} from "../controllers/exercisesController.js";

// exercise post handler
router.route("/exercises").post(createUserExercises);

//exercises fetch handler
router.route("/logs?[from][&to][&limit]").get(fetchUserExercises);

export { router as exercisesRouter };
