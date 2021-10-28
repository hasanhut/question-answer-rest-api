const Question = require("../models/Question");


const getAllQuestions = (req,res,next) => {
    res.status(200).json({
        success : true,
        message : "Get All Questions"
    });
};

module.exports = {
    getAllQuestions
};