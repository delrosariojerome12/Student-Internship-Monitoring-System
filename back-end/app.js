require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//connect DB
const connectDB = require("./db/connection");
//
const authRouter = require("./routers/auth");
// const authUser = require("./middlewares/auth");

// error handler
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
// routes
app.use("/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

const port = 5000 || process.env.PORT;

const start = async () => {
  try {
    const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sims.owexhkh.mongodb.net/?retryWrites=true&w=majority`;

    await connectDB(connectionString);

    app.listen(port, () => console.log(`listening at ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
