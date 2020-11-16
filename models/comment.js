// ==================================================================
                        // COMMENT MODEL
// ==================================================================
// Integrate Package
const mongoose    =   require("mongoose");

// Create Mongoose Schema for Comment
const commentSchema = new mongoose.Schema({
    text: String,
    created: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// Create Mongoose model and Export
module.exports = mongoose.model("Comment", commentSchema);