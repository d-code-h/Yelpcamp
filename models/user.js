const mongoose  =   require("mongoose"),
        passportLocalMongoose   =   require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    secretQ: String,
    secretA: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);