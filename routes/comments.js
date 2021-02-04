// Require
const       //Packages
    express     =   require("express"),
    router      =   express.Router({mergeParams: true}),
            // Models
    Campground  =   require("../models/campground"),
    Comment     =   require("../models/comment"),
            // Middleware
    middleware  =   require("../middlewares/");


// Create Comment GET
router.get("/new", middleware.isLoggedIn, async(req, res) => {
    try {
        // Find campground
        let foundCampground = await Campground.findById(req.params.id);
        res.render("comments/new", {campground: foundCampground});

    }catch(err) {
        // Error handling
        req.flash("error", "An Error occur. Please try again soon.");
        res.redirect("back");
    }
});  

// Create Comment POST
router.post("/", middleware.isLoggedIn, async(req, res) => {
    try {
        // Prepare new comment
        let newComment = new Comment({
            text: req.body.text,
            author: {
                id: req.user._id,
                username: req.user.username
            }
        });

        // Save new comment
        let createdComment = await newComment.save();
        // Find campground
        let foundCampground = await Campground.findById(req.params.id);
        // Save new comment into found campground
        await foundCampground.comments.push(createdComment);
        await foundCampground.save();
        // Udate User with info
        req.flash("success", "Comment succcessfully added");
        res.redirect("/campgrounds/" + req.params.id);

    }catch(err){
        // Error handling
        req.flash("error", "So sorry for that error. Do try again soon.");
        res.redirect("back");
    }
});

// Edit comment GET
router.get("/:commentId/edit", middleware.checkCommentOwnership, async(req, res) => {
    try {
        // Find comment and Update User with info
        let foundComment = await Comment.findById(req.params.commentId);
        res.render("comments/edit", {comment: foundComment, campgroundId: req.params.id});
    }catch(err){
        // Error handling
        console.log(err);
        req.flash("error", "Ush! An error just happen. Please try again.");
        res.redirect("back");
    }
});

// Update comment PUT
router.put("/:commentId", middleware.checkCommentOwnership, async(req, res) => {
    try {
        // Prepare edited comment
        let editComment = {
            text: req.body.text,
            author: {
                id: req.user._id,
                username: req.user.username
            }
        }
        // Find comment and update
        await Comment.findByIdAndUpdate(req.params.commentId, editComment);
        // Update User with info
        req.flash("success", "Comment successfully updated.")
        res.redirect("/campgrounds/" + req.params.id);

    }catch(err){
        // Error handling
        req.flash("error", "We find it hard to process your update request. Please try again.");
        res.redirect("back");
    }
});

// Delete comment DELETE
router.delete("/:commentId", middleware.checkCommentOwnership, async(req, res) => {
    try {
        // Find comment and delete
        await Comment.findByIdAndRemove(req.params.commentId);
        // Update User with info
        req.flash("success", "Comment successfully removed");
        res.redirect("/campgrounds/" + req.params.id);

    }catch(err){
        // Error handling
        req.flash("error", "We encounter a problem during deleting. Do try again soon.");
        res.redirect("back");
    }
})

// Export module
module.exports  =   router;