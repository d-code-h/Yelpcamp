const Campground    =   require("../models/campground"),
    Comment =   require("../models/comment"),
    User    =   require("../models/user");

module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()){
            next();
        }else {
            req.flash("error", "Please login first!");
            res.redirect("/login");
        }
    },
    checkCampgroundOwnership: (req, res, next) => {
        if (req.isAuthenticated()){
            Campground.findById(req.params.id, (err, foundCampground) => {
                if (err){
                    req.flash("error", err.message)
                    res.redirect("back");
                }else {
                    User.findOne({username: "Administrator"}, (err, foundAdmin) => {
                        if (err){
                            req.flash("error", "Something went wrong. Please try again");
                            res.redirect("/campgrounds");
                        }else {
                            if (req.user._id.equals(foundCampground.author.id)){
                                next();
                            }else {
                                req.flash("error", "Sorry, You do not have permission to do that.");
                                res.redirect("/campgrounds/" + req.params.id);
                            }
                        }
                    })
                }
            });
        }else {
            req.flash("error", "Please login first.");
            res.redirect("/login");
        }
    },
    checkCommentOwnership: (req, res, next) => {
        if (req.isAuthenticated()){
            Comment.findById(req.params.id, (err, foundComment) => {
                if (err){
                    req.flash("error", err.message)
                    res.redirect("back");
                }else {
                    User.findOne({username: "Administrator"}, (err, foundAdmin) => {
                        if (err){
                            req.flash("error", "Something went wrong. Please try again.");
                            res.redirect("/campgrounds/" + req.params.id);
                        }else {
                            if (req.user._id.equals(foundComment.author.id) || req.user._id.equals(foundAdmin._id) ){
                                next();
                            }else {
                                req.flash("error", "Sorry, You do not have permission to do that.");
                                res.redirect("/campgrounds/" + req.params.id);
                            }
                        }
                    })
                }
            });
        }else {
            req.flash("error", "Please login first.");
            res.redirect("/login");
        }
    }
}