const express = require("express"),
    User    =   require("../models/user"),
    passport    =   require("passport"),
    router  =   express.Router();

    
router.get("/", (req, res) => {
    res.render("landing");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    req.body.username       =   req.sanitize(req.body.username);
    req.body.secretQ        =   req.sanitize(req.body.secretQ);
    req.body.secretA        =   req.sanitize(req.body.secretA);
    req.body.password       =   req.sanitize(req.body.password);
    req.body.confPassword   =   req.sanitize(req.body.confPassword);

    let usernameTest = /^[0-9a-z-A-Z]{3,}$/, 
        passwordTest = /^[0-9a-zA-Z]{8,}$/;

    if (
        ((req.body.username !== "") && (usernameTest.test(req.body.username))) && 
        ((req.body.secretQ !== "") && (req.body.secretA !== "")) && 
        ((req.body.password !== "") && (passwordTest.test(req.body.password))) &&
        ((req.body.confPassword !== "") && (passwordTest.test(req.body.confPassword)))
    ){        
        if (req.body.password === req.body.confPassword){
            User.register(new User(
                    {
                        username: req.body.username,
                        secretQ: req.body.secretQ,
                        secretA: req.body.secretA
                    }
                ), req.body.password, (err, registeredUser) => {
                if (err){
                    req.flash("error", err.message);
                    res.redirect("/register");
                }else {
                    passport.authenticate("local")(req, res, function(){
                        req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
                        res.redirect("/campgrounds");
                    });
                }
            });
        }else {
            req.flash("error", "Sorry, password does not match!");
            res.redirect("/register");
        }
    }else {
        req.flash("error", "Form isn't properly filled.");
        res.redirect("/register");
    }
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true
    }), (req, res) => {
});

router.get("/resetpassword", (req, res) => {
    res.render("reset");
});

router.post("/resetpassword", (req, res) => {
    req.body.username           =   req.sanitize(req.body.username);
    req.body.secretQ            =   req.sanitize(req.body.secretQ);
    req.body.secretA            =   req.sanitize(req.body.secretA);
    req.body.newPassword        =   req.sanitize(req.body.newPassword);
    req.body.confNewPassword    =   req.sanitize(req.body.confNewPassword);

    let usernameTest = /^[0-9a-z-A-Z]{3,}$/, 
        passwordTest = /^[0-9a-zA-Z]{8,}$/;

    if (
        ((req.body.username !== "") && (usernameTest.test(req.body.username))) && 
        ((req.body.secretQ !== "") && (req.body.secretA !== "")) && 
        ((req.body.pnewPssword !== "") && (passwordTest.test(req.body.newPassword))) &&
        ((req.body.confNewPassword !== "") && (passwordTest.test(req.body.confNewPassword)))
    ){ 
        if (req.body.newPassword === req.body.confNewPassword){
            User.findOne({
                username: req.body.username,
                secretQ: req.body.secretQ,
                secretA: req.body.secretA
            }, (err, foundUser) => {
               if (err || !foundUser){
                    req.flash("error", "Details Incorrect.");
                    res.redirect("/resetpassword");
               }else {
                   foundUser.setPassword(req.body.newPassword, () => {
                       foundUser.save((err, updatedUser) => {
                        if (err || !updatedUser){
                            req.flash("error", "Something went wrong. Please try again.");
                            res.redirect("/resetpassword");
                        }else {
                            req.flash("success", "Details successfully updated. Please login to continue.");
                            res.redirect("/login");
                        }
                       });
                   });
               }
            });
        }
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "You successfully logged out. See you soon")
    res.redirect("/campgrounds");
});

router.all("*", (req, res) => {
    res.redirect("/");
});

module.exports = router;