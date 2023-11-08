import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    date: Date,
});

const Exercises = mongoose.model("exercises", exerciseSchema);

export default Exercises;
