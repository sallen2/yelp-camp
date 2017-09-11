var express = require("express");
var Campground = require("../models/campgrounds");
var router = express.Router();
var middleware = require("../middleware");


// INDEX
router.get("/", function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
       
});
// CREATE
router.post("/",middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user.id,
        username: req.user.username
    }
    var newCampgrounds = {Name: name, Price: price, Image: image, Description: description, author: author};
    Campground.create(newCampgrounds, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
    
    
});

// NEW
router.get("/new",middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            console.log(err);
            req.flash('error', 'Sorry, that campground does not exist!');
            return res.redirect('/campgrounds');
        }
        res.render("campgrounds/show", {campground: foundCampground});
    });
});
 
// EDIT - shows edit form for a campground
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req, res){
  //render edit template with that campground
  res.render("campgrounds/edit", {campground: req.campground});
});

// UPDATE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err, updatedCampground){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
// DESTROY
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Campground Removed!")
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;