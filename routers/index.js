const express = require("express");

const router = express.Router();

const questionsRouter = require("./question");
const authRouter = require("./auth");

router.use("/questions",questionsRouter);
router.use("/auth",authRouter);


module.exports = router;