const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
})

userSchema.plugin(passportLocalMongoose);        // it will automatically add username, password and do hashing salting process for user.

module.exports = mongoose.model("User", userSchema);

