const express = require("express");
const { register, tokentest } = require("../controllers/auth");
const router = express.Router();

router.post("/register", register);

module.exports = router;
