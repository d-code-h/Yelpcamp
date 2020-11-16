// ==================================================================
                        // MIDDLEWARES
// ==================================================================
// Integrate Models and Declaration
const   Campground      =    require("../models/campground"),
        Comment         =    require("../models/comment");

// Export Authentication Object
module.exports = {
    // isLoggedIn Middleware
    isLoggedIn: function(req, res, next){
        // checking user loggin status
        if (req.isAuthenticated()){
            // run text scripts
            return next();
        }
        // redirect to login form
        req.flash("error", "Please Login first");
        res.redirect("/login");
    },
    // checkCampgroundOwnership Middleware
    checkCampgroundOwnership: function(req, res, next){
        // checking user loggin status
        if (req.isAuthenticated()){
            // fetch campground from DB
            Campground.findById(req.params.id, function(err, foundCampground){
                if (err){
                    // on error! redirect back
                    req.flash("error", "Campground not found");
                    res.redirect("back");
                }else {
                    // comapre campground author with currently loggedin user
                    if (foundCampground.author.id.equals(req.user._id)){
                        // true! run next code
                        return next();
                    }
                    // false! Go back
                    req.flash("error", "You do not have the priviledge to do this");
                    res.redirect("back");
                }
            });
        // No
        }else {
            // redirect to login form on false
            req.flash("error", "Please Login first");
            res.redirect("/login");
        }
    },
    // checkCommentOwnership Middleware
    checkCommentOwnership: function(req, res, next){
        // checking user loggin status
        if (req.isAuthenticated()){
            // fetch comment from DB
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if (err){
                    // on error! redirect back
                    req.flash("error", "Comment not found");
                    res.redirect("back");
                }else {
                    // comapre comment author with currently loggedin user
                    if (foundComment.author.id.equals(req.user._id)){
                        // true! run next code
                        return next();
                    }
                    // on false! redirect back
                    req.flash("error", "You do not have the priviledge to do this");
                    res.redirect("back");
                }
            });
        }else {
            // redirect to login form on false
            req.flash("error", "Please Login first");
            res.redirect("/login");
        }
    }
}
