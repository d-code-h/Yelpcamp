// Require packages
const   mongoose                =   require("mongoose"),
        passportLocalMongoose   =   require("passport-local-mongoose");

// User schema
const userSchema = new mongoose.Schema({
    username: String,
    secretQ: String,
    secretA: String,
    password: String
});

// Integrate into schema
userSchema.plugin(passportLocalMongoose);

// Export module
module.exports = mongoose.model("User", userSchema);