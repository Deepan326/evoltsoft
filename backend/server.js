import userRouter from "./src/routes/userRoutes.js";
import protectedRouter from "./src/routes/protectedRoute.js";
import cors from "cors"
import express  from "express";
import { connectDB, connectTestDB }  from "./src/config/db.js";
import cookieParser from "cookie-parser";
import taskRouter from "./src/routes/taskRoutes.js";


const app = express();
const isTestEnv = process.env.NODE_ENV === "test";

if (isTestEnv) {
  connectTestDB();
} else {
  connectDB();
}

app.use(cors({
  origin: "https://evoltsoftap.netlify.app",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/users", userRouter);
app.use("/api/v1/protect", protectedRouter);
app.use("/api/v1/charging", taskRouter); 

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
