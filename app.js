var express = require("express"),
    app = express(), 
    bodyParser = require("body-parser"), 
    mongoose = require("mongoose"),
    seedDb = require("./seeds"),
    flash = require("connect-flash"),
    Comment = require("./models/comments"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Campground = require("./models/campgrounds"),
    methodOverride = require("method-override");
    
var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")
var authRoutes = require("./routes/index")
    
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDb();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret:"boom boom boom shake the room",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(authRoutes);

// listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is Listening!"); 
});