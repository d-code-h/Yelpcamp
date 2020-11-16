// ==================================================================
                        // NECESSARY INTEGRATION
// ==================================================================
// ==================
// Integrate Packages
// ==================
const createError             =   require('http-errors'),
      express                 =   require('express'),
      app                     =   express(),
      session                 =   require("express-session"),
      path                    =   require('path'),
      logger                  =   require('morgan'),
      methodOverride          =   require("method-override"),
      passport                =   require("passport"),
      LocalStrategy           =   require("passport-local"),
      mongoose                =   require("mongoose"),
      MongoStore              =   require("connect-mongo")(session),
      flash                   =   require("connect-flash"),
      User                    =   require("./models/user");

// ==================
// Integrate Routes
// ==================
const campgroundsRoutes       =   require("./routes/campgrounds"),
      commentsRoutes          =   require("./routes/comments"),
      indexRoutes             =   require("./routes/index");
// ==================
// seedDB
// ==================
const seedDB                  =   require("./seeds");
// seedDB();

// ==================================================================
                        // SETUPS
// ==================================================================
// ==================
// Mongoose and Express-session
// ==================
// mongoose
console.log(process.env.DATABASEURL);
const url = process.env.DATABASEURL || "mongodb://localhost/yelpcamp"
mongoose.connect(url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// express-session
app.use(session({
    secret: "Yelpcamp is powerful",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
// ==================
// Others
// ==================
app.use(express.urlencoded({extended: true}));              //bodyParser
app.use(express.static(path.join(__dirname, 'public')));     //public directory
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");                               //view engine
app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride("_method"));                         //method override
app.use(flash());                                           //flash

// ==================
// Authentication
// ==================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==================
// Middleware
// ==================
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ==================
// Routes
// ==================
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// export
module.exports = app;
