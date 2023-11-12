import { Exercises } from "../models/Exercises.js";
import { Users } from "../models/Users.js";

const createUserExercises = async (req, res) => {
    const userId = req.params._id;
    let { description, duration, date } = req.body;

    try {
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(400).json({ error: "User Not Found" });
        }
        const newExercise = await Exercises.create({
            userId,
            date: date ? new Date(date) : new Date(),
            duration,
            description,
        });

        const response = {
            username: user.username,
            description: newExercise.description,
            duration: newExercise.duration,
            date: newExercise.date.toDateString(),
            _id: userId,
        };

        console.log("Exercise created!");
        return res.status(201).json(response);
    } catch (error) {
        console.log("Error creating Exercise!");
        console.log(error);
        return res.status(400).json(error);
    }
};

const fetchUserExercises = async (req, res) => {
    const { from, to, limit } = req.query;
    const id = req.params._id;
    try {
        const user = await Users.findById(id);
        if (!user) {
            console.log("User does not exist in database");
            return res
                .status(400)
                .json({ error: "User does not exist in database" });
        }
        let filter = {};
        let dateFilter = {};
        filter["userId"] = id;

        if (from) {
            dateFilter["$gte"] = new Date(from);
        }
        if (to) {
            dateFilter["$lte"] = new Date(to);
        }

        if (from || to) {
            filter["date"] = dateFilter;
        }

        const exercises = await Exercises.find(filter).limit(+limit);
        const exerciseCount = await Exercises.countDocuments({ userId: id });

        const response = {
            username: user.username,
            count: exerciseCount,
            _id: user._id,
            log: exercises,
        };

        console.log("Exercise fetched!");
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "There was a problem fetching the exercises",
        });
    }
};

export { fetchUserExercises, createUserExercises };
