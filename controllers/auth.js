const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");

const register = async (req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await User.create({
            name,
            email,
            password
        });
        
        res.status(201).json({
            success: true,
            data: user
        });
    }catch(error){
        return next(new CustomError(error,400));
    }
};

module.exports = {
    register
};