// ==================================================================
                        // INDEX ROUTE
// ==================================================================
// ==================
// Integrate Packages
// ==================
const   express     =   require("express"),
        router      =   express.Router(),
        passport    =   require("passport"),
        User        =   require("../models/user");

// ==================
// Routes
// ==================
// index
router.get("/", function(req, res){
    // landing template
    res.render("landing");
});

// register
router.get("/register", function(req, res){
    // register template
    res.render("register");
});

// create user Logic
router.post("/register", function(req, res){
    if (req.body.password == req.body.confPassword){
        // create new user
        User.register(new User({username: req.body.username}), req.body.password, function(err, createdUser){
            if (err){
                // error! back to register form page
                req.flash("error", err.message);
                res.redirect("/register");
            }else {
                // success! login automatically
                passport.authenticate("local")(req, res, function(){
                    req.flash("success", "Welcome to YelpCamp " + createdUser.username);
                    res.redirect("/campgrounds");
                });
            }
        });
    }else {
        req.flash("error", "Password does not match");
        res.redirect("back");
    }
});

// login
router.get("/login", function(req, res){
    // login template
    res.render("login");
});

// login logic
router.post("/login", passport.authenticate("local", {
    // wrong! to login 
    failureRedirect: "/login",
    failureFlash: true
    }), (req, res, next) => {
        // issue a remember me cookie if the option was checked
        if (!req.body.remember_me) { 
        req.session.cookie.expires=false;
        next(); 
        }else {
            req.session.cookie.originalMaxAge = 604800000;  // 7 days
            next();
        }
    }, function(req, res){
        // correct! to campgrounds
        res.redirect("/campgrounds");
});

// logout logic
router.get("/logout", function(req, res){
    // logout current user and redirect to campgrounds
    req.logout();
    req.flash("success", "You logged out");
    res.redirect("/campgrounds");
});

// ==================
// Export Module
// ==================
module.exports  =   router;