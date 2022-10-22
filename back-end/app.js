const express = require("express");
const app = express();

const connectDB = require("./db/connection");

require("dotenv").config();
require("express-async-errors");

app.use(express.json());

const port = 3000 || process.env.PORT;

const start = async () => {
  try {
    const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@projectsdb.wlwmrul.mongodb.net/SIMS?retryWrites=true&w=majority`;
    await connectDB(connectionString);
    app.listen(() => console.log(`listening at ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
