// Require Packages
    const express =   require("express"),
        mongoose    =   require("mongoose"),
        bodyParser  =   require("body-parser"),
        methodOverride  =   require("method-override"),
        passport    =   require("passport"),
        LocalStrategy   =   require("passport-local"),
        flash   =   require("connect-flash"),
        expressSanitizer = require("express-sanitizer"),
        app     =   express();
    

const User  =   require("./models/user");

// Require Routes
const   indexRoutes         =   require("./routes/index"),
        campgroundRoutes    =   require("./routes/campgrounds"),
        commentRoutes       =    require("./routes/comments");

// SeedDB
// var seedDB = require("./seedDB");
// seedDB();

// Configuration
var url = process.env.DATABASEURL;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, err => {
    console.log("connected");
});
app.set("view engine", "ejs"); //view engine
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());

// express-session and passport configurations
app.use(require("express-session")({
    secret: "Don't be Jealous of my yelpcamp",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.BOOTSTRAP_CSS = process.env.BOOTSTRAP_CSS;
    res.locals.BOOTSTRAP_JS = process.env.BOOTSTRAP_JS;
    next();
});

// Use Routes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);


// Server
app.listen(process.env.PORT,process.env.IP, () => {
    console.log("Server Has Started at:", process.env.PORT);
});