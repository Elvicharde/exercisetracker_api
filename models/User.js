import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema({
    username: String,
});

const Users = mongoose.model("users", userSchema);

export default Users;
