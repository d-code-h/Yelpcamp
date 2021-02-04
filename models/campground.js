// Require Package
const mongoose  =   require("mongoose");

// Campground schema
const campgroundSchema = new mongoose.Schema({
    title: String,
    description: String,
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    image: {
        src: String,
        id: String
    }
});

// Export module
module.exports  =   mongoose.model("Campground", campgroundSchema);