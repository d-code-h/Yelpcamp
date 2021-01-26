const express = require("express"),
    router  =   express.Router({mergeParams: true}),
    Campground  =   require("../models/campground"),
    Comment =   require("../models/comment"),
    middleware  =   require("../middlewares/");


router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        }else {
            res.render("comments/new", {campground: foundCampground});
        }
    })
});  

router.post("/", middleware.isLoggedIn, (req, res) => {
    let newComment = new Comment(
        {
            text: req.body.text,
            author: {
                id: req.user._id,
                username: req.user.username
            }
        }
        );
    newComment.save((err, createdComment) => {
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        }else {
            Campground.findById(req.params.id, (err, foundCampground) => {
                if (err){
                    req.flash("error", err.message);
                    res.redirect("back");
                }else {
                    foundCampground.comments.push(createdComment);
                    foundCampground.save((err, savedCampground) => {
                        if (err){
                            req.flash("error", err.message);
                            res.redirect("back");
                        }else {
                            req.flash("success", "Comment succcessfully added");
                            res.redirect("/campgrounds/" + req.params.id);
                        }
                    });
                }
            });
        }
    });
});


router.get("/:commentId/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.commentId, (err, foundComment) => {
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        }else {
            res.render("comments/edit", {comment: foundComment, campgroundId: req.params.id});
        }
    });
});

router.put("/:commentId", middleware.checkCommentOwnership, (req, res) => {
    let editComment = {
        text: req.body.text,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }
    Comment.findByIdAndUpdate(req.params.commentId, editComment, (err, updatedComment) => {
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        }else {
            req.flash("success", "Comment successfully updated.")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:commentId", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId, (err, deletedComment) => {
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        }else {
            req.flash("success", "Comment successfully removed");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})
module.exports  =   router;