const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const routers = require("./routers/index");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");

const app = express();

app.use(express.json());
app.use("/api",routers);


dotenv.config({
    path: "./config/env/config.env"
});

//MongoDb
connectDatabase();

const PORT = process.env.PORT;

app.use(customErrorHandler);

app.listen(PORT,() => {
    console.log("App Started on "+PORT + " Port");
});