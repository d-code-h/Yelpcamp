// ==================================================================
                        // COMMENT ROUTE
// ==================================================================
// ==================
// Integrate Packages
// ==================
const   Campground      = require("../models/campground"),
        Comment         =   require("../models/comment"),
        middlewareObj   =   require("../middlewares"),
        express         =   require("express"),
        router          =   express.Router({mergeParams: true});

// ==================
// Routes
// ==================
// new
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    // fetch campground from DB
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            // error! redirect to campground show page
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }else {
            // success! to new form
            res.render("comment/new", {campground: foundCampground});
        }
    });
});

// create
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    // fetch campground from DB
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            // error! redirect back to comment new form
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }else {
            // store new comment form data into object
            var data = {
                text: req.body.text,
                author: {
                    id: req.user._id,
                    username: req.user.username
                }
            }
            // create comment
            Comment.create(data, function(err, createdComment){
                if (err){
                    // error! redirect back to comment new form
                    req.flash("error", "Something went wrong");
                    res.redirect("back");
                }else {
                    // success! store comment and off to campground show page with updated data
                    foundCampground.comments.push(createdComment);
                    foundCampground.save();
                    req.flash("success", "Comment successfully added to campground");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

// edit
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
    // fetch comment from DB
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
            // error! back to campground show page
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }else {
            // success! to edit template
            res.render("comment/edit", {comment: foundComment, campground_id: req.params.id});
        }
    });
});

// update
router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
    // fetch comment from DB and update
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err){
            // error! back to comment new form
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }else {
            // success! off to campground show page with updated comment
            req.flash("success", "Comment successfully updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// delete
router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
    // fetch comment from DB and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            // error! to campground show page
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }else {
            // success! remain in page and effect comment deletion
            req.flash("success", "Comment successfully remove from campground");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// ==================
// Export Module
// ==================
module.exports = router;