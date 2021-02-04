// Require 
const           //Packages
        express     = require("express"),
        passport    =   require("passport"),
        router      =   express.Router(),
                //Models
        User        =   require("../models/user");

// Index GET
router.get("/", (req, res) => {
    res.render("landing");
});

// Register GET
router.get("/register", (req, res) => {
    res.render("register");
});

// Register Post
router.post("/register", async(req, res) => {
    try {
        // Sanitizing inputs
        req.body.username       =   req.sanitize(req.body.username);
        req.body.secretQ        =   req.sanitize(req.body.secretQ);
        req.body.secretA        =   req.sanitize(req.body.secretA);
        req.body.password       =   req.sanitize(req.body.password);
        req.body.confPassword   =   req.sanitize(req.body.confPassword);

        // Regular expression
        let usernameTest = /^[0-9a-zA-Z]{3,}$/, 
            passwordTest = /^(?=.*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d.*\d)[a-zA-Z0-9\S]{8,}$/;

            // Ensuring proper validations
        if (
            ((req.body.username !== "") && (usernameTest.test(req.body.username))) && 
            ((req.body.secretQ !== "") && (req.body.secretA !== "")) && 
            ((req.body.password !== "") && (passwordTest.test(req.body.password))) &&
            ((req.body.confPassword !== "") && (passwordTest.test(req.body.confPassword)))
        ){      
            // When it ends as desired  
            if (req.body.password === req.body.confPassword){
                // Create new user
                await User.register(new User({
                    username: req.body.username,
                    secretQ: req.body.secretQ,
                    secretA: req.body.secretA
                }), req.body.password);

                // Auto login
                passport.authenticate("local")(req, res, () => {
                    req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
                    res.redirect("/campgrounds");
                });
                
            }else {
                // When password inputs does not match
                req.flash("error", "Sorry, password does not match!");
                res.redirect("/register");
            }

        }else {
            // When form isn't properly filled
            req.flash("error", "Form isn't properly filled.");
            res.redirect("/register");
        }

    }catch(err) {
        // Error handling
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("back");
    }
});

// Login GET
router.get("/login", (req, res) => {
    res.render("login");
});

// Login Post
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
    }), (req, res, next) => {
        if ( req.body.remember ) {
            req.session.cookie.originalMaxAge = 604800000; // Expires in 7 day
            next();
        } else {
            req.session.cookie.expires = false;
            next();
        }
    },
    (req, res) => {
        res.redirect('/campgrounds');
    }
);

// Reset Password GET
router.get("/resetpassword", (req, res) => {
    res.render("reset");
});

// Reset Pasword POST
router.post("/resetpassword", async(req, res) => {
    try {
        // Sanitize inputs
        req.body.username           =   req.sanitize(req.body.username);
        req.body.secretQ            =   req.sanitize(req.body.secretQ);
        req.body.secretA            =   req.sanitize(req.body.secretA);
        req.body.newPassword        =   req.sanitize(req.body.newPassword);
        req.body.confNewPassword    =   req.sanitize(req.body.confNewPassword);

        // Regular expressions
        let usernameTest = /^[0-9a-z-A-Z]{3,}$/, 
            passwordTest = /^(?=.*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d.*\d)[a-zA-Z0-9\S]{8,}$/;

        // Ensuring proper validations
        if (
            ((req.body.username !== "") && (usernameTest.test(req.body.username))) && 
            ((req.body.secretQ !== "") && (req.body.secretA !== "")) && 
            ((req.body.pnewPssword !== "") && (passwordTest.test(req.body.newPassword))) &&
            ((req.body.confNewPassword !== "") && (passwordTest.test(req.body.confNewPassword)))
        ){ 
            // When password inputs are as expected
            if (req.body.newPassword === req.body.confNewPassword){
                let foundUser = await User.findOne({
                    username: req.body.username,
                    secretQ: req.body.secretQ,
                    secretA: req.body.secretA
                });
                      
                // Reset password
                await foundUser.setPassword(req.body.newPassword);
                await foundUser.save();

                // Update User with info
                req.flash("success", "Details successfully updated. Please login to continue.");
                res.redirect("/login");

            }else {
                // When password inputs does not match
                req.flash("error", "Sorry, password does not match!");
                res.redirect("/resetpassword");
            }

        }else {
            // When form isn't properly filled
            req.flash("error", "Form isn't properly filled.");
            res.redirect("/resetpassword");
        }

    }catch(err){
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("back");
    }
});

// Logout GET
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "You successfully logged out. See you soon")
    res.redirect("/campgrounds");
});

// Other routes ALL
router.all("*", (req, res) => {
    res.redirect("/");
});

// Export module
module.exports = router;