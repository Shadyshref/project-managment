import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import projectRoute from "./routes/projectRoute";
import tasksRoute from "./routes/tasksRoute";
import searchRoute from "./routes/searchRoute";
import userRoute from "./routes/userRoute";
import teamRoute from "./routes/teamRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("This is home routes");
});
app.use("/projects", projectRoute);
app.use("/tasks", tasksRoute);
app.use("/search", searchRoute);
app.use("/users", userRoute);
app.use("/teams", teamRoute);

const port =Number( process.env.port) || 3000;

app.listen(port,"0.0.0.0", () => {
  console.log(`Server running on port${port}`);
});
