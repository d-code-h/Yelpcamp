// ==================================================================
                        // CAMPGROUNDS ROUTE
// ==================================================================
// ==================
// Integrate Packages
// ==================
const   Campground      =   require("../models/campground"),
        Comment         =   require("../models/comment"),
        middlewareObj   =   require("../middlewares"),
        express         =   require("express"),
        router          =   express.Router();

// ==================
// Routes
// ==================
// index
router.get("/", function(req, res){
    // fetch campground from DB
    Campground.find({}, function(err, foundCampground){
        // error! redirect home
        if (err){
            req.flash("error", "Campground not found");
            res.redirect("/");
        } else {
            // success! render index template
            res.render("campground/index", {campgrounds: foundCampground});
        }
    });
});
// new
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    // render new template
    res.render("campground/new");
});
// create
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    // store new campground form data into object
    var data = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }
    // create campground
    Campground.create(data, function(err, createdCampground){
        if (err){
            // error! redirect to new form template
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }else {
            // success! off to campgrounds page
            req.flash("success", "You just created a campground");
            res.redirect("/campgrounds");
        }
    })
});
// show
router.get("/:id", function(req, res){
    // fetch campground from DB and populate
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            // error! back to campgrounds page
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }else {
            // success! to show page
            res.render("campground/show", {campground: foundCampground});
        }
    });
});
// edit
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res){
    // fetch campground from DB
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            // error! back to campground show page
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }else {
            // success! to show edit page
            res.render("campground/edit", {campground: foundCampground});
        }
    });
});
// update
router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    // fetch campground from DB and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err){
            // error! back to campground show page
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }else {
            // success! back to campground show page with update data
            req.flash("success", "Campground successfully updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
// delete
router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    // fetch campground from DB and remove
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err){
            // error! back to campground show page
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }else {
            // success! off to campgrounds pag
            req.flash("success", "Campground successfully remove");
            res.redirect("/campgrounds");
        }
    })
});

// ==================
// Export Module
// ==================
module.exports  =   router;