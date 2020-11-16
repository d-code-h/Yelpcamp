// ==================================================================
                        // USER MODEL
// ==================================================================
// Integrate Packages
const   mongoose                =   require("mongoose"),
        passportLocalMongoose   =   require("passport-local-mongoose");

// Create Mongoose Schema for User
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Integrate passportLocalMongoose into UserSchema
userSchema.plugin(passportLocalMongoose);

// Creating Mongoose model and Export
module.exports = mongoose.model("User", userSchema);