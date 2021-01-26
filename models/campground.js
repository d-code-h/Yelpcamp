const mongoose                =       require("mongoose");

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
    image: String
});

module.exports  =   mongoose.model("Campground", campgroundSchema);