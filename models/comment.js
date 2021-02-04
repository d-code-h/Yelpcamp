// Require package
const mongoose = require("mongoose");

// Comment schema
const commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// Export module
module.exports = mongoose.model("Comment", commentSchema);