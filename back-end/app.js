require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");

//connect DB
const connectDB = require("./db/connection");
//
const authRouter = require("./routers/auth");
const authUser = require("./middlewares/auth");
const internsRouter = require("./routers/intern");
const userRouter = require("./routers/user");
const documentRouter = require("./routers/document");
const internshipRouter = require("./routers/internship");
const attendanceRouter = require("./routers/attendance");

// error handler
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://student-internship-monitoring-system.netlify.app"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
// routes
app.use("/auth", authRouter);
app.use("/intern", internsRouter);
app.use("/user", userRouter);
app.use("/document", documentRouter);
app.use("/internship", internshipRouter);
app.use("/attendance", attendanceRouter);

app.use(notFound);
app.use(errorHandler);

const port = 5000 || process.env.PORT;

const start = async () => {
  try {
    const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sims.owexhkh.mongodb.net/SIMS?retryWrites=true&w=majority`;
    await connectDB(connectionString);

    app.listen(port, () => console.log(`listening at ${port}`));
  } catch (error) {
    console.log(error);
    console.log("Connection Error");
  }
};

start();
