require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//connect db
const connectDB = require("./db/connection");
const authUser = require("./middlewares/auth");

//error handlers
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// router
const authRouter = require("./routers/auth");

app.use(express.json());

// routes
app.use("/auth", authUser, authRouter);

// errors
app.use(notFound);
app.use(errorHandler);

const port = 3000 || process.env.PORT;

const start = async () => {
  try {
    const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@projectsdb.wlwmrul.mongodb.net/SIMS?retryWrites=true&w=majority`;
    await connectDB(connectionString);

    app.listen(port, () => console.log(`listening at ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
