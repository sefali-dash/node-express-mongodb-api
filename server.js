import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import userRouter from "./routes/user.rout.js";
import helmet from "helmet";

const app = express();

try {
  connectDB();
  console.log("connected to db");
} catch (err) {
  console.error(err);
  process.exit(1);
}

app.use(express.static("./filename"));
app.use(helmet());
app.use(cors());
app.use(express.json());

const reqlogger = (req, res, next) => {
  console.log("$(req.method) $(req.url) ${new Date().toISOString()}");
  next();
};

app.use(reqlogger);

//Register routes
app.use("/api/users", userRouter);

app.get("/health", reqlogger, (req, res) => {
  return res.status(200).json({
    msg: "gkjtfvnj",
  });

  //res.status(400).json({ message: "hey!i am healthy" });
});

//app.post("/api/users", (req, res) => {
//console.log("body", req.body.name);
//throw new Error("Something went wrong!");
//res.json([
// {
//   id: 1,
//  name: "sef",
// },
// {
//  id: 2,
//  name: "sef",
//},
// ]);
//});
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
