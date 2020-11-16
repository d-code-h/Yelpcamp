// ==================================================================
                        // CAMPGROUND MODEL
// ==================================================================
// Integrate Package
const mongoose    =   require("mongoose");

// Creating Mongoose Schema for Campground
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: {type: String, default: "/images/1.jpg"},
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
});

// Creating Mongoose model and Export
module.exports = mongoose.model("campground", campgroundSchema);
