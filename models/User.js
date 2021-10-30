const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        minlength: [5, "Username must be a minimum of 5 characters"],
        required: [true, "Please provide a Username"],
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Please provide a valid email"],
        match: [
            /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
            "Please provide a valid email",
        ],
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    password: {
        type: String,
        minlength: [6, "Password must be a minimum of 6 characters"],
        select: false, // for safety
        required: [true, "Please provide a password"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
    },
    about: {
        type: String,
    },
    place: {
        type: String,
    },
    website: {
        type: String,
    },
    user_image: {
        type: String,
        default: "default.jpg",
    },
    blocked: {
        type: Boolean,
        default: false,
    },
});

UserSchema.methods.generateJwtFromUser = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

    const payload = {
        id: this.id,
        name: this.name,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE,
    });

    return token;
};

//Pre Hooks
UserSchema.pre("save", function (next) {
    const saltRounds = 10;
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
            } else {
                bcrypt.hash(this.password, salt, (err, hash) => {
                    if (err) {
                        next(err);
                    } else {
                        this.password = hash;
                        console.log(this.password);
                        next();
                    }
                });
            }
        });
    } else {
        return next();
    }
});

module.exports = mongoose.model("User", UserSchema);
