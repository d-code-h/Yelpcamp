// Require
const           //Models
    Campground     =    require("../models/campground"),
    Comment        =    require("../models/comment"),
    User            =   require("../models/user");

module.exports = {
    // Ensuring a user is log in
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()){
            next();

        }else {
            req.flash("error", "Please login first!");
            res.redirect("/login");
        }
    },
    // Ensuring only campground author or admin can perform task
    checkCampgroundOwnership: async(req, res, next) => {
        try {
            if (req.isAuthenticated()){
                // Find campground
                let foundCampground = await Campground.findById(req.params.id);
                // Find Admin user
                let foundAdmin = await User.findOne({username: "Administrator"});
                // Ascertain campground author
                if (req.user._id.equals(foundCampground.author.id) || req.user._id.equals(foundAdmin._id)){
                    next();

                }else {
                    // Not campground author?
                    req.flash("error", "Sorry, You do not have permission to do that.");
                    res.redirect("/campgrounds/" + req.params.id);
                }

            }else {
                // Not log in?
                req.flash("error", "Please login first.");
                res.redirect("/login");
            }

        }catch(err){
            // Error handling
            req.flash("error", "Something went wrong. Please try again.");
            res.redirect("/campgrounds");
        }
    },
    // Ensuring only comment author or admin can perform task
    checkCommentOwnership: async(req, res, next) => {
        try {
            if (req.isAuthenticated()){
                // Find comment
                let foundComment = await Comment.findById(req.params.commentId);  
                // Find Admin user 
                let foundAdmin = await User.findOne({username: "Administrator"});
                // Ascertain comment author
                if (req.user._id.equals(foundComment.author.id) || req.user._id.equals(foundAdmin._id) ){
                    next();

                }else {
                    // Not sn author?
                    req.flash("error", "Sorry, You do not have permission to do that.");
                    res.redirect("/campgrounds/" + req.params.id);
                }

            }else {
                // Not log in?
                req.flash("error", "Please login first.");
                res.redirect("/login");
            }

        }catch(err){
            // Error handling
            req.flash("error", "Something went wrong. Please try again.");
            res.redirect("/campgrounds/" + req.params.id);
        }
        
    }
}