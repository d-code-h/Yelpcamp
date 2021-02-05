// Require 
 const                  // Packages 
        express             =   require("express"),
        mongoose            =   require("mongoose"),
        bodyParser          =   require("body-parser"),
        methodOverride      =   require("method-override"),
        session             =   require("express-session"),
        passport            =   require("passport"),
        LocalStrategy       =   require("passport-local"),
        flash               =   require("connect-flash"),
        expressSanitizer    =   require("express-sanitizer"),
        app                 =   express(),
                        // Models
        User                =   require("./models/user"),
                        // Routes
        indexRoutes         =   require("./routes/index"),
        campgroundRoutes    =   require("./routes/campgrounds"),
        commentRoutes       =   require("./routes/comments"),
                        // SeedDB
    seedDB              =   require("./seedDB")();
    
        const cookieParser = require("cookie-parser"),
        MongoStore = require("connect-mongo")(session);

// Configuration
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false
    })
    .then(() => {
        console.log("Connection to DB Successful!");
    })
    .catch((err) => {
        console.log(err);
    })
  
// Configurations
app.set("view engine", "ejs"); //view engine
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());

// express-session
app.use(session({
    secret: "Don't be Jealous of my yelpcamp",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middlewares
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.BOOTSTRAP_CSS = process.env.BOOTSTRAP_CSS;
    res.locals.BOOTSTRAP_JS = process.env.BOOTSTRAP_JS;
    res.locals.FONT_AWESOME = process.env.FONT_AWESOME;
    res.locals.ANIMATE_CSS = process.env.ANIMATE_CSS;
    res.locals.JQUERY = process.env.JQUERY;
    res.locals.JQUERY_MODERNIZER = process.env.JQUERY_MODERNIZER;
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