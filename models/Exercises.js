import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const exerciseSchema = new mongoose.Schema({
    userId: String,
    date: Date,
    duration: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Exercises = mongoose.model("exercises", exerciseSchema);

export { Exercises };
