import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// provisioning static resources
app.use("/public", express.static(`${process.cwd()}/public`));
app.get("/", (req, res) => {
    res.sendFile(`${process.cwd()}/views/index.html`);
});

// importing controllers, models, and helper functions
import { connectDb } from "./controllers/databaseConnector.js";

// setting up routes
import { usersRouter } from "./routes/users.route.js";

app.use("/api/users", usersRouter);
app.use("*", (req, res) =>
    res.status(404).json({
        error: "Not Found",
    })
);

// starting the server
const PORT = process.env.PORT || 3000;

// starting the server on available/specified port with database credentials
const startServer = async (PORT, dbUri) => {
    await connectDb(dbUri); // connecting to mongoDb via the DB controller
    app.listen(PORT, () => {
        console.log(
            `Server running in ${process.env.NODE_ENV} mode on port ${PORT}\n`
        );
    });
};

try {
    startServer(PORT, process.env.DB_CREDS);
} catch (error) {
    // handle unresolved or rejected promises and errors
    process.on("unhandledRejection", (err, _) => {
        console.log(`[Error]: ${err.message}`);
        // close the server and exit process
        app.close(() => process.exit(1));
    });
}
